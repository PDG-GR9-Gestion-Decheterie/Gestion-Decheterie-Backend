import cors from "cors";
import session from "express-session";

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
