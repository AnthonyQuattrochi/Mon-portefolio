/**

//////// @author : Anthony Quattrochi ////////

*/
var arrayJeu = [];
var arrayChoix = [];
var choixPossible = ["jaune","rouge","vert","bleu"];
var niveau =0;
var round;
var isCurrentlyWorking=false;

/**
 * Lorsque l'on clique sur la partie jaune.
 */ 
$(".shape1").click(function(){
    if(!isCurrentlyWorking && arrayJeu.length!=0){
        $('.sound1').get(0).play();
        arrayChoix.push("jaune");
        verificationCase();
    }
}); 
/**
 * Lorsque l'on clique sur la partie rouge.
 */ 
$(".shape2").on("click", function(){
    if(!isCurrentlyWorking && arrayJeu.length!=0){
        $('.sound2').get(0).play();
        arrayChoix.push("rouge"); 
        verificationCase();
    }
});
/**
 * Lorsque l'on clique sur la partie verte.
 */ 
$(".shape3").on("click", function(){
    if(!isCurrentlyWorking && arrayJeu.length!=0){
        $('.sound3').get(0).play();
        arrayChoix.push("vert");  
        verificationCase();
    }
});
/**
 * Lorsque l'on clique sur la partie bleu.
 */ 
$(".shape4").on("click", function(){
    if(!isCurrentlyWorking && arrayJeu.length!=0){
        $('.sound4').get(0).play();
        arrayChoix.push("bleu");
        verificationCase();
    }
});
/**
 * Animation d'opacité de toute les parties au clic.
 */
$(".pad").on("click", function(){
    if(!isCurrentlyWorking && arrayJeu.length!=0){
    $(this).animate({opacity:'0.5'},200).animate({opacity:'1.0'},100);
    }
});

/**
 * Lorsque l'on clique sur le centre du simon pour lancé la partie.
 */
$(".circle").on("click", function(){
    if(niveau==0){
    debutRound();
    }
});

/**
 * Permet de lancé le round en fonction du niveau atteint.
 */
function debutRound(){
        arrayChoix=[];
        arrayJeu=[];
        niveau++;
        $(".circle").html("Niveau : "+niveau);
        round = setInterval(ajouteChoix, 1000);
        finDemo();
}

/**
 * Débloque les bouttons à la fin de la démonstration.
 */
function finDemo() {
    setTimeout(function(){ 
        clearInterval(round); 
        isCurrentlyWorking=false;
    }, 1000*niveau);
}

/**
 * Fait un appel deux secondes plus tard au début du round.
 */
function nouveauRound() {
    setTimeout(function(){
        debutRound();
    }, 2000);
}

/**
 * Effectue la démonstration du combo à faire.
 * En même temps rempli le tableau du combo à faire.
 */
function ajouteChoix() {
    var i = Math.floor((Math.random() * 4));
    switch(choixPossible[i]){
        case "jaune":
            $(".shape1").animate({opacity:'0.5'},200).animate({opacity:'1.0'},100);
            $('.sound1').get(0).play();
            break;
        case "rouge":
            $(".shape2").animate({opacity:'0.5'},200).animate({opacity:'1.0'},100);
            $('.sound2').get(0).play();
            break;
        case "vert":
            $(".shape3").animate({opacity:'0.5'},200).animate({opacity:'1.0'},100);
            $('.sound3').get(0).play();
            break;
        case "bleu":
            $(".shape4").animate({opacity:'0.5'},200).animate({opacity:'1.0'},100);
            $('.sound4').get(0).play();
            break;
        default :
        break;
    }
    arrayJeu.push(choixPossible[i]);
}
/**
 * Vérifie si les cases appuyées sont bonnes.
 * Si toute les cases sont bonnes, lance un nouveau round.
 * Si la case selectionné recemment est mauvaise, le joueur recommence la partie à zéro!
 */
function verificationCase(){
     if(choixBon()){
        if(toutChoixBon()){
            isCurrentlyWorking=true;
            $(".circle").html("Bravo!");
            nouveauRound();
        }
    }else{
        isCurrentlyWorking=true;
        $(".circle").html("Faux!");
        reset();
    }
    
}
/**
 * Permet de redémarré la partie au début.
 */
function reset(){
    setTimeout(function(){
        niveau =0;
        arrayChoix=[];
        arrayJeu=[];
        $(".circle").html("Level");
        $(".shape1").animate({opacity:'0.5'},500).animate({opacity:'1.0'},400);
        $(".shape2").animate({opacity:'0.5'},500).animate({opacity:'1.0'},400);
        $(".shape3").animate({opacity:'0.5'},500).animate({opacity:'1.0'},400);
        $(".shape4").animate({opacity:'0.5'},500).animate({opacity:'1.0'},400);
        $('.sound1').get(0).play();
        isCurrentlyWorking=false;
    }, 2000);
    
}
/**
 * Vérifie si la case selectionnée est bonne.
 * @returns la valeur de vérité si la case selectionnée est bonne
 */
function choixBon(){
    var i = arrayChoix.length-1;
    return arrayChoix[i]==arrayJeu[i];
}
/**
 * Vérifie le combo effectué est le même que celui de la démonstration.
 * @returns la valeur de vérité si le combo est bon.
 */
function toutChoixBon(){
    var check = true;
    for(var x in arrayJeu){
        if(arrayChoix[x]!=arrayJeu[x]){
            check=false;
        }
    }
    return check;
}