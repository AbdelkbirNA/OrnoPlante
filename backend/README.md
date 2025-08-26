# Backend - OrnoPlante API

This is the Node.js & Express API for the OrnoPlante application. It handles user authentication, plant data, identification requests, and more.

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Environment

Copy the `.env.example` file to a new file named `.env.local` and fill in the required values (database credentials, JWT secret, etc.).

### 3. Start Database

This project uses Docker to run a MySQL database.

```bash
docker-compose up -d
```

### 4. Run Migrations

Apply database schema changes using Prisma.

```bash
npx prisma migrate dev
```

### 5. Start the Server

```bash
npm run dev
```

The API will be running at `http://localhost:8080`.

## API Documentation

API endpoints and usage are documented in `API_DOC.md`.

## Running Tests

To run the Jest test suite:

```bash
npm test
```
