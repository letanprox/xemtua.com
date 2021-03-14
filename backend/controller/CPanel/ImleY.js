module.exports = async (callback, scanner , keyquery , groupquery , keybat , domain) => {

    let head_params = scanner.head_params;
    let body_params = scanner.body_params;
    let list = scanner.modelx.getPara(head_params,body_params);
    let index = scanner.req_bundle.index;
    let dataModel = scanner.modelx.dataModel;
    let namequery = groupquery[0];

    //-------------------------------------------------------
    if (index === 'search') {
        let query = {};for(let i = 0; i < keyquery.length; i++) query[keyquery[i]] = list[(list).indexOf(keyquery[i])+1];
        let projection = {}
        projection[namequery] = {}
        projection[namequery]['$elemMatch'] = {}
        for(let i = 0; i < keybat.length; i++) projection[namequery]['$elemMatch'][keybat[i]] = list[(list).indexOf(keybat[i])+1];
        let select = await dataModel.search_(query, projection);
        callback(JSON.stringify(select[0][namequery]), 'application/json');
    }
    //-------------------------------------------------------
    if (index === 'get') {
        let query = {};for(let i = 0; i < keyquery.length; i++) query[keyquery[i]] = list[(list).indexOf(keyquery[i])+1];
        let limit = Number(body_params.get('limit'));
        let skip = Number(body_params.get('skip'));
        let select = await dataModel.select_(query, {}, {}, skip, limit , namequery);
        let arr = [];
        await select.forEach(element => {
            arr.push(element);
        });
        callback(JSON.stringify(arr[0]['element']), 'application/json');
    }
    //-------------------------------------------------------
    if (index === 'count') {
        let query = {};for(let i = 0; i < keyquery.length; i++) query[keyquery[i]] = list[(list).indexOf(keyquery[i])+1];
        let count = await dataModel.count_(query,namequery);
        let arr = [];
        await count.forEach(element => {
            arr.push(element);
        });
        let jso = JSON.parse(JSON.stringify(arr));
        callback(JSON.stringify(jso[0].count), 'text/html');
    }
    //-------------------------------------------------------
    if(index === 'insert'){
        let check = true;
        let id_ = Math.random();
        //check input
        for(let i = 0; i < keybat.length ; i++) if((typeof list[(list).indexOf(keybat[i])+1]) === "string" &&  list[(list).indexOf(keybat[i])+1] === '') check = false;
        for(let i = 0; i < domain.length ; i++) if((typeof list[(list).indexOf(domain[i])+1]) === "string" &&  list[(list).indexOf(domain[i])+1] === '') check = false;    
        //check id_
        if(check === true){
            let query = {};for(let i = 0; i < keyquery.length; i++) query[keyquery[i]] = list[(list).indexOf(keyquery[i])+1];
            let projection = {}
            if(keybat[0] == 'id_'){
                let id_match = {}
                id_match['id_'] = id_;
                projection[namequery] = {$elemMatch: id_match}
            }else{
                let e_match = {}
                for(let i = 0; i < keybat.length; i++) e_match[keybat[i]] = list[(list).indexOf(keybat[i])+1];
                projection[namequery] = {$elemMatch: e_match}
            }
            let select = await dataModel.select(query, projection, {}, 0, 0);
            select =  JSON.parse(JSON.stringify(select));
            if(select[0][namequery]) check = false;
        }
        //insert data
        if(check === true){
            try {
                let query = {};for(let i = 0; i < keyquery.length; i++) query[keyquery[i]] = list[(list).indexOf(keyquery[i])+1];
                let myinsert = {}
                myinsert[namequery] = {}
                let start;
                if(keybat[0] == 'id_'){
                    myinsert[namequery]['id_'] = id_; 
                    start = 1;
                }else{
                    start = 0;
                }
                for(let i = start; i < keybat.length ; i++) myinsert[namequery][keybat[i]] = list[(list).indexOf(keybat[i])+1];
                for(let i = 0; i < domain.length ; i++) {
                    if(domain[i].includes('JSON')){
                        domain[i] = domain[i].replace("_JSON", "");
                        myinsert[namequery][domain[i]] = JSON.parse(list[(list).indexOf(domain[i])+1]);  
                    }else myinsert[namequery][domain[i]] = list[(list).indexOf(domain[i])+1];
                }
                await dataModel.insert_(query,myinsert);
                callback('thanh cong', 'text/html');
            }catch (e){};
        }else{
                callback('that bai', 'text/html');
        }
    }
    //-------------------------------------------------------
    if(index === 'update'){
        let query = {}
        for(let i = 0; i < keyquery.length; i++) query[keyquery[i]] = list[(list).indexOf(keyquery[i])+1];
        for(let i = 0; i < keybat.length; i++) query[namequery+"."+keybat[i]] = list[(list).indexOf(keybat[i])+1];
        let myupdate = {}
        for(let i = 0 ; i < domain.length ; i++) myupdate[namequery+".$."+domain[i]] = list[(list).indexOf(domain[i])+1];
        await dataModel.update_(query,myupdate);
        callback('thanh cong', 'text/html');
    }
    //-------------------------------------------------------
    if(index === 'delete'){
        let query = {}
        for(let i = 0; i < keyquery.length; i++) query[keyquery[i]] = list[(list).indexOf(keyquery[i])+1];
        let mydelete = {}; mydelete[namequery] = {}
        for(let i = 0; i < keybat.length; i++) mydelete[namequery][keybat[i]] = list[(list).indexOf(keybat[i])+1]; 
        await dataModel.delete_(query,mydelete);
        callback('thanh cong', 'text/html');
    }
}