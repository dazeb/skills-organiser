# Local Agent & Skill Manager

A clean, functional desktop-style web application designed to scan, organize, validate, and AI-enhance Markdown-based AI agents and skills. 

## Overview

The Local Agent & Skill Manager acts as a centralized hub for developers and power users who maintain custom AI instructions, scripts, and agent definitions locally. On startup, the application simulates scanning the user's home directory to detect existing workspace folders (specifically `.codex` and `.claude`). Users can selectively load these workspaces into the application to manage their contents.

The UI is built with a strict adherence to clean, functional design principles ("Uncodixify"), avoiding unnecessary decorative elements in favor of a straightforward, high-utility interface reminiscent of professional developer tools like Linear or Raycast.

## Core Features

- **Workspace Detection:** Automatically detects `.codex` and `.claude` directories on startup.
- **Selective Loading:** Users are prompted with a clean modal to confirm which detected workspaces they want to load into their current session.
- **Agent & Script Management:** View, organize, and edit Markdown-based agent definitions and scripts.
- **AI Enhancement:** Integrated with Google's Gemini API (`@google/genai`) to validate, format, or enhance agent instructions.
- **Syntax Highlighting:** Built-in code editing and syntax highlighting using PrismJS and React Syntax Highlighter.
- **Clean UI:** A dark-themed, high-contrast, and distraction-free interface built with Tailwind CSS and Lucide icons.

## Tech Stack

- **Frontend Framework:** React 19 + Vite
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React
- **Animations:** Motion (Framer Motion)
- **Code Editor & Highlighting:** React Simple Code Editor, PrismJS, React Syntax Highlighter
- **AI Integration:** Google GenAI SDK (`@google/genai`)
- **Backend/Storage:** Express, Better SQLite3 (for local data management)

## Getting Started

### Prerequisites

Ensure you have Node.js installed on your machine.

### Installation

1. Clone the repository.
2. Install the dependencies:
   ```bash
   npm install
   ```

### Environment Variables

Create a `.env` file in the root directory based on `.env.example` (if applicable) and add your Gemini API key:

```env
GEMINI_API_KEY=your_api_key_here
```

### Running the Development Server

Start the Vite development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Project Structure

```text
/
├── src/
│   ├── components/      # Reusable UI components (Layout, Sidebar, Modals, etc.)
│   ├── App.tsx          # Main application component and routing
│   ├── main.tsx         # React entry point
│   └── index.css        # Global Tailwind CSS imports and theme variables
├── package.json         # Project dependencies and scripts
├── vite.config.ts       # Vite configuration
└── metadata.json        # Application metadata
```

## Design Philosophy

This project strictly follows a "normal" UI design philosophy:
- **No unnecessary decoration:** No floating glassmorphism shells, oversized rounded corners, or decorative blobs.
- **Functional first:** Standard padding, clear typography hierarchy, and straightforward navigation.
- **Professional dark mode:** Uses a deep, high-contrast color palette (e.g., Midnight Canvas) without excessive glows or colored shadows.
