const transcriptionManager = require('./transcription.js');

// Inject the transcription UI into the page
function injectTranscriptionUI() {
  const transcriptionUI = document.createElement('div');
  transcriptionUI.id = 'meetscribe-transcription-ui';
  transcriptionUI.innerHTML = `
    <div id="meetscribe-transcription-container">
      <h3>Transcription</h3>
      <div id="meetscribe-transcription"></div>
      <button id="meetscribe-start-stop-button">Start Transcription</button>
    </div>
  `;

  document.body.appendChild(transcriptionUI);

  const startStopButton = document.getElementById('meetscribe-start-stop-button');
  startStopButton.addEventListener('click', toggleTranscription);
}

// Toggle the transcription on and off
function toggleTranscription() {
  const startStopButton = document.getElementById('meetscribe-start-stop-button');

  if (startStopButton.textContent === 'Start Transcription') {
    transcriptionManager.startTranscription();
    startStopButton.textContent = 'Stop Transcription';
  } else {
    transcriptionManager.stopTranscription();
    startStopButton.textContent = 'Start Transcription';
  }
}

// Update the transcription UI with new transcriptions
function updateTranscriptionUI(transcribedText) {
  const transcriptionContainer = document.getElementById('meetscribe-transcription');
  transcriptionContainer.innerHTML += `<p>${transcribedText}</p>`;
}

// Initialize the content script
function init() {
  injectTranscriptionUI();
  transcriptionManager.handleTranscription = updateTranscriptionUI;
}

init();
