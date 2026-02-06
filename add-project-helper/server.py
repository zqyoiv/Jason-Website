"""
Add-Project Helper – small web app to add a new project to project.js.
Run from the add-project-helper folder: python server.py
Then open http://localhost:5000
"""
import json
import os
import re

# Try Flask; fall back to stdlib-only server (no /api/add-project)
try:
    from flask import Flask, request, send_from_directory, jsonify
    HAS_FLASK = True
except ImportError:
    HAS_FLASK = False

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(SCRIPT_DIR)
PROJECT_JS_PATH = os.path.join(PROJECT_ROOT, "js", "project.js")


def js_str(s):
    """Escape and wrap in single quotes for JS."""
    if s is None:
        return "''"
    s = str(s).replace("\\", "\\\\").replace("'", "\\'").replace("\n", "\\n").replace("\r", "")
    return "'" + s + "'"


def block_to_js(block):
    """Convert a block dict to JavaScript object source."""
    t = block.get("type")
    if t == "full-image":
        return "      { type: 'full-image', src: %s, alt: %s }" % (
            js_str(block.get("src", "")),
            js_str(block.get("alt", "")),
        )
    if t == "full-video":
        out = "      { type: 'full-video', src: %s" % js_str(block.get("src", ""))
        if block.get("caption"):
            out += ", caption: %s" % js_str(block["caption"])
        out += " }"
        return out
    if t == "two-column-image":
        left = block.get("left", {})
        right = block.get("right", {})
        return """      { type: 'two-column-image', left: { src: %s, alt: %s }, right: { src: %s, alt: %s } }""" % (
            js_str(left.get("src", "")),
            js_str(left.get("alt", "")),
            js_str(right.get("src", "")),
            js_str(right.get("alt", "")),
        )
    if t == "five-column-image":
        return "      { type: 'five-column-image', src: %s, alt: %s }" % (
            js_str(block.get("src", "")),
            js_str(block.get("alt", "")),
        )
    if t == "full-text":
        desc = block.get("description", [])
        lines = ["      { type: 'full-text', description: ["]
        for item in desc:
            tag = item.get("tag", "p")
            content = item.get("content", "")
            if isinstance(content, list):
                content = " ".join(content)
            content = (content or "").strip()
            # Split into array items: by newline, or by sentence (period + space + capital)
            if "\n" in content:
                parts = [p.strip() for p in content.split("\n") if p.strip()]
            else:
                parts = re.split(r"\.\s+(?=[A-Z])", content)
                parts = [(p.strip() + ("." if p.strip() and not p.strip().endswith(".") else "")).strip() for p in parts if p.strip()]
            if not parts:
                parts = [content] if content else [""]
            lines.append("        {")
            lines.append("          tag: %s," % js_str(tag))
            lines.append("          content: [")
            for p in parts:
                lines.append("            %s," % js_str(p))
            lines.append("          ].join(' ')")
            lines.append("        },")
        lines.append("      ] }")
        return "\n".join(lines)
    if t == "project-content":
        desc = block.get("description", [])
        details = block.get("details", [])
        lines = ["      { type: 'project-content', description: ["]
        for item in desc:
            tag = item.get("tag", "p")
            content = item.get("content", "")
            if isinstance(content, list):
                content = " ".join(content)
            lines.append("        { tag: %s, content: %s }," % (js_str(tag), js_str(content)))
        lines.append("      ], details: [")
        for d in details:
            lines.append("        { label: %s, value: %s }," % (js_str(d.get("label", "")), js_str(d.get("value", ""))))
        lines.append("      ] }")
        return "\n".join(lines)
    return "      {}"


def project_to_js(project_id, title, blocks):
    """Generate the JS object source for one project entry."""
    lines = [
        "  '%s': {" % project_id.replace("'", "\\'"),
        "    title: %s," % js_str(title),
        "    blocks: [",
    ]
    for i, b in enumerate(blocks):
        block_str = block_to_js(b)
        is_last = i == len(blocks) - 1
        if not is_last:
            block_str = block_str.rstrip() + ","
        lines.append(block_str)
    lines.append("    ]")
    lines.append("  }")
    return "\n".join(lines)


def add_project_to_file(project_id, title, blocks):
    """Insert new project into PROJECTS in project.js. Returns (success, message)."""
    if not os.path.isfile(PROJECT_JS_PATH):
        return False, "project.js not found at %s" % PROJECT_JS_PATH

    with open(PROJECT_JS_PATH, "r", encoding="utf-8") as f:
        content = f.read()

    # Find the closing "};" of the PROJECTS object (before "function getProjectId")
    idx = content.find("function getProjectId")
    if idx == -1:
        return False, "Could not find 'function getProjectId' in project.js"

    before = content[:idx]
    # Last "};" before function is the end of PROJECTS
    last_close = before.rfind("};")
    if last_close == -1:
        return False, "Could not find end of PROJECTS object"

    head = before[:last_close].rstrip()
    tail = content[last_close:]  # "};" + rest of file
    # Ensure previous project ends with comma
    if head.endswith("  }"):
        head = head[:-3] + "  },"
    elif head.endswith("}"):
        head = head + ","

    new_project = project_to_js(project_id, title, blocks)
    new_content = head + "\n" + new_project + "\n};" + tail[2:]

    with open(PROJECT_JS_PATH, "w", encoding="utf-8") as f:
        f.write(new_content)
    return True, "Updated %s" % PROJECT_JS_PATH


if HAS_FLASK:
    app = Flask(__name__, static_folder=SCRIPT_DIR)

    @app.route("/")
    def index():
        return send_from_directory(SCRIPT_DIR, "index.html")

    @app.route("/api/add-project", methods=["POST"])
    def api_add_project():
        try:
            data = request.get_json(force=True)
            project_id = (data.get("projectId") or "").strip()
            title = (data.get("title") or "").strip()
            blocks = data.get("blocks") or []
            if not project_id or not title:
                return jsonify({"error": "projectId and title are required"}), 400
            ok, msg = add_project_to_file(project_id, title, blocks)
            if ok:
                return jsonify({"ok": True, "path": msg})
            return jsonify({"error": msg}), 400
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    def main():
        print("Add-Project Helper at http://localhost:5000")
        print("project.js path:", PROJECT_JS_PATH)
        app.run(port=5000, debug=False)

else:
    def main():
        print("Install Flask to enable the helper: pip install flask")
        print("Then run: python server.py")
        print("project.js path:", PROJECT_JS_PATH)


if __name__ == "__main__":
    main()
