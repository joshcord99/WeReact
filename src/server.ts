import express from 'express';
import routes from './routes/index.js';
import db from './config/connection.js';

// Connect to the database
await db();

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware to parse URL-encoded and JSON request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Mount all routes under the /api base path
app.use(routes);

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}!`);
});
