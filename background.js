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
      width: 420,
      height: 700,
    },
    (win) => {
      metashieldWindowId = win.id;
    }
  );
}