const WhisperASR = require('./whisper-asr.js');

class TranscriptionManager {
  constructor() {
    this.whisperASR = new WhisperASR();
  }

  startTranscription() {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        this.whisperASR.startRecording(stream, this.handleTranscription.bind(this));
      })
      .catch(error => console.error("Error starting recording:", error));
  }

  stopTranscription() {
    this.whisperASR.stopRecording();
  }

  handleTranscription(transcribedText) {
    console.log("Transcription:", transcribedText);
    // Do something with the transcribed text, e.g., update the UI or store the transcription
  }
}

const transcriptionManager = new TranscriptionManager();

// Example usage:
// transcriptionManager.startTranscription();

// To stop recording:
// transcriptionManager.stopTranscription();