// Reads EXIF metadata from an image file using the exifr library.
// Returns a plain object of metadata tags, or an empty object if none found.
async function extractMetadata(file) {
  try {
    const tags = await exifr.parse(file);
    return tags || {};
  } catch (error) {
    console.warn("Could not read metadata:", error);
    return {};
  }
}