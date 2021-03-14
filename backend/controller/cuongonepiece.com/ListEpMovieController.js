const { count } = require("console");

module.exports = async (callback, scanner) => {

    let index = scanner.req_bundle.index;
    let head_params = scanner.head_params;

    let model;
    if (index === 'danhsachtap') model = scanner["modelxcuongonepiece.com/danhsachtap"];
    if (index === 'danhsachphim') model = scanner["modelxcuongonepiece.com/danhsachphim"];
    
        let limit = 6;
        let page = head_params.get('page');
        let number = 0;

        let query = {};
        let count = await model.dataModel.count(query);
        number = Math.ceil(count / limit);

        if(page === "undefined" || Number(page) == 0) page = 1;
        else page = Number(page);

        let skip = limit*(page-1);
        let projection;
        let sort = {}

        if(index === 'danhsachtap'){
            projection = {
                so_tap: 1,ten_tap: 1,luot_xem: 1,anh_bia: 1,_id: 0
            }
            sort = {
                so_tap:-1,
            }
        }else if(index === "danhsachphim"){
            projection = {
                so_phim:1 ,ten_phim: 1,thoi_luong: 1, luot_xem: 1,anh_bia: 1,_id: 1
            }
        }
        let select = await model.dataModel.select(query, projection, sort, skip, limit);
        
        let data = {
            data:select,
            number:number,
        }
        callback(JSON.stringify(data), 'application/json');
}