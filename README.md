# KuliX Focus

A modern, full-stack AI productivity application built with Next.js 15, TypeScript, and cutting-edge web technologies.

## 🚀 Quick Start

```bash
# Clone and install
git clone https://github.com/Antoha1012/kulix-focus.git
cd kulix-focus
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local and add your OPENROUTER_API_KEY

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 🌐 Live Demo

Visit the live application: [https://kulix-focus.vercel.app](https://kulix-focus.vercel.app)

## 🔧 Environment Setup

Create a `.env.local` file in the root directory:

```env
OPENROUTER_API_KEY=your_openrouter_api_key_here
OPENROUTER_MODEL=gpt-4o-mini
OPENROUTER_MAX_TOKENS=1000
OPENROUTER_TEMPERATURE=0.7
```

Get your OpenRouter API key from [OpenRouter.ai](https://openrouter.ai/)

## 📋 Core Modules

- **AI Writing Companion** (`/writing`) — Generate high-quality drafts with customizable tone and length
- **AI Focus Tracker** (`/focus`) — Track your top 3 priorities with progress visualization
- **AI Idea Board** (`/ideas`) — Generate and organize ideas with drag&drop workflow

## 🛠 Technology Stack

- **Next.js 15** with App Router, SSR, and ISR
- **TypeScript** with strict type checking
- **Tailwind CSS** for utility-first styling
- **shadcn/ui** + **Radix UI** for accessible components
- **Framer Motion** for smooth animations
- **Zustand** for lightweight state management
- **Zod** for runtime type validation
- **Vitest** for unit testing
- **OpenRouter API** for AI content generation

## 🎯 Key Features

### AI Writing Companion

- **Smart Generation** - AI-powered content creation with customizable parameters
- **Tone Control** - 6 different writing tones (neutral, professional, friendly, etc.)
- **Length Options** - Short (~300), Medium (~700), Long (~1200) word counts
- **Real-time Validation** - Input validation with helpful error messages

### AI Focus Tracker

- **AI-Powered Suggestions** - Get personalized daily priorities based on your context
- **Priority Management** - Track up to 3 daily priorities with smart categorization
- **Progress Visualization** - Real-time progress bar and completion tracking
- **Smart Persistence** - Local storage with automatic state management

#### How to use AI Focus Tracker:

1. **Describe your day** - Enter context like "Important presentation tomorrow, need to prepare report and meet with client"
2. **Get AI suggestions** - Click "Get AI Suggestions" to receive 3 personalized priorities
3. **Add priorities** - Click "+" next to suggestions you want to track
4. **Track progress** - Mark priorities as completed throughout the day

### AI Idea Board

- **Drag & Drop** - Intuitive idea organization workflow
- **Visual Clustering** - Group related ideas with color-coded tags
- **Export Options** - Save and share idea collections
- **Search & Filter** - Find ideas quickly with smart filtering

## 🧪 Development & Quality

```bash
# Development
pnpm dev              # Start development server
pnpm build            # Production build
pnpm start            # Start production server

# Quality checks
pnpm check-all        # Run all quality checks
pnpm type-check       # TypeScript type checking
pnpm lint             # ESLint code quality
pnpm lint:fix         # Auto-fix ESLint issues
pnpm test             # Run unit tests
```

### Quality Standards

- ✅ **TypeScript** - Strict types, no `any`
- ✅ **ESLint/Prettier** - Clean code, no warnings
- ✅ **Bundle Size** - Optimized to < 200KB
- ✅ **Tests** - Unit tests for utilities
- ✅ **Accessibility** - WCAG AA compliant

## 📁 Project Structure

```
src/
├── app/              # Next.js App Router
├── components/       # Reusable UI components
├── hooks/           # Custom React hooks
├── lib/             # Business logic & utilities
├── types/           # TypeScript type definitions
└── validation/      # Zod validation schemas
```

## 🌐 API Endpoints

- `POST /api/ai/router` — Unified AI endpoint with tool routing
