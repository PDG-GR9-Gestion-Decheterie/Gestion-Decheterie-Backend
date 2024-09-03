import app from "./server.js";
import { initializeDB } from "./database/orm.js";

// Function to start the server
async function startServer() {
  console.log("Starting server...");
  await initializeDB();
  app.listen(80, () => {
    console.log(`Listening on port 80`);
  });
}

// Start the server
startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
