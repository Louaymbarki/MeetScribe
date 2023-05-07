import { transcribeWithGoogleDiarization } from './lib/google-speech.js';

export async function identifySpeakers(audioStream, participants) {
  const speakerLabels = await transcribeWithGoogleDiarization(audioStream);

  const speakerMapping = mapSpeakerLabelsToParticipants(speakerLabels, participants);

  return speakerMapping;
}

function mapSpeakerLabelsToParticipants(speakerLabels, participants) {
  let speakerMapping = {};

  speakerLabels.forEach((label) => {
    const speakerId = label.speaker;
    const participant = findClosestParticipant(label, participants);

    if (participant) {
      speakerMapping[speakerId] = participant;
    }
  });

  return speakerMapping;
}

function findClosestParticipant(label, participants) {
    const labelItalian = convertLabelToItalian(label);
    let highestSimilarity = 0;
    let closestParticipant = null;
  
    participants.forEach((participant) => {
      const participantItalian = convertParticipantToItalian(participant);
      const similarity = compareTwoStrings(labelItalian, participantItalian);
  
      if (similarity > highestSimilarity) {
        highestSimilarity = similarity;
        closestParticipant = participant;
      }
    });
  
    return closestParticipant;
  }
  
  function convertLabelToItalian(label) {
    // Implement a function to convert the label to Italian if necessary
    // This could be based on using translation APIs or other methods depending on your implementation
    return label; // Return the original label if no conversion is needed
  }
  
  function convertParticipantToItalian(participant) {
    // Implement a function to convert the participant information to Italian if necessary
    // This could be based on using translation APIs or other methods depending on your implementation
    return participant; // Return the original participant information if no conversion is needed
}
   