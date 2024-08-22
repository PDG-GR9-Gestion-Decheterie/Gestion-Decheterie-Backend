import { models } from "../orm.js";

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
export async function getEmployeeById(req, res) {}
// Créer un employe - /employes
export async function createEmployee(req, res) {}
// Mettre à jour un employe - /employes/:id
export async function updateEmployee(req, res) {}
// Supprimer un employe - /employes/:id
export async function deleteEmployee(req, res) {}
