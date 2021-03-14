module.exports = async (callback, scanner , keyquery , domain , groupquery) => {

    let head_params = scanner.head_params;
    let body_params = scanner.body_params;
    let list = scanner.modelx.getPara(head_params,body_params);
    let index = scanner.req_bundle.index;
    let dataModel = scanner.modelx.dataModel;

    //-------------------------------------------------------
    if (index === 'search') {
        let query = {};for(let i = 0; i < keyquery.length; i++) query[keyquery[i]] = list[(list).indexOf(keyquery[i])+1];
        let projection = {};for(let i = 0; i < groupquery.length; i++) projection[groupquery[i]] = 0;
        let select = await dataModel.select(query, projection, {}, 0, 0);
        callback(JSON.stringify(select), 'application/json');
    }
    //-------------------------------------------------------
    if (index === 'get') {
        let projection = {};for(let i = 0; i < groupquery.length; i++) projection[groupquery[i]] = 0;
        let limit = Number(body_params.get('limit'));
        let skip = Number(body_params.get('skip'));
        let select = await dataModel.select({}, projection, {} , skip, limit);
        callback(JSON.stringify(select), 'application/json');
    }
    //-------------------------------------------------------
    if(index === 'count'){
        let count = await dataModel.count({});
        callback(JSON.stringify(count), 'text/html');
    }
    //-------------------------------------------------------
    if(index === 'insert'){
        let check = true;
        if(keyquery[0] !== '_id'){
            let query = {};for(let i = 0; i < keyquery.length; i++) query[keyquery[i]] = list[(list).indexOf(keyquery[i])+1];
            let select = await dataModel.select(query, {}, {}, 0, 0);
            if(select.length != 0) check = false;
        }
        if(check === true){
            for(let i = 0; i < keyquery.length ; i++) if((typeof list[(list).indexOf(keyquery[i])+1]) === "string" &&  list[(list).indexOf(keyquery[i])+1] === '') check = false;
            for(let i = 0; i < domain.length ; i++) if((typeof list[(list).indexOf(domain[i])+1]) === "string" &&  list[(list).indexOf(domain[i])+1] === '') check = false;    
            if(check === true){
            try {
                let set = {};
                for(let i = 0; i < keyquery.length ; i++) set[keyquery[i]] = list[(list).indexOf(keyquery[i])+1];
                for(let i = 0; i < domain.length ; i++){
                    if(domain[i].includes('JSON')){
                        domain[i] = domain[i].replace("_JSON", "");
                        set[domain[i]] = JSON.parse(list[(list).indexOf(domain[i])+1]);
                    }else set[domain[i]] = list[(list).indexOf(domain[i])+1];
                } 
                for(let i = 0; i < groupquery.length ; i++) set[groupquery[i]] = [];
                query = [set]
                await dataModel.insert(query);
                callback('thanh cong', 'text/html');
            }catch (e){};
            }
        }
    }
    //-------------------------------------------------------
    if(index === 'update'){
        let check = true;
        for(let i = 0; i < keyquery.length ; i++) if((typeof list[(list).indexOf(keyquery[i])+1]) === "string" &&  list[(list).indexOf(keyquery[i])+1] === '') check = false;
        for(let i = 0; i < domain.length ; i++) if((typeof list[(list).indexOf(domain[i])+1]) === "string" &&  list[(list).indexOf(domain[i])+1] === '') check = false;    
        if(check == true){
        try {
            let query = {};for(let i = 0; i < keyquery.length; i++) query[keyquery[i]] = list[(list).indexOf(keyquery[i])+1];
            let set = {};
            for(let i = 0; i < domain.length ; i++){
                if(domain[i].includes('JSON')){
                    domain[i] = domain[i].replace("_JSON", "");
                    set[domain[i]] = JSON.parse(list[(list).indexOf(domain[i])+1]);
                }else set[domain[i]] = list[(list).indexOf(domain[i])+1];
            } 
            let newvalues = { $set: set };
            await dataModel.update(query,newvalues);
            callback('thanh cong', 'text/html'); 
        }catch (e){};
        }
    }
    //-------------------------------------------------------
    if(index === 'delete'){
        try {
            let query = {};for(let i = 0; i < keyquery.length; i++) query[keyquery[i]] = list[(list).indexOf(keyquery[i])+1];
            await dataModel.delete(query);
            callback('thanh cong', 'text/html'); 
        }catch (e){};
    }
}