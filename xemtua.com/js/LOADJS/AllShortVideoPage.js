var URLServer = "/api/";
var list_one;

var list_views = [];
var list_temp_views = [];
var page_list_views = 1;

var list_news = [];
var list_temp_news = [];
var page_list_news = 1;

var list_ralate = [];
var page_list_ralate = false;

var check_list;

var waitingXML = false;

var index = 0;
if(typeof GetUrlParameter('index') !== "undefined"){
     index = Number(GetUrlParameter('index'));
     $('title').empty();
     $('title').append("index - " + index);
}

var backdex = 0;
if(typeof GetUrlParameter('backdex') !== "undefined") backdex = Number(GetUrlParameter('backdex'));

function setcolor_btn(x,y,z){
    document.getElementById("relate_btn").style.backgroundColor = x; 
    document.getElementById("news_btn").style.backgroundColor = y; 
    document.getElementById("views_btn").style.backgroundColor = z; 
}

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        waitingXML = false;
        if(this.responseURL.includes("getoneshortvideo")){
            if(this.responseText !== '"that bai"'){
                list_one = JSON.parse(this.responseText);
                LoadOneShortVideoElement();
                loadListRelateShortVideo();
            }
        }else if(this.responseURL.includes("relateshortvideo")){
            if(this.responseText !== '"that bai"'){
                list_ralate = JSON.parse(this.responseText);
                page_list_ralate = true;
                LoadListRelateShortVideoElement()
            }
        }else if(this.responseURL.includes("newsshortvideo")){
            if(this.responseText !== '"that bai"'){
                list_temp_news = JSON.parse(this.responseText);
                if(list_news.length <= 0) list_news = list_temp_news;
                LoadListNewsShortVideoElement();
            }
        }else if(this.responseURL.includes("topviewshortvideo")){
            if(this.responseText !== '"that bai"'){
                list_temp_views = JSON.parse(this.responseText);
                if(list_views.length <= 0) list_views = list_temp_views;
                LoadListTopViewShortVideoElement();
            }
        }
    }
}


function loadOneShortVideo(){
    xhttp.open("GET", URLServer+"getoneshortvideo?&index="+index+"&backdex="+backdex, false);
    xhttp.send();
}
function loadListRelateShortVideo(){
    if(page_list_ralate == false){
        xhttp.open("GET", URLServer+"relateshortvideo?index="+index, false);
        xhttp.send();
    }else{
        LoadListRelateShortVideoElement();
    }
}
function loadListNewsShortVideo(){
    if(check_list !== 2){
        page_list_news = 1;
        if(list_news.length <= 0){
            waitingXML = true;
            xhttp.open("GET", URLServer+"newsshortvideo?page="+1, true);
            xhttp.send();
        }else{
            list_temp_news = list_news;
            LoadListNewsShortVideoElement();
        }
    }else{
        waitingXML = true;
        xhttp.open("GET", URLServer+"newsshortvideo?page="+page_list_news, false);
        xhttp.send();
    }
}
function loadListTopViewShortVideo(){
    if(check_list !== 3){
        page_list_views = 1;
        if(list_views.length <= 0){
            waitingXML = true;
            xhttp.open("GET", URLServer+"topviewshortvideo?page="+1, true);
            xhttp.send();
        }else{
            list_temp_views = list_views;
            LoadListTopViewShortVideoElement();
        }
    }else{
        waitingXML = true;
        xhttp.open("GET", URLServer+"topviewshortvideo?page="+page_list_views, false);
        xhttp.send();
    }
}


function LoadOneShortVideoElement(){
    $('.tray_user_shortvideo').empty();
    var  elements = ' <video controls autoplay src="'+list_one.url_temp+'"></video>';
    $('.tray_user_shortvideo').append(elements);

    $('.info_user_shortvideo').empty();
    var elements = '<span>index-'+list_one.index+'</span><span>'+list_one.views+' lượt xem</span><a target="_blank"  rel="noopener noreferrer" href="'+list_one.url_drive+'"><span>GoogleDrive</span></a><a target="_blank"  rel="noopener noreferrer" href="'+list_one.url_temp+'"><span>Facebook</span></a>';
    $('.info_user_shortvideo').append(elements);
}
function LoadListRelateShortVideoElement() {
    $('.icon_load_shortvideo').hide();
    $('.load_more_shortvideo').hide();
    $('.contain_shortvideo').empty();
    for(var i = 0; i < list_ralate.length ; i++){
        var elements = '<a  href="/video?index='+list_ralate[i].index+'&backdex='+index+'"><div class="item_shortvideo"><div class="info_item_shortvideo"><div><span>index-'+list_ralate[i].index+'</span><span>'+list_ralate[i].views+' lượt xem</span></div></div><img preload="metadata" src="'+list_ralate[i].url_thumbnail+'"></div></a>';
        $('.contain_shortvideo').append(elements);
    } 
    check_list = 1;
}
function LoadListNewsShortVideoElement() {
    $('.icon_load_shortvideo').hide();
    $('.load_more_shortvideo').show();
    if(page_list_news == 1) $('.contain_shortvideo').empty();
    page_list_news = page_list_news + 1;
    for(var i = 0; i < list_temp_news.length ; i++){
        var elements = '<a  href="/video?index='+list_temp_news[i].index+'&backdex='+index+'"><div class="item_shortvideo"><div class="info_item_shortvideo"><div><span>index-'+list_temp_news[i].index+'</span><span>'+list_temp_news[i].views+' lượt xem</span></div></div><img preload="metadata" src="'+list_temp_news[i].url_thumbnail+'"></div></a>';
        $('.contain_shortvideo').append(elements);
    } 
    check_list = 2;
}
function LoadListTopViewShortVideoElement() {
    $('.icon_load_shortvideo').hide();
    $('.load_more_shortvideo').show();
    if(page_list_views == 1) $('.contain_shortvideo').empty();
    page_list_views = page_list_views + 1;
    for(var i = 0; i < list_temp_views.length ; i++){
        var elements = '<a href="/video?index='+list_temp_views[i].index+'&backdex='+index+'"><div class="item_shortvideo"><div class="info_item_shortvideo"><div><span>index-'+list_temp_views[i].index+'</span><span>'+list_temp_views[i].views+' lượt xem</span></div></div><img preload="metadata" src="'+list_temp_views[i].url_thumbnail+'"></div></a>';
        $('.contain_shortvideo').append(elements);
    } 
    check_list = 3;
}
function LoadMoreShortVideo(event){
    if(waitingXML == false){
    if(event.target.className == "load_more_shortvideo"){
        $('.icon_load_shortvideo').show();
        $('.load_more_shortvideo').hide();
        setTimeout(function(){
            if(check_list == 2){
                loadListNewsShortVideo();
            }
            if(check_list == 3){
                loadListTopViewShortVideo();
            }
        },300);
    }else if(event.target.id == "relate_btn"){
        setcolor_btn("tomato","cornflowerblue","cornflowerblue");
        if(check_list != 1) loadListRelateShortVideo();
    }else if(event.target.id == "news_btn"){
        setcolor_btn("cornflowerblue","tomato","cornflowerblue");;
        if(check_list != 2) loadListNewsShortVideo();
    }else if(event.target.id == "views_btn"){
        setcolor_btn("cornflowerblue","cornflowerblue","tomato");
        if(check_list != 3) loadListTopViewShortVideo();
    }
    }
}

if(index > 0){
    $('.icon_load_shortvideo').hide();
    $('.load_more_shortvideo').hide();
    loadOneShortVideo();
}else{
    $('.tray_user_shortvideo').hide();
    $('.info_user_shortvideo').hide();
    document.getElementById("relate_btn").style.display = "none"; 
    setcolor_btn("cornflowerblue","tomato","cornflowerblue");;
    loadListNewsShortVideo();
}