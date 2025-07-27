# AI Chat Widget - Replit.md

## Overview

This is a full-stack application that provides an embeddable AI chat widget service. The application consists of a React frontend for marketing/landing pages and a Node.js/Express backend that serves both the frontend and the embeddable widget files. The widget acts as a proxy to secure n8n webhook endpoints, allowing websites to integrate AI chat functionality with a single script tag.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state management
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **API Style**: RESTful API with JSON responses
- **Middleware**: Custom logging, CORS handling, error handling

### Database Layer
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Database**: PostgreSQL (via Neon serverless)
- **Migrations**: Drizzle Kit for schema management
- **Storage**: In-memory storage implementation with interface for future database integration

## Key Components

### Widget System
The core functionality revolves around serving embeddable JavaScript widgets:
- **Widget Files**: Static `widget.js` and `widget.css` served from `/public` directory
- **Embed Code**: Single script tag integration for websites
- **Cross-Origin**: Full CORS support for embedding on any domain

### API Endpoints
- **`POST /api/chat`**: Secure proxy endpoint for chat messages
  - Validates input using Zod schemas
  - Forwards to authorized n8n webhook (datagen.agency domain only)
  - Manages session IDs for conversation continuity

### Security Measures
- Domain validation for webhook URLs (whitelist approach)
- Input validation with Zod schemas
- CORS configuration for cross-origin widget embedding
- Session management for user tracking

### UI Components
- Comprehensive shadcn/ui component library
- Responsive design with mobile-first approach
- Accessibility features built-in
- Dark mode support via CSS variables

## Data Flow

1. **Widget Loading**: Website includes script tag → loads widget.js → initializes chat interface
2. **User Interaction**: User types message → widget validates locally → sends to `/api/chat`
3. **Message Processing**: Backend validates → forwards to n8n webhook → returns AI response
4. **Response Display**: Widget receives response → updates chat interface → maintains session

## External Dependencies

### Production Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL connection
- **@tanstack/react-query**: Server state management
- **drizzle-orm**: Type-safe ORM for database operations
- **express**: Web application framework
- **zod**: Runtime type validation
- **wouter**: Minimal routing library

### UI Dependencies
- **@radix-ui/***: Headless UI component primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **lucide-react**: Icon library

### Development Dependencies
- **vite**: Build tool and dev server
- **typescript**: Static type checking
- **tsx**: TypeScript execution for development
- **esbuild**: Fast JavaScript bundler for production

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite builds React app to `dist/public`
2. **Backend Build**: esbuild bundles server code to `dist/index.js`
3. **Asset Serving**: Widget files served statically alongside frontend

### Environment Configuration
- **Development**: Uses Vite dev server with HMR
- **Production**: Express serves static files and API
- **Database**: Requires `DATABASE_URL` environment variable

### Hosting Requirements
- Node.js runtime environment
- PostgreSQL database access
- Static file serving capability
- HTTPS for secure widget embedding

### Scripts
- `dev`: Development server with hot reload
- `build`: Production build for both frontend and backend
- `start`: Production server startup
- `db:push`: Database schema deployment

The application is designed for easy deployment on platforms like Replit, Vercel, or Railway with minimal configuration requirements.

## Recent Changes

### July 27, 2025 - Chat Widget System Complete
- Built complete embeddable AI chat widget system
- Created floating chat icon with pulse animations in bottom-left corner
- Implemented secure backend proxy for n8n webhooks (datagen.agency domain validation)
- Added responsive chat window with "AI Assistant" header
- Created demo homepage with installation instructions
- Configured for production deployment on https://chatwidget.datagen.agency