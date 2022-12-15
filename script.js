// functions



// Function which provide easier way to animate showing and hiding elements
// When I want to show or hide element than in 90% cases I just want it to 
// travels through the page and disappear.
// This is want this function do when we will type corect parameters.
// el - element to animate
// valueX - value to travel on the x-axis
// valueY - value to travel on the y-axis
// opacity - this is simple css opacity value from 0 to 1
// state - this variable determines if we want to hide or show element.
// we can assign to posible choices 'show' and 'hide'

// time - this value determines time of animaiton
function del(el, display){
    $(el).css("display", display);
}
function show_hide_element(el, valueX = 0, valueY = 0, opacity = 1, state = 'hide', time = 1000){   

    switch(state){
        case "hide":
            var time_disp = time;
            var display = "none";
        break;
        case "show":
            var time_disp = 0;
            var display = "block";    
        break;
        default:
            console.log("ERROR SHOW_HIDE_ELEMENT: WRONG 'STATE' PARAMETR");
            return;    
        }

    var time_in_sec = Math.round((time/1000)*10)/10;
    setTimeout(function(){
        $(el).css("transition", "all " + time_in_sec + "s").css({"transform": "translateY(" + valueY + ") translateX(" + valueX + ")", "opacity": opacity});
    }, 10);
    setTimeout(function(){del(el, display)}, time_disp);  
}



// ----------------------
function delete_tel_hidden(){  
    show_hide_element($("#hidden_tel"), '-80px', 0, 0, 'hide');  
    switch_mob_con = 1;
}
// ------------------------




// LOGO EVENTS ----------------
$(document).ready(
    function(){
        $("#logo").on("mousedown",
            function(){
                $(this).css("filter", "brightness(1.3)");
                change_href('home');
                setTimeout(function(){$("#logo").css("filter","drop-shadow(5px 5px 5px black)");} ,700);
    });

});


     
