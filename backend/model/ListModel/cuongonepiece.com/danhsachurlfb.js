const MainModel = require("../../MainModel.js");
module.exports = async (db) => {

    danhsachurlfb = new MainModel();

    await danhsachurlfb.dataModel(db,"mydb" , "danh_sach_urlfb");

    danhsachurlfb.pushTypePara("_id", "ObjectID");
    danhsachurlfb.pushTypePara("so_tap", "Number");
    danhsachurlfb.pushTypePara("url", "String");
    danhsachurlfb.pushTypePara("thoi_gian", "string");

    return danhsachurlfb;
}