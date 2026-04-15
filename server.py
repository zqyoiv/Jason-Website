#!/usr/bin/env python3
"""
Minimal local static server + short URLs (same rules as Apache .htaccess).

Uses only the Python standard library — no pip install.

  python server.py

Then open http://127.0.0.1:8765/  (set PORT=8080 etc. if you prefer)

Production (FTP / cPanel): Apache still handles .htaccess; this file is for local dev only.
"""

import os
import re
import sys
import urllib.parse
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


ROOT = os.path.dirname(os.path.abspath(__file__))
HTACCESS = os.path.join(ROOT, ".htaccess")


def load_rewrite_rules():
    rules = []
    if not os.path.isfile(HTACCESS):
        print("Warning: .htaccess not found at", HTACCESS, file=sys.stderr)
        return rules
    with open(HTACCESS, encoding="utf-8", errors="replace") as f:
        for raw in f:
            line = raw.strip()
            m = re.match(r"^RewriteRule\s+(\S+)\s+(\S+)\s+\[L\]", line)
            if not m:
                continue
            pat, target = m.group(1), m.group(2)
            try:
                rules.append((re.compile(pat), target))
            except re.error as e:
                print("Skip invalid pattern:", pat, e, file=sys.stderr)
    return rules


RULES = load_rewrite_rules()


def rewrite_request_path(path):
    """If path matches a RewriteRule, return new path (with leading /); else original."""
    parsed = urllib.parse.urlparse(path)
    p = urllib.parse.unquote(parsed.path)
    rel = p.lstrip("/")
    if rel.endswith("/") and len(rel) > 1:
        rel = rel.rstrip("/")

    for regex, target in RULES:
        if regex.fullmatch(rel):
            new_path = "/" + target.replace(os.sep, "/")
            if parsed.query:
                return new_path + "?" + parsed.query
            return new_path
    return path


class RewritingRequestHandler(SimpleHTTPRequestHandler):
    protocol_version = "HTTP/1.0"

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def do_GET(self):
        self.path = rewrite_request_path(self.path)
        return super().do_GET()

    def do_HEAD(self):
        self.path = rewrite_request_path(self.path)
        return super().do_HEAD()

    def log_message(self, format, *args):
        sys.stderr.write("%s - - [%s] %s\n" % (self.address_string(), self.log_date_time_string(), format % args))


class ReuseAddrThreadingHTTPServer(ThreadingHTTPServer):
    allow_reuse_address = True


def main():
    # Default 8765: on some Windows setups low ports (e.g. 8080) hit excluded ranges (WinError 10013).
    port = int(os.environ.get("PORT", "8765"))
    host = os.environ.get("HOST", "127.0.0.1")
    Handler = RewritingRequestHandler
    httpd = ReuseAddrThreadingHTTPServer((host, port), Handler)
    print("Serving", ROOT)
    print("Short URLs: http://%s:%s/  (%d rewrite rules from .htaccess)" % (host, port, len(RULES)))
    print("Ctrl+C to stop")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nStopped.")
        httpd.shutdown()


if __name__ == "__main__":
    main()
