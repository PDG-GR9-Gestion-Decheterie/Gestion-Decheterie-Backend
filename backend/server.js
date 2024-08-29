import express from "express";
import passport from "passport";
import LocalStrategy from "passport-local";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import { corsOptions, sessionOptions, checkRole } from "./moduleOptions.js";
import { models } from "./database/orm.js";
import {
  getEmployees,
  getEmployeeById,
  deleteEmployee,
  updateEmployee,
  createEmployee,
  getEmployeeProfile,
} from "./controller/employeeController.js";
const app = express();

import {
  getRamassages,
  getRamassageById,
  deleteRamassage,
  updateRamassage,
  createRamassage,
} from "./controller/ramassageController.js";
import {
  getVehicules,
  getVehiculeById,
  deleteVehicule,
  updateVehicule,
  createVehicule,
} from "./controller/vehiculeController.js";
import {
  getDecheteries,
  getDecheterieById,
  createDecheterie,
  updateDecheterie,
  deleteDecheterie,
} from "./controller/decheterieController.js";
import {
  getContenantsDecheterie,
  getContenantById,
  createContenant,
  updateContenant,
  deleteContenant,
} from "./controller/contenantController.js";
import {
  getAdressesSearch,
  getAdresseById,
  createAdresse,
  updateAdresse,
  deleteAdresse,
} from "./controller/adresseController.js";
import {
  getFonctions,
  getStatus,
  getDechets,
} from "./controller/dropdownController.js";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(corsOptions);
app.use(sessionOptions);
app.use(passport.initialize());
app.use(passport.session());

// Log all requests to console
app.use("/api", (req, res, next) => {
  console.log("Request for " + req.originalUrl);
  next();
});

//--------------------------------------------------------------------//
//---------------------- Passport Configuration ----------------------//
passport.serializeUser((user, done) => {
  done(null, user.idlogin);
});

passport.deserializeUser(async (username, done) => {
  try {
    const user = await models.Employe.findByPk(username);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await models.Employe.findByPk(username);
      if (user === null) {
        // User not found, perform a dummy bcrypt check to mitigate timing attacks
        await bcrypt.compare(password, "$2b$10$dummyhashdummyhashdummyhashdum");
        console.log("Performing dummy check");
        return done(null, false, {
          error: "Login failed",
        });
      }
      const match = await bcrypt.compare(password, user.mdplogin);
      if (!match) {
        return done(null, false, {
          error: "Login failed",
        });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);
//-------------------------------------------------------------------//
// ------------------ Endpoints Authentification ------------------- //

app.post("/api/login", (req, res, next) => {
  try {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ error: "Login failed" });
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        return res
          .status(200)
          .json({ idlogin: user.idlogin, fonction: user.fk_fonction });
      });
    })(req, res, next);
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Login failed" });
  }
});

// Logout endpoint
app.post("/api/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      res.status(500).send({ error: "Logged out failed" });
    }
    // Destroy the session data
    req.session.destroy(() => {
      // Clear the cookie associated with the session
      res.clearCookie("connect.sid", { path: "/" });
      res.status(200).send({ message: "Logged out successfully" }); // Confirmation message
    });
  });
});

//-------------------------------------------------------------------//
//-------------------------- API Endpoints --------------------------//
//-------------------------------------------------------------------//

// Handle browser trying to fetch favicon
app.get("/api/favicon.ico", (req, res) => res.status(204));

//-------------------------------------------------------------------//
// ---------------------- Endpoints Employes ----------------------- //
app.get("/api/employes", checkRole(["Responsable"]), getEmployees);
app.get("/api/employes/:id", checkRole(["Responsable"]), getEmployeeById);
app.put("/api/employes/:id", checkRole(["Responsable"]), updateEmployee);
app.delete("/api/employes/:id", checkRole(["Responsable"]), deleteEmployee);
app.post("/api/employes", checkRole(["Responsable"]), createEmployee);
app.get("/api/profile", checkRole(["All"]), getEmployeeProfile);
//-------------------------------------------------------------------//
// ---------------------- Endpoints Ramassages ----------------------- //
app.get("/api/ramassages", checkRole(["All"]), getRamassages);
app.get("/api/ramassages/:id", checkRole(["All"]), getRamassageById);
app.put(
  "/api/ramassages/:id",
  checkRole(["Responsable", "Secrétaire"]),
  updateRamassage
);
app.delete(
  "/api/ramassages/:id",
  checkRole(["Responsable", "Secrétaire"]),
  deleteRamassage
);
app.post("/api/ramassages", checkRole(["All"]), createRamassage);
//-------------------------------------------------------------------//
// ---------------------- Endpoints Vehicule ----------------------- //
app.get("/api/vehicules", checkRole(["All"]), getVehicules);
app.get("/api/vehicules/:id", checkRole(["All"]), getVehiculeById);
app.put(
  "/api/vehicules/:id",
  checkRole(["Responsable", "Secrétaire"]),
  updateVehicule
);
app.delete(
  "/api/vehicules/:id",
  checkRole(["Responsable", "Secrétaire"]),
  deleteVehicule
);
app.post(
  "/api/vehicules",
  checkRole(["Responsable", "Secrétaire"]),
  createVehicule
);
//-------------------------------------------------------------------//
// ---------------------- Endpoints Decheterie  ----------------------- //
app.get("/api/decheteries", checkRole(["All"]), getDecheteries);
app.get("/api/decheteries/:id", checkRole(["All"]), getDecheterieById);
app.put("/api/decheteries/:id", checkRole(["Responsable"]), updateDecheterie);
app.post("/api/decheteries", checkRole(["Responsable"]), createDecheterie);
app.delete(
  "/api/decheteries/:id",
  checkRole(["Responsable"]),
  deleteDecheterie
);
//-------------------------------------------------------------------//
// ---------------------- Endpoints Contenant  ----------------------- //
app.get("/api/contenants/", checkRole(["All"]), getContenantsDecheterie);
app.get("/api/contenants/:id", checkRole(["All"]), getContenantById);
app.put(
  "/api/contenants/:id",
  checkRole(["Responsable", "Secrétaire"]),
  updateContenant
);
app.delete(
  "/api/contenants/:id",
  checkRole(["Responsable", "Secrétaire"]),
  deleteContenant
);
app.post(
  "/api/contenants",
  checkRole(["Responsable", "Secrétaire"]),
  createContenant
);
//-------------------------------------------------------------------//
// ---------------------- Endpoints Adresse  ----------------------- //
app.get("/api/adresses/:char", checkRole(["All"]), getAdressesSearch);
app.get("/api/adresses/:id", checkRole(["All"]), getAdresseById);
app.put("/api/adresses/:id", checkRole(["All"]), updateAdresse);
app.delete("/api/adresses/:id", checkRole(["All"]), deleteAdresse);
app.post("/api/adresses", checkRole(["All"]), createAdresse);
//-------------------------------------------------------------------//
// ---------------------- Endpoints DropDown  ----------------------- //
app.get("/api/fonctions", checkRole(["All"]), getFonctions);
app.get("/api/status", checkRole(["All"]), getStatus);
app.get("/api/dechets", checkRole(["All"]), getDechets);
export default app;
