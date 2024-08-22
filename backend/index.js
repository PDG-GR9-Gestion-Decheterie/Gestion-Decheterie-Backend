import app from "./server.js";
import { initializeDB } from "./orm.js";

console.log("Starting server...");
await initializeDB();
app.listen(80, () => {
  console.log(`Listening on port 80`);
});
