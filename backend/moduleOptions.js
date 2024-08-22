import cors from "cors";

export const corsOptions = cors({
  origin: "https://localhost",
  credentials: true,
});
