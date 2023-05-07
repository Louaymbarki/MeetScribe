const openai = require('openai');
openai.apiKey = 'your_openai_api_key';

class OpenAIGPT {
  constructor() {
    this.model = 'gpt-3.5-turbo';
  }

  async generateSummary(messages) {
    try {
      // Add the system message to set the context for summary generation
      messages.unshift({ role: 'system', content: 'You are an AI assistant that summarizes meetings, generates action items, and creates next meeting agendas.' });

      const response = await openai.ChatCompletion.create({
        model: this.model,
        messages: messages,
      });

      const assistantMessage = response.choices[0].message;
      return assistantMessage;
    } catch (error) {
      console.error('Error generating summary with GPT:', error);
      return null;
    }
  }
}

module.exports = OpenAIGPT;