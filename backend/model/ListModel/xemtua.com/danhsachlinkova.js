const MainModel = require("../../MainModel.js");
module.exports = async (db) => {

    danhsachlinkova = new MainModel();

    await danhsachlinkova.dataModel(db,"aidb" , "danh_sach_linkova");

    danhsachlinkova.pushTypePara("_id", "ObjectID");
    danhsachlinkova.pushTypePara("so_ova", "Number");
    danhsachlinkova.pushTypePara("so_phim", "Number");
    danhsachlinkova.pushTypePara("url_direct", "String");
    danhsachlinkova.pushTypePara("url_embed", "String");
    danhsachlinkova.pushTypePara("thoi_gian", "string");

    return danhsachlinkova;
}