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

const defineModels = (sequelize) => {
  const models = {};

  models.Employe = sequelize.define(
    "employe",
    {
      idlogin: {
        type: Sequelize.STRING(30),
        primaryKey: true,
      },
      mdplogin: {
        type: Sequelize.STRING(60),
        allowNull: false,
      },
      nom: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      prenom: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      datenaissance: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      datedebutcontrat: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      numtelephone: {
        type: Sequelize.STRING(30),
      },
      typepermis: {
        type: Sequelize.STRING(30),
      },
      fk_adresse: {
        type: Sequelize.INTEGER,
      },
      fk_decheterie: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      fk_fonction: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
    },
    {
      tableName: "employe",
      timestamps: false,
      schema: "gestion_decheterie",
    }
  );
  models.Adresse = sequelize.define(
    "adresse",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      rue: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      numero: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      npa: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      nomville: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      pays: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
    },
    {
      tableName: "adresse",
      timestamps: false,
      schema: "gestion_decheterie",
    }
  );
  models.Decheterie = sequelize.define(
    "decheterie",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      nom: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      fk_adresse: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "decheterie",
      timestamps: false,
      schema: "gestion_decheterie",
    }
  );
};

export async function closeConnection() {
  sequelize.close();
}
