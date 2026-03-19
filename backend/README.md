# Bread and Butter Backend API

This directory contains the Express 5-based API for the Bread and Butter project. It's built with TypeScript and uses Prisma as the ORM to interact with a SQLite database.

## Getting Started

### 1. Prerequisites
* [Node.js](https://nodejs.org/) (v18 or higher)
* [npm](https://www.npmjs.com/)

### 2. Installation
Navigate to the `backend` directory:
```bash
cd backend
npm install
```

### 3. Setup Environment Variables
Create a `.env` file and configure it as shown in the example below:
```env
PORT=5000
DATABASE_URL="file:./dev.db"
JWT_ACCESS_SECRET="your-access-secret-key"
JWT_REFRESH_SECRET="your-refresh-secret-key"
JWT_ACCESS_EXPIRY="15m"
JWT_REFRESH_EXPIRY="7d"
```

### 4. Prisma Setup
Apply the initial migrations to create the database:
```bash
npm run prisma:migrate
```
Generate the Prisma Client:
```bash
npm run prisma:generate
```

### 5. Start the Server
Start the development server with hot-reloading:
```bash
npm run dev
```

## Available Scripts

* `npm run dev`: Run the API in development mode using `ts-node-dev`.
* `npm run build`: Compile the TypeScript code to JavaScript.
* `npm run start`: Start the production server from the `dist/` folder.
* `npm run prisma:generate`: Generate the Prisma Client.
* `npm run prisma:migrate`: Apply database migrations and update the schema.

## Source Code Structure

* `src/server.ts`: Entry point for the server.
* `src/app.ts`: Express application configuration and middleware.
* `src/routes/`: API endpoint definitions.
* `src/controllers/`: Business logic for each resource.
* `src/middleware/`: Custom Express middleware (e.g., authentication).
* `src/lib/`: Reusable utilities and Prisma client initialization.
* `prisma/`: Prisma schema and migration history.
