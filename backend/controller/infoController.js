import { models } from "../database/orm.js";
import { flattenObject } from "./utils.js";

export async function getInfos(req, res) {
  try {
    let response = [];
    let decheterieData = await models.Decheterie.findAll();

    for (let decheterie of decheterieData) {
      let decheterieData = { ...decheterie.dataValues };

      console.log("id", decheterie.dataValues.id);

      let contenants = await models.Contenant.findAll({
        where: {
          fk_decheterie: decheterie.dataValues.id,
        },
      });

      let i = 0;
      for (let c of contenants) {
        let dechet = [c.dataValues.fk_dechet];
        i++;
        if (c) {
          decheterieData = {
            ...decheterieData,
            ...flattenObject(dechet, "contenant" + i + "_"),
          };
        }
      }

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
      response.push(decheterieData);
    }

    res.status(200).json(response);
  } catch (err) {
    console.error("Error fetching infos:", err);
    res.status(404).json({ error: "Error" });
  }
}
