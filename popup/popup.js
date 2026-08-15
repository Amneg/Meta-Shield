console.log("MetaShield popup loaded");

const selectImageBtn = document.getElementById("selectImageBtn");
const fileInput = document.getElementById("fileInput");
const dropZone = document.getElementById("dropZone");
const previewArea = document.getElementById("previewArea");
const previewImg = document.getElementById("previewImg");
const fileNameEl = document.getElementById("fileName");
const riskScoreText = document.getElementById("riskScoreText");
const findingsList = document.getElementById("findingsList");
const removeMetadataBtn = document.getElementById("removeMetadataBtn");
const themeToggleBtn = document.getElementById("themeToggleBtn");
const resetBtn = document.getElementById("resetBtn");

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
removeMetadataBtn.addEventListener("click", () => {
  if (currentFile) {
    removeMetadataAndDownload(currentFile);
  }
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