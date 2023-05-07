let transcribing = false;

chrome.runtime.onInstalled.addListener(() => {
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'startTranscription') {
      transcribing = true;
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'startTranscription' }, response => {
          if (response) {
            sendResponse({ success: true });
          } else {
            sendResponse({ success: false });
          }
        });
      });
    } else if (request.action === 'stopTranscription') {
      transcribing = false;
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'stopTranscription' }, response => {
          if (response) {
            sendResponse({ success: true });
          } else {
            sendResponse({ success: false });
          }
        });
      });
    } else if (request.action === 'getTranscriptionStatus') {
      sendResponse({ transcribing });
    } else if (request.action === 'viewFullTranscript') {
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'viewFullTranscript' }, response => {
          if (response) {
            sendResponse({ success: true });
          } else {
            sendResponse({ success: false });
          }
        });
      });
    } else if (request.action === 'shareContent') {
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'shareContent' }, response => {
          if (response) {
            sendResponse({ success: true });
          } else {
            sendResponse({ success: false });
          }
        });
      });
    }
    return true;
  });
});