"use strict"

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

//paramètres nécessaire à la gestion du drag & drop tactile
const dragObj = {
  dragimg: {},
  idSource: "",
  decX: 0,
  decY: 0,
  zoom: 3,
  derX: 0,
  derY: 0,
  touchTimeStart: 0,
  touchTimeEnd: 0,
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
    pieceBillet[i].addEventListener('touchstart',appuiTactile);
    pieceBillet[i].addEventListener('touchmove',dragTactile);
    pieceBillet[i].addEventListener('touchend',dropTactile);
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

// Retourne vrai si la position du doigt est sur l'objet
function survol(objet,posX,posY) {
  let survole;
  survole = (posX >= objet.offsetLeft) && (posX <= objet.offsetLeft + objet.offsetWidth) && (posY >= objet.offsetTop) && (posY <= objet.offsetTop + objet.offsetHeight);
  return survole;
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

function depotComptoir(objet) {
  let nodeCopy = objet.cloneNode(true);
  nodeCopy.title = objet.id.replace("_"," ");
  nodeCopy.id = objet.id + "_" + paramReceptacle.ctId;
  calculeSomme(objet.id,"ajout");
  paramReceptacle.ctId += 1;
  // nodeCopy.addEventListener("touchstart", debutTactile);
  nodeCopy.addEventListener('touchstart',appuiTactile);
  nodeCopy.addEventListener('touchmove',dragTactile);
  nodeCopy.addEventListener('touchend',dropTactile);
  // nodeCopy.addEventListener("touchend", finTactile);
  nodeCopy.addEventListener('mouseover', createTip);
  nodeCopy.addEventListener('mouseout', cancelTip);
  nodeCopy.addEventListener("mouseup", actionBtSouris);
  receptacle.appendChild(nodeCopy);
}

function effacePieceBillet(ev) {
  // if (ev.which==3) {
    let infosObjet;
    infosObjet = ev.target.id;
    calculeSomme(infosObjet,"retrait");
    let objetCible = document.getElementById(ev.target.id);
    if (document.querySelector(".tooltip") !== null) {
      document.querySelector(".tooltip").remove();
    }
    objetCible.parentNode.removeChild(objetCible);
  // }
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

function verifieAppuiLong(ev) {
  let temps;
  dragObj.touchEnd = ev.timeStamp;
  temps = dragObj.touchEnd  - dragObj.touchTimeStart;
  if (temps > 1000) {
    effacePieceBillet(ev);
  }
}

function actionBtSouris(ev) {
  ev.preventDefault();
  if (ev.which==3) {
    effacePieceBillet(ev);
  }
}

function appuiTactile(ev) {
  let obj = ev.currentTarget;
  let touchPosition = ev.targetTouches[0];
  let parent = ev.currentTarget.parentNode;
  ev.preventDefault();
  dragObj.dragImg = new Image();
  dragObj.dragImg.src = ev.target.src;
  dragObj.idSource = ev.target.id;
  dragObj.dragImg.style.position = "absolute";
  // Position du doigt relativement aux bords de l'image
  dragObj.decX = touchPosition.pageX - obj.offsetLeft;
  dragObj.decY = touchPosition.pageY - obj.offsetTop;
  dragObj.dragImg.style.left = touchPosition.pageX - dragObj.decX * dragObj.zoom + 'px';
  dragObj.dragImg.style.top = touchPosition.pageY - dragObj.decY * dragObj.zoom + 'px';
  // Mémorise la dernière position de l'image avant d'être relâchée
  dragObj.derX = touchPosition.pageX;
  dragObj.derY = touchPosition.pageY;
  if (parent.id === "reserve") {
    reserve.appendChild(dragObj.dragImg);
    return;
  }
  if (parent.id === "receptacle") {
    receptacle.appendChild(dragObj.dragImg);
    dragObj.touchTimeStart = ev.timeStamp;
    return;
  }
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
  let infosObjet;
  let img = new Image();
  img.src = ev.target.src;
  const offsetX = ev.target.clientWidth;
  const offsetY = ev.target.clientHeight;
  infosObjet = ev.target.id + "-" + ev.target.parentNode.id;
  ev.dataTransfer.setDragImage(img, offsetX, offsetY);
  ev.dataTransfer.setData("text", infosObjet);
}

function dragTactile(ev) {
  let touchPosition = ev.targetTouches[0];
  ev.preventDefault();
  if (! dragObj.dragImg) {
    return;
  }
  dragObj.dragImg.style.left = touchPosition.pageX - dragObj.decX * dragObj.zoom + 'px';
  dragObj.dragImg.style.top = touchPosition.pageY - dragObj.decY * dragObj.zoom + 'px';
  // Mémorise la dernière position de l'image avant d'être relâchée
  dragObj.derX = touchPosition.pageX;
  dragObj.derY = touchPosition.pageY;
}

function dragTactile(ev) {
  let touchPosition = ev.targetTouches[0];
  ev.preventDefault();
  if (! dragObj.dragImg) {
    return;
  }
  dragObj.dragImg.style.left = touchPosition.pageX - dragObj.decX * dragObj.zoom + 'px';
  dragObj.dragImg.style.top = touchPosition.pageY - dragObj.decY * dragObj.zoom + 'px';
  dragObj.derX = touchPosition.pageX;
  dragObj.derY = touchPosition.pageY;
}

function dropTactile(ev) {
  let parent = ev.currentTarget.parentNode;
  ev.preventDefault();
  if ((parent.id !== "receptacle") && (survol(receptacle,dragObj.derX,dragObj.derY))) {
    const objet = document.getElementById(dragObj.idSource);
    depotComptoir(objet);
    reserve.removeChild(dragObj.dragImg);
  }
  if ((parent.id !== "reserve") && (survol(reserve,dragObj.derX,dragObj.derY))) {
    receptacle.removeChild(dragObj.dragImg);
    effacePieceBillet(ev);
  }
  if ((parent.id === "reserve") && (survol(reserve,dragObj.derX,dragObj.derY))) {
    reserve.removeChild(dragObj.dragImg);
  }
  if ((parent.id === "receptacle") && (survol(receptacle,dragObj.derX,dragObj.derY))) {
    receptacle.removeChild(dragObj.dragImg);
    verifieAppuiLong(ev);
  }
  dragObj.derX = 0;
  dragObj.derY = 0;
}

function drop(ev) {
  ev.preventDefault();
  const idObjet  = getIdObjet(ev.dataTransfer.getData('Text'));
  const objet = document.getElementById(idObjet);
  if ((ev.target.id === "receptacle") || (ev.target.parentNode.id === "receptacle")) {
    depotComptoir(objet);
  }
}

function dropTactile(ev) {
  let parent = ev.currentTarget.parentNode;
  ev.preventDefault();
  if ((parent.id !== "receptacle") && (survol(receptacle,dragObj.derX,dragObj.derY))) {
    const objet = document.getElementById(dragObj.idSource);
    depotComptoir(objet);
    reserve.removeChild(dragObj.dragImg);
  }
  if ((parent.id !== "reserve") && (survol(reserve,dragObj.derX,dragObj.derY))) {
    receptacle.removeChild(dragObj.dragImg);
    effacePieceBillet(ev);
  }
  if ((parent.id === "reserve") && (survol(reserve,dragObj.derX,dragObj.derY))) {
    reserve.removeChild(dragObj.dragImg);
  }
  if ((parent.id === "receptacle") && (survol(receptacle,dragObj.derX,dragObj.derY))) {
    receptacle.removeChild(dragObj.dragImg);
    verifieAppuiLong(ev);
  }
  dragObj.derX = 0;
  dragObj.derY = 0;
}

choixOptions();
creeReserveMonnaie();