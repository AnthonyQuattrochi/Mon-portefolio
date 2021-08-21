var afficheur = document.getElementById("afficheur");

function affichagePDF() {
  afficheur.innerHTML = "";
  afficheur.style.backgroundColor = "#333";
  afficheur.style.marginTop = "-900";
  afficheur.style.width = "800";
  afficheur.style.height = "900";

  setTimeout(function () {
    afficheur.style += "transform:translateY(900px)";
    afficheur.style.backgroundColor = "#333";
    afficheur.style.width = "800";
    afficheur.style.height = "900";
    afficheur.style.margin = "30px";
    setTimeout(function () {
      if(afficheur.innerHTML == ""){
        $("html,body").animate(
          { scrollTop: document.body.scrollHeight },
          "smooth"
        );
        afficheur.innerHTML +=
          "<embed src=\"./CV QUATTROCHI Anthony.pdf\" width=800 height=900 type='application/pdf'/>";
      }
    }, 1500);
  }, 1500);
}

function affichageProjets() {
  afficheur.innerHTML = "";
  affichage("1000","200",false);
  setTimeout(function () {
    afficheur.style += "transform:translateY(900px)";
    afficheur.style.backgroundColor = "#333";
    afficheur.style.width = "1000";
    afficheur.style.height = "200";
    afficheur.style.margin = "30px";
    setTimeout(function () {
      $("html,body").animate(
        { scrollTop: document.body.scrollHeight },
        "smooth"
      );
      afficheur.innerHTML +=
      "<h3>Simon</h3><p>Un projet en JavaScript/HTML/CSS reproduisant le jeu \"Simon\". </p><a href=\"./Simon/index.html\" type='button'>Voir plus</a>";
      afficheur.innerHTML +=
      "<h3>Miroir</h3><p>Un projet en JavaScript/HTML/CSS reproduisant le jeu \"Démineur\" en version amélioré. </p><a href=\"./Miroir/base.html\" type='button'>Voir plus</a>";
    }, 1500);
  }, 1500);
}

/**
 * Permet d'afficher mes hobbies.
 */
function affichageHobbies() {
  afficheur.innerHTML = "";
  affichage("1000","200",false);
  setTimeout(function () {
    afficheur.style += "transform:translateY(900px)";
    afficheur.style.backgroundColor = "#333";
    afficheur.style.width = "1000";
    afficheur.style.height = "200";
    afficheur.style.margin = "30px";
    setTimeout(function () {
      $("html,body").animate(
        { scrollTop: document.body.scrollHeight },
        "smooth"
      );
    }, 1500);
  }, 1500);
}

/**
 *  Affichage du rectangle sombre qui monte et qui descend
 * @param {String} width 
 * @param {String} height 
 * @param {Boolean} translate
 */
function affichage(width,height,translate){
  if(translate){
    afficheur.style.margin = "30px";
    afficheur.style += "transform:translateY(900px)";
  }
  afficheur.style.backgroundColor = "#333";
  afficheur.style.marginTop = "-900";
  afficheur.style.width = width;
  afficheur.style.height = height;
}