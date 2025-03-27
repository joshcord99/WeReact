import express from "express";
import routes from "./routes/index.js";
import db from "./config/connection.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";

// Connect to the database
await db();

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware to parse URL-encoded and JSON request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from public directory
app.use("/public", express.static("src/public"));

// Mount all routes
app.use(routes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}!`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err: Error) => {
  console.error("Unhandled Promise Rejection:", err);
  process.exit(1);
});
