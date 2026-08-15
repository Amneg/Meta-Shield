// Removes metadata by redrawing the image onto a canvas and re-exporting it.
// Returns the clean Blob so the caller can also verify/display its metadata.
async function removeMetadataAndDownload(file) {
  try {
    const imageBitmap = await createImageBitmap(file);

    const canvas = document.createElement("canvas");
    canvas.width = imageBitmap.width;
    canvas.height = imageBitmap.height;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(imageBitmap, 0, 0);

    const outputType = file.type === "image/png" ? "image/png" : "image/jpeg";

    const blob = await new Promise((resolve) => {
      canvas.toBlob(resolve, outputType, 0.95);
    });

    if (!blob) {
      alert("Sorry, this file couldn't be cleaned.");
      return null;
    }

    const cleanFilename = "clean_" + file.name;
    downloadBlob(blob, cleanFilename);

    return { blob, filename: cleanFilename };
  } catch (error) {
    console.error("Failed to remove metadata:", error);
    alert("Sorry, this file couldn't be cleaned. It may be corrupted or in an unsupported format.");
    return null;
  }
}

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