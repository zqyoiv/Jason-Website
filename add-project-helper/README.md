# Add Project Helper

Simple web app to add a new project via a form. You can choose to add the project to:

- **General** – `../js/general-project-data.js`
- **Commission** – `../js/commision-project-data.js`
- **Residential** – `../js/residential-project-data.js`

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

1. **Add project to** – Choose General, Commission, or Residential (which data file to update).
2. **Project ID** – URL slug (e.g. `my-new-project`). Used in `/html/project.html?project=my-new-project`.
3. **Title** – Display title (e.g. `MY NEW PROJECT`).
4. **Image folder path** – Base path for image blocks (e.g. `/images/page/my-new-project/`). Trailing slash recommended.
5. **Blocks** – Add blocks in order:
   - **Full image** – Image path (filename or full path), alt text.
   - **Full video** – Video URL, optional caption.
   - **Two column image** – Left and right image paths and alt text.
   - **Text (col 1 + col 2)** – Column 1: one paragraph per line; start a line with `## ` for a heading. Column 2: one detail per line as `Label: Value` (e.g. `Artwork Title: My Work`).

Click **Add block** for each block, then **Submit – update selected file**. The script appends the new project to the chosen data file.

## Note

Run the server from the **add-project-helper** folder so `../js/` points to the site’s `js/` folder (all three data files live there).
