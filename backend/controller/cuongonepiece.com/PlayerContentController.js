let mongodb = require('mongodb');
let LoadVideoTapFB = require("./LoadvideoTapFB.js");
let LoadVideoPhimFB = require("./LoadvideoPhimFB.js");

module.exports = async (callback, scanner) => {
    
    let index = scanner.req_bundle.index;
    let head_params = scanner.head_params;
    //------------------------------------------------------------------------------------
    if (index === 'loadPlayer'){
        let model = scanner["modelxcuongonepiece.com/danhsachtap"];
        let query = {}
        let projection = {}
        let sort = {}
        let skip;
        let limit;
        let select;
        //GET ONE TAP
        let data_tap = 0;
        let sotap = Number(head_params.get('sotap'));
        projection = {
            so_mua:1 , _id: 0,
        }
        sort = { 
            so_tap: -1,
        }
        skip = 0;
        limit = 1;
        if(sotap !== "undefined" && sotap != 0){
            query = {so_tap: sotap}
            select = await model.dataModel.select(query, projection, sort, skip, limit);
            data_tap = JSON.parse(JSON.stringify(select));
            if(data_tap.length == 0){
                query = {}
                select = await model.dataModel.select(query, projection, sort, skip, limit);
                data_tap = JSON.parse(JSON.stringify(select)); 
            }
        }else{
            query = {}
            select = await model.dataModel.select(query, projection, sort, skip, limit);
            data_tap = JSON.parse(JSON.stringify(select)); 
        }
        //GET LIST TAP, MOT MUA, LIST MUA
        let data_taps;
        let data_mua;
        let data_muas;

        if(Object.keys(data_tap[0]).length !== 0){
            //GET LIST TAP
            query = {so_mua: Number(data_tap[0].so_mua)}
            projection = {
                so_tap: 1 , anh_bia:1,ten_tap: 1,luot_xem: 1, _id: 0,
            }
            sort = {
                so_tap: 1,
            }
            limit = 0;
            select = await model.dataModel.select(query, projection, sort, skip, limit);
            data_taps = JSON.parse(JSON.stringify(select));
            //GET ONE MUA
            model = scanner["modelxcuongonepiece.com/danhsachmua"];
            query = {so_mua: Number(data_tap[0].so_mua)}
            projection = {
                _id: 0,
            }
            data_mua = await model.dataModel.select(query, projection, sort, skip, limit); 
            //GET LIST MUA
            query = {}
            projection = {
                _id: 0,
            }
            sort = {
                so_mua: -1,
            }
            data_muas = await model.dataModel.select(query, projection, sort, skip, limit); 
            //RETURN DATA
            let data = {
                danh_sach_tap:data_taps,
                mua:data_mua,
                danh_sach_mua:data_muas,
            }
            callback(JSON.stringify(data), 'application/json');
        }else{
            callback("that bai", 'application/json');
        }
    }
    //------------------------------------------------------------------------------------
    if (index === 'loadMovie') {
        //GET LIST PHIM
        let query = {}
        let projection = {}
        let sort = {so_phim:-1}
        let skip = 0;
        let limit = 0;
        let select = await scanner["modelxcuongonepiece.com/danhsachphim"].dataModel.select(query, projection, sort, skip, limit);
        callback(JSON.stringify(select), 'application/json');
    }
    //------------------------------------------------------------------------------------
    if (index === 'insertComment') {
        //INSERT COMMENT
        let id_facebook = String(head_params.get('id_facebook'));
        let ten_chat = String(head_params.get('ten_chat'));
        let noi_dung = String(head_params.get('noi_dung'));
        let thoi_gian = String(head_params.get('thoi_gian'));
        let check = true;


        if(id_facebook !== "undefined" && ten_chat !== "undefined" && noi_dung !== "undefined" && thoi_gian !== "undefined"){
            if(id_facebook.includes("script") && ten_chat.includes("script") && noi_dung.includes("script") && thoi_gian.includes("script")){

            }else{
                check = false;
            }
        }else{
            check = false;
        }
        
        
        if(check == true){
            try {
                query = [{
                    id_facebook:id_facebook,
                    ten_chat:ten_chat,
                    noi_dung:noi_dung,
                    thoi_gian:thoi_gian
                }];
                await scanner["modelxcuongonepiece.com/danhsachbinhluan"].dataModel.insert(query);
                callback('thanh cong', 'text/html');
            }catch (e){};
        }else{
            callback('that bai', 'text/html');
        }
    }
    //------------------------------------------------------------------------------------
    if (index === 'loadComment') {
        //GET COMMENT
        let _id = head_params.get('_id');
        if(_id !== "undefined"){
            let model = scanner["modelxcuongonepiece.com/danhsachbinhluan"];
            let query;
            if(Number(_id) == 0){
                query = {};
            }else{
                _id = new mongodb.ObjectID(head_params.get('_id'));
                query = {_id: { $lt: _id } };
            }
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
    if(index === "loadSeason"){
        //GET LIST MUA
        let somua = head_params.get('somua');
        if(somua !== "undefined" && Number(somua) != 0){
            let query = {so_mua:Number(somua)}
            let projection = {
            so_tap: 1 , anh_bia:1,ten_tap: 1,luot_xem: 1, _id: 0,
            }
            let sort = {
                so_tap: 1,
            }
            let skip = 0;
            let limit = 0;
            select = await scanner["modelxcuongonepiece.com/danhsachtap"].dataModel.select(query, projection, sort, skip, limit); 
            callback(JSON.stringify(select), 'application/json');
        }else{
            callback("that bai", 'application/json');
        }
    }
    //------------------------------------------------------------------------------------

    if (index === 'checkLinkTap') {
        let model = scanner["modelxcuongonepiece.com/danhsachlinktap"];
        let query = {so_tap: Number(head_params.get('sotap'))  }
        let projection = {
            _id: 0, so_tap: 0, thoi_gian:0
        }
        let select = await model.dataModel.select(query, projection, {}, 0, 0);
        select = JSON.parse(JSON.stringify(select));

        let linkfb = await LoadVideoTapFB( Number(head_params.get('sotap')) ,scanner);
        if(linkfb === "that bai") linkfb = "false";

        if(select.length > 0) callback(JSON.stringify({direct :String(select[0].url_direct), embed :String(select[0].url_embed), linkfb:linkfb}), 'application/json');
        else callback(JSON.stringify({direct :"false", embed :"false", linkfb:linkfb}), 'application/json');
    }


    if (index === 'checkLinkPhim') {
        let model = scanner["modelxcuongonepiece.com/danhsachlinkphim"];
        let query = {so_phim: Number(head_params.get('sophim'))  }
        let projection = {
            _id: 0, so_phim: 0, thoi_gian:0
        }
        let select = await model.dataModel.select(query, projection, {}, 0, 0);
        select = JSON.parse(JSON.stringify(select));

        let linkfb = await LoadVideoPhimFB( Number(head_params.get('sophim')) ,scanner);
        if(linkfb === "that bai") linkfb = "false";

        if(select.length > 0) callback(JSON.stringify({direct :String(select[0].url_direct), embed :String(select[0].url_embed), linkfb:linkfb}), 'application/json');
        else callback(JSON.stringify({direct :"false", embed :"false", linkfb:linkfb}), 'application/json');
    }

}

let caculateDay = (day)=>{
    date1 = new Date(day);
    var today = new Date();
    var date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    date2 =  new Date(date+' '+time);    
    time = Math.abs(((date2.getTime() - date1.getTime())/1000));
    return Math.floor(time / (60));                  
}
let getCurrentTime = ()=>{
    var today = new Date();
    var date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return date+' '+time;
}