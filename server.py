#!/usr/bin/env python3
"""
Simple HTTP server for Jason Krugman Studio website.
Run this script and open http://localhost:8000 in your browser.
"""

import http.server
import socketserver
import os
import sys

PORT = 8080

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    """Custom handler to serve files from the correct directory."""
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=os.path.dirname(os.path.abspath(__file__)), **kwargs)
    
    def do_GET(self):
        # Redirect root to main site
        if self.path in ('/', ''):
            self.send_response(302)
            self.send_header('Location', '/html/index.html')
            self.end_headers()
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
