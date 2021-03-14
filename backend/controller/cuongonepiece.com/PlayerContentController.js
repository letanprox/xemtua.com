let mongodb = require('mongodb');

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
        let id_facebook = head_params.get('id_facebook');
        let ten_chat = head_params.get('ten_chat');
        let noi_dung = head_params.get('noi_dung');
        let thoi_gian = head_params.get('thoi_gian');
        if(id_facebook !== "undefined" && ten_chat !== "undefined" && noi_dung !== "undefined" && thoi_gian !== "undefined"){
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
    let gettoken = async (id_token) => {
        let query = {id_token:Number(id_token)}
        let projection = {token: 1 ,  _id: 0,}
        let sort = {}
        let skip = 0;
        let limit = 1;
        token = await scanner["modelxcuongonepiece.com/danhsachtokenfb"].dataModel.select(query, projection, sort, skip, limit); 
        return token[0]["token"]; 
    }
    let loadLinkVideoFB = (info_bundle,callback) => {
        token = info_bundle["token"];
        id_video = info_bundle["id_video"];
        var data_array;
        var url = 'https://graph.facebook.com/'+ id_video + '?access_token=' + token + '&fields=source';
        const http      = require('http'),
              https     = require('https');
        let client = http;
        if (url.toString().indexOf("https") === 0) {
            client = https;
        }
        var request = client.request(url, function (res) {
            var data = '';
                res.on('data', function (chunk) {
                    data += chunk;
                });
                res.on('end', function () {
                    data_array = JSON.parse(data);       
                    callback(JSON.stringify(data_array.source), 'application/json');
                    if(info_bundle["ishavetap"] === true){
                        if(info_bundle["ishaveurl"] === 0){
                            let myquery = [{so_tap : Number(info_bundle["so_tap"]) ,
                                                url: data_array.source,
                                                thoi_gian:getCurrentTime()
                                            }];
                            scanner["modelxcuongonepiece.com/danhsachurlfb"].dataModel.insert(myquery);
                        }else{
                            let myquery = {so_tap : Number(info_bundle["so_tap"])};
                            let newvalues = { $set: {url:data_array.source, thoi_gian:getCurrentTime()} };
                            scanner["modelxcuongonepiece.com/danhsachurlfb"].dataModel.update(myquery,newvalues);
                        }
                    }
                });
            });
            request.on('error', function (e) {
                callback(JSON.stringify("that bai"), 'application/json');
            });
            request.end();
    }
    if(index === "loadVideoFB"){
        let clock = 60;

        let so_tap = head_params.get('sotap');
        let so_phim = head_params.get('sophim');

        if((so_tap !== "undefined" && Number(so_tap) != 0) || ((so_phim !== "undefined") && Number(so_phim) != 0)){
            let info_bundle = {};

            if(so_tap !== "undefined" && Number(so_tap) != 0){

                let select = await scanner["modelxcuongonepiece.com/danhsachtap"].dataModel.select({so_tap:Number(so_tap)}, { id_token_fb:1 , _id:0}, {}, 0,0);
                if(Object.keys(select).length !== 0){

                id_token = Number(select[0].id_token_fb);
                info_bundle["ishavetap"] = true;
                info_bundle["so_tap"] = so_tap;
                info_bundle["ishaveurl"] = await scanner["modelxcuongonepiece.com/danhsachurlfb"].dataModel.count({so_tap: Number(so_tap)});
                let dataday = await scanner["modelxcuongonepiece.com/danhsachurlfb"].dataModel.select({so_tap:Number(so_tap)}, {thoi_gian:1 , _id:0}, {}, 0, 0);

                if(info_bundle["ishaveurl"] === 0 || Number(caculateDay(dataday[0].thoi_gian)) >= clock){
                    query = {id_token:Number(id_token)}
                    projection = {_id:0}
                    projection["list_tap"] = {}
                    projection["list_tap"]['$elemMatch'] = {}
                    projection["list_tap"]['$elemMatch']['so_tap'] = Number(so_tap);
                    id_video = await scanner["modelxcuongonepiece.com/danhsachtokenfb"].dataModel.search_(query, projection);
                    info_bundle["token"] = await gettoken(id_token);
                    if(Object.keys(id_video[0]).length === 0){
                        callback(JSON.stringify("that bai"), 'application/json');
                    }else{
                        info_bundle["id_video"] = id_video[0]["list_tap"][0]["id_video_fb"];
                        loadLinkVideoFB(info_bundle,callback);
                    }
                    console.log("ne");
                }else{
                    let url = await scanner["modelxcuongonepiece.com/danhsachurlfb"].dataModel.select({so_tap:Number(so_tap)}, {url:1 , _id:0}, {}, 0, 0);
                    callback(JSON.stringify(decodeURI(url[0].url).replace(/0765547053/gi, "&")), 'application/json');
                    console.log("re");
                }
                
                }else{
                    console.log("that bai")
                    callback(JSON.stringify("that bai"), 'application/json');
                }
                
            }else if(so_phim !== "undefined" && Number(so_phim) != 0){

                let select = await scanner["modelxcuongonepiece.com/danhsachphim"].dataModel.select({so_phim:Number(so_phim)}, { id_token_fb:1 , _id:0}, {}, 0,0);
                
                if(Object.keys(select).length !== 0){
                    id_token = Number(select[0].id_token_fb);
                    info_bundle["ishavetap"] = false;
                    info_bundle["so_phim"] = so_phim;
                    query = {id_token:Number(id_token)}
                    projection = {_id:0}
                    projection["list_phim"] = {}
                    projection["list_phim"]['$elemMatch'] = {}
                    projection["list_phim"]['$elemMatch']['so_phim'] = Number(so_phim);
                    id_video = await scanner["modelxcuongonepiece.com/danhsachtokenfb"].dataModel.search_(query, projection);
                    info_bundle["token"] = await gettoken(id_token);
                    if(Object.keys(id_video[0]).length === 0){
                        callback(JSON.stringify("that bai"), 'application/json');
                    }else{
                        info_bundle["id_video"] = id_video[0]["list_phim"][0]["id_video_fb"];
                        loadLinkVideoFB(info_bundle,callback);
                    }
                }else{
                    console.log("that bai")
                    callback(JSON.stringify("that bai"), 'application/json');
                }
            }
        }else{
            callback(JSON.stringify("that bai"), 'application/json');
        }     
    }

    if(index === "loadVideoDirect"){
        let so_tap = head_params.get('sotap');
        if(so_tap !== "undefined" && Number(so_tap) !== 0){
            let model = scanner["modelxcuongonepiece.com/danhsachvideodirect"];
            let query = {so_tap: Number(so_tap)};
            let projection = {url:1,_id:0}
            let sort = {}
            let skip = 0;
            let limit = 1;
            let select = await model.dataModel.select(query, projection, sort, skip, limit);
            callback(JSON.stringify(select[0].url), 'application/json');
        }else{
            callback('that bai', 'application/json');
        }
    }

    if(index === "loadVideoEmbed"){
        let so_tap = head_params.get('sotap');
        if(so_tap !== "undefined" && Number(so_tap) !== 0){
            let model = scanner["modelxcuongonepiece.com/danhsachvideoembed"];
            let query = {so_tap: Number(so_tap)};
            let projection = {url:1,_id:0}
            let sort = {}
            let skip = 0;
            let limit = 1;
            let select = await model.dataModel.select(query, projection, sort, skip, limit);
            callback(JSON.stringify(select[0].url), 'application/json');
        }else{
            callback('that bai', 'application/json');
        }
    }
    
    if(index === "checkLinkBackup"){
        let so_tap = head_params.get('sotap');
        if(so_tap !== "undefined" && Number(so_tap) !== 0){
            let data = [];
            data[0] = await scanner["modelxcuongonepiece.com/danhsachvideodirect"].dataModel.count({so_tap: Number(so_tap)});
            data[1] = await scanner["modelxcuongonepiece.com/danhsachvideoembed"].dataModel.count({so_tap: Number(so_tap)});
            callback(JSON.stringify(data), 'application/json');
        }else{
            callback('that bai', 'application/json');
        }
    }

    if(index === "loadPhimEmbed"){
        let so_phim = head_params.get('sophim');
        if(so_phim !== "undefined" && Number(so_phim) !== 0){
            let model = scanner["modelxcuongonepiece.com/danhsachphimembed"];
            let query = {so_phim: Number(so_phim)};
            let projection = {url:1,_id:0}
            let sort = {}
            let skip = 0;
            let limit = 1;
            let select = await model.dataModel.select(query, projection, sort, skip, limit);
            callback(JSON.stringify(select[0].url), 'application/json');
        }else{
            callback('that bai', 'application/json');
        }
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