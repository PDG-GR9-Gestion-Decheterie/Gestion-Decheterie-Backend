import cors from "cors";
import session from "express-session";
import rateLimit from "express-rate-limit";
import compression from "compression";
import winston from "winston";
import path from "path";

// Define the API URL from the .env file
const apiUrl = process.env.BACKEND_APP_API_URL;

// Define the CORS options
export const corsOptions = cors({
  origin: apiUrl,
  credentials: true,
});

// Define the session options
export const sessionOptions = session({
  secret: "2kLq6}3uH@;{3,sT73H:8%24)4w^EKBZx2+rESg6k4GMwe_?2bm",
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    httpOnly: true,
    sameSite: "strict",
    maxAge: 21600000,
  },
});

// Define the rate limiter options for the login route
export const loginLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5,
  message: {
    error: "Too many login attempts, please try again after 1 minute",
  },
  skipSuccessfulRequests: true, // Ne pas compter les requêtes réussies
});

// Define the compression options
export const compressionOptions = compression({
  threshold: 1024, // 1KB minimum size before compression
  level: 4, // 1-9 compression level
  filter: (req, res) => {
    return req.headers["x-no-compression"] !== "true";
  },
});

// Define the logger options
export const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({
      filename: path.join("/var/log", "app.log"),
      handleExceptions: true,
    }),
  ],
  exitOnError: false,
});

// Error handler middleware, used to send a generic error message to the user when the db is down for example
export function errorHandler(err, req, res, next) {
  if (err) {
    console.error("Error:", err.message); // Log the error message for internal use
    logger.error(err.message); // Log the error message to the log file
    res.status(500).json({ message: "Error" }); // Send a generic error message to the user
  } else {
    next();
  }
}

// Check if the user is authenticated and has the required role
export const checkRole = (requiredRoles) => {
  return (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (requiredRoles.includes("All")) {
      return next();
    }
    const userRole = req.user.fk_fonction;

    if (!requiredRoles.includes(userRole)) {
      return res.status(403).json({ error: "Forbidden" });
    }

    next();
  };
};
