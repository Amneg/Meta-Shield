// Calculates a simple, educational privacy risk score from EXIF metadata.
// This is a project-specific heuristic, NOT a scientifically validated metric.
function calculateRiskScore(metadata) {
  let score = 0;
  const findings = [];

  if (metadata.GPSLatitude !== undefined || metadata.latitude !== undefined) {
    score += 40;
    findings.push({
      label: "📍 GPS Location",
      risk: "high",
      reason: "Reveals the exact place the photo was taken."
    });
  }

  if (metadata.DateTimeOriginal || metadata.CreateDate) {
    score += 15;
    findings.push({
      label: "🕒 Timestamp",
      risk: "medium",
      reason: "Reveals when the photo was taken, which can help build a timeline of your activity."
    });
  }

  if (metadata.Model) {
    score += 10;
    findings.push({
      label: "📷 Camera Model",
      risk: "low",
      reason: `Identifies the device used: ${metadata.Model}.`
    });
  }

  if (metadata.Make) {
    score += 10;
    findings.push({
      label: "🏭 Camera Manufacturer",
      risk: "low",
      reason: `Identifies the manufacturer: ${metadata.Make}.`
    });
  }

  if (metadata.Software) {
    score += 10;
    findings.push({
      label: "🖥 Software",
      risk: "low",
      reason: `Reveals the software/OS version used: ${metadata.Software}.`
    });
  }

  if (metadata.SerialNumber) {
    score += 15;
    findings.push({
      label: "🔢 Serial Number",
      risk: "medium",
      reason: "A unique device identifier that could link photos to a specific device."
    });
  }

  score = Math.min(score, 100);

  return { score, findings };
}

function getRiskLevel(score) {
  if (score === 0) return { label: "Safe", emoji: "🟢" };
  if (score < 40) return { label: "Low Risk", emoji: "🟡" };
  if (score < 70) return { label: "Medium Risk", emoji: "🟠" };
  return { label: "High Risk", emoji: "🔴" };
}