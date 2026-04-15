#!/usr/bin/env python3
"""
Reformat HTML under html/ to a readable max line width (default 80).
Uses BeautifulSoup prettify plus text wrapping for long text and long opening tags.
Run from repo root: python tools/wrap_html_to_width.py
"""

from __future__ import annotations

import argparse
import re
import sys
import textwrap
from pathlib import Path

try:
    from bs4 import BeautifulSoup
except ImportError:
    print("Install: pip install beautifulsoup4", file=sys.stderr)
    raise SystemExit(1)

ROOT = Path(__file__).resolve().parents[1]
HTML_DIR = ROOT / "html"

def iter_attr_tokens(attr_blob: str) -> list[str]:
    """Split HTML attribute string into tokens (name=value or boolean). Best-effort."""
    tokens: list[str] = []
    i = 0
    n = len(attr_blob)
    while i < n:
        while i < n and attr_blob[i].isspace():
            i += 1
        if i >= n:
            break
        start = i
        while i < n and not attr_blob[i].isspace() and attr_blob[i] != "=":
            i += 1
        if i >= n:
            tok = attr_blob[start:].strip()
            if tok:
                tokens.append(tok)
            break
        name = attr_blob[start:i]
        while i < n and attr_blob[i].isspace():
            i += 1
        if i >= n or attr_blob[i] != "=":
            tok = name.strip()
            if tok:
                tokens.append(tok)
            continue
        i += 1
        while i < n and attr_blob[i].isspace():
            i += 1
        if i >= n:
            tokens.append((name + "=").strip())
            break
        if attr_blob[i] in "\"'":
            q = attr_blob[i]
            i += 1
            vb = [name, "=", q]
            while i < n:
                c = attr_blob[i]
                vb.append(c)
                i += 1
                if c == "\\" and i < n:
                    vb.append(attr_blob[i])
                    i += 1
                    continue
                if c == q:
                    break
            tokens.append("".join(vb))
        else:
            vb = [name, "="]
            while i < n and not attr_blob[i].isspace():
                vb.append(attr_blob[i])
                i += 1
            tokens.append("".join(vb))
    return tokens


def wrap_long_opening_tag_line(line: str, width: int) -> list[str]:
    """
    If line is a single opening/void tag with attributes and exceeds width,
    break after the tag name and place each attribute on its own line (indented).
    """
    if len(line) <= width:
        return [line]
    stripped = line.lstrip(" ")
    indent = line[: len(line) - len(stripped)]
    if not (stripped.startswith("<") and stripped.endswith(">")):
        return [line]
    if stripped.count("<") != 1:
        return [line]
    # Match <tag ...> or <tag .../>
    m = re.match(r"^<([\w:-]+)\s*(.*)>$", stripped)
    if not m:
        return [line]
    tag = m.group(1)
    rest = m.group(2).rstrip()
    if rest.endswith("/"):
        attr_part = rest[:-1].rstrip()
        closer = " />"
    else:
        attr_part = rest
        closer = ">"
    if not attr_part:
        return [line]
    tokens = iter_attr_tokens(attr_part)
    if not tokens:
        return [line]
    first = "%s<%s" % (indent, tag)
    lines = [first + " " + tokens[0] + (closer if len(tokens) == 1 else "")]
    if len(tokens) == 1:
        if len(lines[0]) <= width:
            return lines
        # Unbreakable single attr — return original
        return [line]
    cont = indent + " " * 2
    for i, tok in enumerate(tokens[1:], start=1):
        piece = cont + tok + (closer if i == len(tokens) - 1 else "")
        lines.append(piece)
    # If first line still too long (e.g. huge first attr), give up
    if any(len(x) > width * 2 for x in lines):
        return [line]
    return lines


def postprocess_physical_lines(text: str, width: int) -> str:
    """
    Split long single-line opening tags across attributes. Wrap long **indented**
    text lines (no '<') — prettify output for <p> text. Skip unindented fragments.
    Never wrap plain lines inside <script> or <style> (would break JS/CSS strings).
    """
    out: list[str] = []
    in_script = False
    in_style = False
    for line in text.split("\n"):
        low = line.lower()
        if re.search(r"<\s*script\b", low):
            if "</script>" not in low:
                in_script = True
        if "</script>" in low:
            in_script = False
        if re.search(r"<\s*style\b", low):
            if "</style>" not in low:
                in_style = True
        if "</style>" in low:
            in_style = False

        if len(line) <= width:
            out.append(line)
            continue
        stripped = line.lstrip(" ")
        if "<" in stripped:
            if stripped.startswith("<") and stripped.count("<") == 1:
                out.extend(wrap_long_opening_tag_line(line, width))
            else:
                out.append(line)
            continue
        if in_script or in_style:
            out.append(line)
            continue
        if not line[:1].isspace():
            out.append(line)
            continue
        ind = len(line) - len(stripped)
        inds = " " * ind
        sub_w = max(40, width - ind)
        wrapped = textwrap.wrap(
            stripped,
            width=sub_w,
            break_long_words=False,
            break_on_hyphens=False,
        )
        out.extend(inds + w for w in wrapped)
    return "\n".join(out)


def wrap_long_double_quoted_attributes(text: str, width: int) -> str:
    """
    Break very long alt= / placeholder= values across source lines. HTML5
    normalizes newlines inside quoted attributes to spaces in the attribute value.
    Does not touch src=/href= (URLs must stay single-line).
    """
    lines = text.split("\n")
    out_lines: list[str] = []

    def flush_wrap_long_attr(line: str) -> list[str]:
        if len(line) <= width:
            return [line]
        stripped = line.lstrip(" ")
        inds = " " * (len(line) - len(stripped))
        m = re.search(
            r'\b(alt)="([^"]{80,})"|\b(placeholder)="([^"]{40,})"',
            stripped,
        )
        if not m:
            return [line]
        if m.group(1) is not None:
            name, val = m.group(1), m.group(2)
        else:
            name, val = m.group(3), m.group(4)
        before = stripped[: m.start()]
        after = stripped[m.end() :]  # remainder after closing quote of this attribute
        cont = inds + "  "
        inner_width = max(40, width - len(cont))
        chunks = textwrap.wrap(
            val,
            width=inner_width,
            break_long_words=False,
            break_on_hyphens=False,
        )
        if len(chunks) <= 1:
            return [line]
        out: list[str] = []
        out.append(inds + before + name + '="' + chunks[0])
        for ch in chunks[1:-1]:
            out.append(cont + ch)
        out.append(cont + chunks[-1] + '"' + after)
        return out

    attr_long = re.compile(
        r'\b(alt)="([^"]{80,})"|\b(placeholder)="([^"]{40,})"',
    )
    for line in lines:
        if len(line) > width and attr_long.search(line):
            out_lines.extend(flush_wrap_long_attr(line))
        else:
            out_lines.append(line)
    return "\n".join(out_lines)


def format_html(content: str, width: int) -> str:
    soup = BeautifulSoup(content, "html.parser")
    pretty = soup.prettify()
    step = postprocess_physical_lines(pretty, width=width)
    step = wrap_long_double_quoted_attributes(step, width=width)
    return step + "\n"


def main() -> None:
    ap = argparse.ArgumentParser(description="Wrap HTML files to max line width.")
    ap.add_argument("--width", type=int, default=80, help="Max line length (default 80)")
    ap.add_argument(
        "--dry-run",
        action="store_true",
        help="Print how many files would change without writing",
    )
    args = ap.parse_args()
    paths = sorted(HTML_DIR.rglob("*.html"))
    changed = 0
    for path in paths:
        raw = path.read_text(encoding="utf-8")
        try:
            new = format_html(raw, width=args.width)
        except Exception as e:
            print("Error:", path.relative_to(ROOT), e, file=sys.stderr)
            raise
        if new != raw:
            changed += 1
            if args.dry_run:
                print("would update:", path.relative_to(ROOT))
            else:
                path.write_text(new, encoding="utf-8", newline="\n")
    print("HTML files scanned:", len(paths))
    print("Files updated:" if not args.dry_run else "Files that would update:", changed)


if __name__ == "__main__":
    main()
