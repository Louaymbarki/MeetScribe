"# MeetScribe" 
MeetScribe is a Chrome Extension that does the following things : 

1. Real-time transcription: Transcribe Google Meet, Zoom, MS Teams, and Webex meetings in real-time using Whisper ASP
2. ChatGPT summary: Generate meeting summaries, action items, and next meeting agendas using OpenAI's GPT 3.5 Turbo
3.Secure cloud or Google Drive storage for meeting transcriptions.
4.Shareable content: Share full transcripts, summaries, and quotes with others.
5. Speaker identification: Accurately identify speakers during meetings.

with the following folder structure : 
meetscribe-extension/
├── assets/
│   ├── icons/
│   │   ├── icon16.png
│   │   ├── icon48.png
│   │   └── icon128.png
│   └── images/
│       └── logo.png
├── css/
│   └── main.css
├── js/
│   ├── background.js
│   ├── content.js
│   ├── popup.js
│   ├── transcription.js
│   ├── summary-generation.js
│   ├── speaker-identification.js
│   └── storage.js
├── lib/
│   ├── whisper-asr.js
│   └── openai-gpt.js
│   └── google-speech.js ( only for dialization )
├── popup/
│   ├── index.html
├── manifest.json
└── README.md