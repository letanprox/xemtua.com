let mongodb = require('mongodb');
let fetch = require("node-fetch");

let loadLinkVideoFB = async (info_bundle ,scanner) => {
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
    let fetchs = await fetch(url, {"method": "GET",});
    fetchs = await fetchs.json();
    data_array = JSON.parse(JSON.stringify(fetchs,null,2));
                if(info_bundle["ishavetap"] === true){
                    if(info_bundle["ishaveurl"] === 0){
                        let myquery = [{so_tap : Number(info_bundle["sotap"]),
                                            url: data_array.source,
                                            thoi_gian:getCurrentTime()
                                        }];
                        scanner["modelxcuongonepiece.com/danhsachurltapfb"].dataModel.insert(myquery);
                    }else{
                        let myquery = {so_tap : Number(info_bundle["sotap"])};
                        let newvalues = { $set: {url:data_array.source, thoi_gian:getCurrentTime()} };
                        scanner["modelxcuongonepiece.com/danhsachurltapfb"].dataModel.update(myquery,newvalues);
                    }
                }
    return JSON.stringify(data_array.source);
}

module.exports = async (sotap, scanner) => {
    //------------------------------------------------------------------------------------
        let clock = 60;

        if(sotap > 0){
            let info_bundle = {};
            let select = await scanner["modelxcuongonepiece.com/danhsachtap"].dataModel.select({so_tap: sotap}, { id_token_fb:1 , _id:0}, {}, 0,0);
            if(Object.keys(select).length !== 0){

                id_token = Number(select[0].id_token_fb);
                info_bundle["ishavetap"] = true;
                info_bundle["sotap"] = sotap;
                info_bundle["ishaveurl"] = await scanner["modelxcuongonepiece.com/danhsachurltapfb"].dataModel.count({so_tap: sotap});
                let dataday = await scanner["modelxcuongonepiece.com/danhsachurltapfb"].dataModel.select({so_tap: sotap}, {thoi_gian:1 , _id:0}, {}, 0, 0);

                if(info_bundle["ishaveurl"] === 0 || Number(caculateDay(dataday[0].thoi_gian)) >= clock){
                    query = {id_token:Number(id_token)}
                    projection = {_id:0, token:1}
                    projection["list_tap"] = {}
                    projection["list_tap"]['$elemMatch'] = {}
                    projection["list_tap"]['$elemMatch']['so_tap'] = Number(sotap);
                    select = await scanner["modelxcuongonepiece.com/danhsachtokenfb"].dataModel.search_(query, projection);
                    if( select.length == 0 ||  !select[0].hasOwnProperty('list_tap')){
                        return "that bai";
                    }else{
                        info_bundle["token"] = select[0].token;
                        info_bundle["id_video"] = select[0]["list_tap"][0]["id_video_fb"];
                        return await loadLinkVideoFB(info_bundle,scanner);
                    }
                }else{
                    let url = await scanner["modelxcuongonepiece.com/danhsachurltapfb"].dataModel.select({so_tap: sotap}, {url:1 , _id:0}, {}, 0, 0);
                    return JSON.stringify(decodeURI(url[0].url).replace(/0765547053/gi, "&"));
                }
            }else{
                return "that bai";
            }
        }else{
            return "that bai";
        }     
}

let getCurrentTime = ()=>{
    var today = new Date();
    var date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return date+' '+time;
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