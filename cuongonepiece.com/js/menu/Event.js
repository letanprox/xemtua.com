var MenuClick = function(event) {
    var x = event.target;
    if(x.id == "mark_search"){
        hideItemBar();
        if(wrap_search.style.display == "none") showSearchBar(); else hideSearchBar(); 
    }else if(x.id == "mark_item"){
        hideSearchBar(); 
        if(wrap_item_mb.style.display == "none") showItemBar(); else hideItemBar();
    }else if(x.parentNode.className == "search_button" || x.className == 'search_button'){
        location.replace("/search?textsearch="+document.getElementById('search_bar').value+"&page=1");
    }else if(x.className == "wrap_item_mb" || x.parentNode.className == "wrap_item_mb" ||  x.className == "wrap_search" || x.parentNode.className == "wrap_search" || x.parentNode.className == "search_wall" || x.parentNode.className == "search_bar" || x.parentNode.className == "search_button"){
        //Not act
    }else{
        if(type_screen_ofMenu == 1 || type_screen_ofMenu == 2){
            hideItemBar();
            hideSearchBar();
        }
    }
};

document.getElementById("search_bar").addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        var url_string = window.location.href;
        if(url_string.includes('/videoedit')){
            event.preventDefault();
            location.replace("/videoedit?index="+document.getElementById('search_bar').value);
        }else{
            event.preventDefault();
            location.replace("/search?textsearch="+document.getElementById('search_bar').value);
        }
    }
});