module.exports = (setroute = require("./Setroute")) => {


    let root_1 = "cuongonepiece.com";

    function Implement1(name){
        setroute.pushRoute(root_1,"GET","cpanel/"+name+"_count", "CPanel/CPanel_control@"+name+"_count");
        setroute.pushRoute(root_1,"GET","cpanel/"+name+"_search", "CPanel/CPanel_control@"+name+"_search");
        setroute.pushRoute(root_1,"POST","cpanel/"+name+"_search", "CPanel/CPanel_control@"+name+"_get");
        setroute.pushRoute(root_1,"PUT","cpanel/"+name+"_update", "CPanel/CPanel_control@"+name+"_update");
        setroute.pushRoute(root_1,"POST","cpanel/"+name+"_insert", "CPanel/CPanel_control@"+name+"_insert");
        setroute.pushRoute(root_1,"DELETE","cpanel/"+name+"_delete", "CPanel/CPanel_control@"+name+"_delete");
    }

    Implement1("tap");
    Implement1("binhluan");
    Implement1("mua");
    Implement1("phim");
    Implement1("chaps");
    Implement1("anhchap");

    Implement1("binhluans");
    Implement1("tokenfbs");
    Implement1("taptokenfb");
    Implement1("phimtokenfb");
    Implement1("danhsachurltapfb");
    Implement1("danhsachurlphimfb");

    Implement1("danhsachtokenshortvideo");
    Implement1("danhsachurlshortvideo");
    Implement1("danhsachlinkshortvideo");
    Implement1("danhsachshortvideo");
    Implement1("relate");
    Implement1("celate");

    Implement1("linhtap");
    Implement1("linhphim");


    let root_2 = "xemtua.com";

    function Implement2(name){
        setroute.pushRoute(root_2,"GET","jpanel/"+name+"_count", "JPanel/JPanel_control@"+name+"_count");
        setroute.pushRoute(root_2,"GET","jpanel/"+name+"_search", "JPanel/JPanel_control@"+name+"_search");
        setroute.pushRoute(root_2,"POST","jpanel/"+name+"_search", "JPanel/JPanel_control@"+name+"_get");
        setroute.pushRoute(root_2,"PUT","jpanel/"+name+"_update", "JPanel/JPanel_control@"+name+"_update");
        setroute.pushRoute(root_2,"POST","jpanel/"+name+"_insert", "JPanel/JPanel_control@"+name+"_insert");
        setroute.pushRoute(root_2,"DELETE","jpanel/"+name+"_delete", "JPanel/JPanel_control@"+name+"_delete");
    }

    Implement2("danhsachtokenshortvideo");
    Implement2("danhsachurlshortvideo");
    Implement2("danhsachshortvideo");
    Implement2("danhsachlinkshortvideo");
    Implement2("relate");
    Implement2("celate");

    Implement2("phim");
    Implement2("mua");
    Implement2("tap");
    Implement2("phimle");
    Implement2("ova");

    Implement2("truyen");
    Implement2("chaps");
    Implement2("anhchap");

    Implement2("tokenfb");
    Implement2("idtapfb");
    Implement2("idphimfb");
    Implement2("idovafb");
    Implement2("urltapfb");
    Implement2("urlphimlefb");
    Implement2("urlovafb");

    Implement2("linhtap");
    Implement2("linhphimle");
    Implement2("linhova");

    Implement2("binhluans");

    Implement2("driveapi");
    Implement2("drivelist");

    Implement2("linhfb");
    Implement2("linhtokenfb");
    Implement2("lienketphim");
    
    return setroute.getRoute();
}