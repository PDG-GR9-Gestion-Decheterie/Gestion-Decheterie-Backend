import { sequelize } from "./orm.js";

export const CreateView = async () => {
  createDecheteriePrincipaleView()
    .then(() => console.log("View decheterie_principale created successfully"))
    .catch((err) =>
      console.error("Error creating view decheterie_principale:", err)
    );
  createSecretaireDecheterieEmployeView()
    .then(() =>
      console.log("View secretaire_decheterie_employe created successfully")
    )
    .catch((err) =>
      console.error("Error creating view secretaire_decheterie_employe:", err)
    );
  createSecretaireDecheterieRamassageView()
    .then(() =>
      console.log("View secretaire_decheterie_ramassage created successfully")
    )
    .catch((err) =>
      console.error("Error creating view secretaire_decheterie_ramassage:", err)
    );
  createProfileEmployeView()
    .then(() => console.log("View profil_employe created successfully"))
    .catch((err) => console.error("Error creating view profil_employe:", err));
};

const createDecheteriePrincipaleView = async () => {
  await sequelize.query(`
    CREATE OR REPLACE VIEW decheterie_principale AS
    SELECT p.FK_principale AS decheterie_principale_id, d1.nom AS decheterie_principale_nom,
           d2.id AS decheterie_id, d2.nom AS nom_decheterie
    FROM principale p
    JOIN decheterie d1 ON d1.id = p.FK_principale
    JOIN decheterie d2 ON d2.id = p.FK_decheterie;
  `);
};
const createSecretaireDecheterieEmployeView = async () => {
  await sequelize.query(`
    CREATE OR REPLACE VIEW secretaire_decheterie_employe AS
    SELECT d.id AS id_decheterie, d.nom AS nom_decheterie,
           e.idlogin AS id_employe, e.nom AS nom_employe, e.prenom AS prenom_employe, e.FK_fonction AS fonction_employe,
           e.datenaissance AS date_naissance, e.datedebutcontrat AS date_debut_contrat, e.numtelephone AS numero_telephone,
           e.typepermis AS type_permis
    FROM employe e
    JOIN decheterie d ON d.id = e.fk_decheterie;
  `);
};

const createSecretaireDecheterieRamassageView = async () => {
  await sequelize.query(`
    CREATE OR REPLACE VIEW secretaire_decheterie_ramassage AS
    SELECT r.id AS id_ramassage, r.date AS date_ramassage,
           d.id AS id_decheterie, d.nom AS nom_decheterie, r.fk_status AS status_ramassage,
           ed.idlogin AS id_employe, ed.nom AS nom_employe, ed.prenom AS prenom_employe,
           c.id AS id_contenant, c.nom AS nom_contenant, r.poids AS poids,
           c.taille AS taille_contenant, c.nbCadre AS nbCadre_contenant,
           v.type AS type_vehicule, v.immatriculation AS immatriculation_vehicule
    FROM decheterie d
    JOIN ramassage r ON r.FK_decheterie = d.id
    JOIN contenant c ON c.id = r.FK_contenant
    JOIN vehicule v ON v.immatriculation = r.FK_vehicule
    JOIN employe ed ON ed.idlogin = r.FK_employee;
  `);
};

const createProfileEmployeView = async () => {
  await sequelize.query(`
   CREATE OR REPLACE VIEW profil_employe AS
SELECT 
    e.idLogin AS id_employe, 
    e.nom AS nom_employe, 
    e.prenom AS prenom_employe, 
    e.dateNaissance AS date_naissance, 
    e.dateDebutContrat AS date_debut_contrat, 
    e.numTelephone AS numero_telephone, 
    e.typePermis AS type_permis,
    a.rue AS rue_adresse, 
    a.numero AS numero_adresse, 
    a.NPA AS npa_adresse, 
    a.nomVille AS ville_adresse, 
    a.pays AS pays_adresse,
    d.nom AS nom_decheterie,
    f.nom AS nom_fonction
FROM 
    employe e
JOIN 
    adresse a ON e.FK_adresse = a.id
JOIN 
    decheterie d ON e.FK_decheterie = d.id
JOIN 
    fonction f ON e.FK_fonction = f.nom;
  `);
};
