#!/usr/bin/env python3
"""
Add-project helper: form at /add-project; POST /api/add-project updates the repo
(HTML, WebP thumbnail, js/index.js, .htaccess, optional url-mapping.json).

Python only — uses Pillow for WebP (no Node / no sharp).

  pip install -r requirements-add-project.txt
  python add_project_server.py

Open http://127.0.0.1:5050/add-project  (override with ADD_PROJECT_PORT / ADD_PROJECT_HOST)
"""

from __future__ import annotations

import html
import json
import os
import re
import sys
import tempfile

try:
    from flask import Flask, abort, jsonify, request, send_file, send_from_directory
except ImportError:
    print("Install: pip install -r requirements-add-project.txt", file=sys.stderr)
    raise SystemExit(1)

try:
    from PIL import Image, UnidentifiedImageError
except ImportError:
    print("Install: pip install -r requirements-add-project.txt  (needs Pillow for WebP)", file=sys.stderr)
    raise SystemExit(1)


ROOT = os.path.dirname(os.path.abspath(__file__))
HTACCESS = os.path.join(ROOT, ".htaccess")
INDEX_JS = os.path.join(ROOT, "js", "index.js")
URL_MAPPING = os.path.join(ROOT, "url-mapping.json")

SECTIONS = {
    "general": {
        "array": "generalImages",
        "img_js": "IMG_SELECTED",
        "webp_dir": os.path.join("images", "thumbnail", "webp", "selected"),
        "html_dir": os.path.join("html", "project", "general"),
    },
    "commission": {
        "array": "commissionedImages",
        "img_js": "IMG_COMMISSIONED",
        "webp_dir": os.path.join("images", "thumbnail", "webp", "commission"),
        "html_dir": os.path.join("html", "project", "commission"),
    },
    "residential": {
        "array": "residentialImages",
        "img_js": "IMG_RESIDENTIAL",
        "webp_dir": os.path.join("images", "thumbnail", "webp", "residential"),
        "html_dir": os.path.join("html", "project", "residential"),
    },
}

FORBIDDEN_PRETTY = frozenset(
    {
        "css",
        "js",
        "html",
        "images",
        "font",
        "works",
        "about",
        "project",
        "api",
        "add-project",
    }
)

PRETTY_RE = re.compile(r"^[A-Za-z][A-Za-z0-9-]*$")


def pretty_to_kebab_html_name(pretty: str) -> str:
    p = pretty.strip().strip("/")
    s = re.sub(r"(?<=[a-z0-9])(?=[A-Z])", "-", p)
    s = s.lower()
    s = re.sub(r"[^a-z0-9-]+", "-", s)
    return re.sub(r"-+", "-", s).strip("-") + ".html"


def js_quote(s: str) -> str:
    t = (s or "").replace("\\", "\\\\").replace("'", "\\'").replace("\r", " ").replace("\n", " ")
    return "'" + t + "'"


def htaccess_rule_exists(content: str, pretty: str) -> bool:
    return ("RewriteRule ^%s/?$" % re.escape(pretty)) in content


def normalize_htaccess_text(s: str) -> str:
    if s.startswith("\ufeff"):
        s = s[1:]
    return s.replace("\r\n", "\n")


def insert_htaccess_rule(content: str, pretty: str, rel_html_posix: str) -> str:
    """Insert one RewriteRule before the cPanel PHP block (same place as other project URLs)."""
    if htaccess_rule_exists(content, pretty):
        return content
    line = "RewriteRule ^%s/?$ %s [L]\n" % (pretty, rel_html_posix.replace("\\", "/"))
    content = normalize_htaccess_text(content)
    # Match "# php -- BEGIN" at line start (cPanel often appends more text on the same line).
    m = re.search(r"(?m)^#\s*php\s*--\s*BEGIN", content)
    if m:
        return content[: m.start()] + line + content[m.start() :]
    raise ValueError(
        "Could not find a line starting with '# php -- BEGIN' in .htaccess. "
        "Add this line manually with the other project rules (before any PHP handler block):\n"
        + line.strip()
    )


def insert_index_gallery_line(js: str, array_name: str, img_js: str, thumb_base: str, title: str, pretty: str) -> str:
    marker = "const %s = [" % array_name
    pos = js.find(marker)
    if pos == -1:
        raise ValueError("Could not find %s in index.js" % array_name)
    nl = js.find("\n", pos)
    if nl == -1:
        raise ValueError("Malformed index.js")
    insert_at = nl + 1
    alt = (title.strip() or pretty) + " project"
    line = (
        "  { src: %s + '%s.webp', alt: %s, link: '/%s/', title: %s },\n"
        % (img_js, thumb_base, js_quote(alt), pretty, js_quote((title.strip() or pretty).upper()))
    )
    return js[:insert_at] + line + js[insert_at:]


def update_url_mapping(pretty: str, rel_html_posix: str):
    if not os.path.isfile(URL_MAPPING):
        return None
    with open(URL_MAPPING, encoding="utf-8") as f:
        data = json.load(f)
    if "project" not in data:
        data["project"] = {}
    data["project"][pretty] = rel_html_posix.replace("\\", "/")
    with open(URL_MAPPING, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)
        f.write("\n")
    return URL_MAPPING


def build_project_html(title: str, description: str) -> str:
    safe_title = html.escape(title.strip() or "Project")
    body = html.escape(description or "").replace("\n", "<br>\n")
    page_title = html.escape((title.strip() or "Project") + " - Jason Krugman Studio")
    return """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="/images/favicon/jupiter_gif_still.png" type="image/png">
    <title>%s</title>
    <link rel="stylesheet" href="/css/styles.css">
    <link rel="stylesheet" href="/css/project.css">
    <script src="/js/project-size.js"></script>
</head>
<body>
    <div id="header-placeholder"></div>
    <script src="/js/include-header.js"></script>

    <main class="project-page">
        <div id="project-body">
            <h1 class="project-title">%s</h1>
            <div class="project-content">
                <div class="project-description">
                    <p>%s</p>
                </div>
            </div>
        </div>
    </main>

    <div id="footer-placeholder"></div>
    <script src="/js/include-footer.js"></script>

</body>
</html>
""" % (
        page_title,
        safe_title,
        body,
    )


def save_image_as_webp(src_path: str, dst_path: str) -> None:
    """Write a WebP thumbnail using Pillow (no Node)."""
    with Image.open(src_path) as im:
        if im.mode in ("RGBA", "LA", "PA") or (im.mode == "P" and "transparency" in im.info):
            im = im.convert("RGBA")
        else:
            im = im.convert("RGB")
        im.save(dst_path, "WEBP", quality=85, method=6)


app = Flask(__name__)
app.config["MAX_CONTENT_LENGTH"] = 25 * 1024 * 1024


@app.route("/add-project")
def page():
    return send_from_directory(os.path.join(ROOT, "html"), "add-project.html")


@app.route("/", methods=["GET"])
def root():
    return send_from_directory(os.path.join(ROOT, "html"), "add-project.html")


@app.route("/api/add-project", methods=["POST"])
def api_add_project():
    title = (request.form.get("title") or "").strip()
    section = (request.form.get("section") or "").strip().lower()
    pretty = (request.form.get("pretty_url") or "").strip().strip("/")
    description = request.form.get("description") or ""
    up = request.files.get("thumbnail")

    if not title:
        return jsonify({"ok": False, "error": "Title is required."}), 400
    if section not in SECTIONS:
        return jsonify({"ok": False, "error": "Section must be general, commission, or residential."}), 400
    if not pretty or not PRETTY_RE.match(pretty):
        return jsonify(
            {
                "ok": False,
                "error": "Pretty URL must be one segment: letters, numbers, hyphens; start with a letter (e.g. myProject or my-project).",
            }
        ), 400
    if pretty.lower() in FORBIDDEN_PRETTY:
        return jsonify({"ok": False, "error": "That pretty URL is reserved. Choose another."}), 400
    if not up or not up.filename:
        return jsonify({"ok": False, "error": "Thumbnail image is required."}), 400

    cfg = SECTIONS[section]
    html_name = pretty_to_kebab_html_name(pretty)
    html_rel = os.path.join(cfg["html_dir"], html_name)
    html_rel_posix = html_rel.replace("\\", "/")
    html_abs = os.path.join(ROOT, html_rel)
    thumb_base = pretty + "Thumb"
    webp_name = thumb_base + ".webp"
    webp_abs = os.path.join(ROOT, cfg["webp_dir"], webp_name)

    if os.path.exists(html_abs):
        return jsonify({"ok": False, "error": "Project HTML already exists: " + html_rel_posix}), 400
    if os.path.exists(webp_abs):
        return jsonify({"ok": False, "error": "Thumbnail already exists: " + webp_name}), 400

    with open(HTACCESS, encoding="utf-8") as f:
        ht = normalize_htaccess_text(f.read())
    if htaccess_rule_exists(ht, pretty):
        return jsonify({"ok": False, "error": "Pretty URL already mapped in .htaccess."}), 400

    with open(INDEX_JS, encoding="utf-8") as f:
        index_js = f.read()
    if ("link: '/%s/'" % pretty) in index_js:
        return jsonify({"ok": False, "error": "That link already appears in index.js."}), 400

    ext = os.path.splitext(up.filename)[1].lower() or ".jpg"
    if ext not in (".jpg", ".jpeg", ".png", ".webp", ".gif", ".tif", ".tiff", ".bmp"):
        return jsonify({"ok": False, "error": "Unsupported image type: " + ext}), 400

    os.makedirs(os.path.dirname(webp_abs), exist_ok=True)
    os.makedirs(os.path.dirname(html_abs), exist_ok=True)

    tmp_fd, tmp_path = tempfile.mkstemp(suffix=ext)
    os.close(tmp_fd)
    try:
        up.save(tmp_path)
        try:
            save_image_as_webp(tmp_path, webp_abs)
        except (UnidentifiedImageError, OSError, ValueError) as e:
            return jsonify({"ok": False, "error": "Thumbnail conversion failed: " + str(e)}), 400
    finally:
        try:
            os.remove(tmp_path)
        except OSError:
            pass

    old_index = index_js
    old_ht = ht
    extra = None
    try:
        with open(html_abs, "w", encoding="utf-8", newline="\n") as f:
            f.write(build_project_html(title, description))

        new_index = insert_index_gallery_line(
            index_js, cfg["array"], cfg["img_js"], thumb_base, title, pretty
        )
        with open(INDEX_JS, "w", encoding="utf-8", newline="\n") as f:
            f.write(new_index)

        new_ht = insert_htaccess_rule(ht, pretty, html_rel_posix)
        with open(HTACCESS, "w", encoding="utf-8", newline="\n") as f:
            f.write(new_ht)

        extra = update_url_mapping(pretty, html_rel_posix)
    except Exception as e:
        try:
            with open(INDEX_JS, "w", encoding="utf-8", newline="\n") as f:
                f.write(old_index)
        except OSError:
            pass
        try:
            with open(HTACCESS, "w", encoding="utf-8", newline="\n") as f:
                f.write(old_ht)
        except OSError:
            pass
        for p in (html_abs, webp_abs):
            try:
                if os.path.isfile(p):
                    os.remove(p)
            except OSError:
                pass
        return jsonify({"ok": False, "error": "Write failed (rolled back): " + str(e)}), 500

    out = {
        "ok": True,
        "html": html_rel_posix,
        "thumbnail": os.path.relpath(webp_abs, ROOT).replace(os.sep, "/"),
        "link": "/" + pretty + "/",
    }
    if extra:
        out["url_mapping"] = extra.replace(os.sep, "/")
    return jsonify(out)


@app.route("/<path:req_path>", methods=["GET"])
def static_files(req_path):
    if ".." in req_path.split(os.sep):
        abort(403)
    candidate = os.path.normpath(os.path.join(ROOT, req_path))
    root_norm = os.path.normpath(ROOT)
    if not candidate.startswith(root_norm):
        abort(403)
    if os.path.isfile(candidate):
        return send_file(candidate)
    abort(404)


def main():
    port = int(os.environ.get("ADD_PROJECT_PORT", "5050"))
    host = os.environ.get("ADD_PROJECT_HOST", "127.0.0.1")
    print("Add-project helper: http://%s:%s/add-project" % (host, port))
    print("Project root:", ROOT)
    app.run(host=host, port=port, debug=False)


if __name__ == "__main__":
    main()
