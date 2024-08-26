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
  // todo}
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
    remorque: true,
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
  //todo
};

export {
  truck1CreateRequest,
  truck1GetOneResponse,
  truck1UpdateRequest,
  truck1getAllResponse,
  truck2CreateRequest,
  truck2GetOneResponse,
  truck2UpdateRequest,
  dechet1GetAllResponse,
};
