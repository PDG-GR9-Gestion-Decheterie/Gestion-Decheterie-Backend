const RamassageOK = {
  add: "Ramassage added successfully",
  update: "Ramassage updated successfully",
  delete: "Ramassage deleted successfully",
};
const RamassageKO = {
  add: "Error adding ramassage",
  update: "Error updating ramassage",
  delete: "Error deleting ramassage",
  get: "Error getting ramassage",
};

const ram6CreateRequest = {
  //Futur
  id: 6,
  date: 1960995200000,
  fk_status: "accepté",
  poids: 100,
  fk_contenant: 1,
  fk_employee: "Chauff1",
  fk_decheterie: 1,
  fk_vehicule: "VD100000",
};

const ram10CreateRequest = {
  //Past
  id: 10,
  date: 1660995200000,
  fk_status: "accepté",
  poids: 100,
  fk_contenant: 1,
  fk_employee: "Chauff1",
  fk_decheterie: 1,
  fk_vehicule: "VD100000",
};

const ram6UpdateRequest = {
  id: 6,
  date: 1640995200000,
  fk_status: "accepté",
  poids: 150,
  fk_contenant: 1,
  fk_employee: "Chauff1",
  fk_decheterie: 1,
  fk_vehicule: "VD100000",
};

const ram6GetOneResponse = {
  ramassageData: {
    id: 6,
    date: "2032-02-21",
    poids: 100,
    fk_contenant: 1,
    fk_employee: "Chauff1",
    fk_decheterie: 1,
    fk_vehicule: "VD100000",
    fk_status: "accepté",
  },
};

const responsableGetAllResponse = {
  ramassagesData: [
    {
      id: 1,
      date: "2022-01-01",
      poids: 100,
      fk_employee: "Chauff1",
      fk_status: "accepté",
      contenant_id: 1,
      contenant_nom: "benne",
      contenant_capacitemax: 40,
      contenant_nbcadre: null,
      contenant_taille: null,
      contenant_couleur: "bleu",
      contenant_fk_dechet: "papier",
      employe_nom: "Nom",
      employe_prenom: "Prenom",
      decheterie_nom: "Decheterie Yverdon",
      decheterie_fk_adresse: 1,
      vehicule_immatriculation: "VD100000",
      vehicule_type: "camion",
      vehicule_remorque: false,
      vehicule_anneefabrication: "2010",
      vehicule_dateexpertise: "2022-01-01",
      vehicule_consocarburant: 10.5,
    },
    {
      id: 6,
      date: "2032-02-21",
      poids: 100,
      fk_employee: "Chauff1",
      fk_status: "accepté",
      contenant_id: 1,
      contenant_nom: "benne",
      contenant_capacitemax: 40,
      contenant_nbcadre: null,
      contenant_taille: null,
      contenant_couleur: "bleu",
      contenant_fk_dechet: "papier",
      employe_nom: "Nom",
      employe_prenom: "Prenom",
      decheterie_nom: "Decheterie Yverdon",
      decheterie_fk_adresse: 1,
      vehicule_immatriculation: "VD100000",
      vehicule_type: "camion",
      vehicule_remorque: false,
      vehicule_anneefabrication: "2010",
      vehicule_dateexpertise: "2022-01-01",
      vehicule_consocarburant: 10.5,
    },
    {
      id: 10,
      date: "2022-08-20",
      poids: 100,
      fk_employee: "Chauff1",
      fk_status: "accepté",
      contenant_id: 1,
      contenant_nom: "benne",
      contenant_capacitemax: 40,
      contenant_nbcadre: null,
      contenant_taille: null,
      contenant_couleur: "bleu",
      contenant_fk_dechet: "papier",
      employe_nom: "Nom",
      employe_prenom: "Prenom",
      decheterie_nom: "Decheterie Yverdon",
      decheterie_fk_adresse: 1,
      vehicule_immatriculation: "VD100000",
      vehicule_type: "camion",
      vehicule_remorque: false,
      vehicule_anneefabrication: "2010",
      vehicule_dateexpertise: "2022-01-01",
      vehicule_consocarburant: 10.5,
    },
  ],
};

const employeGetAllResponse = {
  ramassagesData: [
    {
      id: 6,
      date: "2032-02-21",
      poids: 100,
      fk_employee: "Chauff1",
      fk_status: "accepté",
      contenant_id: 1,
      contenant_nom: "benne",
      contenant_capacitemax: 40,
      contenant_nbcadre: null,
      contenant_taille: null,
      contenant_couleur: "bleu",
      contenant_fk_dechet: "papier",
      employe_nom: "Nom",
      employe_prenom: "Prenom",
      decheterie_nom: "Decheterie Yverdon",
      decheterie_fk_adresse: 1,
      vehicule_immatriculation: "VD100000",
      vehicule_type: "camion",
      vehicule_remorque: false,
      vehicule_anneefabrication: "2010",
      vehicule_dateexpertise: "2022-01-01",
      vehicule_consocarburant: 10.5,
    },
  ],
};

const ram11CreateRequest = {
  id: 11,
  date: 1960995200000,
  fk_status: "accepté",
  poids: 100,
  fk_contenant: 2,
  fk_employee: "Chauff2",
  fk_decheterie: 2,
  fk_vehicule: "VD200000",
};

const ram11UpdateRequest = {
  id: 11,
  date: 1960995200000,
  fk_status: "accepté",
  poids: 150,
  fk_contenant: 2,
  fk_employee: "Chauff2",
  fk_decheterie: 2,
  fk_vehicule: "VD200000",
};

const ram11GetAllResponse = {
  ramassagesData: [
    {
      id: 2,
      date: "2022-01-01",
      poids: 100,
      fk_employee: "Chauff2",
      fk_status: "accepté",
      contenant_id: 2,
      contenant_nom: "benne",
      contenant_capacitemax: 40,
      contenant_nbcadre: null,
      contenant_taille: null,
      contenant_couleur: "bleu",
      contenant_fk_dechet: "papier",
      employe_nom: "Nom",
      employe_prenom: "Prenom",
      decheterie_nom: "Decheterie Berne",
      decheterie_fk_adresse: 2,
      vehicule_immatriculation: "VD200000",
      vehicule_type: "camion",
      vehicule_remorque: false,
      vehicule_anneefabrication: "2010",
      vehicule_dateexpertise: "2022-01-01",
      vehicule_consocarburant: 10.5,
    },
    {
      id: 11,
      date: "2032-02-21",
      poids: 100,
      fk_employee: "Chauff2",
      fk_status: "accepté",
      contenant_id: 2,
      contenant_nom: "benne",
      contenant_capacitemax: 40,
      contenant_nbcadre: null,
      contenant_taille: null,
      contenant_couleur: "bleu",
      contenant_fk_dechet: "papier",
      employe_nom: "Nom",
      employe_prenom: "Prenom",
      decheterie_nom: "Decheterie Berne",
      decheterie_fk_adresse: 2,
      vehicule_immatriculation: "VD200000",
      vehicule_type: "camion",
      vehicule_remorque: false,
      vehicule_anneefabrication: "2010",
      vehicule_dateexpertise: "2022-01-01",
      vehicule_consocarburant: 10.5,
    },
  ],
};

const dechet1GetAllResponse = {
  ramassagesData: [
    {
      id: 1,
      date: "2022-01-01",
      poids: 100,
      fk_employee: "Chauff1",
      fk_status: "accepté",
      contenant_id: 1,
      contenant_nom: "benne",
      contenant_capacitemax: 40,
      contenant_nbcadre: null,
      contenant_taille: null,
      contenant_couleur: "bleu",
      contenant_fk_dechet: "papier",
      employe_nom: "Nom",
      employe_prenom: "Prenom",
      decheterie_nom: "Decheterie Yverdon",
      decheterie_fk_adresse: 1,
      vehicule_immatriculation: "VD100000",
      vehicule_type: "camion",
      vehicule_remorque: false,
      vehicule_anneefabrication: "2010",
      vehicule_dateexpertise: "2022-01-01",
      vehicule_consocarburant: 10.5,
    },
  ],
};

const ram12CreateRequest = {
  // Ramassage with no license employee
  id: 12,
  date: 1960995200000,
  fk_status: "accepté",
  poids: 100,
  fk_contenant: 1,
  fk_employee: "Resp1",
  fk_decheterie: 1,
  fk_vehicule: "VD100000",
};

const ram13CreateRequest = {
  // Ramassage with wrong license employee
  id: 13,
  date: 1960995200000,
  fk_status: "accepté",
  poids: 100,
  fk_contenant: 1,
  fk_employee: "Empl1",
  fk_decheterie: 1,
  fk_vehicule: "VD100000",
};

const ram14CreateRequest = {
  // Ramassage with wrong contenant
  id: 14,
  date: 1960995200000,
  fk_status: "accepté",
  poids: 100,
  fk_contenant: 2,
  fk_employee: "Resp1",
  fk_decheterie: 1,
  fk_vehicule: "VD100000",
};

const ram15CreateRequest = {
  // Ramassage with wrong employe
  id: 15,
  date: 1960995200000,
  fk_status: "accepté",
  poids: 100,
  fk_contenant: 1,
  fk_employee: "Chauff2",
  fk_decheterie: 1,
  fk_vehicule: "VD100000",
};

const ram16CreateRequest = {
  // Ramassage with wrong decheterie
  id: 16,
  date: 1960995200000,
  fk_status: "accepté",
  poids: 100,
  fk_contenant: 1,
  fk_employee: "Resp1",
  fk_decheterie: 2,
  fk_vehicule: "VD100000",
};

const ram17CreateRequest = {
  // Ramassage with wrong vehicule
  id: 17,
  date: 1960995200000,
  fk_status: "accepté",
  poids: 100,
  fk_contenant: 1,
  fk_employee: "Resp1",
  fk_decheterie: 1,
  fk_vehicule: "VD200000",
};

export {
  RamassageOK,
  RamassageKO,
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
  ram14CreateRequest,
  ram15CreateRequest,
  ram16CreateRequest,
  ram17CreateRequest,
};
