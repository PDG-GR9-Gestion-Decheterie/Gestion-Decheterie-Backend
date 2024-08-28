const AdresseOK = {
  add: "Adresse added successfully",
  update: "Adresse updated successfully",
  delete: "Adresse deleted successfully",
};
const AdresseKO = {
  add: "Error adding adresse",
  update: "Error updating adresse",
  delete: "Error deleting adresse",
  get: "Error getting adresse",
};

const adresse1CreateRequest = {
  id: 10,
  rue: "Chemin du test",
  numero: "24",
  npa: "1880",
  nomville: "Fribourg",
  pays: "Suisse",
};

const adresse1UpdateRequest = {
  id: 10,
  rue: "Chemin du tesssst",
  numero: "24",
  npa: "1880",
  nomville: "Fribourg",
  pays: "Suisse",
};

const adresse1GetOneResponse = {
  adresseData: {
    id: 10,
    rue: "Chemin du test",
    numero: "24",
    npa: "1880",
    nomville: "Fribourg",
    pays: "Suisse",
  },
};

const adresse1GetAllResponse = {
  adressesData: [
    {
      id: 1,
      rue: "Rue 1",
      numero: "1",
      npa: "1400",
      nomville: "Yverdon-les-Bains",
      pays: "Suisse",
    },
    {
      id: 2,
      rue: "Rue 2",
      numero: "2",
      npa: "3000",
      nomville: "Berne",
      pays: "Suisse",
    },
    {
      id: 10,
      rue: "Chemin du test",
      numero: "24",
      npa: "1880",
      nomville: "Fribourg",
      pays: "Suisse",
    },
  ],
};

export {
  AdresseOK,
  AdresseKO,
  adresse1CreateRequest,
  adresse1UpdateRequest,
  adresse1GetOneResponse,
  adresse1GetAllResponse,
};
