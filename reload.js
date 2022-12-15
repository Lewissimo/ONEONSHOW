var current_url = window.location.href;

function ajaxInit(){
    var XHR = null;

    try{
        XHR = new XMLHttpRequest();
    }
    catch(e){
        try{
            XHR = new ActiveXObject("Msx12.XMLHTTP");
        }
        catch(e2){
            try{
                XHR = new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch(e){
                alert("twoja przeglądarka jest nieaktualna");
            }
        }
    }
    return XHR;
}

function load(value, id, type){
    switch (value){
        case 'home':
            Load_To_Div('i.' + type,'i.css',id);
            break;
        case 'about':
            Load_To_Div('about/a.' + type,'about/a.css',id);
            break;
        case 'offer':
            Load_To_Div('offer/o.' + type,'offer/o.css',id);
            break;
        case 'media':
            Load_To_Div('media/m.' + type,'media/m.css',id);
            break;
        case 'galery':
            Load_To_Div('galery/g.' + type,'galery/g.css',id);
            break;
        case 'contact':
            Load_To_Div('contact/c.' + type,'contact/c.css',id);
            break;
        default:
            document.write("Wystąpił błąd... Proszę spróbować później");
            break;
    }
}

function Load_To_Div(html, css, id){
    var head_section = $("head");
    var box = $("#"+id);
    box.css("opacity", "0");
    var XHR_html = ajaxInit();
    var XHR_css = ajaxInit();
    window.scroll({ 
        top: 300,
        behavior: 'smooth'
    });

    $("#current_style").remove();
    var style = $("<style id='current_style'></style>");
    if((XHR_html !== null)&&(XHR_css !== null)){
        XHR_html.open("GET", html, false);
        XHR_css.open("GET", css, false);

        
        XHR_css.onreadystatechange = function(){
            if((XHR_html.readyState === 4)&&(XHR_css.readyState === 4)){
                style.html(XHR_css.responseText);
                box.html(XHR_html.responseText);
                head_section.append(style);
            }
        }
        XHR_html.send(null);
        XHR_css.send(null);
        box.animate(
                {
                   "opacity": 1,
                }, 1000
            );
    }   
 
}

function change_href(element){
    window.location.href = '#' + element;
}

setInterval(function(){
    if(window.location.href !== current_url){
        current_url = window.location.href;
        load(current_url.substring(current_url.indexOf('#')+1), "main_content", _type);
    
    }
}, 100);
