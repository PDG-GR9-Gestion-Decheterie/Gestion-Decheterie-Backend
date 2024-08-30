const ContenantOK = {
  add: "Contenant added successfully",
  update: "Contenant updated successfully",
  delete: "Contenant deleted successfully",
};
const ContenantKO = {
  add: "Error adding contenant",
  update: "Error updating contenant",
  delete: "Error deleting contenant",
  get: "Error getting contenant",
};

const contenant1CreateRequest = {
  id: 100,
  nom: "benne",
  capacitemax: 40,
  nbcadre: null,
  taille: null,
  couleur: "blue",
  fk_decheterie: 1,
  fk_dechet: "papier",
};

const contenant1UpdateRequest = {
  id: 100,
  nom: "benne",
  capacitemax: 40,
  nbcadre: null,
  taille: null,
  couleur: "red",
  fk_decheterie: 1,
  fk_dechet: "carton",
};

const contenant1GetOneResponse = {
  contenantData: {
    id: 100,
    nom: "benne",
    capacitemax: 40,
    nbcadre: null,
    taille: null,
    couleur: "blue",
    fk_decheterie: 1,
    fk_dechet: "papier",
  },
};

const contenant1GetAllResponse = {
  contenantsData: [
    {
      id: 1,
      nom: "benne",
      capacitemax: 40,
      nbcadre: null,
      taille: null,
      couleur: "bleu",
      fk_decheterie: 1,
      fk_dechet: "papier",
      decheterie_nom: "Decheterie Yverdon",
    },
    {
      id: 100,
      nom: "benne",
      capacitemax: 40,
      nbcadre: null,
      taille: null,
      couleur: "blue",
      fk_decheterie: 1,
      fk_dechet: "papier",
      decheterie_nom: "Decheterie Yverdon",
    },
  ],
};

const contenant2CreateRequest = {
  id: 200,
  nom: "benne",
  capacitemax: 40,
  nbcadre: null,
  taille: null,
  couleur: "blue",
  fk_decheterie: 2,
  fk_dechet: "papier",
};

const contenant2UpdateRequest = {
  id: 200,
  nom: "benne",
  capacitemax: 40,
  nbcadre: null,
  taille: null,
  couleur: "blue",
  fk_decheterie: 2,
  fk_dechet: "carton",
};

const dechet1GetAllResponse = {
  contenantsData: [
    {
      id: 1,
      nom: "benne",
      capacitemax: 40,
      nbcadre: null,
      taille: null,
      couleur: "bleu",
      fk_decheterie: 1,
      fk_dechet: "papier",
      decheterie_nom: "Decheterie Yverdon",
    },
  ],
};

const contenant3CreateRequest = {
  id: 300,
  nom: "benne",
  capacitemax: 40,
  nbcadre: null,
  taille: null,
  couleur: "blue",
  fk_decheterie: 1,
  fk_dechet: "papier",
};

const contenant3UpdateRequest1 = {
  id: 300,
  nom: "big bag",
  capacitemax: null,
  nbcadre: null,
  taille: null,
  couleur: "red",
  fk_decheterie: 1,
  fk_dechet: "carton",
};

const contenant3UpdateRequest2 = {
  id: 300,
  nom: "big bag",
  capacitemax: null,
  nbcadre: null,
  taille: "test",
  couleur: "red",
  fk_decheterie: 1,
  fk_dechet: "carton",
};

const contenant3UpdateRequest3 = {
  id: 300,
  nom: "grande caisse",
  capacitemax: null,
  nbcadre: null,
  taille: "petite",
  couleur: "red",
  fk_decheterie: 1,
  fk_dechet: "carton",
};

const contenant3UpdateRequest4 = {
  id: 300,
  nom: "benne",
  capacitemax: null,
  nbcadre: null,
  taille: "petite",
  couleur: "red",
  fk_decheterie: 1,
  fk_dechet: "carton",
};

const contenant3UpdateRequest5 = {
  id: 300,
  nom: "palette",
  capacitemax: null,
  nbcadre: null,
  taille: "petite",
  couleur: "red",
  fk_decheterie: 1,
  fk_dechet: "carton",
};

const contenant3UpdateRequest6 = {
  id: 300,
  nom: "palette",
  capacitemax: 40,
  nbcadre: null,
  taille: null,
  couleur: null,
  fk_decheterie: 1,
  fk_dechet: "carton",
};

const contenant3UpdateRequest7 = {
  id: 300,
  nom: "palette",
  capacitemax: 40,
  nbcadre: 5,
  taille: null,
  couleur: null,
  fk_decheterie: 1,
  fk_dechet: "carton",
};

const contenant3UpdateRequest8 = {
  id: 300,
  nom: "big bag",
  capacitemax: 40,
  nbcadre: 1,
  taille: null,
  couleur: "red",
  fk_decheterie: 1,
  fk_dechet: "carton",
};

const contenant3UpdateRequest9 = {
  id: 300,
  nom: "benne",
  capacitemax: 40,
  nbcadre: 1,
  taille: null,
  couleur: "red",
  fk_decheterie: 1,
  fk_dechet: "carton",
};

const contenant3UpdateRequest10 = {
  id: 300,
  nom: "grande caisse",
  capacitemax: 40,
  nbcadre: 1,
  taille: null,
  couleur: null,
  fk_decheterie: 1,
  fk_dechet: "carton",
};

export {
  ContenantOK,
  ContenantKO,
  contenant1CreateRequest,
  contenant1UpdateRequest,
  contenant1GetOneResponse,
  contenant1GetAllResponse,
  contenant2CreateRequest,
  contenant2UpdateRequest,
  dechet1GetAllResponse,
  contenant3CreateRequest,
  contenant3UpdateRequest1,
  contenant3UpdateRequest2,
  contenant3UpdateRequest3,
  contenant3UpdateRequest4,
  contenant3UpdateRequest5,
  contenant3UpdateRequest6,
  contenant3UpdateRequest7,
  contenant3UpdateRequest8,
  contenant3UpdateRequest9,
  contenant3UpdateRequest10,
};
