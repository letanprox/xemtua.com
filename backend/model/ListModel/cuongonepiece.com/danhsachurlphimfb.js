const MainModel = require("../../MainModel.js");
module.exports = async (db) => {

    danhsachurlphimfb = new MainModel();

    await danhsachurlphimfb.dataModel(db,"aidb" , "danh_sach_urlphimfb");

    danhsachurlphimfb.pushTypePara("_id", "ObjectID");
    danhsachurlphimfb.pushTypePara("so_phim", "Number");
    danhsachurlphimfb.pushTypePara("url", "String");
    danhsachurlphimfb.pushTypePara("thoi_gian", "string");

    return danhsachurlphimfb;
}