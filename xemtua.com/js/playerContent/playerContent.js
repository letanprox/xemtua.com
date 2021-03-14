function loadTransLink(){
    $('.contain_video').empty();
    $('.contain_video').html('<div id="play_video_jw"><div class="LoadingVideo_Content"><div class="Wrap_loading"><div class="Loading"></div><div id="cor_one"></div><div id="cor_two"></div></div></div></div>');
}
function showLoadingVideo(){
    loadingVideo.style.display = "block";
}
function hideLoadingVideo(){
    loadingVideo.style.display = "none";
}

function displayBarTitle(x,y,z,k){
    title_eps_player_slide.style.borderBottom = x;
    title_movie_player_slide.style.borderBottom = y;
    title_ova_player_slide.style.borderBottom = z;
    title_comment_player_slide.style.borderBottom = k;
}

function showToolPlayer(){
    contain_tool_player_slide.style.display = "block";
}
function hideToolPlayer(){
    contain_tool_player_slide.style.display = "none";
}

function showTotalItem(){
    show_total_item.style.display = "block";
}
function hideTotalItem(){
    show_total_item.style.display = "none";
}

function showButtonSeason(){
    button_season_player_slide.style.display = "block";
}
function hideButtonSeason(){
    button_season_player_slide.style.display = "none";
}
function showListSeason(){
    contain_list_season_player_slide.style.display = "block";
}
function hideListSeason(){
    contain_list_season_player_slide.style.display = "none";
}
function displaySeasonList(){
    if(contain_list_season_player_slide.style.display == "none") contain_list_season_player_slide.style.display = "block";
    else contain_list_season_player_slide.style.display = "none";   
}

function showListItemPlayer(){
    contain_list_item_player_slide.style.display = "block"
}
function hideListItemPlayer(){
    contain_list_item_player_slide.style.display = "none"
}

function showListMoviePlayer(){
    contain_list_movie_player_slide.style.display = "block"
}
function hideListMoviePlayer(){
    contain_list_movie_player_slide.style.display = "none"
}

function showListOvaPlayer(){
    contain_list_ova_player_slide.style.display = "block"
}
function hideListOvaPlayer(){
    contain_list_ova_player_slide.style.display = "none"
}

function showInputComment(){
    contain_input_comment_player_slide.style.display = "block"
}
function hideInputComment(){
    contain_input_comment_player_slide.style.display = "none"
}

function showListComment(){
    contain_list_message_player_slide.style.display = "block"
}
function hideListComment(){
    contain_list_message_player_slide.style.display = "none"
}

//EVENT CLICK
function ClickPlayerContent (event) {
    var x = event.target;

    if(x == button_season_player_slide || x.parentNode == button_season_player_slide){
        displaySeasonList();
        scrollBarList();
    }else if(x.parentNode === list_season_player_slide || x.parentNode.parentNode === list_season_player_slide){
        hideListSeason();
        showLoadingVideo();
        var number,range;
        if(Number(x.getAttribute("so_mua")) === 0){ 
            number = Number(x.parentNode.getAttribute("so_mua"));
            range =  x.parentNode.getAttribute("khoang_tap");
        }else{ 
            number = Number(x.getAttribute("so_mua"));
            range =  x.getAttribute("khoang_tap");
        }
        loadSeason(number,range);
    }
    else if(x == title_comment_player_slide){
        displayBarTitle("none","none","none","2px solid royalblue");
        showLoadingVideo();
        hideListItemPlayer();
        hideListMoviePlayer();
        hideListOvaPlayer();
        showListComment();
        showInputComment();
        hideButtonSeason();
        hideTotalItem();
        loadComment();
        hideListSeason();    
    }else if(x == title_ova_player_slide){
        displayBarTitle("none","none","2px solid royalblue","none");
        showLoadingVideo();
        hideListItemPlayer();
        hideListMoviePlayer();
        hideListComment();
        showListOvaPlayer();
        hideInputComment();
        hideButtonSeason();
        showTotalItem();
        AppendTotalOva();
        loadListOva();
        hideListSeason();
    }else if(x == title_eps_player_slide){
        displayBarTitle("2px solid royalblue","none","none","none");
        showLoadingVideo();
        hideListMoviePlayer();
        hideListOvaPlayer();
        hideListComment();
        showListItemPlayer();
        hideInputComment();
        if(totalep <= 0){
            showButtonSeason();
            hideTotalItem();
        }else{
            showTotalItem();
            hideButtonSeason();
        }
        loadListEp();
    }else if(x == title_movie_player_slide){
        displayBarTitle("none","2px solid royalblue","none","none");
        showLoadingVideo();
        hideListItemPlayer();
        hideListOvaPlayer();
        hideListComment();
        showListMoviePlayer();
        hideInputComment();
        hideButtonSeason();
        showTotalItem();
        AppendTotalMovie();
        loadListMovie();
        hideListSeason();
    //COMMENT
    }else if(x.id === "send_comment_button"){
        AddComment();
    }else if(x.className == "button_viewmore_message"){
        isloaded_comment = false;
        loadComment();
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