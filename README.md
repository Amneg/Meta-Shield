# 🛡️ MetaShield

### Share Files, Not Your Identity.

🚧 **Status: Under Development** — Core MVP is functional.

A privacy-focused Chrome extension that scans images for hidden EXIF metadata, explains the privacy risk in plain language, and removes it before you share the file — entirely in your browser.

> 🔒 All processing happens 100% locally. No image, metadata, or file is ever uploaded to a server.

---

## About

Photos often carry hidden metadata — GPS coordinates, camera model, timestamps, even device serial numbers — that reveal far more than the picture itself. MetaShield makes that metadata visible, explains what it exposes, and lets you strip it before sharing.

---

## Features

- 📤 Image selection via file picker or drag & drop
- 🖼️ Live image preview
- 🔍 EXIF metadata extraction (via `exifr`)
- 🚦 Privacy Risk Score (0–100, with 🟢🟡🟠🔴 risk levels)
- 🗣️ Plain-language explanation for each risky field
- 📍 **Exact location display** — shows GPS coordinates and a direct Google Maps link when found
- 📋 **Full metadata viewer** — expandable list of every extracted field, not just the risky ones, with cleaned-up formatting (readable dates, rounded numbers, formatted coordinates)
- 🧹 One-click metadata removal (canvas re-encoding)
- ✅ **Post-clean verification** — shows the cleaned file's metadata so you can confirm it's actually gone
- 💾 Download the cleaned image — original is never overwritten
- 🌗 Dark / light mode
- 🔁 "New Image" reset

**Current scope:** JPEG and PNG images only. PDFs, Office docs, video, and batch processing are future work — see [Roadmap](#roadmap).

---

## How It Works

```
Select image → Extract EXIF metadata → Calculate risk score
→ Display metadata, location, and explanations → Remove metadata (canvas re-encode)
→ Verify cleaned file → Download clean image
```

The image is redrawn onto an HTML `<canvas>` and re-exported — this naturally strips all metadata as a side effect, without needing to parse EXIF's binary format directly.

---

## Privacy Score

> A simple, project-specific heuristic for education — **not** a scientifically validated privacy metric.

| Score | Level |
|:---:|---|
| 🟢 0 | Safe |
| 🟡 1–39 | Low Risk |
| 🟠 40–69 | Medium Risk |
| 🔴 70–100 | High Risk |

Points: GPS +40 · Timestamp +15 · Serial Number +15 · Camera Model +10 · Manufacturer +10 · Software +10 (capped at 100).

---

## Tech Stack

HTML5, CSS3, JavaScript (ES6), Chrome Extension Manifest V3, [`exifr`](https://github.com/MikeKovarik/exifr).

No frameworks, no backend — everything runs client-side. The UI opens as a standalone extension window (via `chrome.windows.create`) rather than the standard toolbar dropdown, since the dropdown can close prematurely when the native file picker opens.

---

## Project Structure

```
MetaShield/
├── manifest.json
├── background.js        → opens the standalone UI window
├── popup/
│   ├── popup.html
│   ├── popup.css
│   └── popup.js
├── js/
│   ├── metadata.js
│   ├── riskEngine.js
│   └── cleaner.js
├── lib/
│   └── exifr.js
├── assets/icons/
├── README.md
├── LICENSE
└── .gitignore
```

---

## Installation

```bash
git clone https://github.com/Amneg/Meta-Shield.git
cd Meta-Shield
```

1. Open `chrome://extensions/`
2. Enable **Developer mode**
3. Click **Load unpacked**
4. Select the `MetaShield` folder

---

## Usage

1. Click the MetaShield icon in your toolbar
2. Select an image (file picker or drag & drop)
3. Review the metadata found, your Privacy Risk Score, and exact location (if present)
4. Optionally click **Show All Extracted Data** to see every field
5. Click **Remove Metadata**
6. Confirm the cleaned file's metadata and download it
7. Click **New Image** to scan another

---

## Known Limitations

- Popup closing on the native file picker (without DevTools) is a known Chrome/Chromium limitation. MetaShield works around this by opening as a standalone window instead of a toolbar dropdown.
- Metadata removal re-encodes the image, which slightly re-compresses JPEGs (quality set high, but not byte-for-byte lossless).
- Supports JPEG and PNG only.

---

## Roadmap

**Phase 1–3 (done):** Extension setup, image selection, EXIF extraction, metadata display, privacy scoring, risk explanations, metadata removal, clean download.

**Phase 4:**
- [x] Dark/light mode
- [x] UI polish (reset button, redesigned cards/layout)
- [x] Full metadata viewer
- [x] Exact location display
- [ ] Privacy report export

**Future:** PDF/DOCX support, batch processing, remembering theme preference, extension icons, more file formats.

---

## Contributing

Fork the repo, create a branch, and open a PR. Please open an issue first for major changes.

---

## License

MIT — see [LICENSE](LICENSE).

---

**AMNEG** · 🛡️ MetaShield — *Share Files, Not Your Identity.*
