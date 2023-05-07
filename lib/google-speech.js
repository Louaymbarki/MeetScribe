import { SpeechClient } from '@google-cloud/speech';

const speechClient = new SpeechClient();

export async function transcribeWithGoogleDiarization(audioStream) {
  const request = {
    audio: {
      content: audioStream,
    },
    config: {
      encoding: 'LINEAR16',
      sampleRateHertz: 16000,
      languageCode: 'en-US',
      enableSpeakerDiarization: true,
      diarizationSpeakerCount: 2, // Adjust this value based on the number of expected speakers
    },
  };

  try {
    const [response] = await speechClient.recognize(request);
    const transcription = response.results
      .map((result) => result.alternatives[0].transcript)
      .join('\n');

    const speakerLabels = response.results
      .map((result) => result.alternatives[0].words)
      .reduce((acc, words) => [...acc, ...words], [])
      .map((word) => ({
        startTime: word.startTime.seconds + word.startTime.nanos * 1e-9,
        endTime: word.endTime.seconds + word.endTime.nanos * 1e-9,
        speaker: word.speakerTag,
      }));

    return {
      transcription,
      speakerLabels,
    };
  } catch (error) {
    console.error('Error transcribing audio with Google Cloud Speech-to-Text:', error);
    throw error;
  }
}