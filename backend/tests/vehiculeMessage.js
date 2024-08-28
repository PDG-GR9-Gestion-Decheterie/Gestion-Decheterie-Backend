const VehiculeOK = {
  add: "Vehicule added successfully",
  update: "Vehicule updated successfully",
  delete: "Vehicule deleted successfully",
};

const VehiculeKO = {
  add: "Error adding vehicule",
  update: "Error updating vehicule",
  delete: "Error deleting vehicule",
  get: "Error getting vehicule",
};

const truck1CreateRequest = {
  immatriculation: "VD999999",
  type: "camion",
  remorque: false,
  anneefabrication: "2010",
  dateexpertise: "2022-01-01",
  consocarburant: 10.5,
  fk_decheterie: 1,
};

const truck1GetOneResponse = {
  vehiculeData: {
    immatriculation: "VD999999",
    type: "camion",
    remorque: false,
    anneefabrication: "2010",
    dateexpertise: "2022-01-01",
    consocarburant: 10.5,
    fk_decheterie: 1,
  },
};

const truck1UpdateRequest = {
  immatriculation: "VD999999",
  type: "camion",
  remorque: true,
  anneefabrication: "2011",
  dateexpertise: "2022-01-01",
  consocarburant: 10.5,
  fk_decheterie: 1,
};

const truck1getAllResponse = {
  vehiculesData: [
    {
      immatriculation: "VD100000",
      type: "camion",
      remorque: false,
      anneefabrication: "2010",
      dateexpertise: "2022-01-01",
      consocarburant: 10.5,
      decheterie_nom: "Decheterie Yverdon",
    },
    {
      immatriculation: "VD100001",
      type: "camionnette",
      remorque: false,
      anneefabrication: "2010",
      dateexpertise: "2022-01-01",
      consocarburant: 10.5,
      decheterie_nom: "Decheterie Yverdon",
    },
    {
      immatriculation: "VD999999",
      type: "camion",
      remorque: false,
      anneefabrication: "2010",
      dateexpertise: "2022-01-01",
      consocarburant: 10.5,
      decheterie_nom: "Decheterie Yverdon",
    },
  ],
};

const truck2CreateRequest = {
  immatriculation: "VD888888",
  type: "camion",
  remorque: false,
  anneefabrication: "2010",
  dateexpertise: "2022-01-01",
  consocarburant: 10.5,
  fk_decheterie: 2,
};

const truck2GetOneResponse = {
  vehiculeData: {
    immatriculation: "VD888888",
    type: "camion",
    remorque: false,
    anneefabrication: "2010",
    dateexpertise: "2022-01-01",
    consocarburant: 11.5,
    fk_decheterie: 2,
  },
};

const truck2UpdateRequest = {
  immatriculation: "VD888888",
  type: "camion",
  remorque: true,
  anneefabrication: "2010",
  dateexpertise: "2022-01-01",
  consocarburant: 11.5,
  fk_decheterie: 2,
};

const dechet1GetAllResponse = {
  vehiculesData: [
    {
      immatriculation: "VD100000",
      type: "camion",
      remorque: false,
      anneefabrication: "2010",
      dateexpertise: "2022-01-01",
      consocarburant: 10.5,
      decheterie_nom: "Decheterie Yverdon",
    },
    {
      immatriculation: "VD100001",
      type: "camionnette",
      remorque: false,
      anneefabrication: "2010",
      dateexpertise: "2022-01-01",
      consocarburant: 10.5,
      decheterie_nom: "Decheterie Yverdon",
    },
  ],
};

export {
  VehiculeOK,
  VehiculeKO,
  truck1CreateRequest,
  truck1GetOneResponse,
  truck1UpdateRequest,
  truck1getAllResponse,
  truck2CreateRequest,
  truck2GetOneResponse,
  truck2UpdateRequest,
  dechet1GetAllResponse,
};
