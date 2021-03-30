var URLServer = "/api/";

var id_facebook = "000";
$(document).ready(function () {
    $.getJSON("https://jsonip.com/?callback=?", function (data) {
        id_facebook = data.ip;
    });
});

var isloaded_ep = false;
var isloaded_movie = false;
var isloaded_ova = false;
var isloaded_comment = false;

var sophim;
var sophimle;
var sotap;
var soova;
var id_token_fb;

var totalep = 0;
var totalmovie = 0;
var totalova = 0;

var somua;
var khoangtap;

var _id = 0;
var noi_dung;
var ten_chat;
var thoi_gian;

var title_EpPage;

var main_element = 0;

var url_direct;
var url_embed;
var url_fb
var priorlink = 0;

if(window.location.href.split("/")[3] === 'episode'){
    main_element = 1;
}else if(window.location.href.split("/")[3] === 'movie'){
    main_element = 2;
}else if(window.location.href.split("/")[3] === 'ova'){
    main_element = 3;
}

var tukhoaphim = String(window.location.href.split("/")[4]);

var iloadLink = false;
var intervaltime_;