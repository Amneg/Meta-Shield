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
- 🧹 One-click metadata removal (canvas re-encoding)
- 💾 Download the cleaned image — original is never overwritten
- 🌗 Dark / light mode
- 🔁 "Select Another Image" reset

**Current scope:** JPEG and PNG images only. PDFs, Office docs, video, and batch processing are future work — see [Roadmap](#roadmap).

---

## How It Works

```
Select image → Extract EXIF metadata → Calculate risk score
→ Display metadata + explanations → Remove metadata (canvas re-encode)
→ Download clean image
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

No frameworks, no backend — everything runs client-side in the extension popup.

---

## Project Structure

```
MetaShield/
├── manifest.json
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
3. Review the metadata found and your Privacy Risk Score
4. Click **Remove Metadata**
5. Download the cleaned image
6. Click **Select Another Image** to scan another

---

## Known Limitations

- The popup may close if the native file picker opens without DevTools attached, on some systems — a known Chrome/Chromium behavior, not a MetaShield bug.
- Metadata removal re-encodes the image, which slightly re-compresses JPEGs (quality set high, but not byte-for-byte lossless).
- Supports JPEG and PNG only.

---

## Roadmap

**Phase 1–3 (done):** Extension setup, image selection, EXIF extraction, metadata display, privacy scoring, risk explanations, metadata removal, clean download.

**Phase 4:**
- [x] Dark/light mode
- [x] UI polish (reset button)
- [ ] Privacy report

**Future:** PDF/DOCX support, batch processing, GPS map view, upload interception, more file formats.

---

## Contributing

Fork the repo, create a branch, and open a PR. Please open an issue first for major changes.

---

## License

MIT — see [LICENSE](LICENSE).

---

**AMNEG** · 🛡️ MetaShield — *Share Files, Not Your Identity.*
