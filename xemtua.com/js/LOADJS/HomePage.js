var URLServer = "/api/";

var list_tap;
var list_manga;
var list_shortvideo;
var list_movie;

var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if(this.responseURL.includes("newsshortvideo")){
                list_shortvideo = JSON.parse(this.responseText);
                LoadShortVideoElement();
            }
            if(this.responseURL.includes("tapmoi")){
                list_tap = JSON.parse(this.responseText);
                LoadTapMoiElement();
            }
            if(this.responseURL.includes("chapmoi")){
                list_manga = JSON.parse(this.responseText);
                LoadChapMoiElement();
            }
            if(this.responseURL.includes("phimlemoi")){
                list_movie = JSON.parse(this.responseText);
                LoadMovieMoiElement();
            }
        }
    };

function loadShortVideo(){
    xhttp.open("GET", URLServer+"newsshortvideo?page="+1, false);
    xhttp.send();
}
function loadTapMoi(){
    xhttp.open("GET", URLServer+"tapmoi", false);
    xhttp.send();
}
function loadChapMoi(){
    xhttp.open("GET", URLServer+"chapmoi", false);
    xhttp.send();
}
function loadPhimleMoi(){
    xhttp.open("GET", URLServer+"phimlemoi", false);
    xhttp.send();
}


function LoadShortVideoElement() {
    $('.contain_shortvideo').empty();
    for(var i = 0; i < list_shortvideo.length ; i++){
        var elements = '<a  href="/video?index='+list_shortvideo[i].index+'"><div class="item_shortvideo"><div class="info_item_shortvideo"><div><span>index-'+list_shortvideo[i].index+'</span><span>'+list_shortvideo[i].views+' lượt xem</span></div></div><img preload="metadata" src="'+list_shortvideo[i].url_thumbnail+'"></div></a>';
        $('.contain_shortvideo').append(elements);
    } 
}
function LoadTapMoiElement(){
    $('.contain_newep').empty();
    for(var i = 0; i < list_tap.length ; i++){
        var elements = '<a href="/episode/'+list_tap[i].tu_khoa+'/'+list_tap[i].so_tap+'"><div class="item_newep"><div class="info_newep"><div class="blankblack_item_newep"></div><div class="title_item_newep"><div>'+decode_utf8(list_tap[i].ten_phim)+'</div><div>Tập '+list_tap[i].so_tap+' - '+decode_utf8(list_tap[i].ten_tap)+'</div><div>'+list_tap[i].luot_xem+' lượt xem</div></div></div><img preload="metadata" src="'+decode_utf8(list_tap[i].anh_bia)+'"></div></a>';
        $('.contain_newep').append(elements);
    }  
}
function LoadChapMoiElement(){
    $('.contain_manga').empty();
    for(var i = 0; i < list_manga.length ; i++){
        var elements = '<a href="/chapter/'+list_manga[i].tu_khoa+'/"><div class="item_manga"><div class="info_manga"><div class="total_chap">chap '+list_manga[i].chap_moi+'</div><div class="title_manga"><div>'+list_manga[i].luot_xem+' lượt đọc</div><div>'+decode_utf8(list_manga[i].ten_truyen)+'</div></div></div><img preload="metadata" src="'+decode_utf8(list_manga[i].anh_bia)+'"></div></a>';
        $('.contain_manga').append(elements);
    } 
}
function LoadMovieMoiElement(){
    $('.contain_anime').empty();
    for(var i = 0; i < list_movie.length ; i++){
        var elements = '<a href="/movie/'+list_movie[i].tu_khoa+'"><div class="item_anime"><div class="info_anime"><div class="title_anime"><div>'+list_movie[i].luot_xem+' lượt xem</div><div>'+list_movie[i].ten_phimle+'</div></div></div><img preload="metadata" src="'+list_movie[i].anh_bia+'"></div></a>';
        $('.contain_anime').append(elements);
    } 
}

loadShortVideo();
loadTapMoi();
loadChapMoi();
loadPhimleMoi();