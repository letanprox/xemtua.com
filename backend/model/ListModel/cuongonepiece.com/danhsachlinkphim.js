const MainModel = require("../../MainModel.js");
module.exports = async (db) => {

    danhsachlinkphim = new MainModel();

    await danhsachlinkphim.dataModel(db,"mydb" , "danh_sach_linkphim");

    danhsachlinkphim.pushTypePara("_id", "ObjectID");
    danhsachlinkphim.pushTypePara("so_phim", "Number");
    danhsachlinkphim.pushTypePara("url_direct", "String");
    danhsachlinkphim.pushTypePara("url_embed", "String");
    danhsachlinkphim.pushTypePara("thoi_gian", "string");

    return danhsachlinkphim;
}