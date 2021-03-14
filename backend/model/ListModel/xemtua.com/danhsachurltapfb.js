const MainModel = require("../../MainModel.js");
module.exports = async (db) => {

    danhsachurltapfb = new MainModel();

    await danhsachurltapfb.dataModel(db,"aidb" , "danh_sach_urltapfb");

    danhsachurltapfb.pushTypePara("_id", "ObjectID");
    danhsachurltapfb.pushTypePara("so_tap", "Number");
    danhsachurltapfb.pushTypePara("so_phim", "Number");
    danhsachurltapfb.pushTypePara("url", "String");
    danhsachurltapfb.pushTypePara("thoi_gian", "string");

    return danhsachurltapfb;
}