

var URLServer = "/api/";
var page = 0;

var stopload = false;


var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
            if(this.responseText !== '"that bai"'){
                data = JSON.parse(this.responseText);
                if(data.length == 0) stopload = true;
                AppendMovie(data)
            }
    }
}


function loadListMovie(){
    xhttp.open("GET", URLServer+"phimlemoi?page="+page, false);
    xhttp.send();
}


function AppendMovie(list_movie){
    // $('.contain_anime').empty();
    for(var i = 0; i < list_movie.length ; i++){
        var elements = '<a href="/movie/'+list_movie[i].tu_khoa+'"><div class="item_anime"><div class="info_anime"><div class="title_anime"><div>'+list_movie[i].luot_xem+' lượt xem</div><div>'+list_movie[i].ten_phimle+'</div></div></div><img preload="metadata" src="'+list_movie[i].anh_bia+'"></div></a>';
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
    setTimeout(function(){  loadListMovie();}, 300);
    }
}


loadListMovie();