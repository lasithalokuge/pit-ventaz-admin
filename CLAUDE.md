# Ventaz Admin Dashboard

## Project Overview
Admin tool for managing AI agents, including an overview dashboard, agent management, chat monitoring, and lead tracking.

## Tech Stack
- **Framework**: Next.js 15 (Pages Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Font**: Poppins (Google Fonts via next/font)
- **Icons**: Custom SVG icons from Figma design
- **State Management**: React Context API

## Project Structure
```
src/
├── components/
│   ├── layout/         # Header, Navigation, Layout wrapper
│   ├── dashboard/      # Dashboard-specific components (DataCardsGrid, RecentActivities, QuickActions)
│   ├── agents/         # Agent-related components (AgentCard, edit/)
│   ├── ui/             # Reusable UI components (PageHeading, Input, Select, TabNavigation, Badge)
│   └── icons/          # SVG icon components
├── context/            # React Context providers (AgentContext)
├── pages/              # Next.js pages (Pages Router)
│   └── agents/[id]/    # Dynamic agent routes (edit page)
├── types/              # TypeScript type definitions
├── data/               # Mock data
└── styles/             # Global CSS with Tailwind
public/
└── icons/              # Static SVG assets
```

## Component Naming Conventions
- PascalCase for component files: `DataCard.tsx`
- camelCase for utility files: `mockData.ts`
- Components export default function with same name as file

## Key Components

### Layout & Navigation
- `Layout` - Main layout wrapper with header and navigation
- `Header` - Top navigation bar with logo, nav tabs, and user profile
- `PageHeading` - Reusable page heading with title, subtitle, and actions

### UI Components
- `Input` - Text input with label, disabled state, helper text
- `Select` - Dropdown select component
- `TabNavigation` - Tab navigation with change indicator dots
- `Badge` - Status badges (draft, ready, live)

### Agent Components
- `AgentCard` - Card displaying agent info with actions
- `FormSection` - Section wrapper for edit forms

## State Management
- `AgentContext` - Manages agent list and details across pages
  - `agents` - List of all agents
  - `agentDetails` - Extended agent details for edit page
  - `updateAgent` / `updateAgentDetails` - Update functions

## Design Tokens
```css
/* Brand Colors */
--color-brand-100: #f3f4f6    /* Background */
--color-brand-200: #e5e7eb    /* Secondary Background */
--color-brand-800: #1e2939    /* Dark/Active */

/* Text Colors */
--color-text-strong: #101828
--color-text-subtle: #6a7282
--color-text-light: #99a1af

/* UI Colors */
--color-surface: #ffffff
--color-border: #e5e7eb
--color-border-base: #d1d5dc
--color-success: #008236
--color-danger: #c70036
--color-warning: #ff5a1f

/* Status Colors */
Draft: bg-[#fff8f1] border-[#fcd9bd] text-[#ff5a1f]
Ready: bg-[#eef6ff] border-[#bedbff] text-[#51a2ff]
Live: bg-[#ecfdf5] border-[#a4f4cf] text-[#00a63e]

/* Border Radius */
rounded: 8px
rounded-full: 9999px
```

## Development Commands
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Pages
- `/` - Overview Dashboard (metrics, recent activities, quick actions)
- `/agents` - My Agents (list of agent cards)
- `/agents/[id]/edit` - Edit Agent (tabbed settings form)
- `/chats` - Chats (placeholder)
- `/leads` - Leads (placeholder)

## Edit Agent Page Features
- Tab navigation: General, Widget Customization, Behavior & Goals, Knowledge Base, Integrations, Notifications, Preview
- Change detection with orange indicator dot on tabs
- Save/Reset buttons enable when form has changes
- Changes persist via AgentContext and reflect on agents list

## Figma Design Reference
https://www.figma.com/design/Wo819Mu4GA1EMjECYSWgYE/Ventaz.web?node-id=1268-16058
