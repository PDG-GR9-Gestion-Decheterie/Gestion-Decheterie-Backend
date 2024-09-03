import express from "express";
import passport from "passport";
import LocalStrategy from "passport-local";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import {
  corsOptions,
  sessionOptions,
  checkRole,
  loginLimiter,
  compressionOptions,
  errorHandler,
  logger,
} from "./moduleOptions.js";
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
import { getAPIKey } from "./controller/mapsController.js";
import { getInfos } from "./controller/infoController.js";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from 'swagger-jsdoc';
import { swaggerOptions } from './swagger.js';

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(corsOptions);
app.use(compressionOptions);
app.use(sessionOptions);
app.use(passport.initialize());
app.use(passport.session());
app.use(errorHandler);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Log all requests to console
app.use("/api", (req, res, next) => {
  console.log("Request for " + req.originalUrl);
  const date = new Date().toISOString();
  const userId = req.user ? req.user.idlogin : 'anonymous';
  logger.info(`${req.method} ${req.url} - User ID: ${userId}`);
  next();
});
app.set("trust proxy", 1); // trust first proxy for loginlimiter
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

/**
 * @swagger
 * tags:
 *   - name: Authentification
 *     description: Endpoints related to user authentication
 *   - name: Employes
 *     description: Endpoints related to employees
 *   - name: Ramassages
 *     description: Endpoints related to ramassages
 *   - name: Vehicules
 *     description: Endpoints related to vehicules
 *   - name: Decheteries
 *     description: Endpoints related to decheteries
 *   - name: Contenants
 *     description: Endpoints related to contenants
 *   - name: Adresses
 *     description: Endpoints related to addresses
 *   - name: DropDown
 *     description: Endpoints related to dropdown data
 *   - name: Maps
 *     description: Endpoints related to maps
 *   - name: Infos
 *     description: Endpoints related to information
 */
//-------------------------------------------------------------------//
// ------------------ Endpoints Authentification ------------------- //

/**
 * @swagger
 * /api/login:
 *   post:
 *     tags:
 *       - Authentification
 *     summary: User login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Login failed
 *       500:
 *         description: Internal server error
 */
app.post("/api/login", loginLimiter, (req, res, next) => {
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

/**
 * @swagger
 * /api/logout:
 *   post:
 *     tags:
 *       - Authentification
 *     summary: User logout
 *     responses:
 *       200:
 *         description: Logged out successfully
 *       500:
 *         description: Logout failed
 */
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

/**
 * @swagger
 * /api/favicon.ico:
 *   get:
 *     tags:
 *       - Infos
 *     summary: Handle browser trying to fetch favicon
 *     responses:
 *       204:
 *         description: No content
 */
app.get("/api/favicon.ico", (req, res) => res.status(204));

//-------------------------------------------------------------------//
// ---------------------- Endpoints Employes ----------------------- //

/**
 * @swagger
 * /api/employes:
 *   get:
 *     tags:
 *       - Employes
 *     summary: Get all employees
 *     responses:
 *       200:
 *         description: A list of employees
 */
app.get("/api/employes", checkRole(["All"]), getEmployees);

/**
 * @swagger
 * /api/employes/{id}:
 *   get:
 *     tags:
 *       - Employes
 *     summary: Get employee by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Employee details
 */
app.get("/api/employes/:id", checkRole(["All"]), getEmployeeById);

/**
 * @swagger
 * /api/employes/{id}:
 *   put:
 *     tags:
 *       - Employes
 *     summary: Update employee by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
  *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idlogin:
 *                 type: string
 *               mdplogin:
 *                 type: string
 *               nom:
 *                 type: string
 *               prenom:
 *                 type: string
 *               datenaissance:
 *                 type: string
 *                 format: date
 *               datedebutcontrat:
 *                 type: string
 *                 format: date
 *               fk_fonction:
 *                 type: string
 *               numtelephone:
 *                 type: string
 *               typepermis:
 *                 type: string
 *               fk_adresse:
 *                 type: integer
 *               fk_decheterie:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Employee updated
 */
app.put("/api/employes/:id", checkRole(["Responsable"]), updateEmployee);

/**
 * @swagger
 * /api/employes/{id}:
 *   delete:
 *     tags:
 *       - Employes
 *     summary: Delete employee by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string

 *     responses:
 *       200:
 *         description: Employee deleted
 */
app.delete("/api/employes/:id", checkRole(["Responsable"]), deleteEmployee);

/**
 * @swagger
 * /api/employes:
 *   post:
 *     tags:
 *       - Employes
 *     summary: Create a new employee
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idlogin:
 *                 type: string
 *               mdplogin:
 *                 type: string
 *               nom:
 *                 type: string
 *               prenom:
 *                 type: string
 *               datenaissance:
 *                 type: string
 *                 format: date
 *               datedebutcontrat:
 *                 type: string
 *                 format: date
 *               fk_fonction:
 *                 type: string
 *               numtelephone:
 *                 type: string
 *               typepermis:
 *                 type: string
 *               fk_adresse:
 *                 type: integer
 *               fk_decheterie:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Employee created
 */
app.post("/api/employes", checkRole(["Responsable"]), createEmployee);

/**
 * @swagger
 * /api/profile:
 *   get:
 *     tags:
 *       - Employes
 *     summary: Get employee profile
 *     responses:
 *       200:
 *         description: Employee profile
 */
app.get("/api/profile", checkRole(["All"]), getEmployeeProfile);

//-------------------------------------------------------------------//
// ---------------------- Endpoints Ramassages ----------------------- //

/**
 * @swagger
 * /api/ramassages:
 *   get:
 *     tags:
 *       - Ramassages
 *     summary: Get all ramassages
 *     responses:
 *       200:
 *         description: A list of ramassages
 */
app.get("/api/ramassages", checkRole(["All"]), getRamassages);

/**
 * @swagger
 * /api/ramassages/{id}:
 *   get:
 *     tags:
 *       - Ramassages
 *     summary: Get ramassage by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ramassage details
 */
app.get("/api/ramassages/:id", checkRole(["All"]), getRamassageById);

/**
 * @swagger
 * /api/ramassages/{id}:
 *   put:
 *     tags:
 *       - Ramassages
 *     summary: Update ramassage by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               date:
 *                 type: integer
 *               fk_status:
 *                 type: string
 *               poids:
 *                 type: integer
 *               fk_contenant:
 *                 type: integer
 *               fk_employee:
 *                 type: string
 *               fk_decheterie:
 *                 type: integer
 *               fk_vehicule:
 *                 type: string
 *     responses:
 *       200:
 *         description: Ramassage updated
 */
app.put(
  "/api/ramassages/:id",
  checkRole(["Responsable", "Secrétaire"]),
  updateRamassage
);

/**
 * @swagger
 * /api/ramassages/{id}:
 *   delete:
 *     tags:
 *       - Ramassages
 *     summary: Delete ramassage by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ramassage deleted
 */
app.delete(
  "/api/ramassages/:id",
  checkRole(["Responsable", "Secrétaire"]),
  deleteRamassage
);

/**
 * @swagger
 * /api/ramassages:
 *   post:
 *     tags:
 *       - Ramassages
 *     summary: Create a new ramassage
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               date:
 *                 type: integer
 *               fk_status:
 *                 type: string
 *               poids:
 *                 type: integer
 *               fk_contenant:
 *                 type: integer
 *               fk_employee:
 *                 type: string
 *               fk_decheterie:
 *                 type: integer
 *               fk_vehicule:
 *                 type: string
 *     responses:
 *       201:
 *         description: Ramassage created
 */
app.post("/api/ramassages", checkRole(["All"]), createRamassage);

//-------------------------------------------------------------------//
// ---------------------- Endpoints Vehicule ----------------------- //

/**
 * @swagger
 * tags:
 *   - name: Vehicules
 *     description: Endpoints related to vehicules
 */

/**
 * @swagger
 * /api/vehicules:
 *   get:
 *     tags:
 *       - Vehicules
 *     summary: Get all vehicules
 *     responses:
 *       200:
 *         description: A list of vehicules
 */
app.get("/api/vehicules", checkRole(["All"]), getVehicules);

/**
 * @swagger
 * /api/vehicules/{id}:
 *   get:
 *     tags:
 *       - Vehicules
 *     summary: Get vehicule by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Vehicule details
 */
app.get("/api/vehicules/:id", checkRole(["All"]), getVehiculeById);

/**
 * @swagger
 * /api/vehicules/{id}:
 *   put:
 *     tags:
 *       - Vehicules
 *     summary: Update vehicule by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               date:
 *                 type: integer
 *               fk_status:
 *                 type: string
 *               poids:
 *                 type: integer
 *               fk_contenant:
 *                 type: integer
 *               fk_employee:
 *                 type: string
 *               fk_decheterie:
 *                 type: integer
 *               fk_vehicule:
 *                 type: string
 *     responses:
 *       200:
 *         description: Vehicule updated
 */
app.put(
  "/api/vehicules/:id",
  checkRole(["Responsable", "Secrétaire"]),
  updateVehicule
);

/**
 * @swagger
 * /api/vehicules/{id}:
 *   delete:
 *     tags:
 *       - Vehicules
 *     summary: Delete vehicule by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Vehicule deleted
 */
app.delete(
  "/api/vehicules/:id",
  checkRole(["Responsable", "Secrétaire"]),
  deleteVehicule
);

/**
 * @swagger
 * /api/vehicules:
 *   post:
 *     tags:
 *       - Vehicules
 *     summary: Create a new vehicule
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               date:
 *                 type: integer
 *               fk_status:
 *                 type: string
 *               poids:
 *                 type: integer
 *               fk_contenant:
 *                 type: integer
 *               fk_employee:
 *                 type: string
 *               fk_decheterie:
 *                 type: integer
 *               fk_vehicule:
 *                 type: string
 *     responses:
 *       201:
 *         description: Vehicule created
 */
app.post(
  "/api/vehicules",
  checkRole(["Responsable", "Secrétaire"]),
  createVehicule
);

//-------------------------------------------------------------------//
// ---------------------- Endpoints Decheterie  ----------------------- //

/**
 * @swagger
 * tags:
 *   - name: Decheteries
 *     description: Endpoints related to decheteries
 */

/**
 * @swagger
 * /api/decheteries:
 *   get:
 *     tags:
 *       - Decheteries
 *     summary: Get all decheteries
 *     responses:
 *       200:
 *         description: A list of decheteries
 */
app.get("/api/decheteries", checkRole(["All"]), getDecheteries);

/**
 * @swagger
 * /api/decheteries/{id}:
 *   get:
 *     tags:
 *       - Decheteries
 *     summary: Get decheterie by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Decheterie details
 */
app.get("/api/decheteries/:id", checkRole(["All"]), getDecheterieById);

/**
 * @swagger
 * /api/decheteries/{id}:
 *   put:
 *     tags:
 *       - Decheteries
 *     summary: Update decheterie by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               nom:
 *                 type: string
 *               fk_adresse:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Decheterie updated
 */
app.put("/api/decheteries/:id", checkRole(["Responsable"]), updateDecheterie);

/**
 * @swagger
 * /api/decheteries:
 *   post:
 *     tags:
 *       - Decheteries
 *     summary: Create a new decheterie
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               nom:
 *                 type: string
 *               fk_adresse:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Decheterie created
 */
app.post("/api/decheteries", checkRole(["Responsable"]), createDecheterie);

/**
 * @swagger
 * /api/decheteries/{id}:
 *   delete:
 *     tags:
 *       - Decheteries
 *     summary: Delete decheterie by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Decheterie deleted
 */
app.delete(
  "/api/decheteries/:id",
  checkRole(["Responsable"]),
  deleteDecheterie
);

//-------------------------------------------------------------------//
// ---------------------- Endpoints Contenant  ----------------------- //

/**
 * @swagger
 * tags:
 *   - name: Contenants
 *     description: Endpoints related to contenants
 */

/**
 * @swagger
 * /api/contenants:
 *   get:
 *     tags:
 *       - Contenants
 *     summary: Get all contenants
 *     responses:
 *       200:
 *         description: A list of contenants
 */
app.get("/api/contenants/", checkRole(["All"]), getContenantsDecheterie);

/**
 * @swagger
 * /api/contenants/{id}:
 *   get:
 *     tags:
 *       - Contenants
 *     summary: Get contenant by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contenant details
 */
app.get("/api/contenants/:id", checkRole(["All"]), getContenantById);

/**
 * @swagger
 * /api/contenants/{id}:
 *   put:
 *     tags:
 *       - Contenants
 *     summary: Update contenant by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               nom:
 *                 type: string
 *               capacitemax:
 *                 type: integer
 *               nbcadre:
 *                 type: integer
 *                 nullable: true
 *               taille:
 *                 type: integer
 *                 nullable: true
 *               couleur:
 *                 type: string
 *               fk_decheterie:
 *                 type: integer
 *               fk_dechet:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contenant updated
 */
app.put(
  "/api/contenants/:id",
  checkRole(["Responsable", "Secrétaire"]),
  updateContenant
);

/**
 * @swagger
 * /api/contenants/{id}:
 *   delete:
 *     tags:
 *       - Contenants
 *     summary: Delete contenant by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contenant deleted
 */
app.delete(
  "/api/contenants/:id",
  checkRole(["Responsable", "Secrétaire"]),
  deleteContenant
);

/**
 * @swagger
 * /api/contenants:
 *   post:
 *     tags:
 *       - Contenants
 *     summary: Create a new contenant
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               nom:
 *                 type: string
 *               capacitemax:
 *                 type: integer
 *               nbcadre:
 *                 type: integer
 *                 nullable: true
 *               taille:
 *                 type: integer
 *                 nullable: true
 *               couleur:
 *                 type: string
 *               fk_decheterie:
 *                 type: integer
 *               fk_dechet:
 *                 type: string
 *     responses:
 *       201:
 *         description: Contenant created
 */
app.post(
  "/api/contenants",
  checkRole(["Responsable", "Secrétaire"]),
  createContenant
);

//-------------------------------------------------------------------//
// ---------------------- Endpoints Adresse  ----------------------- //

/**
 * @swagger
 * tags:
 *   - name: Adresses
 *     description: Endpoints related to adresses
 */

/**
 * @swagger
 * /api/adressesSearch/{string}:
 *   get:
 *     tags:
 *       - Adresses
 *     summary: Search addresses
 *     parameters:
 *       - in: path
 *         name: string
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of addresses
 */
app.get("/api/adressesSearch/:string", checkRole(["All"]), getAdressesSearch);

/**
 * @swagger
 * /api/adresses/{id}:
 *   get:
 *     tags:
 *       - Adresses
 *     summary: Get address by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Address details
 */
app.get("/api/adresses/:id", checkRole(["All"]), getAdresseById);

/**
 * @swagger
 * /api/adresses/{id}:
 *   put:
 *     tags:
 *       - Adresses
 *     summary: Update address by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               number:
 *                 type: string
 *               street:
 *                 type: string
 *               city:
 *                 type: string
 *               region:
 *                 type: string
 *               postcode:
 *                 type: string
 *     responses:
 *       200:
 *         description: Address updated
 */
app.put("/api/adresses/:id", checkRole(["All"]), updateAdresse);

/**
 * @swagger
 * /api/adresses/{id}:
 *   delete:
 *     tags:
 *       - Adresses
 *     summary: Delete address by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Address deleted
 */
app.delete("/api/adresses/:id", checkRole(["All"]), deleteAdresse);

/**
 * @swagger
 * /api/adresses:
 *   post:
 *     tags:
 *       - Adresses
 *     summary: Create a new address
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               number:
 *                 type: string
 *               street:
 *                 type: string
 *               city:
 *                 type: string
 *               region:
 *                 type: string
 *               postcode:
 *                 type: string
 *     responses:
 *       201:
 *         description: Address created
 */
app.post("/api/adresses", checkRole(["All"]), createAdresse);

//-------------------------------------------------------------------//
// ---------------------- Endpoints DropDown  ----------------------- //

/**
 * @swagger
 * tags:
 *   - name: DropDown
 *     description: Endpoints related to dropdown options
 */

/**
 * @swagger
 * /api/fonctions:
 *   get:
 *     tags:
 *       - DropDown
 *     summary: Get all functions
 *     responses:
 *       200:
 *         description: A list of functions
 */
app.get("/api/fonctions", checkRole(["All"]), getFonctions);

/**
 * @swagger
 * /api/status:
 *   get:
 *     tags:
 *       - DropDown
 *     summary: Get all statuses
 *     responses:
 *       200:
 *         description: A list of statuses
 */
app.get("/api/status", checkRole(["All"]), getStatus);

/**
 * @swagger
 * /api/dechets:
 *   get:
 *     tags:
 *       - DropDown
 *     summary: Get all dechets
 *     responses:
 *       200:
 *         description: A list of dechets
 */
app.get("/api/dechets", checkRole(["All"]), getDechets);

//-------------------------------------------------------------------//
// ---------------------- Endpoints Maps --------------------------- //

/**
 * @swagger
 * tags:
 *   - name: Maps
 *     description: Endpoints related to maps
 */

/**
 * @swagger
 * /api/apikey:
 *   get:
 *     tags:
 *       - Maps
 *     summary: Get API key
 *     responses:
 *       200:
 *         description: API key
 */
app.get("/api/apikey", checkRole(["All"]), getAPIKey);

//-------------------------------------------------------------------//
// ---------------------- Endpoints Infos -------------------------- //

/**
 * @swagger
 * tags:
 *   - name: Infos
 *     description: Endpoints related to information
 */

/**
 * @swagger
 * /api/infos:
 *   get:
 *     tags:
 *       - Infos
 *     summary: Get information
 *     responses:
 *       200:
 *         description: Information
 */
app.get("/api/infos", getInfos);
//-------------------------------------------------------------------//
// --------------------- Error Handling DB ------------------------- //
const gracefulShutdown = async () => {
  closeConnection()
    .then(() => {
      console.log("Database connection closed gracefully.");
      process.exit(0);
    })
    .catch((err) => {
      console.error("Error closing database connection:", err);
      process.exit(1);
    });
};

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);

export default app;
