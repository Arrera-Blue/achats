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
  {image: "img/50euro.png", id: "50_euros", hauteur: "97px", largeur: "180px", titre: "50 euros"},
  {image: "img/100euro.png", id: "100_euros", hauteur: "94px", largeur: "180px", titre: "100 euros"},
  {image: "img/200euro.png", id: "200_euros", hauteur: "90px", largeur: "180px", titre: "200 euros"},
];

const objets = [
  [  // Objets du niveau 1
    [
      {nom: "un CD", image: "img/cd.jpg", prix: 1500, affichage: "15 €"},
      {nom: "une baguette de pain", image: "img/baguette.png", prix: 92, affichage: "92 cts"},
      {nom: "un ballon", image: "img/ballon.png", prix: 400, affichage: "4 €"},
      {nom: "une veste polaire de randonnée", image: "img/polaire.png", prix: 3700, affichage: "37 €"},
      {nom: "un sac à colorier", image: "img/sac-colorier.png", prix: 56, affichage: "56 cts"},
    ],
    [
      {nom: "une télévision 100 cm", image: "img/tv.png", prix: 22900, affichage: "229 €"},
      {nom: "1 L de lait", image: "img/lait.png", prix: 94, affichage: "94 cts"},
      {nom: "un timbre lettre verte", image: "img/timbre.png", prix: 88, affichage: "88 cts"},
    ],
    [
      {nom: "un stylo ballon de foot", image: "img/stylo.png", prix: 59, affichage: "59 cts"},
      {nom: "une épingle à tête de fleur", image: "img/epingle.png", prix: 37, affichage: "37 cts"},
      {nom: "", image: "", prix: 0, affichage: ""},
    ]
  ],
  [  // Objets du niveau 2
    [
      {nom: "", image: "", prix: 0, affichage: ""},
      {nom: "", image: "", prix: 0, affichage: ""},
      {nom: "", image: "", prix: 0, affichage: ""},
    ],
    [
      {nom: "", image: "", prix: 0, affichage: ""},
      {nom: "", image: "", prix: 0, affichage: ""},
      {nom: "", image: "", prix: 0, affichage: ""},
    ],
    [
      {nom: "", image: "", prix: 0, affichage: ""},
      {nom: "", image: "", prix: 0, affichage: ""},
      {nom: "", image: "", prix: 0, affichage: ""},
    ]
  ]
]

const paramSeries = {
  boutons: [],
  numeroSerie: 0,
  nbSeries: 0,
  seriesFaites: [],
  niveau: 0,
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

// var pieceBillet =  [];

const reserve =  document.getElementById("reserve");
const zoneObjets =  document.getElementById("zone-objets");
const receptacle = document.getElementById("receptacle");
receptacle.addEventListener("contextmenu",function(e){e.preventDefault();});
const btVerif = document.getElementById("btverifier");

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

function creeBtSeries() {
  const commandes = document.getElementById("commandes");
  let numero;
  let i;
  document.getElementById("btniveau").disabled = true;
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
    paramSeries.boutons[i] = newBt;
    commandes.insertBefore(paramSeries.boutons[i], btVerif);
  }
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
    if (paramSeries.seriesFaites.indexOf(i+1) < 0) {
      paramSeries.boutons[i].disabled = false;
    }
  }
}

function defSerie() {
  let i;
  // let numeroSerie = 0;
  let tableau = [];
  // paramSeries.numeroSerie = parseInt(this.innerText.substring(5));
  paramSeries.numeroSerie = parseInt(this.innerText.substring(5));
  // numeroSerie -= 1;
  for (i=0; i< objets[paramSeries.niveau][paramSeries.numeroSerie - 1].length; i++) {
    tableau[i] = i;
  }
  paramExercice.ordreObjets = melange(tableau);
  paramExercice.ctObjets = 0;
  afficheObjet();
  document.getElementById("btverifier").disabled = false;
  desactiveBtSeries();
  // commencer();
}

function getIdObjet(infosObjet) {
  let tableau = infosObjet.split("-");
  return tableau[0];
}

/* function getIdParent(infosObjet) {
  let tableau = infosObjet.split("-");
  return tableau[1];
} */

/* function  reinitialise() {
  let i;
  activeBtSeries();
  effaceObjet();
  videReceptacle();
  paramSeries.numeroSerie = 0;
  paramExercice.ctObjets = 0;
} */

function choixNiveau() {
  document.getElementById("choix-niveau").className = "visible";
}

function lanceNiveau(ev) {
  let i;
  videBtSeries();
  const listeNiveaux = document.getElementsByName('niveau');
  for(i = 0; i < listeNiveaux.length; i++){
    if (listeNiveaux[i].checked) {
      paramSeries.niveau = parseInt(listeNiveaux[i].value);
    }
  }
  creeBtSeries();
  document.getElementById("choix-niveau").className = "invisible";
  ev.preventDefault();
}

function effaceObjet() {
  let i;
  // const achats = zoneObjets.children;
  document.getElementById("nom-objet").innerHTML = "";
  document.getElementById("prix-objet").innerHTML = "";
  document.getElementById("image-objet").removeChild(document.getElementById("image-achat"));
}

function afficheObjet() {
  const imageObjet = new Image();
  document.getElementById("nom-objet").innerHTML = objets[paramSeries.niveau][paramSeries.numeroSerie - 1][paramExercice.ordreObjets[paramExercice.ctObjets]].nom;
  imageObjet.src = objets[paramSeries.niveau][paramSeries.numeroSerie - 1][paramExercice.ordreObjets[paramExercice.ctObjets]].image;
  imageObjet.id = "image-achat";
  document.getElementById("image-objet").appendChild(imageObjet);
  document.getElementById("prix-objet").innerHTML = objets[paramSeries.niveau][paramSeries.numeroSerie - 1][paramExercice.ordreObjets[paramExercice.ctObjets]].affichage;
  paramExercice.solution = objets[paramSeries.niveau][paramSeries.numeroSerie - 1][paramExercice.ordreObjets[paramExercice.ctObjets]].prix;
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

/* function commencer() {
  afficheObjet();
  document.getElementById("btverifier").disabled = false;
}
 */
function verification() {
  let i;
  let message = "<p>Malheureusement, ce n\'est toujours pas le bon montant.</p>";
  if (paramReceptacle.proposition !== paramExercice.solution) {
    if (paramReceptacle.ctPropositions === 0) {
      showDialog('<p>Malheureusement, le montant de ce qui est sur le comptoir ne correspond pas au prix affiché.');
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
      // paramSeries.niveau = -1;
      document.getElementById("btniveau").disabled = false;
      if (paramSeries.seriesFaites.length < paramSeries.nbSeries) {
        showDialog("<p>Félicitations !</p><p>Tu as correctement payé tous les objets de cette série.</p>",0.5,'img/trophee.png', 128, 128, 'left');
        paramSeries.seriesFaites.push(parseInt(paramSeries.numeroSerie));
        activeBtSeries();
        }
        else {
          showDialog("<p>Félicitations !</p><p> Tu as brillamment réussi toutes les séries d'achats.</p>",0.5,'img/trophee.png', 128, 128, 'left');
          paramSeries.seriesFaites = [];
          videBtSeries();
      }
  }
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
	let infosObjet;
	infosObjet = ev.target.id + "-" + ev.target.parentNode.id;
  ev.dataTransfer.setData("text", infosObjet);
}

function drop(ev) {
  ev.preventDefault();
  const idObjet  = getIdObjet(ev.dataTransfer.getData('Text'));
  // const idParent = getIdParent(ev.dataTransfer.getData('Text'));
  const objet = document.getElementById(idObjet);
  if (ev.target.id === "receptacle") {  // L'élément est lâché sur une zone libre du réceptacle
      // ev.target.appendChild(nouvelEspace(idObjet));
      let nodeCopy = objet.cloneNode(true);
      nodeCopy.title = objet.id.replace("_"," ");
      nodeCopy.id = objet.id + "_" + paramReceptacle.ctId;
      calculeSomme(objet.id,"ajout");
      paramReceptacle.ctId += 1;
      nodeCopy.addEventListener('mouseover', createTip);
      nodeCopy.addEventListener('mouseout', cancelTip);
      nodeCopy.addEventListener("mouseup", effacePieceBillet);
      ev.target.appendChild(nodeCopy);
    }
}

choixNiveau();
creeReserveMonnaie();