const ram6CreateRequest = {
  //Futur
  id: 6,
  date: 1960995200000,
  fk_status: "accepté",
  poids: 100,
  fk_contenant: 1,
  fk_employee: "rsmith2",
  fk_decheterie: 1,
  fk_vehicule: "VD756254",
};

const ram10CreateRequest = {
  //Past
  id: 10,
  date: 1660995200000,
  fk_status: "accepté",
  poids: 100,
  fk_contenant: 1,
  fk_employee: "rsmith2",
  fk_decheterie: 1,
  fk_vehicule: "VD756254",
};

const ram6UpdateRequest = {
  id: 6,
  date: 1640995200000,
  fk_status: "accepté",
  poids: 150,
  fk_contenant: 1,
  fk_employee: "rsmith2",
  fk_decheterie: 1,
  fk_vehicule: "VD756254",
};

const ram6GetOneResponse = {
  ramassageData: {
    id: 6,
    date: "2028-01-01",
    poids: 100,
    fk_contenant: 1,
    fk_employee: "rsmith2",
    fk_decheterie: 1,
    fk_vehicule: "VD756254",
    fk_status: "accepté",
  },
};

const responsableGetAllResponse = {
  //todo
  ramassagesData: [
    {
      id_ramassage: 6,
      date_ramassage: "2028-01-01",
      id_decheterie: 1,
      nom_decheterie: "Decheterie Yverdon",
      status_ramassage: "accepté",
      id_employe: "rsmith2",
      nom_employe: "Smith",
      prenom_employe: "Rebecca",
      id_contenant: 1,
      nom_contenant: "benne",
      poids: 100,
      taille_contenant: null,
      nbcadre_contenant: null,
      type_vehicule: "camion",
      immatriculation_vehicule: "VD756254",
    },
    {
      id_ramassage: 10,
      date_ramassage: "2022-08-20",
      id_decheterie: 1,
      nom_decheterie: "Decheterie Yverdon",
      status_ramassage: "accepté",
      id_employe: "rsmith2",
      nom_employe: "Smith",
      prenom_employe: "Rebecca",
      id_contenant: 1,
      nom_contenant: "benne",
      poids: 100,
      taille_contenant: null,
      nbcadre_contenant: null,
      type_vehicule: "camion",
      immatriculation_vehicule: "VD756254",
    },
  ],
};

const employeGetAllResponse = {
  //todo
  ramassagesData: [
    {
      id_ramassage: 6,
      date_ramassage: "2028-01-01",
      id_decheterie: 1,
      nom_decheterie: "Decheterie Yverdon",
      status_ramassage: "accepté",
      id_employe: "rsmith2",
      nom_employe: "Smith",
      prenom_employe: "Rebecca",
      id_contenant: 1,
      nom_contenant: "benne",
      poids: 100,
      taille_contenant: null,
      nbcadre_contenant: null,
      type_vehicule: "camion",
      immatriculation_vehicule: "VD756254",
    },
  ],
};

const ram11CreateRequest = {
  id: 11,
  date: 1960995200000,
  fk_status: "accepté",
  poids: 100,
  fk_contenant: 1,
  fk_employee: "rsmith2",
  fk_decheterie: 2,
  fk_vehicule: "VD756254",
};

const ram11UpdateRequest = {
  id: 11,
  date: 1640995200000,
  fk_status: "accepté",
  poids: 150,
  fk_contenant: 1,
  fk_employee: "rsmith2",
  fk_decheterie: 1,
  fk_vehicule: "VD756254",
};

const ram11GetAllResponse = {};

const dechet1GetAllResponse = {
  //todo
  ramassagesData: [],
};

const ram12CreateRequest = {
  // Ramassage with no license employee
  id: 12,
  date: 1960995200000,
  fk_status: "accepté",
  poids: 100,
  fk_contenant: 1,
  fk_employee: "Resp1",
  fk_decheterie: 2,
  fk_vehicule: "VD756254",
};

const ram13CreateRequest = {
  // Ramassage with wrong license employee
  id: 13,
  date: 1960995200000,
  fk_status: "accepté",
  poids: 100,
  fk_contenant: 1,
  fk_employee: "Empl1",
  fk_decheterie: 2,
  fk_vehicule: "VD756254",
};

export {
  ram6CreateRequest,
  ram10CreateRequest,
  ram6UpdateRequest,
  ram6GetOneResponse,
  responsableGetAllResponse,
  employeGetAllResponse,
  ram11CreateRequest,
  ram11UpdateRequest,
  ram11GetAllResponse,
  dechet1GetAllResponse,
  ram12CreateRequest,
  ram13CreateRequest,
};
