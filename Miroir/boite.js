//Var globale
var univers=[];
var score=0;
var nbPions = 0;
var mydebug = false;

init = function () {
    creerUnivers();
}

/**
 * Fonction main
 */
main =function(){
    var divContener =document.getElementById('jeu');
    var newTable =document.createElement("table");
    newTable.setAttribute("align","center");
    newTable.setAttribute("cellspacing","1");
    newTable.setAttribute("cellpadding","1");
    newTable.setAttribute("border","8");
    for(let i=0;i<10;i++){
    var newTr = document.createElement("tr");
    for(let j=0;j<10;j++){
        var newTd = document.createElement("td");
        newTd.style.width = '20px';
        newTd.style.height = '20px';
        univers[i][j].dom =newTd
        univers[i][j].initialiser();  
        newTr.appendChild(newTd);
    }
    newTable.appendChild(newTr);
    }
    divContener.appendChild(newTable);
    document.getElementById('validate').disabled = true;
    var scoreText =document.createElement("p");
    var node = document.createTextNode("Le score est de : "+score);
    scoreText.appendChild(node);
    scoreText.setAttribute('id',"score");
    divContener.appendChild(scoreText);
    

}
/**
 * Permet de rajouté un paragraphe de debug avec le text associé.
 * @param {string} text 
 */
function createDebugParagraph(text){
    if(mydebug){
        document.getElementById("debug").innerHTML = document.getElementById("debug").innerHTML+text+"<br>";
    }
}

function debugClear(){
    if(mydebug){
        document.getElementById("debug").innerHTML = "";
    }
}
/**
 *  Création de cellule.
 * @param {*} li 
 * @param {*} co 
 * @param {*} element 
 */
function cellule(li, co,element) {
    this.li = li;
    this.co = co;
    this.etat =  -1;
    this.atome = false;
    this.dom = element;
    var that = this;
    var clickgrille = function () { clickGrille(that) };
    var clickcolor = function () { doOther(that) };
    this.grille = (li > 0) && (li < 9) && (co > 0) && (co < 9);
    this.initialiser=function() {
        var couleur = "";
        if ((this.li === 0 && this.co === 0) || (this.li === 0 && this.co === 9) ||
         (this.li === 9 && this.co === 0) || (this.li === 0 && this.co === 0) || (this.li === 9 && this.co === 9)) {
              // les 4 coins
              couleur = 'grey';
        } else if (this.li === 0 || this.co === 0 || this.li === 9 || this.co === 9) {
            // les boutons latéraux ou les pions joué
            couleur = 'darkgrey';
            clickcolor(this);
        }else{
            couleur = "white";
            clickgrille(this);
        }
        this.dom.style.backgroundColor = couleur;
    };
}


/**
 *  Permet d'affecté des actions en cliquant sur la grille
 * @param {cellule} c 
 */
function clickGrille(c){
    c.dom.addEventListener("click", function( event ) {
        if(c.etat==-1 && nbPions<5){
            createDebugParagraph("Ajout d'un pion de suspition à la coordonnée ("+c.li+","+c.co+")");
            if(!c.atome){
                score-=5;
            }
            nbPions++;
            event.target.style.backgroundColor = "orange";  
            event.target.style.borderRadius = "25px";  
            c.etat=1;  
        }
        else if(c.etat==1){
            if(!c.atome){
                score+=5;
            }
            nbPions--;
            createDebugParagraph("Retrait d'un pion de suspition à la coordonnée ("+c.li+","+c.co+")");
            event.target.style.backgroundColor = "white";  
            event.target.style.borderRadius = "0px";   
            c.etat=-1;   
        }
        
        if(nbPions==5){
            document.getElementById('validate').disabled = false;
        }else{
            document.getElementById('validate').disabled = true;
        }
    });
}

function myScore(){
    document.getElementById("score").innerHTML = "Le score est de : "+score;
}
function debug(){
    mydebug=!mydebug;
    for (li = 0; li < 10; li += 1) {
        for (co = 0; co < 10; co += 1) {
            if(univers[li][co].atome && mydebug){
                univers[li][co].dom.style.backgroundColor = "red";  
                univers[li][co].dom.style.borderRadius = "25px";
            }
            else if(univers[li][co].atome && !mydebug){
                univers[li][co].dom.style.backgroundColor = "white";  
                univers[li][co].dom.style.borderRadius = "0px"; 
            }
        }
    }
}

/**
 *  Permet d'affecté des actions en cliquant sur la grille
 * @param {cellule} c 
 */
function doOther(c){
    c.dom.addEventListener("click", function( event ) {
        var color ="#" + ((1<<24)*Math.random() | 0).toString(16);
        if(c.etat == -1){
            c.dom.style.backgroundColor = color;
            c.etat = 1;
            score++;
        
            if(c.li===0){
                createDebugParagraph("Un tir depuis la coordonnée ("+c.li+","+c.co+")");
                resultatDuTir(c,1,0,color);
             }
            else if(c.li===9){ 
                createDebugParagraph("Un tir depuis la coordonnée ("+c.li+","+c.co+")");
                resultatDuTir(c,-1,0,color);
            }
            else if(c.co===0){
                createDebugParagraph("Un tir depuis la coordonnée ("+c.li+","+c.co+")");
                resultatDuTir(c,0,1,color);
            }
            else if(c.co===9){
                createDebugParagraph("Un tir depuis la coordonnée ("+c.li+","+c.co+")");
                resultatDuTir(c,0,-1,color);
            }
        }
    });
}

/**
 * Permet de créer un univers de cellule.
 */
 function creerUnivers() {
    var li, co, ligne;
    univers = [];
    for (li = 0; li < 10; li += 1) {
        ligne = [];
        for (co = 0; co < 10; co += 1) {
            ligne.push(new cellule(li, co));
        }
        univers.push(ligne);
    }
    caseRdm();
}
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
/**
 * Permet de généré 5 atomes aléatoirement dans la grille.
 */
 function caseRdm() {
    var i, j, cpt;
    cpt = 0;
    while (cpt < 5) {
        i = getRandomInt(8) + 1;
        j = getRandomInt(8) + 1;
        if (!univers[i][j].atome){
            univers[i][j].atome = true;
            cpt++;
        }
    }
    main();
}

function resultatDuTir(cellule, vl, vc,color) { //s = case de l'univers
    s = univers[cellule.li + vl][cellule.co + vc];
    if (!s.grille) { //cellule de sortie
        s.dom.style.backgroundColor = color;
        s.etat=1;
        score++;
        createDebugParagraph("Sortie du tir à la coordonnée ("+s.li+","+s.co+")");
        return s; // cas à définir
    }
    if (s.atome) {
        score--;
        createDebugParagraph("Le tir à été absorbé!");
        return null; // Absorption
    }
    if (vc === 0) { //déplacement haut bas
        if (univers[s.li][s.co - 1].atome) {
            if (!cellule.grille) {
                score-=2;
                return cellule;
            }
            return resultatDuTir(cellule, 0, 1,color);
        }
        if (univers[s.li][s.co + 1].atome) {
            if (!cellule.grille) {
                score-=2;
                return cellule;
            }
            return resultatDuTir(cellule, 0, -1,color);
        }
    } else //gauche droite
    { 
        if (univers[s.li-1][s.co].atome) {
            if (!cellule.grille) {
                score-=2;
                return cellule;
            }
            return resultatDuTir(cellule, 1, 0,color);
        }
        if (univers[s.li+1][s.co].atome) {
            if (!cellule.grille) {
                score-=2;
                return cellule;
            }
            return resultatDuTir(cellule, -1, 0,color);
        }
   }
   //alert("Je continue ma route");
   return resultatDuTir(s, vl, vc,color);
   }