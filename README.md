## Development Roadmap

**Phase 1:**
- [x] Chrome extension setup
- [x] Basic popup
- [x] Image selection

**Phase 2:**
- [x] EXIF metadata extraction
- [x] Metadata display
- [x] Privacy score

**Phase 3:**
- [x] Risk explanations
- [x] Metadata removal
- [x] Clean image download

**Phase 4:**
- [x] Dark/light mode
- [ ] Privacy report
- [x] UI polish (reset button, theming)

**Future:**
- [ ] PDF support
- [ ] DOCX support
- [ ] Batch processing
- [ ] GPS map visualization
- [ ] Automatic upload detection
- [ ] More file formats

## Known Limitations

- The extension popup may close if you open the native file picker without DevTools attached, on some systems. This is a known Chrome/Chromium behavior with extension popups, not a bug in MetaShield itself.
- Metadata removal works by redrawing the image on a canvas and re-exporting it — this reliably strips all metadata, but slightly re-compresses JPEGs (quality is set high, but it's not a byte-for-byte lossless strip).
- The Privacy Risk Score is a simple, project-specific heuristic for educational purposes — it is not a scientifically validated privacy metric.
- Currently supports JPEG and PNG images only.

Project status: 🚧 Under Development — Core MVP (image scan → risk score → metadata removal) is functional.