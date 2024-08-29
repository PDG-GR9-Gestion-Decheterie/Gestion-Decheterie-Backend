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
  number: "1",
  street: "Chemin du test",
  city: "Fribourg",
  region: "Fribourg",
  postcode: "1880",
};

const adresse1UpdateRequest = {
  id: 10,
  number: "1",
  street: "Chemin du tesssst",
  city: "Fribourg",
  region: "Fribourg",
  postcode: "1880",
};

const adresse1GetOneResponse = {
  adresseData: {
    id: 10,
    number: "1",
    street: "Chemin du test",
    city: "Fribourg",
    region: "Fribourg",
    postcode: "1880",
  },
};

const adresse1GetAllResponse = {
  adressesData: [
    {
      id: 10,
      number: "1",
      street: "Chemin du test",
      city: "Fribourg",
      region: "Fribourg",
      postcode: "1880",
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
