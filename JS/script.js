let cont = 0;
let height = 0
var listSeme = {    //lista controllare quante carte ci sono dentro ogni colonna
    "plan0": "empty",
    "plan1": "empty",
    "plan2": "empty",
    "plan3": "empty",
    "plan4": "empty",
    "plan5": "empty",
    "plan6": "empty"
}
var listCont = {    //lista controllare quante carte ci sono dentro ogni colonna
    "plan0": 0,
    "plan1": 0,
    "plan2": 0,
    "plan3": 0,
    "plan4": 0,
    "plan5": 0,
    "plan6": 0
}
var listNum = { //Lista per controllare il valore della carta precedente
    "plan0": 0,
    "plan1": 0,
    "plan2": 0,
    "plan3": 0,
    "plan4": 0,
    "plan5": 0,
    "plan6": 0
}

$(document).ready(function () {

    // Array usato per generare le carte
    let cards_id = ["bg_c1","bg_c2","bg_c3","bg_c4","bg_c5","bg_c6","bg_c7","bg_c8","bg_c9","bg_c10","bg_c11","bg_c12","bg_c13","bg_d1","bg_d2","bg_d3","bg_d4","bg_d5","bg_d6","bg_d7","bg_d8","bg_d9","bg_d10","bg_d11","bg_d12","bg_d13", "bg_h1","bg_h2","bg_h3","bg_h4","bg_h5","bg_h6","bg_h7","bg_h8","bg_h9","bg_h10","bg_h11","bg_h12","bg_h13","bg_s1","bg_s2","bg_s3","bg_s4","bg_s5","bg_s6","bg_s7","bg_s8","bg_s9","bg_s10","bg_s11","bg_s12","bg_s13"]

    var _dorso = $("#dorso");
    var _drop = $("#drop1");
    var _generata = $("#generata");
    let generatedOrder = [""]
    
    _dorso.click(function(){
        if (cont == 0)
            crea();
                //check se è la prima carta generata
        else{
            if ($("#" + generatedOrder[cont -1]).hasClass("colonna") != true)
                $("#" + generatedOrder[cont-1]).remove()
            crea();
        }
    })

    for(let i = 0; i < 7; i++)
        $("#plan" + i).val("plan" + i)
    
    function crea(){    //generazione dinamica della carta tramite append
        var id = cards_id[Math.floor((Math.random() * 52) + 0)];
        divId = "div" + id
        $('#generata').append($("<div id=\""+ divId +"\"><img class='carta' id=\"" + id + "\" src=\"img/" + id + ".gif\"></div>"))
        $("#div" + id).draggable({cursor: "move",}).css({"left":"0px","top":"0px"})
        generatedOrder[cont] = id;
        cont++;
        console.log(height)
        $(".coll").droppable({
            drop: function(event, ui){

                console.log("list " + this.id + id)
                semePrec = listSeme[$(this).val()][6]
                semeInMano = id[6]
                //semeInMano = 'c'
                //semePrec  = 't'

                if(checkSeme() && checkNum(id, this.id) && this.id != "div" + id){
                    $("#" + id).addClass("colonna");
                    console.log(divId)
                    $('#' + this.id).append($("#div" + id ).css({"left":"0px","top":"0px"}))
                    $('#' + this.id).removeClass("coll")
                    $("#" + divId).draggable().addClass("coll")
                    listSeme[divId] = id
                    console.log("print " + $(this).val())

                    $("#" + divId).val(divId);
                    listCont[divId] += 1
                    listNum[divId] = parseInt(id.split('_').pop().split('.')[0].substring(1))
                    
                }
                else
                    $('#div' + id).css({"left":"0px","top":"0px"})

            }

        })
        $(".not").droppable({
            drop: function(event, ui) {
                $('#div' + id).css({"left":"0px","top":"0px"})
            }
        })
                //
                //console.log(listaColl[this.id])//semePrec =

                //listColl[this.id] = id
        };

    })


    
    /*_carta.draggable({
        cursor: "move",
        opacity: "10",
        start: function(event, ui){
            $(this).css("background-color","#A0A0A0");
        },
        stop: function(event, ui){
            $(this).css("background-color", "#FAFAFA");
        }
    });
*/


function checkNum(id,  colonna){
    //parseInt(listColl[this.id].split('_').pop().split('.')[0].substring(1))
    // splitta tra i caratteri "_" e ".", successivamente rimuove il primo carattere (il seme).
    //Si fa - 1 cosi si controlla che sia maggiore di 1
    num = parseInt(id.split('_').pop().split('.')[0].substring(1))
    if ((listNum[colonna] == num - 1) || listNum[colonna] == 0){
        console.log("true");
        return true;
    }
    else{
        console.log("false");
        return false;
    }
}  

function checkSeme(){
    let Mano = ""
    let prec = ""

    if(semeInMano == 'c' || semeInMano == 's')
        Mano = "nero"
    else
        Mano = "rosso"
    if(semePrec == 'd' || semePrec == 'h')
        prec = "rosso";
    else
        prec = "nero"



    if (semePrec == 't'){
        semePrec = semeInMano
        console.log("true porco");
        return true
    }
    if (prec == Mano){
        console.log(prec + prec+ "false");
        return false
    }

    else{
        semePrec = semeInMano
        console.log("true");
        return true
    }

}