# WeReact

Social networking API built with Node.js, Express, TypeScript, and MongoDB.

## Quick Start

```bash
npm install
npm run start
```

## API Endpoints

**Users**

- `GET /api/users` - Get all users
- `POST /api/users` - Create user
- `GET /api/users/:id` - Get user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user
- `POST /api/users/:id/friends/:friendId` - Add friend
- `DELETE /api/users/:id/friends/:friendId` - Remove friend

**Thoughts**

- `GET /api/thoughts` - Get all thoughts
- `POST /api/thoughts` - Create thought
- `GET /api/thoughts/:id` - Get thought
- `PUT /api/thoughts/:id` - Update thought
- `DELETE /api/thoughts/:id` - Delete thought
- `POST /api/thoughts/:id/reactions` - Add reaction
- `DELETE /api/thoughts/:id/reactions/:reactionId` - Remove reaction

## Tech Stack

- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose
