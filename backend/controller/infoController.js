import { models } from "../database/orm.js";
import { flattenObject } from "./utils.js";

// Get tous les infos - /infos
export async function getInfos(req, res) {
  try {
    let infosData = [];
    let decheterieData = await models.Decheterie.findAll();

    for (let decheterie of decheterieData) {
      let decheterieData = { ...decheterie.dataValues };

      console.log("id", decheterie.dataValues.id);

      let contenants = await models.Contenant.findAll({
        where: {
          fk_decheterie: decheterie.dataValues.id,
        },
      });

      decheterieData.contenants = contenants.map((contenant) => {
        return contenant.dataValues.fk_dechet;
      });

      let adresse = await models.Adresse.findByPk(
        decheterie.dataValues.fk_adresse
      );
      if (adresse) {
        decheterieData = {
          ...decheterieData,
          ...flattenObject(adresse.dataValues, "adresse_"),
        };
      }

      delete decheterieData.fk_adresse;
      delete decheterieData.adresse_id;
      delete decheterieData.id;
      infosData.push(decheterieData);
    }

    res.status(200).json({ infosData });
  } catch (err) {
    console.error("Error fetching infos:", err);
    res.status(404).json({ error: "Error" });
  }
}
