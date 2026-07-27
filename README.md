<div align="center">

# 🛡️ MetaShield

### *Share Files, Not Your Identity.*

🚧 **Status: Under Active Development** — this project is a work in progress and not yet feature-complete.

![Status](https://img.shields.io/badge/status-under%20development-yellow?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)
![JavaScript](https://img.shields.io/badge/javascript-ES6-f7df1e?style=for-the-badge&logo=javascript&logoColor=black)
![Chrome Extension](https://img.shields.io/badge/chrome-extension-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white)
![Manifest V3](https://img.shields.io/badge/manifest-v3-orange?style=for-the-badge)

</div>

---

## 📌 About the Project

**MetaShield** is a privacy-focused Chrome extension that scans images for hidden metadata (EXIF), explains the associated privacy risks in plain, human-readable language, and lets users strip sensitive metadata before sharing files online.

Every day, people unknowingly share photos that carry embedded **GPS coordinates, device information, timestamps, and camera details** — data that can reveal far more than the picture itself. MetaShield aims to close that gap by making metadata visible, understandable, and easy to remove.

> 🔒 **All processing happens 100% locally in the browser.** No image, metadata, or file is ever uploaded to a server. Your files never leave your device.

---

## 🤔 Why MetaShield?

- 📍 Photos often silently leak **GPS location** — where you live, work, or were standing when the photo was taken.
- 📷 Camera and device metadata can be used to **fingerprint or identify** the source of a file.
- 🕵️ Most users have **no idea this data exists**, let alone how to remove it.
- 🌐 Existing tools are either **too technical**, **not privacy-respecting** (cloud uploads), or **not beginner-friendly**.
- ✅ MetaShield bridges that gap with a **simple, transparent, local-first** browser tool.

---

## ✨ Features

> ⚠️ This is an MVP under active development. Some features listed below are still in progress — see [Current Development Status](#-current-development-status) for real-time progress.

| Feature | Description |
|---|---|
| 📤 Image Upload | Upload images via file picker |
| 🖱️ Drag & Drop | Drag images directly into the extension |
| 🖼️ Image Preview | Instant preview of the uploaded image |
| 🔍 EXIF Metadata Extraction | Extracts embedded metadata using `exifr` |
| 📊 Metadata Display | Human-readable table of extracted metadata |
| 🚦 Privacy Risk Score | Simple score indicating how much personal data is exposed |
| 🗣️ Plain-Language Explanations | Explains *why* each metadata field is a privacy concern |
| 🧹 Remove Metadata | Strips sensitive metadata using `piexifjs` |
| 💾 Download Cleaned Image | Download the sanitized, metadata-free image |
| 🌗 Dark / Light Mode | Toggle between themes |
| ⚙️ Settings Page | Basic configuration panel |

**📌 Current Scope (v1 / MVP):** MetaShield's first release focuses **only on image metadata**. Support for PDFs, Office documents, videos, and automatic browser upload interception is planned for future releases — see [Future Features](#-future-features).

---

## 🧭 Current Development Status

| Task | Status |
|---|---|
| Project setup & Manifest V3 boilerplate | ✅ Done |
| Image upload | 🔄 In Progress |
| Drag & drop support | 🔄 In Progress |
| Image preview | 🔄 In Progress |
| EXIF metadata extraction | 🔄 In Progress |
| Metadata display UI | 🔲 Planned |
| Privacy Risk Score engine | 🔲 Planned |
| Human-readable explanations | 🔲 Planned |
| Metadata removal | 🔲 Planned |
| Download cleaned image | 🔲 Planned |
| Dark / Light mode | 🔲 Planned |
| Settings page | 🔲 Planned |

**Legend:** ✅ Done · 🔄 In Progress · 🔲 Planned / Not Started

---

## 🖼️ Screenshots

> 📸 Screenshots will be added here as UI development progresses.

<div align="center">

| Upload Screen | Metadata View | Privacy Score |
|:---:|:---:|:---:|
| _coming soon_ | _coming soon_ | _coming soon_ |

</div>

---

## 🎬 Demo

> 🎥 A demo GIF / video walkthrough will be added here once the MVP flow is functional.

`[ demo.gif placeholder ]`

---

## 🛠️ Tech Stack

**Frontend**
- HTML5
- CSS3
- JavaScript (ES6)

**Browser Extension**
- Chrome Extension — Manifest V3

**Libraries**
- [`exifr`](https://github.com/MikeKovarik/exifr) — EXIF/metadata extraction
- [`piexifjs`](https://github.com/hMatoba/piexifjs) — EXIF metadata editing/removal

**Development Tools**
- Git & GitHub
- Visual Studio Code

---

## 📁 Project Structure

> Structure is evolving as development progresses.

```
MetaShield/
├── manifest.json          # Chrome Extension Manifest V3 config
├── popup/
│   ├── popup.html         # Extension popup UI
│   ├── popup.css
│   └── popup.js
├── scripts/
│   ├── metadata.js        # EXIF extraction & removal logic
│   └── ui.js              # UI rendering logic
├── assets/
│   └── icons/             # Extension icons
├── libs/
│   ├── exifr.min.js
│   └── piexifjs.min.js
└── README.md
```

---

## ⚙️ Installation

> ⚠️ MetaShield is not yet published on the Chrome Web Store. Install it manually in developer mode.

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/MetaShield.git

# 2. Navigate into the project folder
cd MetaShield
```

Then load it into Chrome:

1. Open `chrome://extensions/`
2. Enable **Developer mode** (top-right toggle)
3. Click **Load unpacked**
4. Select the `MetaShield` project folder

---

## 🚀 Usage

1. Click the **MetaShield** icon in your Chrome toolbar.
2. Upload an image via file picker or drag & drop.
3. View the extracted metadata and its **Privacy Risk Score**.
4. Read the plain-language explanation of what each field reveals.
5. Click **Remove Metadata** to strip sensitive data.
6. **Download** your cleaned, privacy-safe image.

---

## 🔬 How It Works

1. **Extraction** — When an image is loaded, `exifr` parses embedded EXIF metadata (GPS, device model, timestamp, etc.) entirely in-browser.
2. **Analysis** — Extracted fields are mapped against a privacy-risk ruleset to generate a **Privacy Risk Score**.
3. **Explanation** — Each risky field is translated into a simple, human-readable explanation of what it exposes and why it matters.
4. **Sanitization** — `piexifjs` strips the selected/sensitive metadata from the image.
5. **Output** — A cleaned copy of the image is generated and made available for download — the original file is never modified in place, and nothing is ever sent over the network.

---

## 📊 Privacy Score Explanation

The **Privacy Risk Score** is a simple, easy-to-understand rating that reflects how much personal information an image exposes through its metadata.

| Score Range | Risk Level | Meaning |
|---|---|---|
| 🟢 Low | Minimal metadata found | Little to no personal information exposed |
| 🟡 Medium | Some identifying metadata | Device/timestamp info present, no location |
| 🔴 High | Sensitive metadata found | GPS location and/or device identifiers present |

> The exact scoring algorithm is under active development and will be documented in detail as it's finalized.

---

## 🗺️ Roadmap

| Milestone | Status |
|---|---|
| 🧱 MVP: Image metadata scanning & removal | 🔄 In Progress |
| 🎨 UI polish + Dark/Light mode | 🔲 Planned |
| 🌐 Chrome Web Store release (v1.0) | 🔲 Planned |
| 📄 PDF metadata support | 🔲 Planned |
| 📑 Office document metadata support | 🔲 Planned |
| 🎞️ Video metadata support | 🔲 Planned |
| 🌍 Browser upload interception (auto-clean on upload) | 🔲 Planned |

---

## 🔮 Future Features

- 📄 **PDF metadata scanning & removal** *(Coming Soon)*
- 📑 **Office document (Word/Excel/PowerPoint) metadata support** *(Coming Soon)*
- 🎞️ **Video file metadata support** *(Coming Soon)*
- 🌐 **Automatic browser upload interception** — clean files before they're uploaded to any website *(Coming Soon)*
- 🔔 **Real-time privacy warnings** while browsing *(Planned)*
- 🧩 **Firefox / Edge support** *(Planned)*

---

## 🧗 Challenges & Learning Goals

This project is also a personal learning journey. Key goals include:

- 🧠 Deepening understanding of **Manifest V3** architecture and its constraints (service workers, permissions, CSP).
- 🔐 Building genuinely **privacy-first** tools — no telemetry, no external calls.
- 📷 Working hands-on with **binary file parsing** (EXIF structures) in JavaScript.
- 🎨 Designing a **clear, non-technical UX** for a technical/security topic.
- 🧪 Learning to structure and document an **open-source cybersecurity project** properly from the ground up.

---

## 🤝 Contributing

Contributions, ideas, and feedback are welcome — even though the project is still early-stage!

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m "Add: your feature"`)
4. Push to your branch (`git push origin feature/your-feature`)
5. Open a Pull Request

> 💡 Since MetaShield is under active development, please open an issue first for major changes so we can discuss direction before you invest time in a PR.

---

## 📜 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**AMNEG**


## ⭐ Support the Project

If you find this project interesting or useful:

- ⭐ **Star this repository** to show your support
- 🐛 **Report bugs** or suggest features via [Issues](../../issues)
- 🔁 **Share it** with others who care about digital privacy
- 🤝 **Contribute** — every bit of help is appreciated

<div align="center">

### 🛡️ MetaShield — *Share Files, Not Your Identity.*

</div>
