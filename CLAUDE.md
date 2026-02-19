# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React + TypeScript + Vite church website for Christ Vision Church with internationalization support. The application uses modern web technologies including Radix UI components, Tailwind CSS for styling, and React Router for navigation.

## Development Commands

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production (runs TypeScript compilation + Vite build)
- `npm run lint` - Run ESLint for code quality checks
- `npm run preview` - Preview production build locally

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── layout/          # Navigation, Footer
│   ├── sections/        # Page sections (Hero, About, Events, etc.)
│   └── ui/              # Base UI components (Radix UI + shadcn/ui)
├── pages/               # Route components
├── i18n/                # Internationalization setup
│   └── locales/         # Translation files (en.json, fr.json, es.json)
├── hooks/               # Custom React hooks
├── lib/                 # Utilities and configurations
└── main.tsx            # Application entry point
```

## Architecture Notes

### Routing
- Uses React Router with HashRouter for client-side routing
- Main routes: `/`, `/calendar`, `/program`, `/contact`, `/appointment`, `/support`
- Fallback routes redirect to Home for unimplemented pages

### Styling System
- Tailwind CSS with extensive custom theme configuration
- Custom color palette: `gold`, `purple`, `flame`, `darkblue` variants
- CSS variables for theming support via `hsl(var(--variable))` pattern
- Custom animations: `float`, `pulse-glow`, `shimmer`
- Responsive design with mobile-first approach

### Internationalization
- i18next with React integration
- Supports English (en), French (fr), Spanish (es)
- Browser language detection with localStorage persistence
- Translation files in `src/i18n/locales/`

### UI Components
- Built on Radix UI primitives with shadcn/ui patterns
- Consistent design system with Tailwind utility classes
- Path alias `@/*` maps to `src/*`

### Key Dependencies
- **Framework**: React 19.2.0 with TypeScript
- **Build Tool**: Vite 7.2.4
- **UI Library**: Radix UI components
- **Styling**: Tailwind CSS with custom theme
- **Routing**: React Router DOM 7.13.0
- **i18n**: i18next with React integration
- **Forms**: React Hook Form with Zod validation
- **Notifications**: Sonner for toast messages

## Development Notes

- TypeScript configuration uses path mapping for `@/*` imports
- ESLint configured for React and TypeScript
- Vite config includes React plugin with base path set to `./` for deployment flexibility
- No testing framework currently configured