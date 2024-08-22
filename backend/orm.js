import { Sequelize } from "sequelize";

let sequelize;
export let models;

export async function initializeDB() {
  try {
    sequelize = new Sequelize(
      `postgres://bdr:bdr@host.docker.internal:5432/bdr`
    );

    console.log("Connection string:", sequelize.config);

}
