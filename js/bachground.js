let transcribing = false;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'startTranscription') {
    transcribing = true;
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'startTranscription' });
    });
    sendResponse({ success: true });
  } else if (request.action === 'stopTranscription') {
    transcribing = false;
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'stopTranscription' });
    });
    sendResponse({ success: true });
  } else if (request.action === 'getTranscriptionStatus') {
    sendResponse({ transcribing });
  } else if (request.action === 'viewFullTranscript') {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'viewFullTranscript' });
    });
  } else if (request.action === 'shareContent') {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'shareContent' });
    });
  }
  return true;
});
