import { Request, Response, NextFunction } from "express";

export const validateUserInput = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { username, email } = req.body;

  if (!username || !email) {
    res.status(400).json({
      success: false,
      error: "Username and email are required",
    });
    return;
  }

  if (username.length < 3) {
    res.status(400).json({
      success: false,
      error: "Username must be at least 3 characters long",
    });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({
      success: false,
      error: "Please provide a valid email address",
    });
    return;
  }

  next();
};

export const validateThoughtInput = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { thoughtText, username } = req.body;

  if (!thoughtText || !username) {
    res.status(400).json({
      success: false,
      error: "Thought text and username are required",
    });
    return;
  }

  if (thoughtText.length < 1 || thoughtText.length > 280) {
    res.status(400).json({
      success: false,
      error: "Thought text must be between 1 and 280 characters",
    });
    return;
  }

  next();
};
