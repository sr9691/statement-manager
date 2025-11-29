# Broker Billing App

A production-ready full-stack web application for ingesting custodian statements, calculating fees, and generating invoices.

## Tech Stack
- **Frontend**: Next.js 14, TailwindCSS
- **Backend**: Node.js (Fastify)
- **Database**: PostgreSQL, Prisma
- **Monorepo**: Turborepo

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) with your browser.

## Features
- **Statement Ingestion**: Upload and parse PDF statements from custodians like Schwab.
- **Fee Engine**: Flexible fee schedules (Tiered, Flat, Hybrid).
- **Invoicing**: Generate branded PDF invoices.
- **Client Portal**: Secure access for clients to view statements and invoices.
