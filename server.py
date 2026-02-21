#!/usr/bin/env python3
"""
Simple HTTP server for Jason Krugman Studio website.
Pretty URLs are read from url-mapping.json; requests like /quantumFace
serve the corresponding html/project/... file.
"""

import http.server
import socketserver
import os
import sys
import json

PORT = 8080

# Load pretty URL → file path mapping (relative to project root)
def _load_url_mapping():
    path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "url-mapping.json")
    try:
        with open(path, "r", encoding="utf-8") as f:
            data = json.load(f)
        return data.get("project", {})
    except (FileNotFoundError, json.JSONDecodeError) as e:
        sys.stderr.write(f"Warning: could not load url-mapping.json: {e}\n")
        return {}

URL_MAPPING = _load_url_mapping()

# Main pages: pretty path → file path
PAGE_REWRITES = {
    "/": "html/index.html",
    "/works": "html/index.html",
    "/about": "html/about.html",
    "/project": "html/project.html",
}


class CustomHandler(http.server.SimpleHTTPRequestHandler):
    """Custom handler to serve files from the correct directory."""

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=os.path.dirname(os.path.abspath(__file__)), **kwargs)

    def do_GET(self):
        raw = self.path.split("?")[0]
        path = raw.rstrip("/") or "/"

        # Main pages
        if path in PAGE_REWRITES:
            self.path = "/" + PAGE_REWRITES[path]
            super().do_GET()
            return

        # Project pretty URLs from url-mapping.json (e.g. /quantumFace or /jeju/pingpong)
        slug = path.lstrip("/")
        if slug and slug in URL_MAPPING:
            self.path = "/" + URL_MAPPING[slug]
            super().do_GET()
            return

        super().do_GET()
    
    def end_headers(self):
        # Disable caching during development
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        # Add CORS headers for development
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

def main():
    with socketserver.TCPServer(("", PORT), CustomHandler) as httpd:
        print(f"Serving Jason Krugman Studio website at http://localhost:{PORT}")
        print("Press Ctrl+C to stop the server")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")
            sys.exit(0)

if __name__ == "__main__":
    main()
