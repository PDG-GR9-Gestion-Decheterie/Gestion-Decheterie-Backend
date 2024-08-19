import app from "./server.js";

console.log("Starting server...");

app.listen(80, () => {
  console.log(`Listening on port 80`);
});
