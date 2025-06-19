import { openOptionsPage } from "./utils/ext";
import { initializeStorage } from "./utils/storage";

console.log("Background script running");
chrome.action.onClicked.addListener(() => {
  console.log("Action button clicked");
  openOptionsPage();
});
chrome.runtime.onInstalled.addListener(({ reason }) => {
  const openUrl = "https://ikepu-tp.com/jstagepdfrenamer-update-v1-1-0/";
  if (["update", "install", "chrome_update"].includes(reason)) {
    chrome.tabs.create({ url: openUrl });
    openOptionsPage();
    initializeStorage();
  }
});
