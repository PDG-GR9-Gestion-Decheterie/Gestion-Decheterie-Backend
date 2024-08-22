import express from "express";
import {
  getEmployees,
  getEmployeeById,
  deleteEmployee,
  updateEmployee,
  createEmployee,
} from "./controller/employeeController.js";
const app = express();

// Log all requests to console
app.use("/api", (req, res, next) => {
  console.log("Request for " + req.originalUrl);
  next();
});

app.get("/api", (req, res) => {
  res.send("API Gestion Déchèterie");
});
//-------------------------------------------------------------------//
//-------------------------- API Endpoints --------------------------//
//-------------------------------------------------------------------//

// Handle browser trying to fetch favicon
app.get("/api/favicon.ico", (req, res) => res.status(204));

//-------------------------------------------------------------------//
// ---------------------- Endpoints Employes ----------------------- //
app.get("/api/employes", getEmployees);
app.get("/api/employes/:id", getEmployeeById);
app.put("/api/employes/:id", updateEmployee);
app.delete("/api/employes/:id", deleteEmployee);
app.post("/api/employes", createEmployee);

export default app;
