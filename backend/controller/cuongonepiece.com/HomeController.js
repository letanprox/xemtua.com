module.exports = async (callback, scanner) => {
    let index = scanner.req_bundle.index;
    
    if (index === 'tapmoi') {
        let model = scanner["modelxcuongonepiece.com/danhsachtap"];
        let projection = {
            so_tap: 1,ten_tap: 1,luot_xem: 1,anh_bia: 1,_id: 0
        }
        let sort = {so_tap: -1,}
        let limit = 6;
        let select = await model.dataModel.select({}, projection, sort, 0, limit);
        callback(JSON.stringify(select), 'application/json');
    }
    if (index === 'phimmoi') {
        let model = scanner["modelxcuongonepiece.com/danhsachphim"];
        let projection = {
            so_phim:1 ,ten_phim: 1,thoi_luong: 1, luot_xem: 1,anh_bia: 1,_id: 0
        }
        let sort = {so_phim:-1}
        let limit = 6;
        let select = await model.dataModel.select({}, projection, sort, 0, limit);
        callback(JSON.stringify(select), 'application/json');
    }
    if (index === 'chapmoi'){
        let model = scanner["modelxcuongonepiece.com/danhsachchap"];
        let projection = {
            so_chap: 1, anh_bia: 1 ,_id: 0
        } 
        let sort = { so_chap: -1}
        let limit = 1;
        let select = await model.dataModel.select({}, projection, sort, 0, limit);
        callback(JSON.stringify(select), 'application/json');
    }
}