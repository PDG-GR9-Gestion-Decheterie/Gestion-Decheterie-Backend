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
  models.Vehicule = sequelize.define(
    "vehicule",
    {
      immatriculation: {
        type: Sequelize.STRING(30),
        primaryKey: true,
      },
      type: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      remorque: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      anneefabrication: {
        type: Sequelize.STRING(10),
      },
      dateexpertise: {
        type: Sequelize.DATEONLY,
      },
      consocarburant: {
        type: Sequelize.DOUBLE,
      },
      fk_decheterie: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "vehicule",
      timestamps: false,
      schema: "gestion_decheterie",
    }
  );
  models.Contenant = sequelize.define(
    "contenant",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      nom: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      capacitemax: {
        type: Sequelize.INTEGER,
      },
      nbcadre: {
        type: Sequelize.INTEGER,
      },
      taille: {
        type: Sequelize.STRING(10),
      },
      couleur: {
        type: Sequelize.STRING(30),
      },
      fk_decheterie: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      fk_dechet: {
        type: Sequelize.STRING(30),
      },
    },
    {
      tableName: "contenant",
      timestamps: false,
      schema: "gestion_decheterie",
    }
  );
  models.Dechet = sequelize.define(
    "dechet",
    {
      type: {
        type: Sequelize.STRING(30),
        primaryKey: true,
      },
    },
    {
      tableName: "dechet",
      timestamps: false,
      schema: "gestion_decheterie",
    }
  );
  models.Fonction = sequelize.define(
    "fonction",
    {
      nom: {
        type: Sequelize.STRING(30),
        primaryKey: true,
      },
    },
    {
      tableName: "fonction",
      timestamps: false,
      schema: "gestion_decheterie",
    }
  );
  models.Status = sequelize.define(
    "status",
    {
      nom: {
        type: Sequelize.STRING(10),
        primaryKey: true,
      },
    },
    {
      tableName: "status",
      timestamps: false,
      schema: "gestion_decheterie",
    }
  );

  models.Ramassage = sequelize.define(
    "ramassage",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      poids: {
        type: Sequelize.DOUBLE,
      },
      fk_contenant: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      fk_employee: {
        type: Sequelize.STRING(30),
      },
      fk_decheterie: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      fk_vehicule: {
        type: Sequelize.STRING(30),
      },
      fk_status: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
    },
    {
      tableName: "ramassage",
      timestamps: false,
      schema: "gestion_decheterie",
    }
  );
  models.Principale = sequelize.define(
    "principale",
    {
      fk_principale: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      fk_decheterie: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
    },
    {
      tableName: "principale",
      timestamps: false,
      schema: "gestion_decheterie",
    }
  );
  models.Superviseur = sequelize.define(
    "superviseur",
    {
      fk_employee: {
        type: Sequelize.STRING(30),
        primaryKey: true,
      },
      fk_superviseur: {
        type: Sequelize.STRING(30),
        primaryKey: true,
      },
    },
    {
      tableName: "superviseur",
      timestamps: false,
      schema: "gestion_decheterie",
    }
  );
  models.DecheteriePrincipale = sequelize.define(
    "decheterie_principale",
    {
      decheterie_principale_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      decheterie_principale_nom: {
        type: Sequelize.STRING(30),
      },
      decheterie_id: {
        type: Sequelize.INTEGER,
      },
      nom_decheterie: {
        type: Sequelize.STRING(30),
      },
    },
    {
      tableName: "decheterie_principale",
      timestamps: false,
      schema: "gestion_decheterie",
    }
  );
};

export async function closeConnection() {
  sequelize.close();
}
