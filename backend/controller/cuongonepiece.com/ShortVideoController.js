const { count } = require("console");

module.exports = async (callback, scanner) => {
    let clock = 60;
    let head_params = scanner.head_params;

    if (scanner.req_bundle.index === 'topviewshortvideo'){
        let model = scanner["modelxcuongonepiece.com/danhsachshortvideo"];
        let page = Number(head_params.get('page'));
        if(page === "undefined" || page == 0) page = 1;
        let query = {}
        projection = {index: 1,url_thumbnail: 1,views: 1,_id: 0}
        let limit = 6;
        let skip = limit*(page-1);
        let sort = {views:-1, index:-1}
        let select = await model.dataModel.select(query, projection, sort, skip, limit);
        callback(JSON.stringify(select), 'application/json');
    }

    if (scanner.req_bundle.index === 'newsshortvideo'){
        let model = scanner["modelxcuongonepiece.com/danhsachshortvideo"];
        let page = Number(head_params.get('page'));
        if(page === "undefined" || page == 0) page = 1;
        let query = {}
        projection = {index: 1,url_thumbnail: 1,views: 1,_id: 0}
        let limit = 6;
        let skip = limit*(page-1);
        let sort = {index:-1}
        let select = await model.dataModel.select(query, projection, sort, skip, limit);
        callback(JSON.stringify(select), 'application/json');
    }

    if (scanner.req_bundle.index === 'relateshortvideo'){
        let model = scanner["modelxcuongonepiece.com/danhsachrelate"];
        let index = Number(head_params.get('index'));
        let namequery = "relate"
        let query = {index: Number(index)}
        let projection = {_id:0}
        let sort = {order:1,element:'va'}
        let skip = 0;
        let limit = 100;
        let select = await model.dataModel.select_(query, projection, sort, skip, limit , namequery);
        
        model = scanner["modelxcuongonepiece.com/danhsachshortvideo"];
        let arr = [];
        await select.forEach(element =>  {
                arr.push(Number(element.element.dex));
        });
        arr = arr.slice(0 , 12);
        query = {index:{ $in: arr }};
        projection = {index: 1,url_thumbnail: 1,views: 1,_id: 0}
        limit = 12;
        skip = 0;
        sort = {}
        select = await model.dataModel.select(query, projection, sort, skip, limit);
        select = JSON.parse(JSON.stringify(select));
        callback(JSON.stringify(select), 'application/json');
    }

    if (scanner.req_bundle.index === 'getoneshortvideo'){
        let model = scanner["modelxcuongonepiece.com/danhsachrelate"];
        let index = Number(head_params.get('index'));
        let backdex = Number(head_params.get('backdex'));
        let query, projection , sort , skip , limit , select;

        if(index > 0){
            query = {index:  { $in: [ Number(index), Number(backdex) ] } }
            projection = {_id:0}
            sort = {}
            skip = 0;
            limit = 4;
            select = await model.dataModel.select(query, projection, sort, skip, limit);
            select = JSON.parse(JSON.stringify(select));
            let countdex = Number(select.length);

            if(countdex >= 2 && backdex > 0){
                query = {index: Number(index)}
                projection = {_id:0,relate: {$elemMatch: {dex: Number(backdex)}}}
                select = await model.dataModel.select(query, projection, sort, skip, limit);
                select = await JSON.parse(JSON.stringify(select));
                if(select[0].hasOwnProperty('relate')){
                    await model.dataModel.update({index: Number(index) , "relate.dex":Number(backdex) }, {$inc: {"relate.$.va": 1}});
                }else{
                    await model.dataModel.update({ index: Number(index) },{ $push: { relate:{dex : Number(backdex), va:1}}});
                }

                query = {index: Number(backdex)}
                projection = {_id:0,relate: {$elemMatch: {dex: Number(index)}}}
                select = await model.dataModel.select(query, projection, sort, skip, limit);
                select = await JSON.parse(JSON.stringify(select));
                if(select[0].hasOwnProperty('relate')){
                    await model.dataModel.update({index: Number(backdex) , "relate.dex":Number(index) }, {$inc: {"relate.$.va": 1}});
                }else{
                    await model.dataModel.update({ index: Number(backdex) },{ $push: { relate:{dex : Number(index), va:1}}});
                }
            }

            if(countdex >= 1){
                model = scanner["modelxcuongonepiece.com/danhsachshortvideo"];
                query = {index:Number(index)}
                projection = {$inc:{views:1}}
                await model.dataModel.update(query, projection);
                query = {index:Number(index)}
                projection = {views: 1 ,url_drive: 1, id_token:1 , id_video:1, _id: 0}
                limit = 1;
                skip = 0;
                sort = {}
                select = await model.dataModel.select(query, projection, sort, skip, limit);
                let infovideo = select[0];

                let data = {};
                data.index = index;
                data.views = infovideo.views;
                data.url_drive = infovideo.url_drive;

                model = scanner["modelxcuongonepiece.com/danhsachlinkshortvideo"];
                query = {index:Number(index)}
                projection = {url_temp: 1 ,thoi_gian: 1,_id: 0}
                select = await model.dataModel.select(query, projection, sort, skip, limit);

                let checkurl = 0;
                if(select.length === 0){
                    model = scanner["modelxcuongonepiece.com/danhsachurlshortvideo"];
                    query = {index:Number(index)}
                    projection = {url_temp: 1 ,thoi_gian: 1,_id: 0}
                    select = await model.dataModel.select(query, projection, sort, skip, limit);
                    if(select.length === 0){
                        checkurl = 1;
                    }else if(Number(caculateDay(select[0].thoi_gian)) > clock){
                        checkurl = 2;
                    }
                }
                
                if(checkurl === 0){
                    data.url_temp = select[0].url_temp;
                    callback(JSON.stringify(data), 'application/json');
                }else{
                    model = scanner["modelxcuongonepiece.com/danhsachtokenshortvideo"];
                    query = {id_token:Number(infovideo.id_token)}
                    projection = {token:1,_id: 0}
                    select = await model.dataModel.select(query, projection, sort, skip, limit);

                    var url = 'https://graph.facebook.com/'+ infovideo.id_video + '?access_token=' + select[0].token + '&fields=source';
                    const http      = require('http'),
                          https     = require('https');
                    let client = http;
                    if (url.toString().indexOf("https") === 0) {
                        client = https;
                    }
                    var request = client.request(url, async function (res) {
                        var datax = '';
                            res.on('data', function (chunk) {
                                datax += chunk;
                            });
                            res.on('end',async function () {
                                get_url = JSON.parse(datax);   
                                data.url_temp = get_url.source;
                                model = scanner["modelxcuongonepiece.com/danhsachurlshortvideo"];
                                if(checkurl === 1){
                                    let newvalues = [{
                                        index:Number(index),
                                        url_temp: String(get_url.source),
                                        thoi_gian: String(getCurrentTime()),
                                    }]
                                    await model.dataModel.insert(newvalues);
                                }else if(checkurl === 2){
                                    let myquery = {index:Number(index)}
                                    let newvalues = [{$set:{
                                        url_temp: String(get_url.source),
                                        thoi_gian: String(getCurrentTime()),
                                    }}]
                                    await model.dataModel.update(myquery, newvalues);
                                }
                                callback(JSON.stringify(data), 'application/json');
                            });
                        });
                        request.on('error', function (e) {
                            data.url_temp = "fail";
                            callback(JSON.stringify(data), 'application/json');
                        });
                        request.end();
                }
            }else{
                callback(JSON.stringify("that bai"), 'application/json');
            }   
        }else{
            callback(JSON.stringify("that bai"), 'application/json');
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