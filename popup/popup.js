console.log("MetaShield popup loaded");

const fileInput = document.getElementById("fileInput");
const dropZone = document.getElementById("dropZone");
const previewArea = document.getElementById("previewArea");
const previewImg = document.getElementById("previewImg");
const fileNameEl = document.getElementById("fileName");
const riskScoreText = document.getElementById("riskScoreText");
const findingsList = document.getElementById("findingsList");
const locationArea = document.getElementById("locationArea");
const removeMetadataBtn = document.getElementById("removeMetadataBtn");
const themeToggleBtn = document.getElementById("themeToggleBtn");
const resetBtn = document.getElementById("resetBtn");
const toggleRawDataBtn = document.getElementById("toggleRawDataBtn");
const rawDataArea = document.getElementById("rawDataArea");
const cleanResultArea = document.getElementById("cleanResultArea");
const cleanDataArea = document.getElementById("cleanDataArea");

let currentFile = null;

// When a file is picked via the file dialog
fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  if (file) handleImageFile(file);
});

// Drag & drop support
dropZone.addEventListener("dragover", (event) => {
  event.preventDefault();
  dropZone.classList.add("dragover");
});

dropZone.addEventListener("dragleave", () => {
  dropZone.classList.remove("dragover");
});

dropZone.addEventListener("drop", (event) => {
  event.preventDefault();
  dropZone.classList.remove("dragover");

  const file = event.dataTransfer.files[0];
  if (file) handleImageFile(file);
});

// Remove Metadata button
removeMetadataBtn.addEventListener("click", async () => {
  if (!currentFile) return;

  const result = await removeMetadataAndDownload(currentFile);
  if (!result) return;

  const cleanFile = new File([result.blob], result.filename, { type: result.blob.type });
  const cleanMetadata = await extractMetadata(cleanFile);

  cleanDataArea.innerHTML = "";
  const keys = Object.keys(cleanMetadata);
  if (keys.length === 0) {
    cleanDataArea.innerHTML = "<p>No metadata found — file is clean. 🎉</p>";
  } else {
    keys.sort().forEach((key) => {
      const value = formatMetadataValue(key, cleanMetadata[key]);
      const div = document.createElement("div");
      div.className = "rawField";
      div.innerHTML = `<strong>${key}:</strong> ${value}`;
      cleanDataArea.appendChild(div);
    });
  }

  cleanResultArea.hidden = false;
});

// Show/hide full extracted metadata
toggleRawDataBtn.addEventListener("click", () => {
  const isHidden = rawDataArea.hidden;
  rawDataArea.hidden = !isHidden;
  toggleRawDataBtn.textContent = isHidden ? "Hide All Extracted Data" : "Show All Extracted Data";
});

// Select Another Image (reset)
resetBtn.addEventListener("click", () => {
  currentFile = null;
  fileInput.value = "";
  previewArea.hidden = true;
  previewImg.src = "";
  fileNameEl.textContent = "";
  riskScoreText.textContent = "";
  findingsList.innerHTML = "";
  locationArea.hidden = true;
  locationArea.innerHTML = "";
  rawDataArea.innerHTML = "";
  rawDataArea.hidden = true;
  toggleRawDataBtn.textContent = "Show All Extracted Data";
  cleanResultArea.hidden = true;
  cleanDataArea.innerHTML = "";
});

// Light/dark mode toggle
themeToggleBtn.addEventListener("click", () => {
  const isDark = document.body.getAttribute("data-theme") === "dark";
  if (isDark) {
    document.body.removeAttribute("data-theme");
    themeToggleBtn.textContent = "🌙 Dark Mode";
  } else {
    document.body.setAttribute("data-theme", "dark");
    themeToggleBtn.textContent = "☀️ Light Mode";
  }
});

// Shared logic for both file-picker and drag & drop
async function handleImageFile(file) {
  if (!file.type.startsWith("image/")) {
    alert("Please select a valid image file.");
    return;
  }

  currentFile = file;

  console.log("Image selected:", file.name, file.type, file.size + " bytes");

  const objectUrl = URL.createObjectURL(file);
  previewImg.src = objectUrl;
  fileNameEl.textContent = file.name;
  previewArea.hidden = false;

  const metadata = await extractMetadata(file);
  console.log("Extracted metadata:", metadata);
  renderRawMetadata(metadata);
  renderLocation(metadata);

  const { score, findings } = calculateRiskScore(metadata);
  const level = getRiskLevel(score);

  riskScoreText.textContent = `Privacy Score: ${score} / 100 — ${level.emoji} ${level.label}`;

  findingsList.innerHTML = "";
  if (findings.length === 0) {
    findingsList.innerHTML = "<p>No risky metadata found. 🎉</p>";
  } else {
    findings.forEach((finding) => {
      const div = document.createElement("div");
      div.className = "finding";
      div.innerHTML = `
        ${finding.label}
        <span class="risk-tag risk-${finding.risk}">${finding.risk.toUpperCase()}</span>
        <br />
        <small>${finding.reason}</small>
      `;
      findingsList.appendChild(div);
    });
  }
}

// Displays exact GPS coordinates found in the metadata, with a map link.
function renderLocation(metadata) {
  const lat = metadata.latitude;
  const lon = metadata.longitude;

  if (lat === undefined || lon === undefined) {
    locationArea.hidden = true;
    locationArea.innerHTML = "";
    return;
  }

  const roundedLat = roundNumber(lat);
  const roundedLon = roundNumber(lon);
  const mapsUrl = `https://www.google.com/maps?q=${lat},${lon}`;

  locationArea.innerHTML = `
    📍 <strong>Exact location found:</strong><br/>
    Latitude: ${roundedLat}, Longitude: ${roundedLon}<br/>
    <a href="${mapsUrl}" target="_blank" rel="noopener noreferrer">View on Google Maps →</a>
  `;
  locationArea.hidden = false;
}

// Renders every extracted metadata field, not just the risky ones.
function renderRawMetadata(metadata) {
  rawDataArea.innerHTML = "";

  const keys = Object.keys(metadata);
  if (keys.length === 0) {
    rawDataArea.innerHTML = "<p>No metadata fields found.</p>";
    return;
  }

  keys.sort().forEach((key) => {
    const value = formatMetadataValue(key, metadata[key]);
    const div = document.createElement("div");
    div.className = "rawField";
    div.innerHTML = `<strong>${key}:</strong> ${value}`;
    rawDataArea.appendChild(div);
  });
}

// Converts raw EXIF values into clean, human-readable text.
function formatMetadataValue(key, value) {
  if (value === null || value === undefined) return "N/A";

  if (value instanceof Date) {
    return value.toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  }

  if (ArrayBuffer.isView(value)) {
    return "N/A";
  }

  if (Array.isArray(value) && key.includes("GPS") && key.match(/Latitude|Longitude/)) {
    const [deg, min, sec] = value;
    return `${deg}° ${min}' ${sec.toFixed(1)}"`;
  }

  if (Array.isArray(value)) {
    return value.map((v) => (typeof v === "number" ? roundNumber(v) : v)).join(", ");
  }

  if (typeof value === "number") {
    return roundNumber(value);
  }

  if (typeof value === "object") {
    return "N/A";
  }

  return String(value);
}

function roundNumber(num) {
  return Math.round(num * 100) / 100;
}