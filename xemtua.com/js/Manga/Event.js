var crollToTop = null;
var height_body;
var current_height_body;

function whitebackground(){
    body.style.backgroundColor = "rgb(236, 236, 236)";
    wrap_lowtool_bar.style.backgroundColor = "white";
    next_button.style.fill = "black";
    return_button.style.fill = "black";
    for (var i=0; i<light_bub_color.length; i++) light_bub_color[i].style.fill = "black";
    $('#imageLogo').attr('src','/xemtua.com/image/logoitem1.png');
}

function blackbackground(){
    body.style.backgroundColor = "rgba(0, 0, 0, 0.692)";
    wrap_lowtool_bar.style.backgroundColor = "black";
    next_button.style.fill = "white";
    return_button.style.fill = "white";
    for (var i=0; i<light_bub_color.length; i++) light_bub_color[i].style.fill = "white";
    $('#imageLogo').attr('src','/xemtua.com/image/logoitem.png');
}

if(changebackground == true){
    blackbackground();
    changebackground = true;
}else{
    whitebackground();
    changebackground = false;
}

function EventManga(event){
    var x = event.target;
    if(x.parentNode == light_bub || x.parentNode.parentNode == light_bub || x == light_bub){
        if(changebackground == false){
            blackbackground();
            changebackground = true;
            setCookie("changebackground", "true", 3);
        }else{
            whitebackground();
            changebackground = false;
            setCookie("changebackground", "false", 3);
        }
    }else if(x.parentNode == move_top || x.parentNode.parentNode == move_top || x == move_top){
        height_body = document.documentElement.scrollTop;
        current_height_body = height_body;
        if(crollToTop == null) crollToTop = setInterval(crollToTopFrame, 20);
    }else if(x.parentNode == next_button || x.parentNode.parentNode == next_button || x == next_button){
        sochap = Number(sochap) + 1;
        window.location = '/chapter/'+location.pathname.split("/")[2]+'/'+sochap;
        next_button.style.fill  = "tomato";
    }else if(x.parentNode == return_button || x.parentNode.parentNode == return_button || x == return_button){
        sochap = Number(sochap) - 1;
        window.location = '/chapter/'+location.pathname.split("/")[2]+'/'+sochap;
        return_button.style.fill  = "tomato";
    }
}

function crollToTopFrame(){
    if(document.documentElement.scrollTop != 0){
        current_height_body = current_height_body - height_body/30 ;
        document.body.scrollTop = current_height_body; 
        document.documentElement.scrollTop = current_height_body; 
    }else{ clearInterval(crollToTop); crollToTop = null;}
}