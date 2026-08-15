// Opens MetaShield's UI in a small standalone window (not a toolbar
// dropdown popup, and not a browser tab). This avoids two problems:
// - Toolbar popups can close when the native file picker steals focus.
// - We don't want a full browser tab per your preference.
// Reuses the existing window if one is already open.

let metashieldWindowId = null;

chrome.action.onClicked.addListener(() => {
  const url = chrome.runtime.getURL("popup/popup.html");

  if (metashieldWindowId !== null) {
    chrome.windows.get(metashieldWindowId, (win) => {
      if (chrome.runtime.lastError || !win) {
        createMetashieldWindow(url);
      } else {
        chrome.windows.update(metashieldWindowId, { focused: true });
      }
    });
  } else {
    createMetashieldWindow(url);
  }
});

function createMetashieldWindow(url) {
  chrome.windows.create(
    {
      url: url,
      type: "popup",
      width: 340,
      height: 560,
    },
    (win) => {
      metashieldWindowId = win.id;
    }
  );
}