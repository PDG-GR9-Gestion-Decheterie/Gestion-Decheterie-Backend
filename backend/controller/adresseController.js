import { models } from "../database/orm.js";
import Sequelize from "sequelize";
import { Op } from "sequelize";

const limitSearchResults = 50;

// Get tous les Adresses - /adresses/:string
export async function getAdressesSearch(req, res) {
  try {
    const { string } = req.params;
    const searchTerms = string.toLowerCase().split(" "); // Diviser la chaîne en termes individuels

    // Construire un tableau de conditions de recherche pour chaque terme
    const searchConditions = searchTerms.map((term) => ({
      [Op.or]: [
        Sequelize.where(Sequelize.fn("LOWER", Sequelize.col("number")), {
          [Op.like]: `%${term}%`,
        }),
        Sequelize.where(Sequelize.fn("LOWER", Sequelize.col("street")), {
          [Op.like]: `%${term}%`,
        }),
        Sequelize.where(Sequelize.fn("LOWER", Sequelize.col("city")), {
          [Op.like]: `%${term}%`,
        }),
        Sequelize.where(Sequelize.fn("LOWER", Sequelize.col("region")), {
          [Op.like]: `%${term}%`,
        }),
        Sequelize.where(Sequelize.fn("LOWER", Sequelize.col("postcode")), {
          [Op.like]: `%${term}%`,
        }),
      ],
    }));

    // Rechercher des adresses correspondant à tous les termes avec une limite de 50 résultats
    let adressesData = await models.Adresse.findAll({
      where: {
        [Op.and]: searchConditions, // Tous les termes doivent correspondre
      },
      limit: limitSearchResults, // Limiter le nombre de résultats à 50
    });

    // Si aucun résultat n'est trouvé, rechercher des adresses correspondant à l'un des termes
    if (!adressesData.length) {
      adressesData = await models.Adresse.findAll({
        where: {
          [Op.or]: searchConditions,
        },
        limit: 50,
      });
    }

    if (!adressesData.length) {
      return res.status(404).json({ error: "No matching addresses found" });
    }

    res.status(200).json({ adressesData });
  } catch (err) {
    console.error("Error fetching addresses:", err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching addresses" });
  }
}

// Get une Adresse par id - /adresses/:id
export async function getAdresseById(req, res) {
  try {
    let adresse = null;

    adresse = await models.Adresse.findByPk(req.params.id);

    if (adresse === null) {
      throw new Error();
    }

    let adresseData = adresse.dataValues;
    res.status(200).json({ adresseData });
  } catch (err) {
    console.error("Error fetching adresse:", err);
    res.status(404).json({ error: "Error" });
  }
}

// Créer une Adresse - /adresses
export async function createAdresse(req, res) {
  try {
    // if the next id is null, find the next id
    if (req.body.id == null) {
      let maxId = await models.Adresse.max("id");
      req.body.id = maxId + 1;
    }

    const newAdresse = await models.Adresse.create(req.body);
    await newAdresse.save();
    res.status(201).json({
      message: "Adresse added successfully",
    });
  } catch (err) {
    console.error("Error adding adresse:", err);
    res.status(500).json({ error: "Error adding adresse" });
  }
}

// Mettre à jour une Adresse - /adresses/:id
export async function updateAdresse(req, res) {
  try {
    let adresse = null;

    adresse = await models.Adresse.findByPk(req.params.id);

    if (!adresse) {
      throw new Error("Decheterie not found");
    }

    adresse.set({
      ...req.body,
    });
    await adresse.save();

    res.status(200).json({ message: "Adresse updated successfully" });
  } catch (err) {
    console.error("Error updating adresse:", err);
    res.status(500).json({ error: "Error updating adresse" });
  }
}

// Supprimer une Adresse - /adresses/:id
export async function deleteAdresse(req, res) {
  try {
    let adresse = null;

    adresse = await models.Adresse.findByPk(req.params.id);

    if (!adresse) {
      throw new Error("Contenant not found");
    }

    await adresse.destroy(); // Supprimer l'adresse de la base de données
    res.status(200).json({ message: "Adresse deleted successfully" });
  } catch (err) {
    console.error("Error deleting adresse:", err);
    res.status(500).json({ error: "Error deleting adresse" });
  }
}
