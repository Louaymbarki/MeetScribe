import { generateSummaryUsingGPT3 } from './lib/openai-gpt.js';

export async function generateSummary(transcript) {
  const summary = await generateSummaryUsingGPT3(transcript);

  return {
    summary: summary.text,
    actionItems: summary.actionItems,
    nextMeetingAgenda: summary.nextMeetingAgenda
  };
}