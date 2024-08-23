import express from "express";
import passport from "passport";
import LocalStrategy from "passport-local";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import { corsOptions, sessionOptions } from "./moduleOptions.js";
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

app.get("/api", (req, res) => {
  res.send("API Gestion Déchèterie");
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
          message: "Login failed",
        });
      }
      const match = await bcrypt.compare(password, user.mdplogin);
      if (!match) {
        return done(null, false, {
          message: "Login failed",
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
        return res.status(401).json({ message: "Login failed" });
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
    res.status(500).json({ message: "Login failed" });
  }
});

// Logout endpoint
app.post("/api/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      res.status(500).send({ message: "Logged out failed" });
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
app.get("/api/employes", getEmployees);
app.get("/api/employes/:id", getEmployeeById);
app.put("/api/employes/:id", updateEmployee);
app.delete("/api/employes/:id", deleteEmployee);
app.post("/api/employes", createEmployee);
app.get("/api/profile", getEmployeeProfile);

app.get("/api/ramassages", getRamassages);
app.get("/api/ramassages/:id", getRamassageById);
app.put("/api/ramassages/:id", updateRamassage);
app.delete("/api/ramassages/:id", deleteRamassage);
app.post("/api/ramassages", createRamassage);

export default app;
