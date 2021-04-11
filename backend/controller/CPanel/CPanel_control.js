const ImleX = require("./ImleX");
const ImleY = require("./ImleY");

let PASSWORD = "anhyeuem";
// khai báo Model
// khai báo listModel trong Index
// khai báo Panel control
// khai bao URL

module.exports = async (callback, scanner) => {
    let head_params = scanner.head_params;
    if(head_params.get('password') === PASSWORD){
    let index = scanner.req_bundle.index;
    index = String(index.split("_")[0]);

    let keyquery = [];
    let domain = [];
    let groupquery  = [];
    let keybat = [];

    function Implement(x,y,z){
        scanner.modelx =  scanner[x];
        scanner.req_bundle.index = (scanner.req_bundle.index).replace(y+'_', '');
        if(z === true)       ImleX(callback, scanner , keyquery , domain , groupquery);
        else if(z === false) ImleY(callback, scanner , keyquery , groupquery , keybat , domain);
    }

    ////////////////////////////////////////////////////
    if(index.includes('danhsachtokenshortvideo')){
        keyquery = ['id_token'];
        domain = ['token'];
        Implement('modelxcuongonepiece.com/danhsachtokenshortvideo','danhsachtokenshortvideo',true);
    }

    if(index.includes('danhsachurlshortvideo')){
        keyquery = [ 'index' ];
        domain = ['url_temp' , 'thoi_gian']
        Implement('modelxcuongonepiece.com/danhsachurlshortvideo','danhsachurlshortvideo',true);
    }

    if(index.includes('danhsachlinkshortvideo')){
        keyquery = [ 'index'];
        domain = [ 'url_temp' , 'thoi_gian']
        Implement('modelxcuongonepiece.com/danhsachlinkshortvideo','danhsachlinkshortvideo',true);
    }

    if(index.includes('danhsachshortvideo')){
        keyquery = [ 'index' ];
        domain = ['url_thumbnail' , 'views' , 'id_video' , 'id_token' , 'url_drive']
        Implement('modelxcuongonepiece.com/danhsachshortvideo','danhsachshortvideo',true);
    }

    if(index.includes('celate')){
        keyquery = ['index'];
        groupquery = ['relate'];
        Implement('modelxcuongonepiece.com/danhsachrelate','celate',true);
    }

    if(index.includes('relate')){
        keyquery   = [ 'index' ];
        groupquery = ['relate'];
        domain = [ 'dex' , 'va'];
        Implement('modelxcuongonepiece.com/danhsachrelate','relate',false);
    }
//------------------------------------------------------------------------------------------------


    if(index === 'mua'){
        keyquery = ['so_mua'];
        domain   = [ 'ten_mua' , 'khoang_tap'];
        Implement('modelxcuongonepiece.com/danhsachmua','mua',true);
    }

    if(index === 'tap'){
        keyquery = [ 'so_tap' ];
        domain   = [ 'so_mua' , 'ten_tap' , 'luot_xem' ,'anh_bia' , 'id_token_fb'];
        Implement('modelxcuongonepiece.com/danhsachtap','tap',true);
    }


    if(index === 'phim'){
        keyquery = ['so_phim'];
        domain   = ['ten_phim' , 'thoi_luong'  , 'anh_bia' ,'luot_xem'  , 'id_token_fb'];
        Implement('modelxcuongonepiece.com/danhsachphim','phim',true);
    }

    if(index === 'tokenfbs'){
        keyquery = [ 'id_token' ];
        groupquery = [ 'list_tap' , 'list_phim'];
        domain = [ 'token' ];
        Implement('modelxcuongonepiece.com/danhsachtokenfb','tokenfbs',true);
    }

    if(index === 'taptokenfb'){
        keyquery = [ 'id_token' ];
        groupquery = [ 'list_tap' ];
        keybat = [ 'so_tap' ]
        domain = ['id_video_fb'];
        Implement('modelxcuongonepiece.com/danhsachtokenfb','taptokenfb',false);
    }
    if(index === 'phimtokenfb'){
        keyquery = [ 'id_token' ];
        groupquery = [ 'list_phim' ];
        keybat = [ 'so_phim' ];
        domain = ['id_video_fb'];
        Implement('modelxcuongonepiece.com/danhsachtokenfb','phimtokenfb',false);
    }

    if(index === 'danhsachurltapfb'){
        keyquery   = [ 'so_tap' ];
        domain = [ 'url' , 'thoi_gian' ];
        Implement('modelxcuongonepiece.com/danhsachurltapfb','danhsachurltapfb',true);
    }

    if(index === 'danhsachurlphimfb'){
        keyquery   = [ 'so_phim' ];
        domain = [ 'url' , 'thoi_gian' ];
        Implement('modelxcuongonepiece.com/danhsachurlphimfb','danhsachurlphimfb',true);
    }
////////////////////////////////////////////////////
    if(index === 'linhtap'){
        keyquery   = [ 'so_tap'];
        domain = [ 'url_direct' , 'url_embed' , 'thoi_gian' ];
        Implement('modelxcuongonepiece.com/danhsachlinktap','linhtap',true);
    }

    if(index === 'linhphim'){
        keyquery   = [ 'so_phim'];
        domain = [ 'url_direct' , 'url_embed' , 'thoi_gian' ];
        Implement('modelxcuongonepiece.com/danhsachlinkphim','linhphim',true);
    }

//----------------------------------------------------

    if(index === 'binhluans'){
        keyquery = [ '_id' ];
        domain = [ 'id_facebook' , 'ten_chat' , 'noi_dung' , 'thoi_gian'];
        Implement('modelxcuongonepiece.com/danhsachbinhluan','binhluans',true);
    }

//----------------------------------------------
    if(index === 'chaps'){
        keyquery   = [ 'so_chap'];
        domain = [ 'anh_bia' ]
        groupquery = ['anh_chap'];
        Implement('modelxcuongonepiece.com/danhsachchap','chaps',true);
    }
    if(index === 'anhchap'){
        keyquery = [ 'so_chap' ];
        groupquery = [ 'anh_chap' ];
        keybat = [ 'stt' ];
        domain = [ 'anh' , 'anh_ngang'];
        Implement('modelxcuongonepiece.com/danhsachchap','anhchap',false);
    }

//------------------------------------------------------------------------------------------------
    }else{
        callback('that bai', 'text/html');
    }
}