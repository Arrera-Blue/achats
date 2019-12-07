"use strict"

const monnaie = [
  {image: "img/1ct.png", id: "1_centime", hauteur: "30px", largeur: "30px", titre: "1 centime"},
  {image: "img/2ct.png", id: "2_centimes", hauteur: "35px", largeur: "35px", titre: "2 centimes"},
  {image: "img/5ct.png", id: "5_centimes", hauteur: "39px", largeur: "39px", titre: "5 centimes"},
  {image: "img/10ct.png", id: "10_centimes", hauteur: "34px", largeur: "34px", titre: "10 centimes"},
  {image: "img/20ct.png", id: "20_centimes", hauteur: "42px", largeur: "42px", titre: "20 centimes"},
  {image: "img/50ct.png", id: "50_centimes", hauteur: "45px", largeur: "45px", titre: "50 centimes"},
  {image: "img/1euro.png", id: "1_euro", hauteur: "43px", largeur: "43px", titre: "1 euro"},
  {image: "img/2euro.png", id: "2_euros", hauteur: "48px", largeur: "48px", titre: "2 euros"},
  {image: "img/5euro.png", id: "5_euros", hauteur: "92px", largeur: "180px", titre: "5 euros"},
  {image: "img/10euro.png", id: "10_euros", hauteur: "93px", largeur: "180px", titre: "10 euros"},
  {image: "img/20euro.png", id: "20_euros", hauteur: "93px", largeur: "172px", titre: "20 euros"},
  {image: "img/50euro.png", id: "50_euros", hauteur: "97px", largeur: "177px", titre: "50 euros"},
  {image: "img/100euro.png", id: "100_euros", hauteur: "94px", largeur: "180px", titre: "100 euros"},
  {image: "img/200euro.png", id: "200_euros", hauteur: "90px", largeur: "180px", titre: "200 euros"},
];

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
// {nom: "un paquet de toasts", image: "img/toasts.png", prix: 89, affichage: "0,89 €", imgWidth: "200px", imgHeight: "245px"},
// {nom: "un timbre lettre verte", image: "img/timbre.png", prix: 88, affichage: "88 cts", imgWidth: "102px", imgHeight: "132px"},
// {nom: "un sac à colorier", image: "img/sac-colorier.png", prix: 56, affichage: "56 cts", imgWidth: "132px", imgHeight: "179px"},

const paramSeries = {
  boutons: [],
  numeroSerie: 0,
  nbSeries: 0,
  seriesFaites: [[],[]],
  typeExo: "",
  niveau: 0,
  option: 0,
  sauvegardePrix: [[],[]],
  sauvegardeSerie:[],
  donneesModifiees: false,
}

const paramExercice = {
  ctObjets: 0,
  ordreObjets: [],
  solution: 0
}

var paramReceptacle = {
  ctId: 0,
  proposition: 0,
  ctPropositions: 0
}

const reserve =  document.getElementById("reserve");
const zoneObjets =  document.getElementById("zone-objets");
const receptacle = document.getElementById("receptacle");
receptacle.addEventListener("contextmenu",function(e){e.preventDefault();});
const btVerif = document.getElementById("btverifier");
const btOptions = document.getElementById("btoptions");
const nomObjet = document.getElementById("nom-objet");
const imageObjet = document.getElementById("image-objet");
const montantObjet = document.getElementById("montant");

function alea(min,max) {
  let nb = min + (max-min+1) * Math.random();
  return Math.floor(nb);
}

function melange(tableau) {
  let i;
  let tirage;
  let tab_alea = [];
  for (i = 0; i < tableau.length; i++) {
    do {
      tirage = alea(0, tableau.length -1);
    } while (tableau[tirage] === -1);
    tab_alea[i] = tableau[tirage];
    tableau[tirage] = -1;
  }
  return tab_alea;
}

function createTip(ev) {
  var title = this.title;
  this.title = '';
  this.setAttribute("tooltip", title);
  var tooltipWrap = document.createElement("div"); //créé un bloc div
  tooltipWrap.className = 'tooltip'; //lui ajoute une classe
  tooltipWrap.appendChild(document.createTextNode(title)); //ajoute le noeud texte à la div nouvellement créée.
  var firstChild = document.body.firstChild;//renvoie le 1er élément après body
  firstChild.parentNode.insertBefore(tooltipWrap, firstChild); //ajoute le tooltip avant l'élément
  var padding = 5;
  var linkProps = this.getBoundingClientRect();
  var tooltipProps = tooltipWrap.getBoundingClientRect();
  var topPos = linkProps.top - (tooltipProps.height + padding);
  tooltipWrap.setAttribute('style','top:'+topPos+'px;'+'left:'+linkProps.left+'px;')
}

function cancelTip(ev) {
  if ( ! document.querySelector(".tooltip")) {return;}
  var title = this.getAttribute("tooltip");
  this.title = title;
  this.removeAttribute("tooltip");
  document.querySelector(".tooltip").remove();
}

function restaurePrix() {
  let i;
  for (i=0; i< objets[paramSeries.sauvegardeSerie[0]][paramSeries.sauvegardeSerie[1]].length; i++) {
    objets[paramSeries.sauvegardeSerie[0]][paramSeries.sauvegardeSerie[1]][i].prix = paramSeries.sauvegardePrix[0][i];
    objets[paramSeries.sauvegardeSerie[0]][paramSeries.sauvegardeSerie[1]][i].affichage = paramSeries.sauvegardePrix[1][i];
    paramSeries.sauvegardePrix[0].pop();
    paramSeries.sauvegardePrix[1].pop();
  }
  paramSeries.donneesModifiees = false;
}

function getMinimum(somme) {
  let ct = 0;
  let total = 0;
  let reponse = "";
  while (total !== somme) {
    if (total + paiements[ct] > somme) {
      ct +=1;
      }
    else {
      reponse = reponse + paiements[ct] + "-";
      total = total + paiements[ct];
    }
  }
  return reponse;
}

function getPrixAleatoire() {
  let prix;
  if (paramSeries.niveau === 0) {
    prix = alea(1,1000);
    prix = prix * 100;
  }
  else {
    prix = alea(1,100000);
  }
  return prix;
}

function formatePrix(prix) {
  let affichage = "";
  let reste = 0;
  if (paramSeries.niveau === 0) {
    affichage = Math.trunc(prix / 100) + " €";
  }
  else {
    reste = prix % 100;
    affichage = Math.trunc(prix / 100) + "," ;
    if (reste < 10) {
      affichage = affichage + "0" + reste + " €";
    }
    else {
      affichage = affichage + reste + " €";
    }
  }
  return affichage;
}

function getPiecesBillets() {
  let ct = 0;
  let tableau = [];
  let listeObjets = [];
  let chaineObjets = "";
  [...receptacle.children].forEach(objet => {
    tableau = objet.id.split("_");
    listeObjets[ct] = parseInt(tableau[0]);
    if ((tableau[1] === "euro") || (tableau[1] === "euros")) {
      listeObjets[ct] = listeObjets[ct] * 100;
    }
    ct += 1;
  });
  listeObjets.sort(function(a, b) {
    return a - b;
  });
  listeObjets.reverse();
  chaineObjets = listeObjets.join('-');
  chaineObjets = chaineObjets + "-";
  return chaineObjets;
}

function creeReserveMonnaie() {
  let i = 0;
  let pieceBillet =  [];
  for (i=0; i<14; i++) {
    pieceBillet[i] = new Image();
    pieceBillet[i].className = "draggable";
    pieceBillet[i].addEventListener("dragstart", drag);
    pieceBillet[i].addEventListener('mouseover', createTip);
    pieceBillet[i].addEventListener('mouseout', cancelTip);
    pieceBillet[i].src = monnaie[i].image;
    pieceBillet[i].id = monnaie[i].id;
    pieceBillet[i].title = monnaie[i].titre;
    pieceBillet[i].style.maxHeight = monnaie[i].hauteur;
    pieceBillet[i].style.maxWidth = monnaie[i].largeur;
    reserve.appendChild(pieceBillet[i]);
  }
}

function genereMontants() {
  let i = 0;
  let prix = 0;
  paramSeries.donneesModifiees = true;
  // Met en mémoire le niveau et le numéro de série
  paramSeries.sauvegardeSerie[0] = paramSeries.niveau;
  paramSeries.sauvegardeSerie[1] = paramSeries.numeroSerie - 1;
  for (i=0; i< objets[paramSeries.niveau][paramSeries.numeroSerie - 1].length; i++) {
    // Met en mémoire les prix des données originales
    paramSeries.sauvegardePrix[0].push(objets[paramSeries.niveau][paramSeries.numeroSerie - 1][i].prix);
    paramSeries.sauvegardePrix[1].push(objets[paramSeries.niveau][paramSeries.numeroSerie - 1][i].affichage);
    prix = getPrixAleatoire();
    objets[paramSeries.niveau][paramSeries.numeroSerie - 1][i].prix = prix;
    objets[paramSeries.niveau][paramSeries.numeroSerie - 1][i].affichage = formatePrix(prix);
  }
}

function creeBtSeries() {
  const commandes = document.getElementById("commandes");
  let numero;
  let i;
  paramSeries.nbSeries = objets[paramSeries.niveau].length;
  for (i = 0; i < paramSeries.nbSeries; i++) {
    const newBt = document.createElement("button");
    newBt.id = "liste" + i;
    newBt.type = "button";
    newBt.className = "btcommande";
    numero = i + 1;
    const t = document.createTextNode("Série " + numero);
    newBt.appendChild(t);
    newBt.onclick = defSerie;
    newBt.disabled = true;
    paramSeries.boutons[i] = newBt;
    commandes.insertBefore(paramSeries.boutons[i], btVerif);
  }
  activeBtSeries();

}

function videBtSeries() {
  let i;
  const elementParent = document.getElementById("commandes");
  for (i = 0; i < paramSeries.nbSeries; i++) {
    elementParent.removeChild(paramSeries.boutons[i]);
  }
}

function desactiveBtSeries() {
  let i;
  for (i=0; i<paramSeries.nbSeries; i++) {
    paramSeries.boutons[i].disabled = true;
  }
}

function activeBtSeries() {
  let i;
  for (i=0; i<paramSeries.nbSeries; i++) {
    if (paramSeries.seriesFaites[paramSeries.niveau].indexOf(i+1) < 0) {
      paramSeries.boutons[i].disabled = false;
    }
  }
}

function defSerie() {
  let i;
  let tableau = [];
  paramSeries.numeroSerie = parseInt(this.innerText.substring(5));
  if (paramSeries.typeExo === "montants") {
    genereMontants();
  }
  else {
    if (paramSeries.donneesModifiees) {
      restaurePrix();
    }
  }
  for (i=0; i< objets[paramSeries.niveau][paramSeries.numeroSerie - 1].length; i++) {
    tableau[i] = i;
  }
  paramExercice.ordreObjets = melange(tableau);
  paramExercice.ctObjets = 0;
  afficheObjet();
  document.getElementById("btverifier").disabled = false;
  document.getElementById("btoptions").disabled = true;
  desactiveBtSeries();
  // commencer();
}

function getIdObjet(infosObjet) {
  let tableau = infosObjet.split("-");
  return tableau[0];
}

function choixOptions() {
  document.getElementById("choix-niveau").className = "visible";
}

function lanceExercice(ev) {
  let i;
  const listeExos = document.getElementsByName('type-exo');
  const listeNiveaux = document.getElementsByName('niveau');
  const listeOptions = document.getElementsByName('option');
  videBtSeries();
  for(i = 0; i < listeExos.length; i++){
    if (listeExos[i].checked) {
      // Si on change de type d'exercice, on réinitialise les séries faites
      if (paramSeries.typeExo !== listeExos[i].value) {
      paramSeries.seriesFaites = [[],[]];
    }
      paramSeries.typeExo = listeExos[i].value;
    }
  }
  for(i = 0; i < listeNiveaux.length; i++){
    if (listeNiveaux[i].checked) {
      paramSeries.niveau = parseInt(listeNiveaux[i].value);
    }
  }
  for(i = 0; i < listeOptions.length; i++){
    if (listeOptions[i].checked) {
      paramSeries.option = listeOptions[i].value;
    }
  }
  creeBtSeries();
  document.getElementById("choix-niveau").className = "invisible";
  ev.preventDefault();
}

function effaceObjet() {
  let i;
  nomObjet.innerHTML = "";
  montant.innerHTML = "";
  if (document.getElementById("image-achat")) {
    imageObjet.removeChild(document.getElementById("image-achat"));
  }
}

function afficheObjet() {
  const image = new Image();
  montantObjet.innerHTML = objets[paramSeries.niveau][paramSeries.numeroSerie - 1][paramExercice.ordreObjets[paramExercice.ctObjets]].affichage;
  paramExercice.solution = objets[paramSeries.niveau][paramSeries.numeroSerie - 1][paramExercice.ordreObjets[paramExercice.ctObjets]].prix;
  if (paramSeries.typeExo === "montants") {
    nomObjet.className = "invisible"
    imageObjet.className = "invisible";
    return;
  }
  nomObjet.className = "visible"
  imageObjet.className = "visible";
  nomObjet.innerHTML = objets[paramSeries.niveau][paramSeries.numeroSerie - 1][paramExercice.ordreObjets[paramExercice.ctObjets]].nom;
  image.src = objets[paramSeries.niveau][paramSeries.numeroSerie - 1][paramExercice.ordreObjets[paramExercice.ctObjets]].image;
  image.id = "image-achat";
  image.style.maxHeight = objets[paramSeries.niveau][paramSeries.numeroSerie - 1][paramExercice.ordreObjets[paramExercice.ctObjets]].imgHeight;
  image.style.maxWidth = objets[paramSeries.niveau][paramSeries.numeroSerie - 1][paramExercice.ordreObjets[paramExercice.ctObjets]].imgWidth;
  imageObjet.appendChild(image);
}

function videReceptacle() {
  while (receptacle.firstChild) {
    receptacle.removeChild(receptacle.firstChild);
  }
  paramReceptacle.proposition = 0;
  paramReceptacle.ctPropositions = 0;
}

function effacePieceBillet(ev) {
  if (ev.which==3) {
    let infosObjet;
    infosObjet = ev.target.id;
    calculeSomme(infosObjet,"retrait");
    let objetCible = document.getElementById(ev.target.id);
    document.querySelector(".tooltip").remove();
    objetCible.parentNode.removeChild(objetCible);
  }
}

function calculeSomme(idObjet,operation) {
  let tableau = [];
  let valeur = 0;
  tableau = idObjet.split("_");
  valeur = parseInt(tableau[0]);
  if ((tableau[1] === "euro") || (tableau[1] === "euros")) {
    valeur = valeur * 100;
  }
  if (operation === "ajout") {
  paramReceptacle.proposition += valeur;
  }
  else {
    paramReceptacle.proposition -= valeur;
  }
}

function verification() {
  let i;
  let solutionProposee = "";
  let solutionOptimale = "";
  let message = "<p>Malheureusement, ce n\'est toujours pas le bon montant.</p>";
  if (paramReceptacle.proposition !== paramExercice.solution) {
    if (paramReceptacle.ctPropositions === 0) {
      showDialog('<p>Malheureusement, le montant de ce qui est sur le comptoir ne correspond pas au prix affiché.</p>');
      paramReceptacle.ctPropositions += 1;
    }
    else {
      if (paramReceptacle.proposition > paramExercice.solution) {
        message = message + "<p>Tu as placé trop d'argent sur le comptoir</p>";
      }
      else {
        message = message + "<p>Tu n'as pas placé assez d'argent sur le comptoir.</p>";
      }
      showDialog(message);
    }
    document.getElementById("btverifier").disabled = false;
    return;
  }
  if (paramSeries.option === "option2") {
    solutionOptimale = getMinimum(paramExercice.solution);
    solutionProposee = getPiecesBillets(paramReceptacle.proposition);
    if (solutionProposee !== solutionOptimale) {
      showDialog("<p>Tu as mis le bon montant, mais tu n'as pas utilisé le moins possible de billets et de pièces.</p>");
      return;
    }
  }
  effaceObjet();
  videReceptacle();
  if (paramExercice.ctObjets + 1 < paramExercice.ordreObjets.length) {
    showDialog('Bravo !',0.5,'img/happy-tux.png', 89, 91, 'left');
    paramExercice.ctObjets += 1;
    afficheObjet();
    document.getElementById("btverifier").disabled = false;
    }
    else {
      paramExercice.ctObjets = 0;
      document.getElementById("btverifier").disabled = true;
      document.getElementById("btoptions").disabled = false;
      paramSeries.seriesFaites[paramSeries.niveau].push(parseInt(paramSeries.numeroSerie));
      if (paramSeries.seriesFaites[paramSeries.niveau].length < paramSeries.nbSeries) {
        showDialog("<p>Félicitations !</p><p>Tu as correctement payé tous les objets de cette série.</p>",0.5,'img/trophee.png', 128, 128, 'left');
        }
        else {
          showDialog("<p>Félicitations !</p><p> Tu as brillamment réussi toutes les séries d'achats.</p>",0.5,'img/trophee.png', 128, 128, 'left');
      }
      activeBtSeries();
  }
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
  let infosObjet;
  const offsetX = ev.target.clientWidth;
  const offsetY = ev.target.clientHeight;
  infosObjet = ev.target.id + "-" + ev.target.parentNode.id;
  ev.dataTransfer.setDragImage(ev.target, offsetX, offsetY);
  ev.dataTransfer.setData("text", infosObjet);
}

function drop(ev) {
  ev.preventDefault();
  const idObjet  = getIdObjet(ev.dataTransfer.getData('Text'));
  const objet = document.getElementById(idObjet);
  if ((ev.target.id === "receptacle") || (ev.target.parentNode.id === "receptacle")) {
      let nodeCopy = objet.cloneNode(true);
      nodeCopy.title = objet.id.replace("_"," ");
      nodeCopy.id = objet.id + "_" + paramReceptacle.ctId;
      calculeSomme(objet.id,"ajout");
      paramReceptacle.ctId += 1;
      nodeCopy.addEventListener('mouseover', createTip);
      nodeCopy.addEventListener('mouseout', cancelTip);
      nodeCopy.addEventListener("mouseup", effacePieceBillet);
      // ev.target.appendChild(nodeCopy);
      receptacle.appendChild(nodeCopy);
    }
}

choixOptions();
creeReserveMonnaie();