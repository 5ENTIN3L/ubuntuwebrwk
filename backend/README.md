# Backend - Ubuntu Nexus

Quick developer guide for the backend.

Prerequisites
- Node.js (LTS)
- MongoDB (local or Atlas)
- npm (or pnpm)

Install
```sh
cd backend
npm install
```

Environment (.env)
Create `backend/.env` with at least:
```
PORT=3000
MONGO_URI=mongodb://localhost:27017/ubuntu-nexus-dev
JWT_SECRET=your_jwt_secret_here
```

Start (dev)
```sh
npm run dev
```
Entry point: [backend/src/index.ts](backend/src/index.ts)

Testing
```sh
npm test
```
Jest config: [backend/jest.config.js](backend/jest.config.js)
Tests live in [backend/tests](backend/tests)

Key files & symbols
- Auth controller: [`register`](backend/src/controllers/auth.controller.ts), [`login`](backend/src/controllers/auth.controller.ts)
- Middleware: [`protect`](backend/src/middleware/auth.middleware.ts), [`authorize`](backend/src/middleware/authorization.middleware.ts)
- Roles: [`roles`](backend/src/config/roles.ts)
- Models: [`User`](backend/src/models/User.ts), [`Article`](backend/src/models/Article.ts), [`Objective`](backend/src/models/Objective.ts), [`CheckIn`](backend/src/models/CheckIn.ts), [`Minute`](backend/src/models/Minute.ts), [`LoginHistory`](backend/src/models/LoginHistory.ts)

Notes
- Tests use a test DB URI (see test files under [backend/tests](backend/tests) — they connect to mongodb://localhost:27017/ubuntu-nexus-test).
- Consider adding a `MONGO_URI_TEST` env var for CI isolation.