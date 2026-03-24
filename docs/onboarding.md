# Developer Onboarding Guide

Welcome to the Ubuntu Nexus website project! This guide will help you get your development environment set up.

## 1. Prerequisites

-   [Node.js](https://nodejs.org/) (LTS version recommended)
-   [pnpm](https://pnpm.io/installation) (or npm/yarn, but pnpm is recommended for managing monorepos)
-   [Git](https://git-scm.com/)
-   A code editor (like [VS Code](https://code.visualstudio.com/))

## 2. Project Structure

The project is a monorepo with the following structure:

-   `/frontend`: The React frontend application.
-   `/backend`: The Node.js/Express backend API.
-   `/docs`: All project documentation.

## 3. Backend Setup

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Variables:**
    Create a `.env` file in the `/backend` directory. You will need to add database connection strings and JWT secrets here as they are developed.
    ```
    # Example .env file
    PORT=3001
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The backend server will start on the port specified in your `.env` file (or fall back to the default in `src/index.ts`).

## 4. Frontend Setup

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Variables:**
    Create a `.env.local` file in the `/frontend` directory. This file will hold the URL of your local backend API.
    ```
    # .env.local
    VITE_API_BASE_URL=http://localhost:3001/api
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The frontend development server will start, typically on `http://localhost:5173`.

## 5. Contribution Guidelines

-   Follow the existing code style and conventions.
-   Write clear and concise commit messages.
-   Ensure any new feature or bug fix includes corresponding tests.
-   Update documentation when adding or changing features.
