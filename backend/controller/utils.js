import { models } from "../database/orm.js";
export function flattenObject(obj, prefix = "") {
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

export async function findDecheteriePrinciaple(id) {
  let employee = await models.Employe.findOne({
    where: {
      idlogin: id,
    },
  });

  if (!employee) {
    throw new Error("Employee not found");
  }
  let principal = await models.Principale.findOne({
    where: {
      fk_decheterie: employee.dataValues.fk_decheterie,
    },
  });

  if (!principal) {
    throw new Error("Principal not found");
  }
  let principales = await models.Principale.findAll({
    where: {
      fk_principale: principal.dataValues.fk_principale,
    },
  });
  let decheteries = [];
  for (let principal of principales) {
    decheteries.push(principal.dataValues.fk_decheterie);
  }
  return decheteries;
}
