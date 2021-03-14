const MainModel = require("../../MainModel.js");
module.exports = async (db) => {

    danhsachlinkphimle = new MainModel();

    await danhsachlinkphimle.dataModel(db,"aidb" , "danh_sach_linkphimle");

    danhsachlinkphimle.pushTypePara("_id", "ObjectID");
    danhsachlinkphimle.pushTypePara("so_phimle", "Number");
    danhsachlinkphimle.pushTypePara("so_phim", "Number");
    danhsachlinkphimle.pushTypePara("url_direct", "String");
    danhsachlinkphimle.pushTypePara("url_embed", "String");
    danhsachlinkphimle.pushTypePara("thoi_gian", "string");

    return danhsachlinkphimle;
}