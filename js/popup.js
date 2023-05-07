document.addEventListener('DOMContentLoaded', () => {
  const startTranscriptionBtn = document.getElementById('startTranscription');
  const stopTranscriptionBtn = document.getElementById('stopTranscription');
  const viewFullTranscriptBtn = document.getElementById('viewFullTranscript');
  const shareContentBtn = document.getElementById('shareContent');

  startTranscriptionBtn.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'startTranscription' }, response => {
      if (response && response.success) {
        startTranscriptionBtn.disabled = true;
        stopTranscriptionBtn.disabled = false;
      } else {
        console.log(chrome.runtime.lastError);
      }
    });
  });

  stopTranscriptionBtn.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'stopTranscription' }, response => {
      if (response && response.success) {
        startTranscriptionBtn.disabled = false;
        stopTranscriptionBtn.disabled = true;
      } else {
        console.log(chrome.runtime.lastError);
      }
    });
  });

  viewFullTranscriptBtn.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'viewFullTranscript' }, response => {
      if (!response || !response.success) {
        console.log(chrome.runtime.lastError);
      }
    });
  });

  shareContentBtn.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'shareContent' }, response => {
      if (!response || !response.success) {
        console.log(chrome.runtime.lastError);
      }
    });
  });

  chrome.runtime.sendMessage({ action: 'getTranscriptionStatus' }, response => {
    if (response && response.transcribing) {
      startTranscriptionBtn.disabled = true;
      stopTranscriptionBtn.disabled = false;
    } else {
      startTranscriptionBtn.disabled = false;
      stopTranscriptionBtn.disabled = true;
    }
  });
});