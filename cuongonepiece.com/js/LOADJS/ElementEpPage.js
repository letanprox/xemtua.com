var URLServer = "/api/";

var id_facebook = "000";
$(document).ready(function () {
    $.getJSON("https://jsonip.com/?callback=?", function (data) {
        id_facebook = data.ip;
    });
});

var isloaded_ep = false;
var isloaded_movie = false;
var isloaded_comment = false;

var sophim;
var sotap;
var id_token_fb;

var somua;
var khoangtap;

var _id = 0;
var noi_dung;
var ten_chat;
var thoi_gian;

var title_EpPage;

var url_direct;
var url_embed;
var url_fb
var priorlink = 0;

var iloadLink = false;
var intervaltime_;