"use strict"

const monnaie = [
  {image: "img/1_centime.png", id: "1_centime", hauteur: "40px", largeur: "40px", titre: "1 centime"},
  {image: "img/2_centimes.png", id: "2_centimes", hauteur: "45px", largeur: "45px", titre: "2 centimes"},
  {image: "img/5_centimes.png", id: "5_centimes", hauteur: "49px", largeur: "49px", titre: "5 centimes"},
  {image: "img/10_centimes.png", id: "10_centimes", hauteur: "50px", largeur: "50px", titre: "10 centimes"},
  {image: "img/20_centimes.png", id: "20_centimes", hauteur: "52px", largeur: "52px", titre: "20 centimes"},
  {image: "img/50_centimes.png", id: "50_centimes", hauteur: "55px", largeur: "55px", titre: "50 centimes"},
  {image: "img/1_euro.png", id: "1_euro", hauteur: "53px", largeur: "53px", titre: "1 euro"},
  {image: "img/2_euros.png", id: "2_euros", hauteur: "58px", largeur: "58px", titre: "2 euros"},
  {image: "img/5_euros.png", id: "5_euros", hauteur: "102px", largeur: "190px", titre: "5 euros"},
  {image: "img/10_euros.png", id: "10_euros", hauteur: "103px", largeur: "190px", titre: "10 euros"},
  {image: "img/20_euros.png", id: "20_euros", hauteur: "103px", largeur: "182px", titre: "20 euros"},
  {image: "img/50_euros.png", id: "50_euros", hauteur: "107px", largeur: "187px", titre: "50 euros"},
  {image: "img/100_euros.png", id: "100_euros", hauteur: "104px", largeur: "190px", titre: "100 euros"},
  {image: "img/200_euros.png", id: "200_euros", hauteur: "100px", largeur: "190px", titre: "200 euros"},
];

const dragImages = {
  "1_centime.png": {largeur: 122, hauteur: 121},
  "2_centimes.png": {largeur: 138, hauteur: 139},
  "5_centimes.png": {largeur: 157, hauteur: 157},
  "10_centimes.png": {largeur: 147, hauteur: 148},
  "20_centimes.png": {largeur: 166, hauteur: 167},
  "50_centimes.png": {largeur: 181, hauteur: 181},
  "1_euro.png": {largeur: 174, hauteur: 174},
  "2_euros.png": {largeur: 192, hauteur: 192},
  "5_euros.png": {largeur: 360, hauteur: 184},
  "10_euros.png": {largeur: 360, hauteur: 187},
  "20_euros.png": {largeur: 345, hauteur: 187},
  "50_euros.png": {largeur: 355, hauteur: 194},
  "100_euros.png": {largeur: 360, hauteur: 188},
  "200_euros.png": {largeur: 360, hauteur: 179},
};

const paiements = [20000, 10000, 5000, 2000, 1000, 500, 200, 100, 50, 20, 10, 5, 2, 1];

const objets = [
  [  // Objets du niveau 1
    [
      {nom: "un CD", image: "img/cd.jpg", prix: 1500, affichage: "15 €", imgWidth: "132px", imgHeight: "132px"},
      {nom: "un ballon", image: "img/ballon.png", prix: 400, affichage: "4 €", imgWidth: "132px", imgHeight: "132px"},
      {nom: "une veste polaire de randonnée", image: "img/polaire.png", prix: 3700, affichage: "37 €", imgWidth: "132px", imgHeight: "150px"},
      {nom: "une caméra sportive", image: "img/camera-sportive.png", prix: 27900, affichage: "279 €", imgWidth: "146px", imgHeight: "132px"},
      {nom: "une paquet de café de 250 g", image: "img/cafe.png", prix: 800, affichage: "8 €", imgWidth: "132px", imgHeight: "219px"},
    ],
    [
      {nom: "une télévision 100 cm", image: "img/tv.png", prix: 22900, affichage: "229 €", imgWidth: "204px", imgHeight: "132px"},
      {nom: "circuit de course électrique", image: "img/circuit.png", prix: 4300, affichage: "43 €", imgWidth: "172px", imgHeight: "132px"},
      {nom: "une cocotte en fonte", image: "img/cocotte.png", prix: 14700, affichage: "147 €", imgWidth: "198px", imgHeight: "132px"},
      {nom: "une boîte de crème glacée de 500 g", image: "img/glace.png", prix: 800, affichage: "8 €", imgWidth: "132px", imgHeight: "86px"},
      {nom: "un radiateur électrique soufflant", image: "img/radiateur.png", prix: 2400, affichage: "24 €", imgWidth: "132px", imgHeight: "206px"},
    ],
    [
      {nom: "une paire de chaussures", image: "img/chaussures.png", prix: 6300, affichage: "63 €", imgWidth: "167px", imgHeight: "64px"},
      {nom: "une table de jardin", image: "img/table-jardin.png", prix: 39900, affichage: "399 €", imgWidth: "200px", imgHeight: "94px"},
      {nom: "un bureau", image: "img/bureau.png", prix: 13100, affichage: "131 €", imgWidth: "228px", imgHeight: "132px"},
      {nom: "un canapé en cuir", image: "img/canape.png", prix: 189500, affichage: "1895 €", imgWidth: "220px", imgHeight: "103px"},
      {nom: "un pot de peinture murale de 2,5 L", image: "img/peinture.png", prix: 2700, affichage: "27 €", imgWidth: "148px", imgHeight: "132px"},
    ]
  ],
  [  // Objets du niveau 2
    [
      {nom: "un croissant", image: "img/croissant.png", prix: 110, affichage: "1,10 €", imgWidth: "170px", imgHeight: "132px"},
      {nom: "un stylo ballon de foot", image: "img/stylo.png", prix: 58, affichage: "0,58 €", imgWidth: "26px", imgHeight: "200px"},
      {nom: "une bibliothèque", image: "img/bibliotheque.png", prix: 21690, affichage: "216,90 €", imgWidth: "69px", imgHeight: "200px"},
      {nom: "savon liquide", image: "img/savon-liquide.png", prix: 233, affichage: "2,33 €", imgWidth: "73px", imgHeight: "200px"},
      {nom: "une platine vinyle", image: "img/platine.png", prix: 6395, affichage: "63,95 €", imgWidth: "200px", imgHeight: "194px"},
    ],
    [
      {nom: "un jean femme", image: "img/jean-femme.png", prix: 7465, affichage: "74,65 €", imgWidth: "71px", imgHeight: "200px"},
      {nom: "un rosbeef de 800 g", image: "img/rosbeef.png", prix: 1704, affichage: "17,04 €", imgWidth: "143px", imgHeight: "132px"},
      {nom: "lot de 8 piles AA", image: "img/piles.png", prix: 896, affichage: "8,96 €", imgWidth: "143px", imgHeight: "132px"},
      {nom: "une piscine tubulaire", image: "img/piscine.png", prix: 36900, affichage: "369,00 €", imgWidth: "229px", imgHeight: "132px"},
      {nom: "une épingle à tête de fleur", image: "img/epingle.png", prix: 37, affichage: "0,37 €", imgWidth: "43px", imgHeight: "132px"},
    ],
    [
      {nom: "1 L de lait", image: "img/lait.png", prix: 94, affichage: "0,94 €", imgWidth: "80px", imgHeight: "181px"},
      {nom: "un lampadaire design", image: "img/lampadaire.png", prix: 11995, affichage: "119,95 €", imgWidth: "81px", imgHeight: "200px"},
      {nom: "un bonnet en laine", image: "img/bonnet.png", prix: 2325, affichage: "23,25 €", imgWidth: "132px", imgHeight: "126px"},
      {nom: "un four à micro-ondes", image: "img/micro-ondes.png", prix: 6939, affichage: "69,39 €", imgWidth: "200px", imgHeight: "122px"},
      {nom: "un paquet de céréales", image: "img/cereales.png", prix: 377, affichage: "3,77 €", imgWidth: "132px", imgHeight: "192px"},
    ],
    [
      {nom: "un bouquet de fleurs", image: "img/bouquet.png", prix: 3290, affichage: "32,90 €", imgWidth: "211px", imgHeight: "132px"},
      {nom: "une boîte d'épinards hâchés à la crème", image: "img/epinards.png", prix: 377, affichage: "3,77 €", imgWidth: "163px", imgHeight: "132px"},
      {nom: "une baguette de pain", image: "img/baguette.png", prix: 92, affichage: "0,92 €", imgWidth: "200px", imgHeight: "36px"},
      {nom: "une imprimante multifonctions", image: "img/imprimante.png", prix: 14618, affichage: "146,18 €", imgWidth: "182px", imgHeight: "132px"},
      {nom: "un panier pour chat", image: "img/panier-chat.png", prix: 1224, affichage: "12,24 €", imgWidth: "137px", imgHeight: "132px"},
    ]
  ]
]

