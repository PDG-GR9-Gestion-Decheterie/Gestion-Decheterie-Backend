import { models } from "../database/orm.js";

// Get tous les employes - /employes
export async function getEmployees(req, res) {
  try {
    let employes = null;
    employes = await models.SecretaireDecheterieEmploye.findAll();
    if (employes === null) {
      throw new Error();
    }
    res.status(200).json({ employes });
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
    if (req.user.idlogin === req.params.id) {
      employe = await models.Employe.findByPk(req.params.id);
    }

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
