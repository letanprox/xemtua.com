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
                number_page = list_tap.number
                list_tap = list_tap.data;
                LoadElement();
        }
    };

function loadTap(){
    xhttp.open("GET", URLServer+"danhsachtap?page="+page, false);
    xhttp.send();
}

function LoadElement() {
    if(page === 0 ) page = 1;
    $('.content_tray_newep').empty();
    for(var i = 0; i < list_tap.length ; i++){
        var elements = '<a href="/xemphim?sotap='+list_tap[i].so_tap+'"><div><div></div><div class="item_content_tray_newep"><span class="ep_item_content_tray_newep"> tập ' + list_tap[i].so_tap + '</span><div><span>'+decode_utf8(list_tap[i].ten_tap)+'</span><span> ' +list_tap[i].luot_xem+ ' lượt xem</span></div></div><img src="'+decode_utf8(list_tap[i].anh_bia)+'" alt="One Piece - tập '+list_tap[i].so_tap+' - '+decode_utf8(list_tap[i].ten_tap)+'"></div></a>'
        $('.content_tray_newep').append(elements);
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

            var state = {}
            var title = '';
            var url = '/danhsachtap?page='+page;
            history.pushState(state, title, url);
        
            $('.content_tray_newep').empty();
            $('.content_tray_newep').append('<div class="loading_item_newep"></div><div class="loading_item_newep"></div><div class="loading_item_newep"></div><div class="loading_item_newep"></div><div class="loading_item_newep"></div><div class="loading_item_newep"></div>');
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