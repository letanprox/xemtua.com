let mongodb = require('mongodb');
const utf8 = require('utf8');

module.exports = (listElement, head_params , body_params) => {
    let listData = [];
    let check = false;
    let value;

    for (let i in listElement) {
        if(head_params.get(listElement[i].id) != null){
            check = true;
            value = head_params.get(listElement[i].id);
        }else if(body_params.get(listElement[i].id) != null){
            check = true;
            value = body_params.get(listElement[i].id);
        }
        if (check === true){
            switch(listElement[i].type){
                case "Number"   : listData.push(listElement[i].id , Number(value)); break;
                case "string"   : listData.push(listElement[i].id , String(value).replace(/"/gi, "'")); break;
                case "String"   : listData.push(listElement[i].id , encodeURI(String(value).replace(/"/gi, "'"))); break;
                case "ObjectID" : listData.push(listElement[i].id , new mongodb.ObjectID(value)); break;
                case "JSON"     : listData.push(listElement[i].id , JSON.parse(JSON.stringify(value))); break;
            }
        }
        check = false;
        value = null;
    }
    return listData;
}