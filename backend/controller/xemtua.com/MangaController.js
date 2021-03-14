const { count } = require("console");

module.exports = async (callback, scanner) => {
    
    let index = scanner.req_bundle.index;
    let head_params = scanner.head_params;

    if (index === 'loadManga') {
        let tukhoa = head_params.get('tukhoa');
        let sochap = head_params.get('sochap');
        if(String(sochap) === "undefined" || String(sochap) === "NaN") sochap = -1;
        
        let query = {tu_khoa: String(tukhoa)};
        let projection = {
            _id: 0, so_truyen: 1, ten_truyen:1,
        }
        let select;
        select = await scanner["modelxxemtua.com/danhsachtruyen"].dataModel.select(query, projection, {}, 0, 0);
        select = JSON.parse(JSON.stringify(select));

        let sotruyen;
        let tentruyen;
        if(select.length > 0){
             sotruyen = select[0].so_truyen;
             tentruyen = select[0].ten_truyen;
        }

        if(select.length > 0){
            if(sochap == -1){
                select = await scanner["modelxxemtua.com/danhsachchap"].dataModel.select( {so_truyen: Number(sotruyen)},  {_id:0, so_chap:1}, {so_chap:-1}, 0, 1 );
                sochap = Number(JSON.parse(JSON.stringify(select))[0].so_chap);
            }
            let namequery = "anhchap";
            let query = {so_chap: Number(sochap) , so_truyen: Number(sotruyen)}
            let projection = {_id:0}
            let sort = {order:1,element:'so_anh'}
            let skip = 0;
            let limit = 50;
            select = await scanner["modelxxemtua.com/danhsachchap"].dataModel.select_(query, projection, sort, skip, limit , namequery);

            let arr = [];
            await select.forEach(element => {
                    arr.push(element.element);
            });

            var data = {datachap: arr,}

            query = {so_truyen: Number(sotruyen)};
            projection = {so_chap:1,_id:0}
            sort = {so_chap:-1}
            skip = 0;
            limit = 0;
            select = await scanner["modelxxemtua.com/danhsachchap"].dataModel.select(query, projection, sort, skip, limit);
            data['chaps'] = select;
            data.tentruyen = tentruyen;

            await scanner["modelxxemtua.com/danhsachtruyen"].dataModel.update({so_truyen: Number(sotruyen)}, {$inc:{luot_xem: 1}});

            callback(JSON.stringify(data), 'application/json');
        }else{
            callback("that bai", 'application/json');
        }
    }
}