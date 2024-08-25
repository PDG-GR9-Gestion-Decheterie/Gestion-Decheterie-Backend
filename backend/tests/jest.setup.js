import { initializeDB } from "../database/orm.js";

beforeAll(async () => {
  // Initialize DB connection before running any tests
  await initializeDB();
});
