/**
 * Summarize+ Chrome Extension
 * Author: Jamila Nchare 
 * Date: October 2025
 * Description: Summarizes and translates highlighted text using Chrome's built-in AI (Gemini Nano).
 */

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "summarizeAndTranslate",
    title: "Summarize Highlighted Text",
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "summarizeAndTranslate" && info.selectionText) {
    const highlightedText = info.selectionText.trim();

    // Save selected text
    chrome.storage.local.set({ textToSummarize: highlightedText }, () => {
      console.log("Highlighted text saved for popup:", highlightedText);
    });

    // Create small popup window 
    chrome.windows.create({
      url: "popup.html",
      type: "popup",
      width: 250, 
      height: 330, 
      left: 200,
      top: 100, 
      focused: true,
    });

  }
});
