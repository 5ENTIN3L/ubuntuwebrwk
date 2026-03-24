# API Reference (high-level)

Auth
- POST /api/auth/register -> controller: [`register`](backend/src/controllers/auth.controller.ts)
- POST /api/auth/login -> controller: [`login`](backend/src/controllers/auth.controller.ts)
- GET /api/auth/me -> protected by [`protect`](backend/src/middleware/auth.middleware.ts)
- GET /api/auth/login-history -> controller: [`getLoginHistory`](backend/src/controllers/auth.controller.ts)

Articles
- POST /api/articles -> controller: [`createArticle`](backend/src/controllers/article.controller.ts)
- GET /api/articles -> controller: [`getArticles`](backend/src/controllers/article.controller.ts)
- GET /api/articles/:id -> controller: [`getArticle`](backend/src/controllers/article.controller.ts)
- PUT /api/articles/:id -> controller: [`updateArticle`](backend/src/controllers/article.controller.ts)
- DELETE /api/articles/:id -> controller: [`deleteArticle`](backend/src/controllers/article.controller.ts)

Objectives & Check-ins
- POST /api/objectives -> controller: [`createObjective`](backend/src/controllers/objective.controller.ts)
- GET /api/objectives -> controller: [`getObjectives`](backend/src/controllers/objective.controller.ts)
- POST /api/objectives/:objectiveId/checkins -> controller: [`createCheckIn`](backend/src/controllers/checkin.controller.ts)

Minutes
- POST /api/minutes -> controller: [`createMinute`](backend/src/controllers/minute.controller.ts)
- Other minute endpoints use controllers in [backend/src/controllers/minute.controller.ts](backend/src/controllers/minute.controller.ts)

Notes
- Authorization decisions are implemented in [`authorize`](backend/src/middleware/authorization.middleware.ts) using the config [`roles`](backend/src/config/roles.ts).
- Models under: [`User`](backend/src/models/User.ts), [`Article`](backend/src/models/Article.ts), [`Objective`](backend/src/models/Objective.ts), [`CheckIn`](backend/src/models/CheckIn.ts), [`Minute`](backend/src/models/Minute.ts), [`LoginHistory`](backend/src/models/LoginHistory.ts).