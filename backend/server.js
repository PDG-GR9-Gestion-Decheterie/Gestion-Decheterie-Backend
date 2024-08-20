import express from "express";

const app = express();

// Log all requests to console
app.use("/api", (req, res, next) => {
  console.log("Request for " + req.originalUrl);
  next();
});

app.get("/api", (req, res) => {
  res.send("Hello World!");
});

export default app;
