// Removes metadata by redrawing the image onto a canvas and re-exporting it.
// Canvas re-encoding naturally drops all EXIF/metadata as a side effect,
// since the canvas only ever stores raw pixel data.
async function removeMetadataAndDownload(file) {
  try {
    const imageBitmap = await createImageBitmap(file);

    const canvas = document.createElement("canvas");
    canvas.width = imageBitmap.width;
    canvas.height = imageBitmap.height;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(imageBitmap, 0, 0);

    const outputType = file.type === "image/png" ? "image/png" : "image/jpeg";

    canvas.toBlob(
      (blob) => {
        if (!blob) {
          alert("Sorry, this file couldn't be cleaned.");
          return;
        }
        downloadBlob(blob, "clean_" + file.name);
      },
      outputType,
      0.95 // JPEG quality (ignored for PNG)
    );
  } catch (error) {
    console.error("Failed to remove metadata:", error);
    alert("Sorry, this file couldn't be cleaned. It may be corrupted or in an unsupported format.");
  }
}

// Triggers a browser download of a Blob as a file.
function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}