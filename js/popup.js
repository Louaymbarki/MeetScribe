document.addEventListener('DOMContentLoaded', () => {
  const startTranscriptionBtn = document.getElementById('startTranscription');
  const stopTranscriptionBtn = document.getElementById('stopTranscription');
  const viewFullTranscriptBtn = document.getElementById('viewFullTranscript');
  const shareContentBtn = document.getElementById('shareContent');

  startTranscriptionBtn.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'startTranscription' }, response => {
      if (response.success) {
        startTranscriptionBtn.disabled = true;
        stopTranscriptionBtn.disabled = false;
      }
    });
  });

  stopTranscriptionBtn.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'stopTranscription' }, response => {
      if (response.success) {
        startTranscriptionBtn.disabled = false;
        stopTranscriptionBtn.disabled = true;
      }
    });
  });

  viewFullTranscriptBtn.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'viewFullTranscript' });
  });

  shareContentBtn.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'shareContent' });
  });

  chrome.runtime.sendMessage({ action: 'getTranscriptionStatus' }, response => {
    if (response.transcribing) {
      startTranscriptionBtn.disabled = true;
      stopTranscriptionBtn.disabled = false;
    } else {
      startTranscriptionBtn.disabled = false;
      stopTranscriptionBtn.disabled = true;
    }
  });
});