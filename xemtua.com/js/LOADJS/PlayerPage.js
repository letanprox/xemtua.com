//HTTP Responsive
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        //----------------------------------------------------------------------------->
        if(this.responseURL.includes("loadPlayerEp")) {
            var data = JSON.parse(this.responseText);
            sotap = data.so_tap;
            sophim = data.so_phim;
            title_EpPage = decode_utf8(data.ten_phim)+" Tập "+sotap + " - " + decode_utf8(data.ten_tap);

            AppendTitleEp(data.ten_phim,data.so_tap ,data.luot_xem);

            displayBarTitle("2px solid royalblue","none","none","none");
            if(data.total_movie < 1) document.getElementById('title_movie_player_slide').style.display = "none";
            if(data.total_ova < 1) document.getElementById('title_ova_player_slide').style.display = "none";

            showToolPlayer();

            if(data.list_mua.length > 0){
                hideTotalItem();
                showButtonSeason();
                somua = data.so_mua;
                AppendListSeason(data.list_mua);
            }else{
                showTotalItem();
                hideButtonSeason();
                totalep = data.tap_mua.length;
                AppendTotalItem();
            }

            hideListSeason();
            showListItemPlayer();
            hideListMoviePlayer();
            hideListOvaPlayer();
            hideInputComment();
            hideListComment();

            AppendListEp(data.tap_mua);
            AppendInfoVideo(data.gioi_thieu);

            isloaded_ep = true;
            scrollBarList();
            hideLoadingVideo(); 

            intervaltime_ = setInterval(function(){ 
                console.log("getlink")
                if(iloadLink === false) loadCheckLink();
            }, 4500);
        }
        //----------------------------------------------------------------------------->
        if(this.responseURL.includes("loadSeason")){
            AppendTitleSeason(somua,khoangtap);
            AppendListEp(JSON.parse(this.responseText));
            ChangeChoiceListSeason(somua);

            scrollBarList();
            hideLoadingVideo(); 
        }
        //----------------------------------------------------------------------------->
        if(this.responseURL.includes("loadPlayerMovie")){
            var data = JSON.parse(this.responseText);
            sophim = data.so_phim;
            sophimle = data.so_phimle;
            title_EpPage = data.ten_phim;
            tukhoaphim = decode_utf8(data.tu_khoa_phim);

            AppendTitleMovie(data.ten_phim,data.luot_xem);

            displayBarTitle("none","2px solid royalblue","none","none");
            if(data.total_ep < 1) document.getElementById('title_eps_player_slide').style.display = "none";
            if(data.total_ova < 1) document.getElementById('title_ova_player_slide').style.display = "none";
        
            showToolPlayer();

            hideButtonSeason();
            showTotalItem();
            totalmovie = data.list_phim.length;
            AppendTotalMovie();

            hideListSeason();
            hideListItemPlayer();
            showListMoviePlayer();
            hideListOvaPlayer();
            hideInputComment();
            hideListComment();

            AppendListMovie(data.list_phim);
            AppendInfoVideo(data.gioi_thieu);

            isloaded_movie = true;
            scrollBarList();
            hideLoadingVideo(); 

            intervaltime_ = setInterval(function(){ 
                console.log("getlink")
                if(iloadLink === false) loadCheckLink();
            }, 4500);
        }
        //----------------------------------------------------------------------------->
        if(this.responseURL.includes("loadPlayerOva")){
            var data = JSON.parse(this.responseText);
            sophim = data.so_phim;
            soova = data.so_ova;
            title_EpPage = data.ten_ova;
            tukhoaphim = decode_utf8(data.tu_khoa_phim);

            AppendTitleMovie(data.ten_ova,data.luot_xem);

            displayBarTitle("none","none","2px solid royalblue","none");
            if(data.total_ep < 1) document.getElementById('title_eps_player_slide').style.display = "none";
            if(data.total_movie < 1) document.getElementById('title_movie_player_slide').style.display = "none";

            showToolPlayer();

            hideButtonSeason();
            showTotalItem();
            totalova = data.list_ova.length;
            AppendTotalOva();

            hideListSeason();
            hideListItemPlayer();
            hideListMoviePlayer();
            showListOvaPlayer();
            hideInputComment();
            hideListComment();

            AppendListOva(data.list_ova);
            AppendInfoVideo(data.gioi_thieu);

            isloaded_ova = true;
            scrollBarList();
            hideLoadingVideo(); 

            intervaltime_ = setInterval(function(){ 
                console.log("getlink")
                if(iloadLink === false) loadCheckLink();
            }, 4500);
        }
        //----------------------------------------------------------------------------->
        if(this.responseURL.includes("loadListEp")){
            var data = JSON.parse(this.responseText);
            if(data.listmua.length > 0){
                hideTotalItem();
                showButtonSeason();
                somua = data.so_mua;
                AppendListSeason(data.listmua);
            }else{
                showTotalItem();
                hideButtonSeason();
                totalep = data.listtap.length;
                AppendTotalItem();
            }
            AppendListEp(data.listtap);

            isloaded_ep = true;
            scrollBarList();
            hideLoadingVideo(); 
        }
        //----------------------------------------------------------------------------->
        if(this.responseURL.includes("loadListMovie")){
            var data = JSON.parse(this.responseText);
            totalmovie = data.length;
            AppendTotalMovie();
            AppendListMovie(data);

            isloaded_movie = true;
            scrollBarList();
            hideLoadingVideo(); 
        }
        //----------------------------------------------------------------------------->
        if(this.responseURL.includes("loadListOva")){
            var data = JSON.parse(this.responseText);
            totalova = data.length;
            AppendTotalOva();
            AppendListOva(data);

            isloaded_ova = true;
            scrollBarList();
            hideLoadingVideo(); 
        }
        //----------------------------------------------------------------------------->
        if(this.responseURL.includes("loadComment")){
            AppendListComment(JSON.parse(this.responseText));
            isloaded_comment = true;
            scrollBarList();
            hideLoadingVideo(); 
        }
        //----------------------------------------------------------------------------->
        if(this.responseURL.includes("checkLinkTap") || this.responseURL.includes("checkLinkPhimle") || this.responseURL.includes("checkLinkOva")){
       
            if(this.responseText !== "that bai"){

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
            }else{
                document.getElementById('LoadVideoEmbed').style.display = "none";
                document.getElementById('LoadVideoDirect').style.display = "none";
                document.getElementById('LoadVideoFB').style.display = "none";
            }
        }
        //----------------------------------------------------------------------------->
        if(this.responseURL.includes("loadVideoTapFB") || this.responseURL.includes("loadVideoPhimleFB") || this.responseURL.includes("loadVideoOvaFB")){
            document.getElementById('LoadVideoFB').style.backgroundColor = "tomato";
            document.getElementById('LoadVideoEmbed').style.backgroundColor = "cornflowerblue";
            document.getElementById('LoadVideoDirect').style.backgroundColor = "cornflowerblue";
            url_fb = this.responseText.replace(/"/gi, "");
            AppendVideoJwplayer(this.responseText.replace(/"/gi, ""))
        }
    }
};
//HTTP request
function loadTap(){
    if(isloaded_ep == false){
        xhttp.open("GET", URLServer+"loadPlayerEp?sotap="+Number(window.location.href.split("/")[5])+"&tukhoa="+String(window.location.href.split("/")[4]), false);
        xhttp.send();
    }
}
function loadMovie(){
    if(isloaded_movie == false){
        xhttp.open("GET", URLServer+"loadPlayerMovie?tukhoa="+String(window.location.href.split("/")[4]), false);
        xhttp.send();
    }
}
function loadOva(){
    if(isloaded_ova == false){
        xhttp.open("GET", URLServer+"loadPlayerOva?tukhoa="+String(window.location.href.split("/")[4]), false);
        xhttp.send();
    }
}
function loadSeason(_somua,_khoangtap){
    if(somua != _somua){
        somua = _somua;
        khoangtap = _khoangtap;
        xhttp.open("GET", URLServer+"loadSeason?somua="+somua+'&sophim='+sophim, true);
        xhttp.send();
    }else{
        scrollBarList();
        hideLoadingVideo(); 
    }
}
function loadListEp(){
    if(isloaded_ep == false){
        xhttp.open("GET", URLServer+"loadListEp?sophim="+sophim, true);
        xhttp.send();
    }else{
        scrollBarList();
        hideLoadingVideo();
    }
}
function loadListMovie(){
    if(isloaded_movie == false){
        xhttp.open("GET", URLServer+"loadListMovie?sophim="+sophim, true);
        xhttp.send();
    }else{
        scrollBarList();
        hideLoadingVideo();
    }
}
function loadListOva(){
    if(isloaded_ova == false){
        xhttp.open("GET", URLServer+"loadListOva?sophim="+sophim, true);
        xhttp.send();
    }else{
        scrollBarList();
        hideLoadingVideo();
    }
}
function loadComment(){
    if(isloaded_comment == false){
        xhttp.open("GET", URLServer+"loadComment?_id="+_id+"&sophim="+sophim, false);
        xhttp.send();
    }else{
        scrollBarList();
        hideLoadingVideo(); 
    }
}
//ApendElement
function AppendInfoVideo(_content){
    $('.info_player').empty();
    $('.info_player').append('<div>'+decode_utf8(_content)+'</div>');
}

function AppendTotalItem(){
    $('.show_total_item').empty();
    $('.show_total_item').append('Tổng số: '+totalep+' video');
}
function AppendTotalMovie(){
    $('.show_total_item').empty();
    $('.show_total_item').append('Tổng số: '+totalmovie+' video');
}
function AppendTotalOva(){
    $('.show_total_item').empty();
    $('.show_total_item').append('Tổng số: '+totalova+' video');
}

function AppendTitleEp(_tenphim,_sotap , _luotxem){
    $('.title_video').empty();
    $('.title_video').append('<div>'+decode_utf8(_tenphim)+' - TẬP '+_sotap+'</div><div>'+_luotxem+' lượt xem</div>');
}
function AppendTitleMovie(_tenphim , _luotxem){
    $('.title_video').empty();
    $('.title_video').append('<div>'+decode_utf8(_tenphim)+'</div><div>'+_luotxem+' lượt xem</div>');
}
function AppendTitleSeason(_somua,_khoangtap){
    $('.button_season_player_slide').empty();
    $('.button_season_player_slide').append('<span>Season '+_somua+':</span><div>'+_khoangtap+'</div>');
}
function AppendListSeason(_danhsachmua){
    $('.list_season_player_slide').empty();
    var elements = '';
    for(var i = _danhsachmua.length - 1; i >= 0 ; i--){
        if(Number(_danhsachmua[i].so_mua) === Number(somua)){
            elements = elements + '<div id="somua_choice"'
            AppendTitleSeason(_danhsachmua[i].so_mua,_danhsachmua[i].khoang_tap);
        }else elements = elements + '<div ';
        elements = elements + 'so_mua="'+_danhsachmua[i].so_mua+'"  khoang_tap="'+_danhsachmua[i].khoang_tap+'"><span>Season '+ _danhsachmua[i].so_mua +' - '+decode_utf8(_danhsachmua[i].ten_mua)+'</span><span>'+_danhsachmua[i].khoang_tap+'</span></div>';
    }
    $('.list_season_player_slide').append(elements);
}
function ChangeChoiceListSeason(_somua){
    try {document.getElementById("somua_choice").removeAttribute("id");}catch(e){}
    $( "div[so_mua="+_somua+"]" ).attr('id', 'somua_choice');
}

function AppendListEp(_danhsachtap){
    $('.list_item_player_slide').empty();
    var is_scoll_listep = false;
    var elements = '';
    for(var i = 0; i < _danhsachtap.length ; i++){
        if(Number(_danhsachtap[i].so_tap) === Number(sotap)){
            is_scoll_listep = true;
            elements = elements + '<a href="/episode/'+tukhoaphim+'/'+_danhsachtap[i].so_tap+'"><div id="ep_choice"' ;
        }else elements = elements + '<a href="/episode/'+tukhoaphim+'/'+_danhsachtap[i].so_tap+'"><div ';
        elements = elements +'class="item_player_slide">'+
                                '<div class="img_item_player_slide"><img src="'+(decode_utf8(_danhsachtap[i].anh_bia)).replace(/http:/gi, "https:")+'" alt="Tập '+_danhsachtap[i].so_tap+' - '+_danhsachtap[i].ten_tap+'"></div>'+
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
function AppendListMovie(_danhsachphim){
    $('.list_movie_player_slide').empty();
    var is_scoll_listmovie = false;
    var elements = '';
    for(var i = 0; i < _danhsachphim.length ; i++){
        if(Number(_danhsachphim[i].so_phimle) === Number(sophimle)){
            is_scoll_listmovie = true;
            elements = elements + '<a href="/movie/'+_danhsachphim[i].tu_khoa+'"><div id="ep_choice"' ;
        }else elements = elements + '<a href="/movie/'+_danhsachphim[i].tu_khoa+'"><div ';
        elements = elements +'class="item_player_slide">'+
                                '<div class="img_item_player_slide"><img src="'+(decode_utf8(_danhsachphim[i].anh_bia)).replace(/http:/gi, "https:")+'" alt="'+decode_utf8(_danhsachphim[i].ten_phim)+'"></div>'+
                                '<div class="title_item_player_slide">'+_danhsachphim[i].ten_phimle+'</div>'+
                                '<div class="view_item_player_slide">'+_danhsachphim[i].luot_xem+' lượt xem</div>'+
                                '</div></a>';
    }
    $('.list_movie_player_slide').append(elements);
    //SCOLL TO EP
    setTimeout(function(){
        var elem = document.getElementsByClassName('contain_list_movie_player_slide').item(0);
        if(is_scoll_listmovie === false) elem.scrollTop = 0;
        else elem.scrollTop = Number(document.getElementById("ep_choice").offsetTop) - 5;
    }, 1);
}
function AppendListOva(_danhsachova){
    $('.list_ova_player_slide').empty();
    var is_scoll_listova = false;
    var elements = '';
    for(var i = 0; i < _danhsachova.length ; i++){
        if(Number(_danhsachova[i].so_ova) === Number(soova)){
            is_scoll_listova = true;
            elements = elements + '<a href="/ova/'+_danhsachova[i].tu_khoa+'"><div id="ep_choice"' ;
        }else elements = elements + '<a href="/ova/'+_danhsachova[i].tu_khoa+'"><div ';
        elements = elements +'class="item_player_slide">'+
                                '<div class="img_item_player_slide"><img src="'+(decode_utf8(_danhsachova[i].anh_bia)).replace(/http:/gi, "https:")+'" alt="'+decode_utf8(_danhsachova[i].ten_ova)+'"></div>'+
                                '<div class="title_item_player_slide">'+_danhsachova[i].ten_ova+'</div>'+
                                '<div class="view_item_player_slide">'+_danhsachova[i].luot_xem+' lượt xem</div>'+
                                '</div></a>';
    }
    $('.list_ova_player_slide').append(elements);
    //SCOLL TO EP
    setTimeout(function(){
        var elem = document.getElementsByClassName('contain_list_ova_player_slide').item(0);
        if(is_scoll_listova === false) elem.scrollTop = 0;
        else elem.scrollTop = Number(document.getElementById("ep_choice").offsetTop) - 5;
    }, 1);
}

function AddComment(){
    noi_dung = document.getElementById('input_comment').value;
    ten_chat = document.getElementById('input_name').value;
    thoi_gian = getCurrentTime();
    if(String(noi_dung) != '' && String(ten_chat) != ''){
        AppendOneComment();
        xhttp.open("GET",URLServer+"insertComment?id_facebook="+id_facebook+"&ten_chat="+ten_chat+"&noi_dung="+noi_dung+"&thoi_gian="+thoi_gian+"&sophim="+sophim, true);
        xhttp.send();
    }else{
        alert("Bạn chưa nhập đủ!");
    }
}
function AppendOneComment(){
    document.getElementById('input_comment').value = "";
    document.getElementById('input_name').value  = "";
    var elements = '<div class="item_message_player_slide"><div class="name_user_item_message">'+ten_chat+'</div><div class="time_item_message">'+caculateDay(decode_utf8(thoi_gian))+' </div><div class="text_item_message">'+noi_dung+'</div></div>';
    $('.list_message_player_slide').prepend(elements);
    scrollBarList();
}
function AppendListComment(_danhsachbinhluan){
    scrollBarList();
    hideLoadingVideo(); 
    try {
        _id = _danhsachbinhluan[_danhsachbinhluan.length - 1]._id;
    } catch (error) {
    }
    var elements = '';
    for(var i = 0; i < _danhsachbinhluan.length ; i++) elements = elements + '<div class="item_message_player_slide"><div class="name_user_item_message">'+_danhsachbinhluan[i].ten_chat+'</div><div class="time_item_message">'+caculateDay(decode_utf8(_danhsachbinhluan[i].thoi_gian))+' </div><div class="text_item_message">'+_danhsachbinhluan[i].noi_dung+'</div></div>';
    $('.list_message_player_slide').append(elements);
}

function loadCheckLink(){
    var urlloadCheck;
    if(main_element === 1){
        urlloadCheck = "checkLinkTap?sotap="+sotap+"&sophim="+sophim;
    }else if(main_element === 2){
        urlloadCheck = "checkLinkPhimle?sophimle="+sophimle+"&sophim="+sophim;
    }else if(main_element === 3){
        urlloadCheck = "checkLinkOva?soova="+soova+"&sophim="+sophim;
    }
    xhttp.open("GET", URLServer+urlloadCheck, true);
    xhttp.send();
}
// function loadLinkFb(){
//     var urlloadFB;
//     if(main_element === 1){
//         urlloadFB = "loadVideoTapFB?sotap="+sotap+"&sophim="+sophim;
//     }else if(main_element === 2){
//         urlloadFB = "loadVideoPhimleFB?sophimle="+sophimle+"&sophim="+sophim;
//     }else if(main_element === 3){
//         urlloadFB = "loadVideoOvaFB?soova="+soova+"&sophim="+sophim;
//     }
//     xhttp.open("GET", URLServer+urlloadFB, false);
//     xhttp.send();
// }
function AppendVideoJwplayer(link){
    if(link.includes('.mp4')) link = link.replace('xyz/','xyz/'+codeLoad+'/'),
    console.log(link)
    jwplayer("play_video_jw").setup({ 
        file: link,
        image: "https://cuongonepiece.com/image/reddit/Imageplayer.jpg",
        autostart: false,
    });
}
function AppendVideoEmbed(link){
    $('#play_video_jw').empty();
    $('#play_video_jw').append('<div id="customiframe"></div>')
    $('#customiframe').append(decode_utf8(link));
}

if(window.location.href.split("/")[3] === 'episode'){
    loadTap();
    var next_ep = Number(window.location.href.split("/")[5]) + 1;
    document.getElementById("next_ep").href='/episode/'+tukhoaphim+'/' + next_ep; 
}else if(window.location.href.split("/")[3] === 'movie'){
    loadMovie();
    document.getElementById("next_ep").style.display = "none";
}else if(window.location.href.split("/")[3] === 'ova'){
    loadOva();
    document.getElementById("next_ep").style.display = "none";
}
