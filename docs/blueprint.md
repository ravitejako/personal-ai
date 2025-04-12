# **App Name**: Personal AI Companion

## Core Features:

- Chat UI: Basic chat interface with text input and display. The AI's response is shown in a speech bubble style.
- AI Chat Logic: Connect to GPT-4 via API to generate responses based on user input. The LLM acts as a reasoning tool to create helpful responses.
- Voice Output: Integrate with ElevenLabs TTS API to convert AI responses into voice output and render an audio player to play the response.
- Sentiment Analysis: Use sentiment analysis on user messages to track emotions and store them.
- Personalization: Allow users to personalize the AI companion with a name, avatar, and theme selection.

## Style Guidelines:

- Primary color: Soft teal (#A2D9CE) for a calming and friendly feel.
- Secondary color: Light gray (#F5F5F5) for backgrounds and neutral elements.
- Accent: Coral (#FF7F50) for highlights, interactive elements, and the AI's avatar border.
- Clean and modern sans-serif fonts for readability in the chat interface.
- Simple and friendly icons for common actions (send message, voice input, etc.).
- Clean and intuitive chat layout with clear separation between user and AI messages.
- Subtle animations for loading states and transitions to provide a smooth user experience.

## Original User Request:
Perfect — a web app is a great choice for accessibility and quick iteration. Here’s how we can structure your personal AI friend web app:

---

### 🌐 Web App Architecture Overview

#### 1. **Frontend (React + Tailwind)**
- Chat interface (text input + microphone icon for voice)
- Audio player for AI voice playback
- Personalization (name/avatar/theme)
- Optional mood tracker or journal view

#### 2. **Backend (FastAPI or Node.js)**
- Handles chat logic and API calls
- Integrates with:
  - OpenAI (or local LLM for conversation)
  - ElevenLabs (for TTS)
  - Whisper or STT API (for voice input)
  - Vector DB (ChromaDB or SQLite) for memory/context

#### 3. **Voice & Sentiment**
- Use sentiment analysis on your messages to track emotions
- Store emotional trends to allow the AI to “check in” on you

---

### 🛠️ Tech Stack

| Feature | Stack |
|--------|-------|
| UI | React + TailwindCSS |
| State | Zustand or Redux |
| Voice Output | [ElevenLabs TTS API](https://www.elevenlabs.io/) |
| Voice Input | Whisper (via API or self-hosted) |
| LLM | GPT-4 (OpenAI API) or Ollama locally |
| Backend | FastAPI (Python) or Express.js (Node) |
| Memory | SQLite or ChromaDB |
| Hosting | Vercel (frontend) + Render/Fly.io/Backend in Docker |

---

### ⚡ First Milestone: MVP Features

- [ ] Chat UI (text only)
- [ ] Connect to GPT-4 for responses
- [ ] Send response to ElevenLabs → play voice
- [ ] Optional: Record your voice and transcribe using Whisper

Would you like me to scaffold a **starter project with React + ElevenLabs + GPT** and help you deploy it on Vercel?

And do you already have an ElevenLabs account or voice you want to use?
  