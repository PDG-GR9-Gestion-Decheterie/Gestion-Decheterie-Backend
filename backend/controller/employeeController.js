import { models } from "../database/orm.js";
import bcrypt from "bcrypt";

async function test() {
  console.log("Test db ok");
  let empl = await models.Employe.findAll();
  console.log(empl);
}

test();

// Get tous les employes - /employes
export async function getEmployees(req, res) {
  try {
    let employes = null;
    let employesData = [];
    employes = await models.Employe.findAll();
    if (employes === null) {
      throw new Error();
    }
    for (let employe of employes) {
      let decheterie = await models.Decheterie.findByPk(
        employe.dataValues.fk_decheterie
      );
      let adresse = await models.Adresse.findByPk(
        employe.dataValues.fk_adresse
      );
      let employeData = { ...employe.dataValues };
      if (decheterie) {
        employeData = {
          ...employeData,
          ...flattenObject(decheterie.dataValues, "decheterie_"),
        };
      }
      if (adresse) {
        employeData = {
          ...employeData,
          ...flattenObject(adresse.dataValues, "adresse_"),
        };
      }

      delete employeData.mdplogin;
      delete employeData.fk_adresse;
      delete employeData.fk_decheterie;
      delete employeData.decheterie_id;
      delete employeData.decheterie_fk_adresse;
      delete employeData.adresse_id;
      employesData.push(employeData);
    }
    res.status(200).json(employesData);
  } catch (err) {
    console.error("Error fetching employes:", err);
    res.status(404).json({ error: "Error" });
  }
}

// Get un employe par id - /employes/:id
export async function getEmployeeById(req, res) {
  try {
    let employe = null;

    employe = await models.Employe.findByPk(req.params.id);

    if (employe === null) {
      throw new Error();
    }

    let employeData = employe.dataValues;
    delete employeData.mdplogin;
    res.status(200).json({ employeData });
  } catch (err) {
    console.error("Error fetching employe:", err);
    res.status(404).json({ error: "Error" });
  }
}
// Créer un employe - /employes
export async function createEmployee(req, res) {
  try {
    const salt = await bcrypt.genSalt(10);
    console.log("salt", salt);
    const hashedPassword = await bcrypt.hash(req.body.mdplogin, salt);
    const newEmploye = await models.Employe.create({
      ...req.body,
      mdplogin: hashedPassword,
    });
    await newEmploye.save();
    res.status(201).json({
      message: "Employe added successfully",
      employe: newEmploye,
    });
  } catch (err) {
    console.error("Error adding employe:", err);
    res.status(500).json({ error: "Error adding employe" });
  }
}
// Mettre à jour un employe - /employes/:id
export async function updateEmployee(req, res) {
  try {
    let employe = null;

    employe = await models.Employe.findByPk(req.params.id);

    if (!employe) {
      throw new Error("Employe not found");
    }

    employe.set({
      ...req.body,
    });
    await employe.save();

    res.status(200).json({ message: "Employe updated successfully" });
  } catch (err) {
    console.error("Error updating employe:", err);
    res.status(500).json({ error: "Error updating employe" });
  }
}
// Supprimer un employe - /employes/:id
export async function deleteEmployee(req, res) {
  try {
    let employe = null;

    employe = await models.Employe.findByPk(req.params.id);

    if (!employe) {
      throw new Error("Employe not found");
    }

    await employe.destroy(); // Supprimer le ramassage de la base de données
    res.status(200).json({ message: "Employe deleted successfully" });
  } catch (err) {
    console.error("Error deleting employe:", err);
    res.status(500).json({ error: "Error deleting employe" });
  }
}
// Recuperer le profil de l'employe connecté - /employes/profil
export async function getEmployeeProfile(req, res) {
  try {
    let employe = null;
    employe = await models.Employe.findByPk(req.user.idlogin);

    if (employe === null) {
      throw new Error();
    }

    let decheterie = await models.Decheterie.findByPk(
      employe.dataValues.fk_decheterie
    );

    let adresse = await models.Adresse.findByPk(employe.dataValues.fk_adresse);
    let employeData = { ...employe.dataValues };
    if (decheterie) {
      employeData = {
        ...employeData,
        ...flattenObject(decheterie.dataValues, "decheterie_"),
      };
    }
    if (adresse) {
      employeData = {
        ...employeData,
        ...flattenObject(adresse.dataValues, "adresse_"),
      };
    }

    delete employeData.mdplogin;
    delete employeData.fk_adresse;
    delete employeData.fk_decheterie;
    delete employeData.decheterie_id;
    delete employeData.decheterie_fk_adresse;
    delete employeData.adresse_id;
    res.status(200).json({ employeData });
  } catch (err) {
    console.error("Error fetching employe:", err);
    res.status(404).json({ error: "Error" });
  }
}

function flattenObject(obj, prefix = "") {
  const flattened = {};

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        // Récursivité pour aplatir les objets imbriqués
        Object.assign(flattened, flattenObject(obj[key], `${prefix}${key}_`));
      } else {
        // Ajoute la propriété avec le préfixe
        flattened[`${prefix}${key}`] = obj[key];
      }
    }
  }

  return flattened;
}
