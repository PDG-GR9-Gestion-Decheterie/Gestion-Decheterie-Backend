import cors from "cors";
import session from "express-session";

export const corsOptions = cors({
  origin: "https://localhost",
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
