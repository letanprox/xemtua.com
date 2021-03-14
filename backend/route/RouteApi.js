module.exports = (setroute = require("./Setroute")) => {


    let root_1 = "cuongonepiece.com";
    
    setroute.pushRoute(root_1,"GET","api/tapmoi", "HomeController@tapmoi");
    setroute.pushRoute(root_1,"GET","api/phimmoi", "HomeController@phimmoi");
    setroute.pushRoute(root_1,"GET","api/chapmoi", "HomeController@chapmoi");
    setroute.pushRoute(root_1,"GET","api/tinmoi", "HomeController@tinmoi");
    setroute.pushRoute(root_1,"GET","api/timtap", "SearchController@timtap");
    setroute.pushRoute(root_1,"GET","api/danhsachtap", "ListEpMovieController@danhsachtap");
    setroute.pushRoute(root_1,"GET","api/danhsachphim", "ListEpMovieController@danhsachphim");
    setroute.pushRoute(root_1,"GET","api/loadPlayer", "PlayerContentController@loadPlayer");
    setroute.pushRoute(root_1,"GET","api/insertComment", "PlayerContentController@insertComment");
    setroute.pushRoute(root_1,"GET","api/loadComment", "PlayerContentController@loadComment");
    setroute.pushRoute(root_1,"GET","api/loadSeason", "PlayerContentController@loadSeason");
    setroute.pushRoute(root_1,"GET","api/loadVideoFB", "PlayerContentController@loadVideoFB");
    setroute.pushRoute(root_1,"GET","api/loadMovie", "PlayerContentController@loadMovie");
    setroute.pushRoute(root_1,"GET","api/loadManga", "MangaController@loadManga");

    setroute.pushRoute(root_1,"GET","api/topviewshortvideo", "ShortVideoController@topviewshortvideo");
    setroute.pushRoute(root_1,"GET","api/newsshortvideo", "ShortVideoController@newsshortvideo");
    setroute.pushRoute(root_1,"GET","api/relateshortvideo", "ShortVideoController@relateshortvideo");
    setroute.pushRoute(root_1,"GET","api/getoneshortvideo", "ShortVideoController@getoneshortvideo");
    
    setroute.pushRoute(root_1,"GET","api/loadVideoEmbed", "PlayerContentController@loadVideoEmbed");
    setroute.pushRoute(root_1,"GET","api/loadVideoDirect", "PlayerContentController@loadVideoDirect");
    setroute.pushRoute(root_1,"GET","api/checkLinkBackup", "PlayerContentController@checkLinkBackup");
    setroute.pushRoute(root_1,"GET","api/loadPhimEmbed", "PlayerContentController@loadPhimEmbed");


    let root_2 = "xemtua.com";

    setroute.pushRoute(root_2,"GET","api/getoneshortvideo", "ShortVideoController@getoneshortvideo");
    setroute.pushRoute(root_2,"GET","api/topviewshortvideo", "ShortVideoController@topviewshortvideo");
    setroute.pushRoute(root_2,"GET","api/newsshortvideo", "ShortVideoController@newsshortvideo");
    setroute.pushRoute(root_2,"GET","api/relateshortvideo", "ShortVideoController@relateshortvideo");

    setroute.pushRoute(root_2,"GET","api/tapmoi", "HomeController@tapmoi");
    setroute.pushRoute(root_2,"GET","api/topphim", "HomeController@topphim");
    setroute.pushRoute(root_2,"GET","api/chapmoi", "HomeController@chapmoi");
    setroute.pushRoute(root_2,"GET","api/phimlemoi", "HomeController@phimlemoi");
    setroute.pushRoute(root_2,"GET","api/listtruyen", "HomeController@listtruyen");
    setroute.pushRoute(root_2,"GET","api/listanime", "HomeController@listanime");

    setroute.pushRoute(root_2,"GET","api/loadPlayerEp", "PlayerController@loadPlayerEp");
    setroute.pushRoute(root_2,"GET","api/loadPlayerMovie", "PlayerController@loadPlayerMovie");
    setroute.pushRoute(root_2,"GET","api/loadPlayerOva", "PlayerController@loadPlayerOva");
    setroute.pushRoute(root_2,"GET","api/loadSeason", "PlayerController@loadSeason");
    setroute.pushRoute(root_2,"GET","api/loadListMovie", "PlayerController@loadListMovie");
    setroute.pushRoute(root_2,"GET","api/loadListEp", "PlayerController@loadListEp");
    setroute.pushRoute(root_2,"GET","api/loadListOva", "PlayerController@loadListOva");

    setroute.pushRoute(root_2,"GET","api/loadComment", "PlayerController@loadComment");
    setroute.pushRoute(root_2,"GET","api/insertComment", "PlayerController@insertComment");

    setroute.pushRoute(root_2,"GET","api/loadVideoTapFB", "LoadVideoTapFB@loadVideoFB");
    setroute.pushRoute(root_2,"GET","api/loadVideoPhimLeFB", "LoadVideoPhimLeFB@loadVideoFB");
    setroute.pushRoute(root_2,"GET","api/loadVideoOvaFB", "LoadVideoOvaFB@loadVideoFB");

    setroute.pushRoute(root_2,"GET","api/checkLinkTap", "PlayerController@checkLinkTap");
    setroute.pushRoute(root_2,"GET","api/checkLinkPhimle", "PlayerController@checkLinkPhimle");
    setroute.pushRoute(root_2,"GET","api/checkLinkOva", "PlayerController@checkLinkOva");

    setroute.pushRoute(root_2,"GET","api/loadManga", "MangaController@loadManga");

    // setroute.pushRoute(root_2,"GET","api/loadDirectPhimle", "LoadLinkPhimle@LoadDirect");
    // setroute.pushRoute(root_2,"GET","api/loadEmbedPhimle", "LoadLinkPhimle@LoadEmbed");

    // setroute.pushRoute(root_2,"GET","api/loadDirectTap", "LoadLinkTap@LoadDirect");
    // setroute.pushRoute(root_2,"GET","api/loadEmbedTap", "LoadLinkTap@LoadEmbed");

    // setroute.pushRoute(root_2,"GET","api/loadDirectOva", "LoadLinkOva@LoadDirect");
    // setroute.pushRoute(root_2,"GET","api/loadEmbedOva", "LoadLinkOva@LoadEmbed");

    return setroute.getRoute();
}