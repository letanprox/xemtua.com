let mongodb = require('mongodb');
let LoadVideoTapFB = require("./LoadVideoTapFB.js");
let LoadVideoPhimLeFB = require("./LoadVideoPhimLeFB.js");
let LoadVideoOvaFB = require("./LoadVideoOvaFB.js");

module.exports = async (callback, scanner) => {
    
    let index = scanner.req_bundle.index;
    let head_params = scanner.head_params;
    //------------------------------------------------------------------------------------
    if (index === 'loadPlayerEp'){
        let tukhoa = String(head_params.get('tukhoa'));
        let bundle = {};
        let query = {}
        let projection = {}
        let sort = {}
        
        query = {tu_khoa: tukhoa}
        projection = { ten_phim:1 , so_phim: 1, gioi_thieu:1 ,  _id:0 }
        let select = await scanner["modelxxemtua.com/danhsachphim"].dataModel.select(query, projection, {}, 0, 0);

        if(select.length == 1){
            //bundle
            bundle.type = true;
            bundle.so_phim = select[0].so_phim;
            bundle.ten_phim = select[0].ten_phim;
            bundle.gioi_thieu = select[0].gioi_thieu;

            let sophim = select[0].so_phim;
            let sotap = Number(head_params.get('sotap'));
            if(sotap == 0) sotap = 1;

            query = {so_tap: sotap , so_phim: sophim}
            projection = { id_token_fb:0 , _id:0}
            select = await scanner["modelxxemtua.com/danhsachtap"].dataModel.select(query, projection, {}, 0, 0);

            if(select.length == 0) {
                sotap = 1;
                query = {so_tap: sotap , so_phim: sophim}
                projection = { id_token_fb:0 , _id:0}
                select = await scanner["modelxxemtua.com/danhsachtap"].dataModel.select(query, projection, {}, 0, 0);
            }

            //bundle
            bundle.so_tap = sotap;
            bundle.so_mua = select[0].so_mua;
            bundle.luot_xem = select[0].luot_xem;
            bundle.ten_tap = select[0].ten_tap;
            bundle.anh_bia = select[0].anh_bia;
            let somua = select[0].so_mua;

            query = {so_mua: somua  , so_phim: sophim}
            projection = {so_phim:0 , so_mua:0 ,  id_token_fb:0 , _id:0}
            //bundle
            bundle.tap_mua = await scanner["modelxxemtua.com/danhsachtap"].dataModel.select(query, projection, {so_tap: 1}, 0, 0);

            query = {so_phim: sophim}
            projection = {so_phim:0 ,_id:0}
            sort = {so_mua:1}
            //bundle
            bundle.list_mua = await scanner["modelxxemtua.com/danhsachmua"].dataModel.select(query, projection, sort, 0, 0);

            query = {so_phim: sophim}
            //bundle
            bundle.total_movie = await scanner["modelxxemtua.com/danhsachphimle"].dataModel.count(query);
            bundle.total_ova = await scanner["modelxxemtua.com/danhsachova"].dataModel.count(query);

            await scanner["modelxxemtua.com/danhsachtap"].dataModel.update({so_tap: sotap , so_phim: sophim}, {$inc:{luot_xem: 1}});
            await scanner["modelxxemtua.com/danhsachphim"].dataModel.update({ so_phim: sophim}, {$inc:{luot_xem: 1}});

            callback(JSON.stringify(bundle), 'application/json');
        }else{
            callback("that bai", 'application/json');
        }
    }

    if(index === 'loadPlayerMovie'){
        let tukhoa = String(head_params.get('tukhoa'));
        let bundle = {};
        let query = {}
        let projection = {}
        let sort = {}

        query = {tu_khoa: tukhoa}
        projection = {tu_khoa:0 , id_token_fb:0, _id:0}
        select = await scanner["modelxxemtua.com/danhsachphimle"].dataModel.select(query, projection, {}, 0, 0);
        
        if(select.length == 1){
            bundle.type = false;
            bundle.so_phimle = select[0].so_phimle;
            bundle.so_phim = select[0].so_phim;
            bundle.ten_phim = select[0].ten_phimle;
            bundle.luot_xem = select[0].luot_xem;
            bundle.anh_bia = select[0].anh_bia;
            bundle.gioi_thieu = select[0].gioi_thieu;
            
            query = {so_phim: select[0].so_phim}
            projection = {so_phim:0 ,id_token_fb:0, _id:0}
            bundle.list_phim = await scanner["modelxxemtua.com/danhsachphimle"].dataModel.select(query, projection, {}, 0, 0);
            //bundle
            bundle.total_ep = await scanner["modelxxemtua.com/danhsachtap"].dataModel.count(query);
            bundle.total_ova = await scanner["modelxxemtua.com/danhsachova"].dataModel.count(query);

            projection = {tu_khoa:1 , _id:0}
            bundle.tu_khoa_phim = await scanner["modelxxemtua.com/danhsachphim"].dataModel.select(query, projection, {}, 0, 0);
            if(bundle.tu_khoa_phim.length !== 0) bundle.tu_khoa_phim = bundle.tu_khoa_phim[0].tu_khoa;
            
            await scanner["modelxxemtua.com/danhsachphimle"].dataModel.update({so_phimle: bundle.so_phimle , so_phim: bundle.so_phim}, {$inc:{luot_xem: 1}});

            callback(JSON.stringify(bundle), 'application/json');
        }else{
            callback("that bai", 'application/json');
        }
    }

    if(index === 'loadPlayerOva'){
        let tukhoa = String(head_params.get('tukhoa'));
        let bundle = {};
        let query = {}
        let projection = {}
        let sort = {}

        query = {tu_khoa: tukhoa}
        projection = {tu_khoa:0 , id_token_fb:0, _id:0}
        select = await scanner["modelxxemtua.com/danhsachova"].dataModel.select(query, projection, {}, 0, 0);
        
        if(select.length == 1){
            bundle.type = false;
            bundle.so_ova = select[0].so_ova;
            bundle.so_phim = select[0].so_phim;
            bundle.ten_ova = select[0].ten_ova;
            bundle.luot_xem = select[0].luot_xem;
            bundle.anh_bia = select[0].anh_bia;
            
            query = {so_phim: select[0].so_phim}
            projection = {so_phim:0 ,id_token_fb:0, _id:0}
            bundle.list_ova = await scanner["modelxxemtua.com/danhsachova"].dataModel.select(query, projection, {}, 0, 0);

            //bundle
            bundle.total_ep = await scanner["modelxxemtua.com/danhsachtap"].dataModel.count(query);
            bundle.total_movie = await scanner["modelxxemtua.com/danhsachphimle"].dataModel.count(query);

            query = {so_phim: select[0].so_phim}
            projection = {gioi_thieu:1 , _id:0}
            bundle.gioi_thieu = await scanner["modelxxemtua.com/danhsachphim"].dataModel.select(query, projection, {}, 0, 0);
            bundle.gioi_thieu = bundle.gioi_thieu[0].gioi_thieu;

            projection = {tu_khoa:1 , _id:0}
            bundle.tu_khoa_phim = await scanner["modelxxemtua.com/danhsachphim"].dataModel.select(query, projection, {}, 0, 0);
            bundle.tu_khoa_phim = bundle.tu_khoa_phim[0].tu_khoa;

            await scanner["modelxxemtua.com/danhsachova"].dataModel.update({so_ova: bundle.so_ova , so_phim: bundle.so_phim}, {$inc:{luot_xem: 1}});

            callback(JSON.stringify(bundle), 'application/json');
        }else{
            callback("that bai", 'application/json');
        }
    }

    if (index === 'loadSeason'){
        let sophim = Number(head_params.get('sophim'));
        let somua = Number(head_params.get('somua'));
        let query = {};
        let projection = {};

        query = {so_mua: somua , so_phim: sophim}
        projection = {so_phim:0 , so_mua:0 ,  id_token_fb:0 , _id:0}
        //bundle
        let select = await scanner["modelxxemtua.com/danhsachtap"].dataModel.select(query, projection, {so_tap: 1}, 0, 0);
        callback(JSON.stringify(select), 'application/json');
    }

    if (index === 'loadListMovie'){
        let query = {so_phim: Number(head_params.get('sophim'))}
        let projection = {so_phim:0 ,id_token_fb:0, _id:0}
        let select = await scanner["modelxxemtua.com/danhsachphimle"].dataModel.select(query, projection, {}, 0, 0);
        callback(JSON.stringify(select), 'application/json');
    }

    if (index === 'loadListOva'){
        let query = {so_phim: Number(head_params.get('sophim'))}
        let projection = {so_phim:0 ,id_token_fb:0, _id:0}
        let select = await scanner["modelxxemtua.com/danhsachova"].dataModel.select(query, projection, {}, 0, 0);
        callback(JSON.stringify(select), 'application/json');
    }

    if (index === 'loadListEp'){
        let sophim = Number(head_params.get('sophim'));
        let somua = 1;
        
        let query = {};
        let projection = {};

        query = {so_mua: somua , so_phim: sophim}
        projection = {so_phim:0 , so_mua:0 ,  id_token_fb:0 , _id:0}
        //bundle
        let listtap = await scanner["modelxxemtua.com/danhsachtap"].dataModel.select(query, projection, {}, 0, 0);

        query = {so_phim: sophim}
        projection = {so_phim:0 ,_id:0}
        sort = {so_mua:1}
        //bundle
        let listmua = await scanner["modelxxemtua.com/danhsachmua"].dataModel.select(query, projection, sort, 0, 0);

        callback(JSON.stringify({listtap,listmua,so_mua:1}), 'application/json');
    }
    //------------------------------------------------------------------------------------
    if (index === 'loadComment') {
        //GET COMMENT
        let _id = head_params.get('_id');
        let sophim = Number(head_params.get('sophim'));

        if(_id !== "undefined"){
            let model = scanner["modelxxemtua.com/danhsachbinhluan"];
            let query;
            if(Number(_id) == 0){
                query = {};
            }else{
                _id = new mongodb.ObjectID(head_params.get('_id'));
                query = {_id: { $lt: _id } };
            }
            query.so_phim = sophim;
            let projection = {}
            let sort = {
                _id: -1,
            }
            let skip = 0;
            let limit = 10;
            let select = await model.dataModel.select(query, projection, sort, skip, limit);
            callback(JSON.stringify(select), 'application/json');
        }else{
            callback('that bai', 'application/json');
        }
    }

    //------------------------------------------------------------------------------------
    if (index === 'insertComment') {
        //INSERT COMMENT
        let sophim = Number(head_params.get('sophim'));

        let id_facebook = String(head_params.get('id_facebook'));
        let ten_chat = String(head_params.get('ten_chat'));
        let noi_dung = String(head_params.get('noi_dung'));
        let thoi_gian = String(head_params.get('thoi_gian'));
        let notscipt = ['scipt' , 'html' , '</' , '<div' , '<button' , '<scipt' , '<link']
        let check = true;


        if(id_facebook !== "undefined" && ten_chat !== "undefined" && noi_dung !== "undefined" && thoi_gian !== "undefined"){

            for(let i = 0; i < notscipt.length; i++){
                if(id_facebook.includes(notscipt[i])) check = false;
                if(ten_chat.includes(notscipt[i])) check = false;
                if(noi_dung.includes(notscipt[i])) check = false;
                if(thoi_gian.includes(notscipt[i])) check = false;
            }

        }else{
            check = false;
        }

        if(check == true){
            try {
                query = [{
                    so_phim: sophim,
                    id_facebook:id_facebook,
                    ten_chat:ten_chat,
                    noi_dung:noi_dung,
                    thoi_gian:thoi_gian
                }];

                await scanner["modelxxemtua.com/danhsachbinhluan"].dataModel.insert(query);
                callback('thanh cong', 'text/html');
            }catch (e){};
        }else{
            callback('that bai', 'text/html');
        }
    }

    if (index === 'checkLinkTap') {
        let model = scanner["modelxxemtua.com/danhsachlinktap"];
        let query = {so_tap: Number(head_params.get('sotap')) , so_phim:  Number(head_params.get('sophim')) }
        let projection = {
            _id: 0, so_tap: 0, so_phim: 0, thoi_gian:0
        }
        let select = await model.dataModel.select(query, projection, {}, 0, 0);
        select = JSON.parse(JSON.stringify(select));

        let linkfb = await LoadVideoTapFB( Number(head_params.get('sophim')) , Number(head_params.get('sotap')) ,scanner);
        if(linkfb === "that bai") linkfb = "false";

        if(select.length > 0) callback(JSON.stringify({direct :String(select[0].url_direct), embed :String(select[0].url_embed), linkfb:linkfb}), 'application/json');
        else callback(JSON.stringify({direct :"false", embed :"false", linkfb:linkfb}), 'application/json');
    }

    if (index === 'checkLinkPhimle') {
        let model = scanner["modelxxemtua.com/danhsachlinkphimle"];
        let query = {so_phimle: Number(head_params.get('sophimle')) , so_phim:  Number(head_params.get('sophim')) }
        let projection = {
            _id: 0, so_phimle: 0, so_phim: 0, thoi_gian:0
        }
        let select = await model.dataModel.select(query, projection, {}, 0, 0);
        select = JSON.parse(JSON.stringify(select));

        let linkfb = await LoadVideoPhimLeFB( Number(head_params.get('sophim')) , Number(head_params.get('sophimle')) ,scanner);
        if(linkfb === "that bai") linkfb = "false";

        if(select.length > 0)callback(JSON.stringify({direct :String(select[0].url_direct), embed :String(select[0].url_embed), linkfb:linkfb}), 'application/json');
        else callback(JSON.stringify({direct :"false", embed :"false", linkfb:linkfb}), 'application/json');
    }

    if (index === 'checkLinkOva') {
        let model = scanner["modelxxemtua.com/danhsachlinkova"];
        let query = {so_ova: Number(head_params.get('soova')) , so_phim:  Number(head_params.get('sophim')) }
        let projection = {
            _id: 0, so_ova: 0, so_phim: 0, thoi_gian:0
        }
        let select = await model.dataModel.select(query, projection, {}, 0, 0);
        select = JSON.parse(JSON.stringify(select));

        let linkfb = await LoadVideoOvaFB( Number(head_params.get('sophim')) , Number(head_params.get('soova')) ,scanner);
        if(linkfb === "that bai") linkfb = "false";

        if(select.length > 0)callback(JSON.stringify({direct :String(select[0].url_direct), embed :String(select[0].url_embed), linkfb:linkfb}), 'application/json');
        else callback(JSON.stringify({direct :"false", embed :"false", linkfb:linkfb}), 'application/json');
    }

}

let getCurrentTime = ()=>{
    var today = new Date();
    var date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return date+' '+time;
}