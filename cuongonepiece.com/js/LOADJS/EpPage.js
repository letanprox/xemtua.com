var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        if(this.responseURL.includes("loadPlayer")) {
            var data = JSON.parse(this.responseText);
            AppendTitleSeason(data.mua[0].so_mua,data.mua[0].khoang_tap);
            somua = data.mua[0].so_mua;
            AppendListSeason(data.danh_sach_mua);
            if(Number(data.danh_sach_tap[data.danh_sach_tap.length-1].so_tap) < sotap) sotap = Number(data.danh_sach_tap[data.danh_sach_tap.length-1].so_tap);
            AppendListEp(data.danh_sach_tap);
            isloaded_ep = true;
        }
        if(this.responseURL.includes("loadSeason")) {
            AppendTitleSeason(somua,khoangtap);
            AppendListEp(JSON.parse(this.responseText));
            ChangeChoiceListSeason(somua);
        }
        if(this.responseURL.includes("loadMovie")) {
            AppendListMovie(JSON.parse(this.responseText));
            isloaded_movie = true;
        }
        if(this.responseURL.includes("loadComment")) {
            AppendListComment(JSON.parse(this.responseText));
            isloaded_comment = true;
        }

        scrollBarList();
        hideLoadingVideo();

        if(this.responseURL.includes("checkLinkTap") || this.responseURL.includes("checkLinkPhim") ){
            if(this.responseText !== "that bai"){
            if(iloadLink === false){

                var checklink = JSON.parse(this.responseText);

                if(checklink.direct == "false"){
                    document.getElementById('LoadVideoDirect').style.display = "none";
                }else{
                    url_direct = checklink.direct.replace(/"/gi, "");
                    if(priorlink == 0){
                        document.getElementById('LoadVideoDirect').style.backgroundColor = "tomato";
                        AppendVideoJwplayer(url_direct);
                        priorlink = 1;
                    }
                }
                
                if(checklink.linkfb == "false"){
                    document.getElementById('LoadVideoFB').style.display = "none";
                }else{
                    url_fb = checklink.linkfb.replace(/"/gi, "");
                    if(priorlink == 0){ 
                        document.getElementById('LoadVideoFB').style.backgroundColor = "tomato";
                        AppendVideoJwplayer(url_fb);
                        priorlink = 1;
                    }
                }

                if(checklink.embed == "false"){
                    document.getElementById('LoadVideoEmbed').style.display = "none";
                }else{
                    url_embed = checklink.embed.replace(/"/gi, "");
                    if(priorlink == 0){
                        document.getElementById('LoadVideoEmbed').style.backgroundColor = "tomato";
                        AppendVideoEmbed(url_embed);
                        priorlink = 1;
                    }
                }

                iloadLink = true;
                clearInterval(intervaltime_);
            } 
            }else{
                document.getElementById('LoadVideoEmbed').style.display = "none";
                document.getElementById('LoadVideoDirect').style.display = "none";
                document.getElementById('LoadVideoFB').style.display = "none";
            }
        }
    }
};

//HTTP request
function loadTap(){
    if(isloaded_ep == false){
        var is_sync = false;
        if(isloaded_movie == true) is_sync = true;
        xhttp.open("GET", URLServer+"loadPlayer?sotap="+sotap, is_sync);
        xhttp.send();
    }else{
        scrollBarList();
        hideLoadingVideo();
    }
}
function LoadSeason(_somua,_khoangtap){
    if(somua != _somua){
        somua = _somua;
        khoangtap = _khoangtap;
        xhttp.open("GET", URLServer+"loadSeason?somua="+somua, true);
        xhttp.send();
    }else{
        scrollBarList();
        hideLoadingVideo(); 
    }
}
function loadPhim(){
    if(isloaded_movie == false){
        var is_sync = false;
        if(isloaded_ep == true) is_sync = true;
        xhttp.open("GET", URLServer+"loadMovie", is_sync);
        xhttp.send();
    }else{
        scrollBarList();
        hideLoadingVideo();
    }
}
function LoadComment(){
    if(isloaded_comment === false){
        xhttp.open("GET", URLServer+"loadComment?_id="+_id, true);
        xhttp.send();
    }else{
        scrollBarList();
        hideLoadingVideo();
    }
}
function AddComment(){
    noi_dung = document.getElementById('input_comment').value;
    ten_chat = document.getElementById('input_name').value;
    thoi_gian = getCurrentTime();
    if(String(noi_dung) != '' && String(ten_chat) != ''){
        AppendOneComment();
        xhttp.open("GET",URLServer+"insertComment?id_facebook="+id_facebook+"&ten_chat="+ten_chat+"&noi_dung="+noi_dung+"&thoi_gian="+thoi_gian, true);
        xhttp.send();
    }else{
        alert("Bạn chưa nhập đủ!");
    }
}

//LOAD ELEMENT -------------------------------------------------------
function AppendTitleSeason(_somua,_khoangtap){
    $('.button_season_player_slide').empty();
    $('.button_season_player_slide').append('<span>Season '+_somua+':</span><div>'+_khoangtap+'</div>');
}
function AppendListSeason(_danhsachmua){
    $('.list_season_player_slide').empty();
    var elements = '';
    for(var i = 0; i < _danhsachmua.length ; i++){
        if(Number(_danhsachmua[i].so_mua) === Number(somua)) elements = elements + '<div id="somua_choice"';
        else elements = elements + '<div ';
        elements = elements + 'so_mua="'+_danhsachmua[i].so_mua+'"  khoang_tap="'+_danhsachmua[i].khoang_tap+'"><span>Season '+ _danhsachmua[i].so_mua +' - '+_danhsachmua[i].ten_mua+'</span><span>'+_danhsachmua[i].khoang_tap+'</span></div>';
    }
    $('.list_season_player_slide').append(elements);
}
function ChangeChoiceListSeason(_somua){
    try {document.getElementById("somua_choice").removeAttribute("id");}catch(e){}
    $( "div[so_mua="+_somua+"]" ).attr('id', 'somua_choice');
}

function AppendTitleEp(_sotap , _luotxem){
        $('.title_video').empty();
        $('.title_video').append('<div>ONE PIECE - TẬP '+_sotap+'</div><div>'+_luotxem+' lượt xem</div>');
}
function AppendListEp(_danhsachtap){
    $('.list_item_player_slide').empty();
    var is_scoll_listep = false;
    var elements = '';
    for(var i = 0; i < _danhsachtap.length ; i++){
        if(Number(_danhsachtap[i].so_tap) === Number(sotap)){
            is_scoll_listep = true;
            elements = elements + '<a href="/xemphim?sotap='+_danhsachtap[i].so_tap+'"><div id="ep_choice"' ;
            AppendTitleEp(_danhsachtap[i].so_tap , _danhsachtap[i].luot_xem);
            title_EpPage = _danhsachtap[i].ten_tap;
        }else elements = elements + '<a href="/xemphim?sotap='+_danhsachtap[i].so_tap+'"><div ';
        elements = elements +'class="item_player_slide">'+
                                '<div class="img_item_player_slide"><img src="'+(decode_utf8(_danhsachtap[i].anh_bia)).replace(/http:/gi, "https:")+'" alt="One Piece - tập '+_danhsachtap[i].so_tap+' - '+decode_utf8(_danhsachtap[i].ten_tap)+'"></div>'+
                                '<div class="title_item_player_slide">Tập '+_danhsachtap[i].so_tap+' - '+_danhsachtap[i].ten_tap+'</div>'+
                                '<div class="view_item_player_slide">'+_danhsachtap[i].luot_xem+' lượt xem</div>'+
                                '</div></a>';
    }
    $('.list_item_player_slide').append(elements);
    //SCOLL TO EP
    setTimeout(function(){
        var elem = document.getElementsByClassName('contain_list_item_player_slide').item(0);
        if(is_scoll_listep === false) elem.scrollTop = 0;
        else elem.scrollTop = Number(document.getElementById("ep_choice").offsetTop) - 5;
    }, 1);
}

function AppendTitleMovie(_tenphim , _luotxem){
        $('.title_video').empty();
        $('.title_video').append('<div>'+_tenphim+'</div><div>'+_luotxem+' lượt xem</div>');
}
function AppendListMovie(_danhsachphim){
    //ADD TOTAL TITLE
    $('.show_total_movie').empty();
    $('.show_total_movie').append("Tổng số: "+_danhsachphim.length+" movie");
    //ADD LIST MOVIE
    $('.list_movie_player_slide').empty();
    var is_scoll_listmovie = false;
    var elements = '';
    for(var i = 0; i < _danhsachphim.length ; i++){
        if(Number(_danhsachphim[i].so_phim) === Number(sophim)){
            is_scoll_listmovie = true;
            elements = elements + '<a href="/xemphim?sophim='+_danhsachphim[i].so_phim+'"><div id="ep_choice"' ;
            AppendTitleMovie(_danhsachphim[i].ten_phim , _danhsachphim[i].luot_xem);
            title_EpPage = _danhsachphim[i].ten_phim;
        }else{
            elements = elements + '<a href="/xemphim?sophim='+_danhsachphim[i].so_phim+'"><div ';
        }
           elements = elements +'class="item_player_slide">'+
                                '<div class="img_item_player_slide"><img src="'+_danhsachphim[i].anh_bia+'" alt="One Piece - '+decode_utf8(_danhsachphim[i].ten_phim)+'"></div>'+
                                '<div class="title_item_player_slide">'+_danhsachphim[i].ten_phim+'</div>'+
                                '<div class="view_item_player_slide">'+_danhsachphim[i].luot_xem+' luot xem</div>'+
                                '</div></a>';
    }
    $('.list_movie_player_slide').append(elements);
    setTimeout(function(){
        var elem = document.getElementsByClassName('contain_list_movie_player_slide').item(0);
        if(is_scoll_listmovie === false) elem.scrollTop = 0;
        else elem.scrollTop = Number(document.getElementById("ep_choice").offsetTop) - 5;
    }, 1);
}

function AppendListComment(_danhsachbinhluan){
    _id = _danhsachbinhluan[_danhsachbinhluan.length - 1]._id;
    var elements = '';
    for(var i = 0; i < _danhsachbinhluan.length ; i++) elements = elements + '<div class="item_message_player_slide"><div class="name_user_item_message">'+_danhsachbinhluan[i].ten_chat+'</div><div class="time_item_message">'+caculateDay(decode_utf8(_danhsachbinhluan[i].thoi_gian))+' </div><div class="text_item_message">'+_danhsachbinhluan[i].noi_dung+'</div></div>';
    $(elements).insertBefore('.button_viewmore_message');
}
function AppendOneComment(){
    document.getElementById('input_comment').value = "";
    document.getElementById('input_name').value  = "";
    var elements = '<div class="item_message_player_slide"><div class="name_user_item_message">'+ten_chat+'</div><div class="time_item_message">'+caculateDay(decode_utf8(thoi_gian))+' </div><div class="text_item_message">'+noi_dung+'</div></div>';
    $('.contain_list_message_player_slide').prepend(elements);
    scrollBarList();
}

//LOAD LINK-----------------------------------------------------------------
function LoadCheckLink(){
    if(typeof GetUrlParameter('sotap') !== "undefined" || typeof GetUrlParameter('sophim') === "undefined"){
        xhttp.open("GET", URLServer+"checkLinkTap?sotap="+sotap , true);
        xhttp.send();
    }else{
        xhttp.open("GET", URLServer+"checkLinkPhim?sophim="+sophim , true);
        xhttp.send();
    }
}

function AppendVideoEmbed(link){
    $('#play_video_jw').empty();
    $('#play_video_jw').append('<div id="customiframe"></div>')
    $('#customiframe').append(decode_utf8(link));
}
function AppendVideoJwplayer(link){
    $('#play_video_jw').empty();
    jwplayer("play_video_jw").setup({ 
        file: decode_utf8(link),
        image: "https://cuongonepiece.com/image/reddit/28.jpg",
        autostart: false,
    });
}

if(typeof GetUrlParameter('sotap') !== "undefined"){
    sotap = GetUrlParameter('sotap');
    loadTap();
    displayListMovie(hidetype);
    displayListEp(showtype);
    var next_ep = Number(sotap) + 1;
    document.getElementById("next_ep").href="/xemphim?sotap=" + next_ep; 
}else if(typeof GetUrlParameter('sophim') !== "undefined"){
    sophim = GetUrlParameter('sophim');
    loadPhim();
    displayListEp(hidetype);
    displayListMovie(showtype);
    document.getElementById("next_ep").style.display = "none";
}else{
    loadTap();
    displayListMovie(hidetype);
    displayListEp(showtype);
    var next_ep = Number(sotap) + 1;
    document.getElementById("next_ep").href="/xemphim?sotap=" + next_ep; 
}

LoadCheckLink();

intervaltime_ = setInterval(function(){ 
    console.log("getlink")
    if(iloadLink === false) LoadCheckLink();
}, 3000);