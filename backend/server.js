import express from "express";

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
app.get("/api/employes", ensureAuthenticated, getEmployees);
app.get("/api/employes/:id", ensureAuthenticated, getEmployeeById);
app.put("/api/employes/:id", ensureAuthenticated, updateEmployee);
app.delete("/api/employes/:id", ensureAuthenticated, deleteEmployee);
app.post("/api/employes", ensureAuthenticated, createEmployee);

export default app;
