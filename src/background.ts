console.log("Background script running");
chrome.action.onClicked.addListener(() => {
  console.log("Action button clicked");
  // Open the options page when the action button is clicked
  chrome.runtime.openOptionsPage();
});
