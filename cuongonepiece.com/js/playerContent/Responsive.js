function changeCssNoPcPlayerContent(){
    player_slide.style.height ="auto";
    player_slide.style.maxHeight = "none";

    contain_list_item_player_slide.style.maxHeight = "none";
    contain_list_item_player_slide.style.overflow = "hidden";
    contain_list_movie_player_slide.style.maxHeight = "none";
    contain_list_movie_player_slide.style.overflow = "hidden";

    contain_list_message_player_slide.style.maxHeight = "none";
}

function changeCssPcPlayerContent(){
    player_slide.style.height = player_content.offsetHeight + "px";
    player_slide.style.maxHeight = player_content.offsetHeight + "px";
    
    contain_list_item_player_slide.style.maxHeight = player_slide.offsetHeight - 84 + "px";
    contain_list_item_player_slide.style.overflow = "auto";
    contain_list_movie_player_slide.style.maxHeight = player_slide.offsetHeight - 84 + "px";
    contain_list_movie_player_slide.style.overflow = "auto";

    contain_list_message_player_slide.style.maxHeight = player_slide.offsetHeight - 110 + "px";
}

function scrollBarList(){
    if(/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    }else{
        if(list_season_player_slide.scrollHeight - list_season_player_slide.scrollTop != list_season_player_slide.clientHeight) list_season_player_slide.style.width = "calc(100% - 0px)";
        if(contain_list_message_player_slide.scrollHeight - contain_list_message_player_slide.scrollTop == contain_list_message_player_slide.clientHeight) for(var i = 0 ; i < item_message_player_slide.length ; i++) item_message_player_slide[i].style.width = "calc(100% - 20px)";
        else for(var i = 0 ; i < item_message_player_slide.length ; i++) item_message_player_slide[i].style.width = "calc(100% - 10px)";

        js_changecss.innerHTML =
        '.list_season_player_slide::-webkit-scrollbar {' + 'display: block;' + '}' + 
        '.contain_list_message_player_slide::-webkit-scrollbar{' + 'display: block;' + '}'+
        '.contain_list_item_player_slide::-webkit-scrollbar {' + 'display: block;' + '}'+
        '.contain_list_movie_player_slide::-webkit-scrollbar{' + 'display: block;' + '}';
    }
}

if(/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    list_season_player_slide.style.width = "calc(100% - 10px)";
    for(var i = 0 ; i < item_message_player_slide.length ; i++) item_message_player_slide[i].style.width = "calc(100% - 20px)";

    js_changecss.innerHTML =
    '.list_season_player_slide::-webkit-scrollbar {' + 'display: none;' + '}' + 
    '.contain_list_message_player_slide::-webkit-scrollbar{' + 'display: none;' +'}' +
    '.contain_list_item_player_slide::-webkit-scrollbar {' + 'display: none;' + '}'+
    '.contain_list_movie_player_slide::-webkit-scrollbar{' + 'display: block;' + '}';
}