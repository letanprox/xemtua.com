var URLServer = "/api/";

var list_shortvideo;
var list_tap;
var list_film;
var list_manga;

var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if(this.responseURL.includes("newsshortvideo")) {
                list_shortvideo = JSON.parse(this.responseText);
                loadShortvideoELement()
            }else if(this.responseURL.includes("tapmoi")) {
                list_tap  = JSON.parse(this.responseText);
                loadNewEpElement();
            }else if(this.responseURL.includes("phimmoi")){
                list_film = JSON.parse(this.responseText);
                loadMovieElement()
            }else if(this.responseURL.includes("chapmoi")){
                list_manga = JSON.parse(this.responseText);
                loadMangaElement();
            }
        }
    };


function loadShortVideo(){
    xhttp.open("GET", URLServer+"newsshortvideo?page="+1, false);
    xhttp.send();
}
function loadTap(){
    xhttp.open("GET", URLServer+"tapmoi", false);
    xhttp.send();
}
function loadPhim(){
    xhttp.open("GET", URLServer+"phimmoi", false);
    xhttp.send();
}
function loadManga(){
    xhttp.open("GET", URLServer+"chapmoi", false);
    xhttp.send();
}


function loadShortvideoELement(){
    $('.contain_shortvideo').empty();
    for(var i = 0; i < list_shortvideo.length ; i++){
        var elements = '<a  href="/videoedit?index='+list_shortvideo[i].index+'"><div class="item_shortvideo"><div class="info_item_shortvideo"><div><span>index-'+list_shortvideo[i].index+'</span><span>'+list_shortvideo[i].views+' lượt xem</span></div></div><img preload="metadata" src="'+list_shortvideo[i].url_thumbnail+'"></div></a>';
        $('.contain_shortvideo').append(elements);
    }
}
function loadNewEpElement(){
    $('.content_tray_newep').empty();
    for(var i = 0; i < list_tap.length ; i++){
        var elements = '<a href="/xemphim?sotap='+list_tap[i].so_tap+'"><div><div></div><div class="item_content_tray_newep"><span class="ep_item_content_tray_newep"> tập ' + list_tap[i].so_tap + '</span><div><span>'+decode_utf8(list_tap[i].ten_tap)+'</span><span> ' +list_tap[i].luot_xem+ ' lượt xem</span></div></div><img src="'+decode_utf8(list_tap[i].anh_bia)+'" alt="One Piece - tập '+list_tap[i].so_tap+' - '+decode_utf8(list_tap[i].ten_tap)+'"></div></a>';
        $('.content_tray_newep').append(elements);
    } 
}
function loadMovieElement(){
    $('.content_tray_movie').empty();
    for(var i = 0; i < list_film.length ; i++){
        var elements = '<a href="/xemphim?sophim='+list_film[i].so_phim+'"><div class="item_content_tray_movie"><div class="part_1_item_content_tray_movie"><p class="hover_item_content_tray_movie"></p><div>'+ list_film[i].thoi_luong + ' phút</div><img src="'+list_film[i].anh_bia+'" alt="One Piece - '+decode_utf8(list_film[i].ten_phim)+'" srcset=""></div><div class="part_2_item_content_tray_movie"><div>'+list_film[i].ten_phim+'</div><div>' +list_film[i].luot_xem+ ' lượt xem</div></div></div></a>';
        $('.content_tray_movie').append(elements);
    }
}
function loadMangaElement(){
    for(var i = 0; i < list_manga.length ; i++){
        var elements = '<img src="'+decode_utf8(list_manga[i].anh_bia)+'" alt="" srcset=""><div class="text_chapter_content_tray_manga">chap mới: '+list_manga[i].so_chap+'</div>';
        $('.content_tray_manga').append(elements);
    }
}

loadShortVideo();
loadTap();
loadPhim();
loadManga();