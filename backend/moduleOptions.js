import cors from "cors";
import session from "express-session";
import rateLimit from "express-rate-limit";
import compression from "compression";

const apiUrl = process.env.BACKEND_APP_API_URL;

export const corsOptions = cors({
  origin: apiUrl,
  credentials: true,
});

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
export const loginLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5,
  message: {
    error: "Too many login attempts, please try again after 1 minute.",
  },
});
export const compressionOptions = compression({
  threshold: 1024, // 1KB minimum size before compression
  level: 4, // 1-9 compression level
  filter: (req, res) => {
    return req.headers["x-no-compression"] !== "true";
  },
});
// Error handler middleware, used to send a generic error message to the user when the db is down for example
export function errorHandler(err, req, res, next) {
  if (err) {
    console.error("Error:", err.message); // Log the error message for internal use
    res.status(500).json({ message: "Error" }); // Send a generic error message to the user
  } else {
    next();
  }
}
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
