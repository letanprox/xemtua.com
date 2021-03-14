

var URLServer = "/api/";
var page = 0;

var stopload = false;


var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
            if(this.responseText !== '"that bai"'){
                data = JSON.parse(this.responseText);
                if(data.length == 0) stopload = true;
                AppendTruyen(data)
            }
    }
}


function loadListTruyen(){
    console.log(URLServer+"listtruyen?page"+page)
    xhttp.open("GET", URLServer+"listtruyen?page="+page, false);
    xhttp.send();
}


function AppendTruyen(list_manga){
    for(var i = 0; i < list_manga.length ; i++){
        var elements = '<a href="/chapter/'+list_manga[i].tu_khoa+'/1"><div class="item_manga"><div class="info_manga"><div class="total_chap">chap '+list_manga[i].chap_moi+'</div><div class="title_manga"><div>'+list_manga[i].luot_xem+' lượt đọc</div><div>'+decode_utf8(list_manga[i].ten_truyen)+'</div></div></div><img preload="metadata" src="'+decode_utf8(list_manga[i].anh_bia)+'"></div></a>';
        $('.contain_manga').append(elements);
    } 
    document.getElementsByClassName("icon_load_shortvideo").item(0).style.display = "none";
    document.getElementsByClassName("load_more_shortvideo").item(0).style.display = "block";

}

function loadMore(){
    if(stopload == false){
    page = page + 1;
    document.getElementsByClassName("icon_load_shortvideo").item(0).style.display = "block";
    document.getElementsByClassName("load_more_shortvideo").item(0).style.display = "none";
    setTimeout(function(){  loadListTruyen();}, 300);
    }
}



loadListTruyen();