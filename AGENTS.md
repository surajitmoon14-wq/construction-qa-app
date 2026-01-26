## Project Summary
Quality Pulse Construction QA is a modern, AI-powered quality assurance platform designed for the construction industry. It enables real-time monitoring of construction quality metrics, AI-driven risk assessment of field findings, and streamlined compliance tracking. The application features a high-impact industrial aesthetic with modern data visualizations and interactive reporting.

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Database**: SQLite (LibSQL) with Drizzle ORM
- **AI**: xAI Grok API (grok-3-mini-fast) via OpenAI SDK
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React

## Architecture
- `src/app`: Next.js pages and API routes
- `src/lib`: Database schema and client initialization
- `src/components`: Reusable UI components (Navbar, etc.)
- `src/app/api/analyze`: Endpoint for AI-powered inspection analysis
- `src/app/inspections/new/actions.ts`: Server actions for database operations

## User Preferences
- High-impact industrial design with safety yellow/orange accents
- AI integration using xAI Grok for risk assessment
- Real-time dashboard with quality pulse metrics

## Project Guidelines
- Use modern industrial aesthetics (dark theme, bold typography)
- Implement AI assistance for all manual data entry tasks where possible
- Maintain high performance with server-side rendering and efficient database queries

## Common Patterns
- AI analysis of text-based field findings returning Risk Level, Issue Type, and Recommendation
- Time-series visualization of quality scores
- Severity-based issue tracking using crypto.randomUUID() for IDs
