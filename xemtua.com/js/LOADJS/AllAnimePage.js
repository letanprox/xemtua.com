

var URLServer = "/api/";
var page = 0;

var stopload = false;


var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
            if(this.responseText !== '"that bai"'){
                data = JSON.parse(this.responseText);
                if(data.length == 0) stopload = true;
                AppendAnime(data)
            }
    }
}


function loadListAnime(){
    xhttp.open("GET", URLServer+"listanime?page="+page, false);
    xhttp.send();
}


function AppendAnime(list_anime){
    // $('.contain_anime').empty();
    for(var i = 0; i < list_anime.length ; i++){
        var elements = '<a href="/episode/'+list_anime[i].tu_khoa+'/1"><div class="item_anime"><div class="info_anime"><div class="title_anime"><div>'+list_anime[i].luot_xem+' lượt xem</div><div>'+decode_utf8(list_anime[i].ten_phim)+'</div></div></div><img preload="metadata" src="'+list_anime[i].anh_bia+'"></div></a>';
        $('.contain_anime').append(elements);
    } 
    document.getElementsByClassName("icon_load_shortvideo").item(0).style.display = "none";
    document.getElementsByClassName("load_more_shortvideo").item(0).style.display = "block";
}

function loadMore(){
    if(stopload == false){
    page = page + 1;
    document.getElementsByClassName("icon_load_shortvideo").item(0).style.display = "block";
    document.getElementsByClassName("load_more_shortvideo").item(0).style.display = "none";
    setTimeout(function(){  loadListAnime();}, 300);
    }
}


loadListAnime();