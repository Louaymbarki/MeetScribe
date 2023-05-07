const openai = require('openai');
openai.apiKey = 'your_openai_api_key';

class WhisperASR {
  constructor() {
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    this.audioProcessor = this.audioContext.createScriptProcessor(4096, 1, 1);
    this.audioProcessor.connect(this.audioContext.destination);
  }

  async startRecording(stream, onTranscription) {
    this.audioProcessor.onaudioprocess = this.processAudio.bind(this, onTranscription);
    this.mediaStreamSource = this.audioContext.createMediaStreamSource(stream);
    this.mediaStreamSource.connect(this.audioProcessor);
    this.audioChunks = [];
  }

  stopRecording() {
    if (this.mediaStreamSource) {
      this.mediaStreamSource.disconnect(this.audioProcessor);
    }
  }

  processAudio(onTranscription, audioProcessingEvent) {
    const audioBuffer = audioProcessingEvent.inputBuffer;
    const audioData = new Float32Array(audioBuffer.length);
    audioBuffer.copyFromChannel(audioData, 0);
    this.audioChunks.push(audioData);
    
    if (this.audioChunks.length >= 10) {
      this.transcribeAudio(onTranscription);
      this.audioChunks = [];
    }
  }

  async transcribeAudio(onTranscription) {
    const audioBlob = this.createAudioBlob(this.audioChunks);

    const formData = new FormData();
    formData.append("file", audioBlob);
    formData.append("model", "whisper-1");
    formData.append("response_format", "json");

    try {
      const response = await fetch("https://api.openai.com/v1/whisper/transcribe", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${openai.apiKey}`
        },
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        onTranscription(data.text);
      } else {
        console.error("Whisper API Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error transcribing audio:", error);
    }
  }

  createAudioBlob(audioChunks) {const audioBuffer = new Float32Array(audioChunks.reduce((acc, chunk) => acc + chunk.length, 0));
    let offset = 0;
    for (const chunk of audioChunks) {
      audioBuffer.set(chunk, offset);
      offset += chunk.length;
    }

    const audioBlob = new Blob([audioBuffer.buffer], { type: "audio/ogg; codecs=opus" });
    return audioBlob;
  }
}

module.exports = WhisperASR;