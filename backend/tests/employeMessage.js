const EmployeOK = {
  add: "Employe added successfully",
  update: "Employe updated successfully",
  delete: "Employe deleted successfully",
};
const EmployeKO = {
  add: "Error adding employe",
  update: "Error updating employe",
  delete: "Error deleting employe",
  get: "Error getting employe",
};

const tdoumasCreateRequest = {
  idlogin: "tdoumas",
  mdplogin: "123",
  nom: "Doumas",
  prenom: "Tristan",
  datenaissance: "1990-01-01",
  datedebutcontrat: "2022-01-01",
  fk_fonction: "Chauffeur",
  numtelephone: "1234567890",
  typepermis: "C",
  fk_adresse: 1,
  fk_decheterie: 1,
};

const tdoumasUpdateRequest = {
  idlogin: "tdoumas",
  mdplogin: "password",
  nom: "TriTri",
  prenom: "TriTri",
  datenaissance: "1990-01-01",
  datedebutcontrat: "2022-01-01",
  fk_fonction: "Chauffeur",
  numtelephone: "1234567890",
  typepermis: "C",
  fk_adresse: 1,
  fk_decheterie: 1,
};

const tdoumasUpdateRequestPassword = {
  idlogin: "tdoumas",
  mdplogin: "password",
};

const tdoumasGetOneResponse = {
  employeData: {
    idlogin: "tdoumas",
    nom: "Doumas",
    prenom: "Tristan",
    datenaissance: "1990-01-01",
    datedebutcontrat: "2022-01-01",
    numtelephone: "1234567890",
    typepermis: "C",
    fk_adresse: 1,
    fk_decheterie: 1,
    fk_fonction: "Chauffeur",
  },
};

const tdoumasGetAllResponse = {
  employesData: [
    {
      idlogin: "Resp1",
      nom: "Nom",
      prenom: "Prenom",
      datenaissance: "2000-01-01",
      datedebutcontrat: "2020-01-01",
      numtelephone: null,
      typepermis: null,
      fk_fonction: "Responsable",
      decheterie_nom: "Decheterie Yverdon",
      adresse_number: "1",
      adresse_street: "Rue 1",
      adresse_city: "Yverdon-les-Bains",
      adresse_region: "VD",
      adresse_postcode: "1400",
    },
    {
      idlogin: "Secr1",
      nom: "Nom",
      prenom: "Prenom",
      datenaissance: "2000-01-01",
      datedebutcontrat: "2020-01-01",
      numtelephone: "0123456789",
      typepermis: null,
      fk_fonction: "Secrétaire",
      decheterie_nom: "Decheterie Yverdon",
      adresse_number: "1",
      adresse_street: "Rue 1",
      adresse_city: "Yverdon-les-Bains",
      adresse_region: "VD",
      adresse_postcode: "1400",
    },
    {
      idlogin: "Empl1",
      nom: "Nom",
      prenom: "Prenom",
      datenaissance: "2000-01-01",
      datedebutcontrat: "2020-01-01",
      numtelephone: "0123456789",
      typepermis: "B",
      fk_fonction: "Employé",
      decheterie_nom: "Decheterie Yverdon",
      adresse_number: "1",
      adresse_street: "Rue 1",
      adresse_city: "Yverdon-les-Bains",
      adresse_region: "VD",
      adresse_postcode: "1400",
    },
    {
      idlogin: "Chauff1",
      nom: "Nom",
      prenom: "Prenom",
      datenaissance: "2000-01-01",
      datedebutcontrat: "2020-01-01",
      numtelephone: null,
      typepermis: "C",
      fk_fonction: "Chauffeur",
      decheterie_nom: "Decheterie Yverdon",
      adresse_number: "1",
      adresse_street: "Rue 1",
      adresse_city: "Yverdon-les-Bains",
      adresse_region: "VD",
      adresse_postcode: "1400",
    },
    {
      idlogin: "tdoumas",
      nom: "Doumas",
      prenom: "Tristan",
      datenaissance: "1990-01-01",
      datedebutcontrat: "2022-01-01",
      numtelephone: "1234567890",
      typepermis: "C",
      fk_fonction: "Chauffeur",
      decheterie_nom: "Decheterie Yverdon",
      adresse_number: "1",
      adresse_street: "Rue 1",
      adresse_city: "Yverdon-les-Bains",
      adresse_region: "VD",
      adresse_postcode: "1400",
    },
  ],
};

const jdoeCreateRequest = {
  idlogin: "jdoe",
  mdplogin: "123",
  nom: "Doumas",
  prenom: "Tristan",
  datenaissance: "1990-01-01",
  datedebutcontrat: "2022-01-01",
  fk_fonction: "Chauffeur",
  numtelephone: "1234567890",
  typepermis: "C",
  fk_adresse: 1,
  fk_decheterie: 2,
};

const jdoeUpdateRequest = {
  idlogin: "jdoe",
  mdplogin: "password",
  nom: "TriTri",
  prenom: "TriTri",
  datenaissance: "1990-01-01",
  datedebutcontrat: "2022-01-01",
  fk_fonction: "Chauffeur",
  numtelephone: "1234567890",
  typepermis: "C",
  fk_adresse: 1,
  fk_decheterie: 2,
};

const jdoeGetOneResponse = {
  employeData: {
    idlogin: "jdoe",
    nom: "Doumas",
    prenom: "Tristan",
    datenaissance: "1990-01-01",
    datedebutcontrat: "2022-01-01",
    numtelephone: "1234567890",
    typepermis: "C",
    fk_adresse: 1,
    fk_decheterie: 2,
    fk_fonction: "Chauffeur",
  },
};

const jdoeGetAllResponse = {
  employesData: [
    {
      idlogin: "Resp2",
      nom: "Nom",
      prenom: "Prenom",
      datenaissance: "2000-01-01",
      datedebutcontrat: "2020-01-01",
      numtelephone: "0123456789",
      typepermis: null,
      fk_fonction: "Responsable",
      decheterie_nom: "Decheterie Berne",
      adresse_number: "2",
      adresse_street: "Rue 2",
      adresse_city: "Berne",
      adresse_region: "VD",
      adresse_postcode: "3000",
    },
    {
      idlogin: "Secr2",
      nom: "Nom",
      prenom: "Prenom",
      datenaissance: "2000-01-01",
      datedebutcontrat: "2020-01-01",
      numtelephone: "0123456789",
      typepermis: null,
      fk_fonction: "Secrétaire",
      decheterie_nom: "Decheterie Berne",
      adresse_number: "2",
      adresse_street: "Rue 2",
      adresse_city: "Berne",
      adresse_region: "VD",
      adresse_postcode: "3000",
    },
    {
      idlogin: "Empl2",
      nom: "Nom",
      prenom: "Prenom",
      datenaissance: "2000-01-01",
      datedebutcontrat: "2020-01-01",
      numtelephone: "0123456789",
      typepermis: "B",
      fk_fonction: "Employé",
      decheterie_nom: "Decheterie Berne",
      adresse_number: "2",
      adresse_street: "Rue 2",
      adresse_city: "Berne",
      adresse_region: "VD",
      adresse_postcode: "3000",
    },
    {
      idlogin: "Chauff2",
      nom: "Nom",
      prenom: "Prenom",
      datenaissance: "2000-01-01",
      datedebutcontrat: "2020-01-01",
      numtelephone: "0123456789",
      typepermis: "C",
      fk_fonction: "Chauffeur",
      decheterie_nom: "Decheterie Berne",
      adresse_number: "2",
      adresse_street: "Rue 2",
      adresse_city: "Berne",
      adresse_region: "VD",
      adresse_postcode: "3000",
    },
    {
      idlogin: "jdoe",
      nom: "Doumas",
      prenom: "Tristan",
      datenaissance: "1990-01-01",
      datedebutcontrat: "2022-01-01",
      numtelephone: "1234567890",
      typepermis: "C",
      fk_fonction: "Chauffeur",
      decheterie_nom: "Decheterie Berne",
      adresse_number: "1",
      adresse_street: "Rue 1",
      adresse_city: "Yverdon-les-Bains",
      adresse_region: "VD",
      adresse_postcode: "1400",
    },
  ],
};

const dech1getAllResponse = {
  // get all employes from decheterie 1
  employesData: [
    {
      idlogin: "Resp1",
      nom: "Nom",
      prenom: "Prenom",
      datenaissance: "2000-01-01",
      datedebutcontrat: "2020-01-01",
      numtelephone: null,
      typepermis: null,
      fk_fonction: "Responsable",
      decheterie_nom: "Decheterie Yverdon",
      adresse_number: "1",
      adresse_street: "Rue 1",
      adresse_city: "Yverdon-les-Bains",
      adresse_region: "VD",
      adresse_postcode: "1400",
    },
    {
      idlogin: "Secr1",
      nom: "Nom",
      prenom: "Prenom",
      datenaissance: "2000-01-01",
      datedebutcontrat: "2020-01-01",
      numtelephone: "0123456789",
      typepermis: null,
      fk_fonction: "Secrétaire",
      decheterie_nom: "Decheterie Yverdon",
      adresse_number: "1",
      adresse_street: "Rue 1",
      adresse_city: "Yverdon-les-Bains",
      adresse_region: "VD",
      adresse_postcode: "1400",
    },
    {
      idlogin: "Empl1",
      nom: "Nom",
      prenom: "Prenom",
      datenaissance: "2000-01-01",
      datedebutcontrat: "2020-01-01",
      numtelephone: "0123456789",
      typepermis: "B",
      fk_fonction: "Employé",
      decheterie_nom: "Decheterie Yverdon",
      adresse_number: "1",
      adresse_street: "Rue 1",
      adresse_city: "Yverdon-les-Bains",
      adresse_region: "VD",
      adresse_postcode: "1400",
    },
    {
      idlogin: "Chauff1",
      nom: "Nom",
      prenom: "Prenom",
      datenaissance: "2000-01-01",
      datedebutcontrat: "2020-01-01",
      numtelephone: null,
      typepermis: "C",
      fk_fonction: "Chauffeur",
      decheterie_nom: "Decheterie Yverdon",
      adresse_number: "1",
      adresse_street: "Rue 1",
      adresse_city: "Yverdon-les-Bains",
      adresse_region: "VD",
      adresse_postcode: "1400",
    },
  ],
};

const secretaireGetOneResponse = {
  employeData: {
    idlogin: "Secr1",
    nom: "Nom",
    prenom: "Prenom",
    datenaissance: "2000-01-01",
    datedebutcontrat: "2020-01-01",
    numtelephone: "0123456789",
    typepermis: null,
    fk_adresse: 1,
    fk_decheterie: 1,
    fk_fonction: "Secrétaire",
  },
};

const employeGetOneResponse = {
  employeData: {
    idlogin: "Empl1",
    nom: "Nom",
    prenom: "Prenom",
    datenaissance: "2000-01-01",
    datedebutcontrat: "2020-01-01",
    numtelephone: "0123456789",
    typepermis: "B",
    fk_adresse: 1,
    fk_decheterie: 1,
    fk_fonction: "Employé",
  },
};

const chauffeurGetOneResponse = {
  employeData: {
    idlogin: "Chauff1",
    nom: "Nom",
    prenom: "Prenom",
    datenaissance: "2000-01-01",
    datedebutcontrat: "2020-01-01",
    numtelephone: null,
    typepermis: "C",
    fk_adresse: 1,
    fk_decheterie: 1,
    fk_fonction: "Chauffeur",
  },
};

const profileResponsable1Response = {
  employeData: {
    idlogin: "Resp1",
    nom: "Nom",
    prenom: "Prenom",
    datenaissance: "2000-01-01",
    datedebutcontrat: "2020-01-01",
    numtelephone: null,
    typepermis: null,
    fk_fonction: "Responsable",
    decheterie_nom: "Decheterie Yverdon",
    adresse_number: "1",
    adresse_street: "Rue 1",
    adresse_city: "Yverdon-les-Bains",
    adresse_region: "VD",
    adresse_postcode: "1400",
  },
};

const profileSecretaire1Response = {
  employeData: {
    idlogin: "Secr1",
    nom: "Nom",
    prenom: "Prenom",
    datenaissance: "2000-01-01",
    datedebutcontrat: "2020-01-01",
    numtelephone: "0123456789",
    typepermis: null,
    fk_fonction: "Secrétaire",
    decheterie_nom: "Decheterie Yverdon",
    adresse_number: "1",
    adresse_street: "Rue 1",
    adresse_city: "Yverdon-les-Bains",
    adresse_region: "VD",
    adresse_postcode: "1400",
  },
};

const profileEmploye1Response = {
  employeData: {
    idlogin: "Empl1",
    nom: "Nom",
    prenom: "Prenom",
    datenaissance: "2000-01-01",
    datedebutcontrat: "2020-01-01",
    numtelephone: "0123456789",
    typepermis: "B",
    fk_fonction: "Employé",
    decheterie_nom: "Decheterie Yverdon",
    adresse_number: "1",
    adresse_street: "Rue 1",
    adresse_city: "Yverdon-les-Bains",
    adresse_region: "VD",
    adresse_postcode: "1400",
  },
};

const profileChauffeur1Response = {
  employeData: {
    idlogin: "Chauff1",
    nom: "Nom",
    prenom: "Prenom",
    datenaissance: "2000-01-01",
    datedebutcontrat: "2020-01-01",
    numtelephone: null,
    typepermis: "C",
    fk_fonction: "Chauffeur",
    decheterie_nom: "Decheterie Yverdon",
    adresse_number: "1",
    adresse_street: "Rue 1",
    adresse_city: "Yverdon-les-Bains",
    adresse_region: "VD",
    adresse_postcode: "1400",
  },
};

export {
  EmployeOK,
  EmployeKO,
  tdoumasCreateRequest,
  tdoumasUpdateRequest,
  tdoumasUpdateRequestPassword,
  tdoumasGetOneResponse,
  tdoumasGetAllResponse,
  jdoeCreateRequest,
  jdoeUpdateRequest,
  jdoeGetOneResponse,
  jdoeGetAllResponse,
  dech1getAllResponse,
  secretaireGetOneResponse,
  employeGetOneResponse,
  chauffeurGetOneResponse,
  profileResponsable1Response,
  profileSecretaire1Response,
  profileEmploye1Response,
  profileChauffeur1Response,
};
