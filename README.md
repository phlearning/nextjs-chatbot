# Next.js AI Chatbot

A modern, responsive AI chatbot built with Next.js, featuring real-time responses and conversation history management.

<div align="center">
  <img src="public/example_chatbot.png" alt="Example Chatbot" width="80%" style="max-width: 800px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);" />
</div>

## Features

- 💬 Real-time AI chat interface
- 📱 Responsive design with collapsible sidebar
- 📝 Chat history management
- 🔄 Loading states and error handling
- 🎨 Sleek UI using Tailwind CSS and Shadcn UI components

## Technologies Used

- **Frontend**: Next.js, React, TypeScript
- **Styling**: Tailwind CSS, Shadcn UI
- **State Management**: Custom hooks with React useState
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/phlearning/nextjs-chatbot.git
cd nextjs-chatbot
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the project root and add your API key (or modify the .env.example into .env and adjust with your key):

```env
GEMINI_API_KEY=your_gemini_api_key_here
```
