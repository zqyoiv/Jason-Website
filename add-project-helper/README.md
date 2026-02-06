# Add Project Helper

Simple web app to add a new project to `../js/general-project-data.js` via a form.

## Setup

From this folder:

```bash
pip install -r requirements.txt
```

## Run

From this folder:

```bash
python server.py
```

Then open **http://localhost:5000** in your browser.

## Use

1. **Project ID** – URL slug (e.g. `my-new-project`). Used in `/html/project.html?project=my-new-project`.
2. **Title** – Display title (e.g. `MY NEW PROJECT`).
3. **Image folder path** – Base path for image blocks (e.g. `/images/page/my-new-project/`). Trailing slash recommended.
4. **Blocks** – Add blocks in order:
   - **Full image** – Image path (filename or full path), alt text.
   - **Full video** – Video URL, optional caption.
   - **Two column image** – Left and right image paths and alt text.
   - **Text (col 1 + col 2)** – Column 1: one paragraph per line; start a line with `## ` for a heading. Column 2: one detail per line as `Label: Value` (e.g. `Artwork Title: My Work`).

Click **Add block** for each block, then **Submit – update general-project-data.js**. The script appends the new project to `PROJECTS` in `../js/general-project-data.js`.

## Note

Run the server from the **add-project-helper** folder so `../js/general-project-data.js` points to the site’s `js/general-project-data.js`.
