const DecheterieOK = {
  add: "Decheterie added successfully",
  update: "Decheterie updated successfully",
  delete: "Decheterie deleted successfully",
};
const DecheterieKO = {
  add: "Error adding decheterie",
  update: "Error updating decheterie",
  delete: "Error deleting decheterie",
  get: "Error getting decheterie",
};

const decheterie1CreateRequest = {
  id: 10,
  nom: "Decheterie Test",
  fk_adresse: 1,
};

const decheterie1UpdateRequest = {
  id: 10,
  nom: "Decheterie Tesssssssst",
  fk_adresse: 1,
};

const decheterie1GetOneResponse = {
  decheterieData: {
    id: 10,
    nom: "Decheterie Test",
    fk_adresse: 1,
  },
};

const decheterie1GetAllResponse = {
  decheteriesData: [
    {
      id: 1,
      nom: "Decheterie Yverdon",
      adresse_rue: "Rue 1",
      adresse_numero: "1",
      adresse_npa: "1400",
      adresse_nomville: "Yverdon-les-Bains",
      adresse_pays: "Suisse",
    },
    {
      id: 10,
      nom: "Decheterie Test",
      adresse_rue: "Rue 1",
      adresse_numero: "1",
      adresse_npa: "1400",
      adresse_nomville: "Yverdon-les-Bains",
      adresse_pays: "Suisse",
    },
  ],
};

const decheterie2CreateRequest = {
  id: 20,
  nom: "Decheterie Test",
  fk_adresse: 2,
};

const decheterie2UpdateRequest = {
  id: 20,
  nom: "Decheterie Tesssssssst",
  fk_adresse: 2,
};

const decheterie2GetOneResponse = {
  decheterieData: {
    id: 20,
    nom: "Decheterie Test",
    fk_adresse: 2,
  },
};

const decheterie2GetAllResponse = {
  decheteriesData: [
    {
      id: 2,
      nom: "Decheterie Berne",
      adresse_rue: "Rue 2",
      adresse_numero: "2",
      adresse_npa: "3000",
      adresse_nomville: "Berne",
      adresse_pays: "Suisse",
    },
  ],
};

const decheterie1GetAllResponseClear = {
  decheteriesData: [
    {
      id: 1,
      nom: "Decheterie Yverdon",
      adresse_rue: "Rue 1",
      adresse_numero: "1",
      adresse_npa: "1400",
      adresse_nomville: "Yverdon-les-Bains",
      adresse_pays: "Suisse",
    },
  ],
};

export {
  DecheterieOK,
  DecheterieKO,
  decheterie1CreateRequest,
  decheterie1UpdateRequest,
  decheterie1GetOneResponse,
  decheterie1GetAllResponse,
  decheterie2CreateRequest,
  decheterie2UpdateRequest,
  decheterie2GetOneResponse,
  decheterie2GetAllResponse,
  decheterie1GetAllResponseClear,
};
