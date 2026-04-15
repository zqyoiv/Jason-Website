#!/usr/bin/env python3
"""
Minimal local static server + short URLs (same rules as Apache .htaccess).

Uses only the Python standard library — no pip install.

  python server.py

Then open http://127.0.0.1:8765/  (set PORT=8080 etc. if you prefer)

Production (FTP / cPanel): Apache still handles .htaccess; this file is for local dev only.

Add a new project from a browser form (writes files in this repo; Python + Pillow, no Node):
  pip install -r requirements-add-project.txt
  python add_project_server.py
  Open http://127.0.0.1:5050/add-project
"""

import os
import re
import socket
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

    def server_bind(self):
        # On Windows, SO_REUSEADDR can allow a second server.py on the same port.
        # Connections then hit a random process — often one with stale RULES → 404 on short URLs.
        if sys.platform == "win32" and hasattr(socket, "SO_EXCLUSIVEADDRUSE"):
            self.socket.setsockopt(socket.SOL_SOCKET, socket.SO_EXCLUSIVEADDRUSE, 1)
        else:
            if self.allow_reuse_address and hasattr(socket, "SO_REUSEADDR"):
                self.socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        if (
            self.allow_reuse_port
            and hasattr(socket, "SO_REUSEPORT")
            and self.address_family in (socket.AF_INET, socket.AF_INET6)
        ):
            self.socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEPORT, 1)
        self.socket.bind(self.server_address)
        self.server_address = self.socket.getsockname()


def main():
    # Default 8765: on some Windows setups low ports (e.g. 8080) hit excluded ranges (WinError 10013).
    port = int(os.environ.get("PORT", "8765"))
    host = os.environ.get("HOST", "127.0.0.1")
    Handler = RewritingRequestHandler
    httpd = ReuseAddrThreadingHTTPServer((host, port), Handler)
    print("Serving", ROOT)
    print("Short URLs: http://%s:%s/  (%d rewrite rules from .htaccess)" % (host, port, len(RULES)))
    print(
        "Note: `python -m http.server` ignores .htaccess — pretty paths like /testPear/ only work here."
    )
    print(
        "If short URLs 404: stop every other `python server.py` on this port (Windows can stack two listeners)."
    )
    print("Ctrl+C to stop")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nStopped.")
        httpd.shutdown()


if __name__ == "__main__":
    main()
