module.exports = (setroute = require("./Setroute")) => {

    let root_1 = "cuongonepiece.com";

    setroute.pushRoute(root_1,"GET","tag_panel_control", "CPanel/tag_panel_control.html");
    setroute.pushRoute(root_1,"GET","tag_panel_view", "CPanel/tag_panel_view.html");

    setroute.pushRoute(root_1,"GET","", "HomePage.html");
    setroute.pushRoute(root_1,"GET","search", "SearchPage.html");
    setroute.pushRoute(root_1,"GET","danhsachtap", "AllEpPage.html");
    setroute.pushRoute(root_1,"GET","danhsachphim", "AllMoviePage.html");
    setroute.pushRoute(root_1,"GET","videoedit", "AllShortVideoPage.html");
    setroute.pushRoute(root_1,"GET","xemphim", "EpPage.html");
    setroute.pushRoute(root_1,"GET","manga", "MangaPage.html");
    
    let root_2 = "xemtua.com";

    setroute.pushRoute(root_2,"GET","tap_panel_control", "JPanel/tap_panel_control.html");
    setroute.pushRoute(root_2,"GET","tap_panel_view", "JPanel/tap_panel_view.html");
    setroute.pushRoute(root_2,"GET","tab_panel_control", "JPanel/tab_panel_control.html");

    setroute.pushRoute(root_2,"GET","", "HomePage.html");

    setroute.pushRoute(root_2,"GET","video", "AllShortVideoPage.html");
    setroute.pushRoute(root_2,"GET","anime", "AllAnimePage.html");
    setroute.pushRoute(root_2,"GET","manga", "AllMangaPage.html");
    setroute.pushRoute(root_2,"GET","movies", "AllMoviePage.html");

    setroute.pushRoute(root_2,"GET","episode", "PlayerPage.html");
    setroute.pushRoute(root_2,"GET","movie", "PlayerPage.html");
    setroute.pushRoute(root_2,"GET","ova", "PlayerPage.html");

    setroute.pushRoute(root_2,"GET","chapter", "MangaPage.html");

    return setroute.getRoute();
}