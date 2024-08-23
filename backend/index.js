import app from "./server.js";
import { initializeDB } from "./database/orm.js";
import { models } from "./database/orm.js";

console.log("Starting server...");
await initializeDB();
app.listen(80, () => {
  console.log(`Listening on port 80`);
});

console.log("Test db ok");
console.log(models.Employe.findAll());
