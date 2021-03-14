if(type_bar_ofMenu == 0){
    body.style.backgroundColor = "white";
    body.style.backgroundImage = "none";
    wrap_bar.style.backgroundColor = "white";
    wrap_bar.style.borderBottom = "1px solid rgb(219, 219, 219)";
    wrap_item_mb.style.borderBottom = "1px solid rgb(219, 219, 219)";
    wrap_item_mb.style.backgroundColor = "white";
}else{
    search_wall.style.backgroundColor = "white";
    mark_close_item.style.fill = "white";
    mark_show_item.style.fill = "white";
    mark_close_search.style.fill = "white";
    mark_show_search.style.fill = "white";
}

if(type_bar_ofMenu == 0) search_bar_.onfocus = function() {search_wall.style.border = "1px solid red";};

function hideItemBar(){
    mark_close_item.style.display = "none";
    mark_show_item.style.display = "block"; 
    wrap_item_mb.style.display = "none";
}
function showItemBar(){
    mark_close_item.style.display = "block";
    mark_show_item.style.display = "none";
    wrap_item_mb.style.display = "block";
}
function hideSearchBar(){
    mark_close_search.style.display = "none";
    mark_show_search.style.display = "block"; 
    wrap_search.style.display = "none"; 
}
function showSearchBar(){
    mark_close_search.style.display = "block";
    mark_show_search.style.display = "none";
    wrap_search.style.display = "block";
}

function changeCssMobileMenu(){
    mark_item.style.display = "block";
    mark_search.style.display = "block";
    wrap_item.style.display ="none";
    hideItemBar();
    hideSearchBar();
    var x = wrap_search.style;
    if(type_bar_ofMenu == 0) x.borderBottom = "1px solid rgb(219, 219, 219)";
    if(type_bar_ofMenu == 0) x.backgroundColor = "white";
    else x.backgroundColor = "rgb(29, 29, 29)";
}

function changeCssLargephonesMenu(){
    mark_item.style.display = "block";
    mark_search.style.display = "block";
    wrap_item.style.display ="none";
    hideItemBar();
    hideSearchBar();
    var x = wrap_search.style;
    if(type_bar_ofMenu == 0) x.borderBottom = "1px solid rgb(219, 219, 219)";
    if(type_bar_ofMenu == 0) x.backgroundColor = "white";
    else x.backgroundColor = "rgb(29, 29, 29)";
}

function changeCssTabletMenu(){
    mark_item.style.display = "none";
    wrap_item.style.display ="block";
    wrap_item_mb.style.display ="none";
    mark_search.style.display = "none";
    wrap_search.style.display ="block";
}

function changeCssPcMenu(){
    mark_item.style.display = "none";
    wrap_item.style.display ="block";
    wrap_item_mb.style.display ="none";
    mark_search.style.display = "none";
    wrap_search.style.display ="block";
}