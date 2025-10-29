# Express.js RESTful API Assignment

This assignment focuses on building a RESTful API using Express.js, implementing proper routing, middleware, and error handling.

## Assignment Overview

You will:
1. Set up an Express.js server
2. Create RESTful API routes for a product resource
3. Implement custom middleware for logging, authentication, and validation
4. Add comprehensive error handling
5. Develop advanced features like filtering, pagination, and search

## Getting Started

1. Accept the GitHub Classroom assignment invitation
2. Clone your personal repository that was created by GitHub Classroom
# Express.js RESTful API — Week 2

This repository contains a small Express.js RESTful API built as part of the Week 2 assignment. It demonstrates Express routing, modular middleware (logging, authentication, validation), and centralized error handling.

## What's in this project

- A minimal Express server (`server.js`) configured with JSON parsing and modular routes
- Example `products` route with CRUD operations (`routes/products.js`)
- Custom middleware in `Middleware/`:
   - `logger.js` — request logging
   - `auth.js` — simple authentication placeholder (example)
   - `validation.js` — request body validation helper
- Shared utilities in `Middleware/utils/errors.js` for custom error types and responses
- `Week2-Assignment.md` — original assignment instructions

## Quick start

Requirements:
- Node.js (v14+ recommended)
- npm (or yarn)

Install dependencies and start the server:

```powershell
cd "c:\Users\User\Desktop\Week 2 Express.js\express-js-server-side-framework-Sael-Git"
npm install
# Run directly with node
node server.js
# or, if package.json defines a start script
npm start
```

Server defaults to port 3000 (check `server.js`). If you use environment variables, create a `.env` file from any provided example.

## API — Endpoints

All endpoints are prefixed with /api unless otherwise noted.

Products (example resource)

- GET /api/products — list products (supports basic filtering/pagination if implemented)
- GET /api/products/:id — get a single product by id
- POST /api/products — create a product (request body validated)
- PUT /api/products/:id — update a product
- DELETE /api/products/:id — delete a product

Notes:
- The routes are implemented in `routes/products.js`. Open that file to see request/response shapes and any query parameters supported.

## Middleware

This project demonstrates three middleware types:

- Logger (`Middleware/logger.js`): logs method, path, and timing for each request.
- Auth (`Middleware/auth.js`): example middleware showing how to gate routes. Replace with real auth in production.
- Validation (`Middleware/validation.js`): validates request bodies for routes that require structured input.

Middleware is applied in `server.js` and at the route level for specific routes that require it.

## Error handling

Errors are centralized. Look at `Middleware/utils/errors.js` for helper error constructors and status codes. The global error handler in `server.js` (or a separate middleware file) translates thrown errors into JSON responses with appropriate HTTP status codes.

Example error response format:

```json
{
   "status": "error",
   "message": "Product not found",
   "code": 404
}
```

## Example requests

Using PowerShell (Invoke-RestMethod) or curl.

GET all products:

```powershell
Invoke-RestMethod -Method Get -Uri http://localhost:3000/api/products
```

Create a product (JSON body):

```powershell
Invoke-RestMethod -Method Post -Uri http://localhost:3000/api/products -Body (@{
   name = 'New product';
   price = 19.99
} | ConvertTo-Json) -ContentType 'application/json'
```

Or with curl:

```powershell
curl -X POST http://localhost:3000/api/products -H "Content-Type: application/json" -d '{"name":"New product","price":19.99}'
```

Adjust URIs and payloads to match the actual route implementation in `routes/products.js`.

## Project structure

```
express-js-server-side-framework-Sael-Git/
├─ server.js               # App entry
├─ Week2-Assignment.md     # Assignment brief
├─ Middleware/
│  ├─ logger.js
│  ├─ auth.js
│  ├─ validation.js
│  └─ utils/
│     └─ errors.js
└─ routes/
    └─ products.js
```

## Tests

No automated tests are included by default. To add tests, create a `test/` folder and add your preferred framework (Jest, Mocha, etc.). Run them with an npm script like `npm test` (add to `package.json`).

## Linting & Formatting

No linter or formatter is preconfigured. You can add ESLint/Prettier to the project and wire scripts into `package.json`.

## Common tasks

- Install deps: `npm install`
- Run server: `node server.js` or `npm start`
- Test endpoints: use Postman/Insomnia, curl, or PowerShell `Invoke-RestMethod` as shown above

## Contributing

Small improvements and documentation fixes are welcome. If you add new features, please:

1. Add or update README sections documenting the change
2. Add tests where appropriate
3. Keep changes small and focused — open a PR with a clear description

## Troubleshooting

- If the server doesn't start, check that the required Node version is installed and that no other process is using the port.
- Check `server.js` for the configured port and any required environment variables.

## Credits & Resources

- Express.js documentation — https://expressjs.com/
- REST API design guidance — https://restfulapi.net/

---

If you'd like, I can also:

- Add example JSON request/response samples in each route
- Add a small Postman collection
- Add basic tests for the products routes

Update summary: a full, friendly README was added to help students and reviewers run and understand the project.
