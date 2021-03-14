const { count } = require("console");

module.exports = async (callback, scanner) => {
    
    let index = scanner.req_bundle.index;
    let head_params = scanner.head_params;

    if (index === 'loadManga') {
        let sochap = head_params.get('sochap');
        if(sochap !== "undefined" && Number(sochap) !== -1){
            let model = scanner["modelxcuongonepiece.com/danhsachchap"];
            let namequery = "anh_chap"
            let query = {so_chap: Number(sochap)}
            let projection = {_id:0}
            let sort = {order:1,element:'stt'}
            let skip = 0;
            let limit = 50;
            let select = await model.dataModel.select_(query, projection, sort, skip, limit , namequery);

            let arr = [];
            await select.forEach(element => {
                    arr.push(element.element);
            });
            var data = {
                datachap: arr,
            }

            query = {}
            projection = {so_chap:1,_id:0}
            sort = {so_chap:-1}
            skip = 0;
            limit = 0;
            select = await model.dataModel.select(query, projection, sort, skip, limit);
            data['chaps'] = select;
            callback(JSON.stringify(data), 'application/json');
        }else{
            let model = scanner["modelxcuongonepiece.com/danhsachchap"];
            let query = {}
            let projection = {so_chap:1,_id:0}
            let sort = {so_chap:-1}
            let skip = 0;
            let limit = 1;
            let select = await model.dataModel.select(query, projection, sort, skip, limit);
            sochap = select[0].so_chap;

            let namequery = "anh_chap"
            query = {so_chap:sochap};
            projection = {_id:0}
            sort = {order:1,element:'stt'}
            skip = 0;
            limit = 50;
            select = await model.dataModel.select_(query, projection, sort, skip, limit , namequery);

            let arr = [];
            await select.forEach(element => {
                    arr.push(element.element);
            });
            var data = {
                datachap: arr,
            }
            query = {}
            projection = {so_chap:1,_id:0}
            sort = {so_chap:-1}
            skip = 0;
            limit = 0;
            select = await model.dataModel.select(query, projection, sort, skip, limit);
            data['chaps'] = select;
            callback(JSON.stringify(data), 'application/json');
        }
    }
}