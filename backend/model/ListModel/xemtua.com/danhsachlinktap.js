const MainModel = require("../../MainModel.js");
module.exports = async (db) => {

    danhsachlinktap = new MainModel();

    await danhsachlinktap.dataModel(db,"aidb" , "danh_sach_linktap");

    danhsachlinktap.pushTypePara("_id", "ObjectID");
    danhsachlinktap.pushTypePara("so_tap", "Number");
    danhsachlinktap.pushTypePara("so_phim", "Number");
    danhsachlinktap.pushTypePara("url_direct", "String");
    danhsachlinktap.pushTypePara("url_embed", "String");
    danhsachlinktap.pushTypePara("thoi_gian", "string");

    return danhsachlinktap;
}