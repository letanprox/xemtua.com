const { count } = require("console");

module.exports = async (callback, scanner) => {
    
    let head_params = scanner.head_params;
    if (scanner.req_bundle.index === 'timtap') {

        let model = scanner["modelxcuongonepiece.com/danhsachtap"];
        let page = head_params.get('page');
        if(page === "undefined" || Number(page) == 0) page = 1;
        else page = Number(page);

        let textsearch = head_params.get('textsearch');
        if(textsearch === "undefined") textsearch = '';

        let query = {}
        query['$text'] = {}
        query['$text']['$search'] = textsearch;
        let count1 = await model.dataModel.count(query);

        query = {}
        query['ten_tap'] = {}
        query['ten_tap']['$regex'] = textsearch;
        let count2 = await model.dataModel.count(query);

        let count;
        let chose;
        if(count2 >= count1){
            count = count2;
            chose = 2;
        }else{
            count = count1;
            chose = 1;
        }

        query = {};
        let limit = 6;
        let skip = limit*(page-1);
        let projection = {
            so_tap: 1,ten_tap: 1,luot_xem: 1,anh_bia: 1,_id: 0,
        }
        let sort = {}

        let select;
        if(chose === 1){
            query = {}
            query['$text'] = {}
            query['$text']['$search'] = textsearch;
            select = await model.dataModel.select(query, projection, sort, skip, limit);
        }
        if(chose === 2){
            query = {}
            query['ten_tap'] = {}
            query['ten_tap']['$regex'] = String(textsearch);
            select = await model.dataModel.select(query, projection, sort, skip, limit);
            if(select.toString().length <= 2){
                query = {}
                var txt = textsearch.toString();
                var numb = txt.match(/\d/g);
                if(numb != null){
                    numb = numb.join("");
                    query['so_tap'] = Number(numb);
                    select = await model.dataModel.select(query, projection, sort, skip, limit);
                }else{
                    select = [];
                }
            }
        }
        let number = Math.ceil(count / limit);
        let data = {
            data:select,
            number:number,
        }
        callback(JSON.stringify(data), 'application/json');
    }
}