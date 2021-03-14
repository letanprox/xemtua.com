const MainModel = require("../../MainModel.js");
module.exports = async (db) => {

    danhsachurlovafb = new MainModel();

    await danhsachurlovafb.dataModel(db,"aidb" , "danh_sach_urlovafb");

    danhsachurlovafb.pushTypePara("_id", "ObjectID");
    danhsachurlovafb.pushTypePara("so_ova", "Number");
    danhsachurlovafb.pushTypePara("so_phim", "Number");
    danhsachurlovafb.pushTypePara("url", "String");
    danhsachurlovafb.pushTypePara("thoi_gian", "string");

    return danhsachurlovafb;
}