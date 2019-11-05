function creeElements() {
  let ecranBlanc = document.createElement("div");
  ecranBlanc.id = "ecran-blanc";
  ecranBlanc.style.display = "none";
  let dlgBox = document.createElement("div");
  dlgBox.id = "dlg-box";
  dlgBox.style.display = "none";
  let dlgBody = document.createElement("div");
  dlgBody.id = "dlg-body";
  let dlgFooter = document.createElement("div");
  dlgFooter.id = "dlg-footer";
  dlgFooter.innerHTML = '<button onclick="dlgExit()">OK</button></div>';
  document.body.appendChild(ecranBlanc);
  document.body.appendChild(dlgBox);
  dlgBox.appendChild(dlgBody);
  dlgBox.appendChild(dlgFooter);
}

function dlgExit() {
  let ecranBlanc = document.getElementById("ecran-blanc");
  let dlgBox = document.getElementById("dlg-box");
  document.body.removeChild(dlgBox);
  document.body.removeChild(ecranBlanc);
}

function showDialog(Texte, Opacite = "0.5", cheminImg = '', largeurImg = 0, hauteurImg = 0, Place = 'left') {
  let largeurDlgBox;
  let hauteurDlgBox;

  function positionne() {
    let winWidth = window.innerWidth;
    let winHeight = window.innerHeight;
    dlgBox.style.left = 50 - (largeurDlgBox / winWidth) * 50 + "%" ;
    dlgBox.style.width = largeurDlgBox + "px";
    dlgBox.style.top = 50 - (hauteurDlgBox / winHeight) * 50 - 10 + "%" ;
  }
  creeElements();
  let ecranBlanc = document.getElementById("ecran-blanc");
  let dlgBox = document.getElementById("dlg-box");
  let dlgBody = document.getElementById("dlg-body");
  let dlgTexte = document.createElement("div");
  dlgTexte.id = "dlg-texte";
  let dlgImage = document.createElement("div");
  dlgImage.id = "dlg-image";
  dlgImage.style.backgroundImage = "url(" + cheminImg + ")";
  dlgImage.style.backgroundSize = "contain";
  dlgImage.style.backgroundRepeat = "no-repeat";
  dlgImage.style.backgroundPosition = "center";

  ecranBlanc.style.display = "block";
  ecranBlanc.style.opacity = Opacite;
  dlgBox.style.display = "flex";
  dlgBox.style.flexDirection = "column";
  // Détermine les dimensions de la boîte de dialogue avant insertion de l'image
  dlgTexte.innerHTML = Texte;
  dlgBody.appendChild(dlgTexte);
  largeurDlgBox = dlgBox.clientWidth;
  hauteurDlgBox = dlgBox.clientHeight;
  switch(Place) {
    case "left":
      largeurDlgBox += largeurImg;
      if (hauteurImg > hauteurDlgBox) { hauteurDlgBox =  hauteurImg;}
      dlgBody.insertBefore(dlgImage, dlgTexte);
      break;
    case "right":
      largeurDlgBox += largeurImg;
      if (hauteurImg > hauteurDlgBox) { hauteurDlgBox =  hauteurImg;}
      dlgBody.appendChild(dlgImage);
      break;
    case "top":
      hauteurDlgBox +=  hauteurImg;
      if (largeurImg > largeurDlgBox) { largeurDlgBox =  largeurImg;}
      dlgBody.style.flexDirection = "column";
      dlgBody.insertBefore(dlgImage, dlgTexte);
      break;
    case "bottom":
      hauteurDlgBox += hauteurImg;
      if (largeurImg > largeurDlgBox) { largeurDlgBox =  largeurImg;}
      dlgBody.style.flexDirection = "column";
      dlgBody.appendChild(dlgImage);
      break;
  }
  dlgImage.style.width = largeurImg + "px";
  dlgImage.style.height = hauteurImg + "px";
  positionne();
}
