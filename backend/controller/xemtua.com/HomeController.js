module.exports = async (callback, scanner) => {
    let index = scanner.req_bundle.index;
    let head_params = scanner.head_params;
    if (index === 'tapmoi') {
        let model = scanner["modelxxemtua.com/danhsachphim"];
        let projection = {
            anh_bia: 0,_id: 0 , luot_xem: 0, dem_so: 0,
        }
        let sort = {dem_so: -1}
        let limit = 6;
        let select = await model.dataModel.select({}, projection, sort, 0, limit);
        select = JSON.parse(JSON.stringify(select));

        let query = {$or: []};
        for(let i = 0; i < select.length; i++){
           query.$or.push({so_phim: select[i].so_phim,so_tap: select[i].tap_moi});
        }

        model = scanner["modelxxemtua.com/danhsachtap"];
        projection = {
            _id: 0 , id_token_fb: 0 , so_mua: 0
        }
        let select1 = await model.dataModel.select(query, projection, {}, 0, 0);

        for(let i = 0; i < select.length; i++){
            for(let k = 0; k < select1.length ; k++){
                if(Number(select[i].so_phim) ==  Number(select1[k].so_phim)){
                    select[i]['so_tap'] = select1[k].so_tap;
                    select[i]['anh_bia'] = select1[k].anh_bia;
                    select[i]['luot_xem'] = select1[k].luot_xem;
                    select[i]['ten_tap'] = select1[k].ten_tap;
                }
            }
        }
        callback(JSON.stringify(select), 'application/json');
    }

    if (index === 'chapmoi') {
        let model = scanner["modelxxemtua.com/danhsachtruyen"];
        let projection = {
            _id: 0, dem_so: 0,
        }
        let sort = {dem_so: -1}
        let limit = 6;
        let select = await model.dataModel.select({}, projection, sort, 0, limit);
        select = JSON.parse(JSON.stringify(select));

        callback(JSON.stringify(select), 'application/json');
    }

    if (index === 'phimlemoi') {
        let page = Number(head_params.get('page'));

        let model = scanner["modelxxemtua.com/danhsachphimle"];
        let projection = {
            _id: 0, id_token_fb: 0,
        }
        let sort = {luot_xem: -1}
        let limit = 6;
        let skip = page*limit;
        let select = await model.dataModel.select({}, projection, sort, skip, limit);
        select = JSON.parse(JSON.stringify(select));

        callback(JSON.stringify(select), 'application/json');
    }

    if (index === 'listtruyen') {

        let page = Number(head_params.get('page'));

        let model = scanner["modelxxemtua.com/danhsachtruyen"];
        let projection = {
            _id: 0, dem_so: 0,
        }
        let sort = {luot_xem: -1}
        let limit = 6;
        let skip = page*limit;
        let select = await model.dataModel.select({}, projection, sort, skip, limit);
        select = JSON.parse(JSON.stringify(select));

        callback(JSON.stringify(select), 'application/json');
    }


    if (index === 'listanime') {
        let page = Number(head_params.get('page'));

        let model = scanner["modelxxemtua.com/danhsachphim"];
        let projection = {
            _id: 0, dem_so: 0,
        }
        let sort = {luot_xem: -1}
        let limit = 6;
        let skip = page*limit;
        let select = await model.dataModel.select({}, projection, sort, skip, limit);
        select = JSON.parse(JSON.stringify(select));

        callback(JSON.stringify(select), 'application/json');
    }
}