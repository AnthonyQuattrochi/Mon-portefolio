function affichagePDF() {
    
    document.getElementById("afficheur").innerHTML = "";
    document.getElementById("afficheur").style.backgroundColor = "#333";
    document.getElementById("afficheur").style.marginTop= "-900";
    document.getElementById("afficheur").style.width = "800";
    document.getElementById("afficheur").style.height = "900";
    
    setTimeout(
        function() {
            document.getElementById("afficheur").innerHTML+= "<embed src=\"./CV QUATTROCHI Anthony.pdf\" width=800 height=900 type='application/pdf'/>";
            document.getElementById("afficheur").style+= "transform:translateY(900px)";
            document.getElementById("afficheur").style.width = "800";
            document.getElementById("afficheur").style.height = "900";
            document.getElementById("afficheur").style.padding = "30px";
            setTimeout(
                function() {
            $('html,body').animate({scrollTop: document.body.scrollHeight},"fast");
                }
            , 1500);
        }
        , 1500);
  }
