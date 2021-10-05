var afficheur = document.getElementById("afficheur");

function affichagePDF() {
  afficheur.innerHTML = "";
  afficheur.style.backgroundColor = "#333";
  afficheur.style.marginTop = "-900";
  afficheur.style.width = "800";
  afficheur.style.height = "900";

  setTimeout(function () {
    afficheur.style += "transform:translateY(900px);box-sizing: border-box;box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8);";
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
  affichage("1000","600",false);
  setTimeout(function () {
    afficheur.style += "transform:translateY(900px);box-sizing: border-box;box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8);";
    afficheur.style.backgroundColor = "#333";
    afficheur.style.width = "1000";
    afficheur.style.height = "600";
    afficheur.style.margin = "30px";
    setTimeout(function () {
      $("html,body").animate(
        { scrollTop: document.body.scrollHeight },
        "smooth"
      );
      afficheur.innerHTML +=
      "<h3 style='color: whitesmoke; margin: 20px;'>Simon</h3><p style='color: whitesmoke; margin: 20px;'>Un projet en JavaScript/HTML/CSS reproduisant le jeu \"Simon\". </p><a style='color: whitesmoke; margin: 20px;' href=\"./Simon/index.html\" type='button'>Voir plus</a>";
      afficheur.innerHTML +=
      "<h3 style='color: whitesmoke; margin: 20px;'>Miroir</h3><p style='color: whitesmoke; margin: 20px;'>Un projet en JavaScript/HTML/CSS reproduisant le jeu \"Démineur\" en version amélioré. </p><a style='color: whitesmoke; margin: 20px;' href=\"./Miroir/base.html\" type='button'>Voir plus</a>";
      afficheur.innerHTML +=
      "<h3 style='color: whitesmoke; margin: 20px;'>Cascade</h3><p style='color: whitesmoke; margin: 20px;'>Un projet en Java Android reproduisant le jeu \"Cascade\". </p><a style='color: whitesmoke; margin: 20px;' href=\"./Cascade/Cascade.apk\" type='button'>Voir plus</a>";
      afficheur.innerHTML +=
      "<p style='color: whitesmoke; margin: 20px;'>Un projet en JS, HTML, CSS, reproduisant le jeu \"Cascade\". </p><a style='color: whitesmoke; margin: 20px;' href=\"./CascadeJS/index.html\" type='button'>Voir plus</a>";
	  afficheur.innerHTML +=
      "<h3 style='color: whitesmoke;margin:20px;'>Mes autres projets</h3><p style='color: whitesmoke;margin:20px;'>Tout mes projets accessibles sur le gitlab de mon IUT sont disponibles via ce lien : </p><a style='color: whitesmoke; margin:20px;'href='https://gitlab-ce.iut.u-bordeaux.fr/aquattrochi' alt='Lien gitlab IUT'>Lien gitlab IUT</a>";  
    }, 1500);
  }, 1500);
}

/**
 * Permet d'afficher mes hobbies.
 */
function affichageHobbies() {
  afficheur.innerHTML = "";
  affichage("1000","500",false);
  setTimeout(function () {
    afficheur.style += "transform:translateY(900px);box-sizing: border-box;box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8);color: whitesmoke;";
    afficheur.style.backgroundColor = "#333";
    afficheur.style.width = "1000";
    afficheur.style.height = "500";
    afficheur.style.margin = "30px";
    setTimeout(function () {
      $("html,body").animate(
        { scrollTop: document.body.scrollHeight },
        "smooth"
      );
      
      afficheur.innerHTML += 
      "<h3 style='margin: 20px;'>Les creepypastas</h3><p style='margin: 20px;'>Je reconnais que c'est un centre d'intérêt assez singulier, mais j'ai toujours apprécié écouté, ou lire une bonne creepypasta.</p><p style='margin: 20px;'>Au cas où vous ne sauriez pas ce que sont des creepypastas, se sont de courtes histoires fictives et horrifiques</p><p style='margin: 20px;'>De manière totalement amateur, j'en ais même écris quelques unes sous ce lien : <a style='margin: 20px;' href='https://drive.google.com/drive/folders/1Sjle4RcOqhEwN2tXQd-_iKhQDkwwo5Qg?usp=sharing'>Lien Google Drive</a></p>";
      afficheur.innerHTML += 
      "<h3 style='margin: 20px;'>La musique</h3><p style='margin: 20px;'>Je ne suis ni musicien, ni chanteur. Je partage par contre un amour inconditionnel pour la musique. Cela aide à me concentrer ainsi qu'a me détendre. </p><p style='margin: 20px;'>Si je dois proposer quelques groupes ou chanteurs je dirais ...</p><ul style='margin: 20px;'><li>Queen</li><li>Pentatonix</li><li>MIKA</li></ul><p style='margin: 20px;'>Et voici d'autre groupes ou chanteur un peu moins connu mais que j'adore :</p><ul style='margin: 20px;'><li>Meg & Dia</li><li>Meg Myers</li><li>Nursena Yener</li></ul>";
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
    afficheur.style += "transform:translateY(900px);box-sizing: border-box;box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8);";
  }
  afficheur.style.backgroundColor = "#333";
  afficheur.style.marginTop = "-900";
  afficheur.style.width = width;
  afficheur.style.height = height;
}