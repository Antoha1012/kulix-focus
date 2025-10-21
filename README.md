# KuliX Focus

A modern, full-stack AI productivity application built with Next.js 15, TypeScript, and cutting-edge web technologies. This project demonstrates expertise in React ecosystem, state management, API design, and performance optimization.

## 🚀 Quick Start

```bash
# Clone and install
git clone https://github.com/Antoha1012/kulix-focus.git
cd kulix-focus
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 📋 Core Modules

- **AI Writing Companion** (`/writing`) — Generate high-quality drafts with customizable tone and length using AI-powered content generation
- **AI Focus Tracker** (`/focus`) — Track your top 3 priorities for today with progress visualization and completion tracking
- **AI Idea Board** (`/ideas`) — Generate and organize ideas with drag&drop workflow for creative brainstorming sessions

## 🛠 Technology Stack

### Frontend

- **Next.js 15** with App Router, SSR, and ISR
- **TypeScript** with strict type checking
- **Tailwind CSS** for utility-first styling
- **shadcn/ui** + **Radix UI** for accessible components
- **Framer Motion** for smooth animations

### State Management & Validation

- **Zustand** for lightweight state management
- **Zod** for runtime type validation and API contracts

### Development & Testing

- **Vitest** for fast unit testing
- **ESLint** + **Prettier** for code quality
- **TypeScript** for type safety

### AI Integration

- **OpenRouter API** for AI content generation
- **Mock provider** for development and testing

## 🏗️ Architecture

### Design Patterns

- **Component Composition** - Reusable UI components with clear boundaries
- **State Management** - Zustand stores for each module with selectors
- **API Design** - Unified `/api/ai/router` endpoint with consistent error handling
- **Type Safety** - End-to-end TypeScript with Zod validation

### Performance Optimizations

- **Server-Side Rendering** - Next.js App Router for optimal SEO and performance
- **Code Splitting** - Automatic code splitting with dynamic imports
- **Image Optimization** - Next.js Image component for optimized loading
- **Bundle Analysis** - Optimized bundle size with tree shaking

## 🧪 Testing & Quality

```bash
# Run all quality checks
pnpm check-all

# Individual checks
pnpm type-check    # TypeScript type checking
pnpm lint          # ESLint code quality
pnpm lint:fix      # Auto-fix ESLint issues
pnpm format        # Format code with Prettier
pnpm format:check  # Check code formatting
pnpm test          # Run unit tests
pnpm test:ui       # Run tests with UI

# Build and performance
pnpm build         # Production build
pnpm lighthouse    # Run Lighthouse audit (requires dev server)
```

### Quality Standards

- ✅ **ESLint/Prettier** - Clean code, no warnings
- ✅ **TypeScript** - Strict types, no `any`
- ✅ **Lighthouse** - Performance ≥90, Accessibility ≥95
- ✅ **Bundle Size** - Optimized, <200KB
- ✅ **Tests** - Unit tests for utilities

## 🔧 Development

```bash
# Install dependencies
pnpm install

# Start development server with Turbopack
pnpm dev

# Build and start production server
pnpm build && pnpm start
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (pages)/           # Route pages
│   │   ├── page.tsx       # Home page
│   │   ├── writing/       # AI Writing Companion
│   │   ├── focus/         # AI Focus Tracker
│   │   ├── ideas/         # AI Idea Board
│   │   └── about/         # Project information
│   └── api/               # API routes
│       └── ai/router/     # Unified AI endpoint
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui primitives
│   ├── layout/           # Header, navigation
│   ├── writing/          # Writing module components
│   └── ideas/            # Ideas module components
├── lib/                  # Business logic & utilities
│   ├── llm/              # AI provider abstraction
│   ├── store/            # Zustand state stores
│   ├── utils/            # Helper functions
│   └── validation/       # Zod schemas
└── validation/           # Input validation schemas
```

## 🌐 API Endpoints

- `POST /api/ai/router` — Unified AI endpoint with tool routing
- `GET /api/health` — Application health check

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
- **Responsive Design** - Mobile-first approach with touch-friendly controls

#### How to use AI Focus Tracker:

1. **Describe your day** - Enter context like "Important presentation tomorrow, need to prepare report and meet with client"
2. **Get AI suggestions** - Click "Get AI Suggestions" to receive 3 personalized priorities
3. **Add priorities** - Click "+" next to suggestions you want to track
4. **Track progress** - Mark priorities as completed throughout the day

**Example contexts:**
- "Important presentation tomorrow, need to prepare report and meet with client"
- "Weekend day, want to focus on health and spend time with family"
- "Starting new project, need to learn technologies and create plan"

### AI Idea Board

- **Drag & Drop** - Intuitive idea organization workflow
- **Visual Clustering** - Group related ideas with color-coded tags
- **Export Options** - Save and share idea collections
- **Search & Filter** - Find ideas quickly with smart filtering

## 🚀 Performance Metrics

- **Lighthouse Score** - 95+ across all categories
- **Bundle Size** - Optimized to < 200KB
- **Type Safety** - 100% TypeScript coverage
- **Accessibility** - WCAG AA compliant

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.
