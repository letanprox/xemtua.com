var URLServer = "/api/";
var list_tap;

var page = 0;
if(typeof GetUrlParameter('page') !== "undefined"){
    page = Number(GetUrlParameter('page'));
}
var number_page = 0;

var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
                list_tap  = JSON.parse(this.responseText);
                number_page = list_tap.number;
                list_tap = list_tap.data;
                LoadElement();
        }
    };

function loadTap(){
    xhttp.open("GET", URLServer+"danhsachphim?page="+page, false);
    xhttp.send();
}

function LoadElement() {
    if(page === 0 ) page = 1;
    $('.content_tray_movie').empty();
    var list_film = list_tap;
    for(var i = 0; i < list_film.length ; i++){
        var elements = '<a href="/xemphim?sophim='+list_film[i].so_phim+'"><div class="item_content_tray_movie"><div class="part_1_item_content_tray_movie"><p class="hover_item_content_tray_movie"></p><div>'+ list_film[i].thoi_luong + ' phút</div><img src="'+list_film[i].anh_bia+'" alt="One Piece - '+decode_utf8(list_film[i].ten_phim)+'" srcset=""></div><div class="part_2_item_content_tray_movie"><div>'+list_film[i].ten_phim+'</div><div>' +list_film[i].luot_xem+ ' lượt xem</div></div></div></a>';
        $('.content_tray_movie').append(elements);
    }
    loadNumber();
}

function ChosePageSearch(event){
    var x = event.target;
    if(x.parentNode.className == "number_page"){
        if(x.id != "chose_page"){
            if(x.id === '<<') page = page-1;
            else if(x.id === '>>') page = page+1;
            else page = Number(x.id);
            $('.content_tray_movie').empty();
            $('.content_tray_movie').append('<div class="loading_item_movie"></div><div class="loading_item_movie"></div><div class="loading_item_movie"></div><div class="loading_item_movie"></div><div class="loading_item_movie"></div><div class="loading_item_movie"></div>');
            loadNumber();
            setTimeout(function(){ 
                loadTap();
            },500);
        }
    }
}

function loadNumber(){
    $('.number_page').empty();
    var elements = '';
    if(page > 3){
        elements = '<span id="1">1</span>';
        $('.number_page').append(elements);
        elements = '<span id="<<">￩</span>';
        $('.number_page').append(elements);
    }
    for(var i = page-2; i <= page+2 ; i++){
        if(i == page){
            elements = '<span id="chose_page">'+i+'</span>';
            $('.number_page').append(elements);
        }else if(i >= 1 && i <= number_page){
            elements = '<span id="'+i+'">'+i+'</span>';
            $('.number_page').append(elements);
        }
    }
    if(page <= number_page-3){
        elements = '<span id=">>">￫</span>';
        $('.number_page').append(elements);
        elements = '<span id="'+number_page+'">'+number_page+'</span>';
        $('.number_page').append(elements);
    }
}

loadTap();