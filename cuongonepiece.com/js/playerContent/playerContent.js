var hidetype = {
    x : "none",
    y : "none"
}
var showtype = {
    x : "2px solid royalblue",
    y : "block",
}
//ICON LOAD
function showLoadingVideo(){
    loadingVideo.style.display = "block";
}
function hideLoadingVideo(){
    loadingVideo.style.display = "none";
}
//SEASON TABLE
function displaySeasonList(){
    if(contain_list_season_player_slide.style.display == "none") contain_list_season_player_slide.style.display = "block";
    else contain_list_season_player_slide.style.display = "none";   
}
function hideSeasonList(){
    contain_list_season_player_slide.style.display = "none";
}
//THREE PART TABLE
function displayListEp(type){
    title_list_player_slide.style.borderBottom = type.x;
    contain_list_season_player_slide.style.display = type.x;
    contain_season_player_slide.style.display = type.y;
    contain_list_item_player_slide.style.display = type.y;
    button_season_player_slide.style.display = "block";
    show_total_movie.style.display = "none";
}
function displayListMovie(type){
    title_movie_player_slide.style.borderBottom = type.x;
    contain_season_player_slide.style.display = type.y;
    contain_list_season_player_slide.style.display = type.y;
    contain_list_movie_player_slide.style.display = type.y;
    button_season_player_slide.style.display = "none";
    show_total_movie.style.display = "block";
}
function displayListComment(type){
    title_comment_player_slide.style.borderBottom = type.x;
    contain_input_comment_player_slide.style.display = type.y;
    contain_list_message_player_slide.style.display = type.y;
}

function loadTransLink(){
    $('.contain_video').empty();
    $('.contain_video').html('<div id="play_video_jw"><div class="LoadingVideo_Content"><div class="Wrap_loading"><div class="Loading"></div><div id="cor_one"></div><div id="cor_two"></div></div></div></div>');
}
//EVENT CLICK
function ClickPlayerContent (event) {
    var x = event.target;
    //SEASON
    if(x == button_season_player_slide || x.parentNode == button_season_player_slide){
        displaySeasonList();
        scrollBarList();
    }else if(x.parentNode === list_season_player_slide || x.parentNode.parentNode === list_season_player_slide){
        hideSeasonList();
        showLoadingVideo();
        var number,range;
        if(Number(x.getAttribute("so_mua")) === 0){ 
            number = Number(x.parentNode.getAttribute("so_mua"));
            range =  x.parentNode.getAttribute("khoang_tap");
        }else{ 
            number = Number(x.getAttribute("so_mua"));
            range =  x.getAttribute("khoang_tap");
        }
        LoadSeason(number,range);
    //THREE PART
    }else if(x == title_comment_player_slide){
        showLoadingVideo();
        displayListEp(hidetype);
        displayListMovie(hidetype);
        displayListComment(showtype);
        LoadComment();
        hideSeasonList();
    }else if(x == title_list_player_slide){
        showLoadingVideo();
        displayListComment(hidetype);
        displayListMovie(hidetype);
        displayListEp(showtype);
        loadTap();
    }else if(x == title_movie_player_slide){
        showLoadingVideo();
        displayListEp(hidetype);
        displayListComment(hidetype);
        displayListMovie(showtype);
        loadPhim();
        hideSeasonList();
    //COMMENT
    }else if(x.id === "send_comment_button"){
        AddComment();
    }else if(x.className == "button_viewmore_message"){
        isloaded_comment = false;
        LoadComment();
    //SERVER
    }else if(x.id === "LoadVideoFB"){
        loadTransLink();
        document.getElementById('LoadVideoFB').style.backgroundColor = "tomato";
        document.getElementById('LoadVideoEmbed').style.backgroundColor = "cornflowerblue";
        document.getElementById('LoadVideoDirect').style.backgroundColor = "cornflowerblue";
        AppendVideoJwplayer(url_fb);
    }else if(x.id === "LoadVideoDirect"){
        loadTransLink();
        document.getElementById('LoadVideoFB').style.backgroundColor = "cornflowerblue";
        document.getElementById('LoadVideoEmbed').style.backgroundColor = "cornflowerblue";
        document.getElementById('LoadVideoDirect').style.backgroundColor = "tomato";
        AppendVideoJwplayer(url_direct);
    }else if(x.id === "LoadVideoEmbed"){
        loadTransLink();
        document.getElementById('LoadVideoFB').style.backgroundColor = "cornflowerblue";
        document.getElementById('LoadVideoEmbed').style.backgroundColor = "tomato";
        document.getElementById('LoadVideoDirect').style.backgroundColor = "cornflowerblue";
        AppendVideoEmbed(url_embed);
    }else{
        hideSeasonList();
    }
}