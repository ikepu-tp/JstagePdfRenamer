console.log("Background script running");
chrome.action.onClicked.addListener(() => {
  console.log("Action button clicked");
  // Open the options page when the action button is clicked
  chrome.runtime.openOptionsPage();
});
chrome.runtime.onInstalled.addListener(({ reason }) => {
  const openUrl = "https://ikepu-tp.com/jstagepdfrenamer/";
  if (["update", "install", "chrome_update"].includes(reason)) {
    chrome.tabs.create({ url: openUrl });
  }
});
