# Deployment Guide

This project is configured for deployment on [Render](https://render.com).

## Prerequisites
- A Render account.
- A GitHub repository connected to Render.

## Steps
1. Push this repository to GitHub.
2. Log in to Render and go to **Blueprints**.
3. Click **New Blueprint Instance**.
4. Connect your repository.
5. Render will automatically detect `render.yaml` and prompt you to create:
   - `broker-billing-api` (Web Service)
   - `broker-billing-web` (Web Service)
   - `broker-billing-db` (PostgreSQL)
6. Click **Apply**.

## Environment Variables
The following variables are automatically configured by the Blueprint:
- `DATABASE_URL`: Connection string for the database.
- `JWT_SECRET`: Auto-generated secret for auth.
- `NEXT_PUBLIC_API_URL`: The URL of the API service (injected into the Web service).

## Manual Setup (If not using Blueprint)
If you prefer to set up services manually:
1. **Database**: Create a PostgreSQL database.
2. **API**:
   - Build Command: `npm install && npx turbo run build --filter=api...`
   - Start Command: `npm run start --workspace=apps/api`
   - Env Vars: `DATABASE_URL`, `JWT_SECRET`, `NODE_ENV=production`
3. **Web**:
   - Build Command: `npm install && npx turbo run build --filter=web...`
   - Start Command: `npm run start --workspace=apps/web`
   - Env Vars: `NEXT_PUBLIC_API_URL` (set to API URL), `NODE_ENV=production`
