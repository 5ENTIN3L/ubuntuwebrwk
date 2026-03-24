# Technical Overview & Plan

This document outlines the technical architecture and development plan for the Ubuntu Nexus website.

## 1. Technology Stack

The stack is chosen to be modern, maintainable, and cost-effective, leveraging TypeScript across the board for improved developer experience and code quality.

-   **Frontend:**
    -   **Framework:** React (with Vite)
    -   **Language:** TypeScript
    -   **Styling:** Tailwind CSS
    -   **UI Components:** To achieve a high-quality aesthetic efficiently, we will use a modern component library like **Shadcn/UI** or **Mantine**. This provides a professional, customizable foundation.
    -   **State Management:** Zustand or React Query (lightweight and effective for managing server state)
    -   **Routing:** React Router

-   **Backend:**
    -   **Runtime:** Node.js
    -   **Framework:** Express.js
    -   **Language:** TypeScript
    -   **Database:** MongoDB (with Mongoose ODM). A NoSQL database is chosen for its flexibility in handling the diverse and evolving data structures required by different departments.
    -   **Authentication:** JSON Web Tokens (JWT)
    -   **Access Control:** A flexible, database-driven Role-Based Access Control (RBAC) system has been implemented to manage permissions dynamically. This allows for granular control over what different user roles can access and modify.

-   **Deployment (TBD):**
    -   **Frontend:** Vercel or Netlify (for their excellent free tiers and CI/CD integration are the primary candidates).
    -   **Backend:** Heroku or a similar Platform-as-a-Service (PaaS) provider with a generous free tier.
    -   **Database:** MongoDB Atlas (offers a free tier).

## 2. High-Level Architecture

The application will follow a classic client-server architecture.

-   **Client (Frontend):** A Single Page Application (SPA) built with React that communicates with the backend via a RESTful API.
-   **Server (Backend):** A Node.js/Express server responsible for:
    -   Serving the API.
    -   Handling business logic.
    -   Authenticating and authorizing users.
    -   Interacting with the MongoDB database.

## 3. Monorepo Management

To effectively manage the `frontend` and `backend` packages within this single repository, we are using **pnpm workspaces**. This approach allows us to:
-   Install all dependencies for both packages with a single `pnpm install` command from the root.
-   Easily share code (e.g., TypeScript types, validation functions) between the frontend and backend.
-   Simplify running scripts across packages.

## 4. Development Plan

Development will be broken down into the following phases:

### Phase 1: Backend Foundation (Largely Complete)

1.  **Setup & Scaffolding:**
    -   Enhanced the existing Express server with a structured folder system for controllers, routes, models, middleware, and configuration.
    -   Integrated Mongoose for database modeling and connected to MongoDB.
2.  **User & Auth Module:**
    -   Created the `User` model with fields for name, email, password (hashed with bcrypt), department, and role. The `department` field is an enum with the following values: `Programs & Community Engagement`, `Research, Policy & Learning`, `Partnerships & Resource Mobilization`, `Operations & Administration`, `DOCT`, and `Social Media, Communications & Branding`.
    -   Implemented user registration and login endpoints that issue JSON Web Tokens (JWT).
    -   Created a `protect` middleware to secure routes and verify JWTs.
    -   **Enhanced Login Security:** The login process now records the timestamp, IP address, and user agent (device information) for each successful login.
3.  **Core Feature Modules (API-first):**
    -   Defined and created the database models for `Article`, `Objective`, `CheckIn`, and `LoginHistory`.
    -   Built the corresponding REST API endpoints (CRUD operations) for each core feature.
4.  **Role-Based Access Control (RBAC):**
    -   Implemented a flexible RBAC system with a `roles.ts` configuration file to define permissions for different user roles (`volunteer`, `staff`, `executive`, `admin`).
    -   Created an `authorize` middleware to protect routes based on user permissions.

## 5. Organizational Departments

The following is a list of the departments within the organization and their core responsibilities:

-   **Programs & Community Engagement Department:** Leads the design, implementation, and coordination of all Ubuntu Nexus programs.
-   **Research, Policy & Learning Department:** Generates evidence, insights, and policy-oriented knowledge to guide programs and advocacy.
-   **Partnerships & Resource Mobilization Department:** Drives external relationships, collaboration opportunities, and financial sustainability.
-   **Operations & Administration Department:** Ensures the smooth running of all internal systems and supports the day-to-day functioning of the organization.
-   **DOCT — Digital Operations & Creative Technology Department:** Acts as the digital backbone of the organization, handling all tech infrastructure, cybersecurity, and digital systems.
-   **Social Media, Communications & Branding Department:** Shapes the organization’s voice, storytelling, and digital presence.

### API Endpoint Documentation

The following is a high-level overview of the implemented API routes:

-   **Authentication (`/api/auth`)**
    -   `POST /register`: Register a new user.
    -   `POST /login`: Authenticate a user, receive a JWT, and record the login event (IP, device).
    -   `GET /me`: Get the profile of the currently authenticated user.
    -   `GET /login-history`: Get the login history for the currently authenticated user (protected).
-   **Articles (`/api/articles`)**
    -   `GET /`: Get all articles.
    -   `GET /:id`: Get a single article by ID.
    -   `POST /`: Create a new article (protected, requires `create_article` permission).
    -   `PUT /:id`: Update an article (protected, requires `update_own_article` or `update_any_article` permission).
    -   `DELETE /:id`: Delete an article (protected, requires `delete_any_article` permission).
-   **Objectives (`/api/objectives`)**
    -   `GET /`: Get all objectives for the logged-in user (protected).
    -   `GET /:id`: Get a single objective by ID (protected).
    -   `POST /`: Create a new objective (protected).
    -   `PUT /:id`: Update an objective (protected).
    -   `DELETE /:id`: Delete an objective (protected).
-   **Check-ins (`/api/objectives/:objectiveId/checkins`)**
    -   `GET /`: Get all check-ins for an objective (protected).
    -   `POST /`: Create a new check-in for an objective (protected).
    -   `GET /:checkinId`: Get a single check-in by ID (protected).
    -   `PUT /:checkinId`: Update a check-in (protected).
    -   `DELETE /:checkinId`: Delete a check-in (protected).
-   **Users (`/api/users`)**
    -   `GET /:userId/login-history`: Get the login history for a specific user (protected, requires `view_user_history` permission).



### Phase 2: Frontend Foundation (Completed)

1.  **Project Structure & Tooling:**
    -   Frontend scaffold created under `frontend/` (Vite + React + TypeScript).
    -   Tailwind CSS integration assumed (index.css contains tailwind directives).
    -   React Query added for server-state management.

2.  **What was created (quick overview):**
    -   frontend/
        -   package.json, vite.config.ts, tsconfig.json, index.html
        -   src/main.tsx, src/App.tsx
        -   src/index.css (Tailwind entry)
        -   src/pages/Login.tsx, src/pages/Dashboard.tsx
        -   src/pages/articles/ArticlesList.tsx, src/pages/articles/ArticleForm.tsx
        -   src/components/Layout.tsx, src/components/Nav.tsx
        -   src/components/ui/Button.tsx, src/components/ui/Input.tsx
        -   src/services/api.ts (Axios instance)
        -   src/hooks/useAuth.tsx (AuthProvider + useAuth hook)

3.  **How to run (from repo root):**
    -   cd frontend
    -   pnpm install (or npm/yarn)
    -   pnpm dev
    -   Open http://localhost:5173

4.  **Notes & assumptions:**
    -   Frontend expects backend routes under /api (e.g., POST /api/auth/login, GET /api/auth/me, /api/articles).
    -   Token is stored in localStorage as `token`. Migrate to httpOnly cookies for production.
    -   React Query is used for caching and automatic refetching of lists after mutations.
    -   Extend pages/components and wire RBAC checks as backend roles/permissions become available.

### Phase 3: Feature Implementation (Future)

1.  **Dashboard & Check-ins:**
    -   Develop the main user dashboard.
    -   Implement the check-in creation and viewing functionality.
2.  **Objectives Module:**
    -   Build the UI for creating, viewing, and updating objectives.
    -   Connect the UI to the backend Objective API endpoints.
3.  **Public Pages:**
    -   Develop the public-facing pages (Home, About Us, etc.).
    -   Implement the "Become a Volunteer" and "Send a Message" forms.

### Phase 4: Payments & Advanced Features (Future)

1.  **Mpesa Integration:**
    -   This is a critical feature requiring special attention to security and reliability.
    -   **Implementation:** Research and implement the Mpesa Daraja API for the donations system.
    -   **Security:** Securely manage all API keys and credentials.
    -   **Reliability:** Build a robust system to handle transaction states (pending, success, failure) and Mpesa callbacks to ensure every donation is tracked accurately.
2.  **Executive/Admin Features:**
    -   Build the specialized CRUD interfaces for the Executive Director (e.g., Minutes management).
3.  **Testing & Refinement:**
    -   Write unit and integration tests.
    -   Conduct thorough user testing.
    -   Refine the UI/UX based on feedback.
