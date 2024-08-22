import { Sequelize } from "sequelize";

let sequelize;
export let models;

export async function initializeDB() {
  try {
    sequelize = new Sequelize(
      `postgres://bdr:bdr@host.docker.internal:5432/bdr`
    );

    console.log("Connection string:", sequelize.config);

    await sequelize
      .query("SET search_path TO gestion_decheterie")
      .then(() => {
        console.log("Schema defined successfully");
      })
      .catch((err) => {
        console.error("Error while defining schema :", err);
      });

    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    models = defineModels(sequelize);

    await sequelize.sync({ schema: "gestion_decheterie" });
    console.log("Models have been synchronized successfully.");
  } catch (error) {
    console.error("An error occurred:", error);
  }
}
