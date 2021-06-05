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
        Implement('modelxxemtua.com/danhsachtokenshortvideo','danhsachtokenshortvideo',true);
    }

    if(index.includes('danhsachurlshortvideo')){
        keyquery = [ 'index' ];
        domain = ['url_temp' , 'thoi_gian']
        Implement('modelxxemtua.com/danhsachurlshortvideo','danhsachurlshortvideo',true);
    }

    if(index.includes('danhsachlinkshortvideo')){
        keyquery = [ 'index'];
        domain = [ 'url_temp' , 'thoi_gian']
        Implement('modelxxemtua.com/danhsachlinkshortvideo','danhsachlinkshortvideo',true);
    }

    if(index.includes('danhsachshortvideo')){
        keyquery = [ 'index' ];
        domain = ['url_thumbnail' , 'views' , 'id_video' , 'id_token' , 'url_drive']
        Implement('modelxxemtua.com/danhsachshortvideo','danhsachshortvideo',true);
    }

    if(index.includes('celate')){
        keyquery = ['index'];
        groupquery = ['relate'];
        Implement('modelxxemtua.com/danhsachrelate','celate',true);
    }

    if(index.includes('relate')){
        keyquery   = [ 'index' ];
        groupquery = ['relate'];
        domain = [ 'dex' , 'va'];
        Implement('modelxxemtua.com/danhsachrelate','relate',false);
    }
//------------------------------------------------------------------------------------------------
    if(index === 'phim'){
        keyquery = ['so_phim'];
        domain   = ['ten_phim'  , 'anh_bia' ,'luot_xem' , 'gioi_thieu' , 'tu_khoa' , 'tap_moi' , 'dem_so'];
        Implement('modelxxemtua.com/danhsachphim','phim',true);
    }

    if(index === 'mua'){
        keyquery = ['so_mua' , 'so_phim' ];
        domain   = [ 'ten_mua' , 'khoang_tap'];
        Implement('modelxxemtua.com/danhsachmua','mua',true);
    }

    if(index === 'tap'){
        keyquery = [ 'so_tap' , 'so_phim' ];
        domain   = [ 'so_mua' , 'ten_tap' , 'luot_xem' ,'anh_bia' , 'id_token_fb'];
        Implement('modelxxemtua.com/danhsachtap','tap',true);
    }

    if(index === 'phimle'){
        keyquery = [ 'so_phimle' , 'so_phim' ];
        domain   = [ 'ten_phimle' , 'luot_xem' , 'anh_bia' , 'tu_khoa' , 'gioi_thieu' ,'id_token_fb'];
        Implement('modelxxemtua.com/danhsachphimle','phimle',true);
    }

    if(index === 'ova'){
        keyquery = [ 'so_ova' , 'so_phim' ];
        domain   = [ 'ten_ova' , 'luot_xem' , 'tu_khoa' ,'anh_bia' , 'id_token_fb'];
        Implement('modelxxemtua.com/danhsachova','ova',true);
    }

    if(index === 'truyen'){
        keyquery = [ 'so_truyen' ];
        domain   = [ 'ten_truyen' ,'anh_bia' , 'luot_xem' , 'tu_khoa' , 'chap_moi' , 'dem_so'];
        Implement('modelxxemtua.com/danhsachtruyen','truyen',true);
    }

    if(index === 'chaps'){
        keyquery   = [ 'so_chap' , 'so_truyen'];
        groupquery = ['anhchap'];
        Implement('modelxxemtua.com/danhsachchap','chaps',true);
    }

    if(index === 'anhchap'){
        keyquery = [ 'so_chap' , 'so_truyen' ];
        groupquery = [ 'anhchap' ];
        keybat = [ 'so_anh' ];
        domain = [ 'url_anh' , 'anh_ngang'];
        Implement('modelxxemtua.com/danhsachchap','anhchap',false);
    }

    if(index === 'tokenfb'){
        keyquery = [ 'id_token' ];
        groupquery = [ 'taptoken' , 'phimletoken' , 'ovatoken'];
        domain = [ 'token' ];
        Implement('modelxxemtua.com/danhsachidtokenfb','tokenfb',true);
    }

    if(index === 'idtapfb'){
        keyquery = [ 'id_token' ];
        groupquery = [ 'taptoken' ];
        keybat = [ 'so_tap' , 'so_phim' ]
        domain = ['id_video_fb'];
        Implement('modelxxemtua.com/danhsachidtokenfb','idtapfb',false);
    }

    if(index === 'idphimfb'){
        keyquery = [ 'id_token' ];
        groupquery = [ 'phimletoken' ];
        keybat = [ 'so_phimle' , 'so_phim' ];
        domain = ['id_video_fb'];
        Implement('modelxxemtua.com/danhsachidtokenfb','idphimfb',false);
    }

    if(index === 'idovafb'){
        keyquery = [ 'id_token' ];
        groupquery = [ 'ovatoken' ];
        keybat = [ 'so_ova' , 'so_phim' ];
        domain = ['id_video_fb'];
        Implement('modelxxemtua.com/danhsachidtokenfb','idovafb',false);
    }

    if(index === 'urltapfb'){
        keyquery   = [ 'so_tap' , 'so_phim'];
        domain = [ 'url' , 'thoi_gian' ];
        Implement('modelxxemtua.com/danhsachurltapfb','urltapfb',true);
    }

    if(index === 'urlphimlefb'){
        keyquery   = [ 'so_phimle' , 'so_phim'];
        domain = [ 'url' , 'thoi_gian' ];
        Implement('modelxxemtua.com/danhsachurlphimlefb','urlphimlefb',true);
    }

    if(index === 'urlovafb'){
        keyquery   = [ 'so_ova' , 'so_phim'];
        domain = [ 'url' , 'thoi_gian' ];
        Implement('modelxxemtua.com/danhsachurlovafb','urlovafb',true);
    }

    if(index === 'linhtap'){
        keyquery   = [ 'so_tap' , 'so_phim'];
        domain = [ 'url_direct' , 'url_embed' , 'thoi_gian' ];
        Implement('modelxxemtua.com/danhsachlinktap','linhtap',true);
    }

    if(index === 'linhphimle'){
        keyquery   = [ 'so_phimle' , 'so_phim'];
        domain = [ 'url_direct' , 'url_embed' , 'thoi_gian' ];
        Implement('modelxxemtua.com/danhsachlinkphimle','linhphimle',true);
    }

    if(index === 'linhova'){
        keyquery   = [ 'so_ova' , 'so_phim'];
        domain = [ 'url_direct' , 'url_embed' , 'thoi_gian' ];
        Implement('modelxxemtua.com/danhsachlinkova','linhova',true);
    }

    if(index === 'binhluans'){
        keyquery = [ '_id' ];
        domain = [  'so_phim' , 'so_tap' , 'so_phimle' , 'id_facebook' , 'ten_chat' , 'noi_dung' , 'thoi_gian'];
        Implement('modelxxemtua.com/danhsachbinhluan','binhluans',true);
    }

    if(index === 'driveapi'){
        keyquery = [ 'index' ];
        domain = [ 'client_id' , 'client_secret' , 'refresh_token' , 'access_token' ,'key_api' , 'name_acc'];
        Implement('modelxxemtua.com/danhsachdriveapi','driveapi',true);
    }

    if(index === 'drivelist'){
        keyquery = [ 'name' ];
        domain = [ 'id' , 'index' ];
        Implement('modelxxemtua.com/danhsachdrivelist','drivelist',true);
    }

    ////////////////
    if(index === 'linhfb'){
        keyquery   = [ 'so_phim' , 'so_tap' ];
        domain = [ 'id_token' ,  'id_video' , 'url_video' , 'thoi_gian' ];
        Implement('modelxxemtua.com/linhfb','linhfb',true);
    }
    if(index === 'linhtokenfb'){
        keyquery   = ['id_token'];
        domain = [ 'id_page' ,'token' , 'name' , 'thoi_gian'  ];
        Implement('modelxxemtua.com/linhtokenfb','linhtokenfb',true);
    }
    if(index === 'lienketphim'){
        keyquery   = ['name_phim'];
        domain = [ 'so_phim' ];
        Implement('modelxxemtua.com/lienketphim','lienketphim',true);
    }

//------------------------------------------------------------------------------------------------
    }else{
        callback('that bai', 'text/html');
    }
}