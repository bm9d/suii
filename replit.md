# Essence - Premium Fragrances E-commerce Platform

## Overview

Essence is a luxury perfume e-commerce platform built with modern web technologies. The application showcases premium fragrances with an elegant, responsive design and provides a complete shopping experience including product browsing, cart management, and interactive features like a scent quiz.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with custom design system and shadcn/ui components
- **State Management**: React Context API for cart state and React Query for server state
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Server**: Express.js with TypeScript for REST API endpoints
- **Database ORM**: Drizzle ORM with PostgreSQL dialect for type-safe database operations
- **Database**: Configured for PostgreSQL with Neon Database support
- **Session Management**: PostgreSQL session store for user sessions

### Development Environment
- **Development Server**: Vite dev server with Express middleware integration
- **Hot Module Replacement**: Full HMR support for React components
- **TypeScript**: Strict type checking across client, server, and shared code

## Key Components

### Client-Side Components
- **Product Catalog**: Dynamic product listing with filtering and search
- **Shopping Cart**: Persistent cart with localStorage integration
- **Product Modal**: Detailed product view with image gallery and size selection
- **Scent Quiz**: Interactive recommendation system
- **Header/Navigation**: Responsive navigation with mobile menu
- **Newsletter**: Email subscription component

### Shared Schema
- **Product Schema**: Zod validation for product data structure
- **Cart Schema**: Type-safe cart item management
- **Database Schema**: Drizzle schema definitions for data models

### UI Components
- **Design System**: shadcn/ui components with custom theming
- **Typography**: Playfair Display for headings, Inter for body text
- **Color Palette**: Gold accent color with neutral base tones
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints

## Data Flow

### Product Data
1. Static product data stored in JSON format during development
2. Products rendered through React components with TypeScript interfaces
3. Product filtering and sorting handled client-side for performance
4. Cart state managed through React Context with localStorage persistence

### User Interactions
1. Product browsing triggers component state updates
2. Cart actions persist to localStorage and update global context
3. Form submissions (contact, newsletter) handle validation and feedback
4. Search and filtering update product display in real-time

### Session Management
1. Express sessions configured with PostgreSQL store
2. User preferences and cart state can be synchronized server-side
3. Authentication-ready infrastructure for user accounts

## External Dependencies

### Core Libraries
- **React Ecosystem**: React 18, React DOM, React Query for data fetching
- **UI Framework**: Radix UI primitives with shadcn/ui styling
- **Styling**: Tailwind CSS with PostCSS processing
- **Routing**: Wouter for client-side navigation
- **Forms**: React Hook Form with Zod validation

### Database & Backend
- **ORM**: Drizzle ORM with PostgreSQL adapter
- **Database Driver**: Neon Database serverless driver
- **Session Store**: connect-pg-simple for PostgreSQL session storage
- **Validation**: Zod for runtime type validation

### Development Tools
- **Build System**: Vite with React plugin and TypeScript support
- **Development**: TSX for TypeScript execution, ESBuild for production builds
- **Code Quality**: TypeScript strict mode, ESLint-ready configuration

## Deployment Strategy

### Build Process
1. **Client Build**: Vite builds React application to `dist/public`
2. **Server Build**: ESBuild bundles Express server to `dist/index.js`
3. **Database**: Drizzle migrations manage schema changes
4. **Assets**: Static assets served from Vite build output

### Environment Configuration
- **Development**: Local development with Vite dev server and Express
- **Production**: Node.js server serving built React app and API endpoints
- **Database**: PostgreSQL with connection string from environment variables

### Production Deployment
- Server runs compiled Express application
- Static files served from dist/public directory
- Database migrations applied through Drizzle commands
- Environment variables required: DATABASE_URL

## Changelog
- June 28, 2025. Initial setup
- June 28, 2025. Created Google Apps Script dashboard for GitHub Pages management

## User Preferences

Preferred communication style: Simple, everyday language.