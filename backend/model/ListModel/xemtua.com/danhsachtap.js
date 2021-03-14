const MainModel = require("../../MainModel.js");
module.exports = async (db) => {

    danhsachtap = new MainModel();

    await danhsachtap.dataModel(db,"aidb" , "danh_sach_tap");

    danhsachtap.pushTypePara("_id", "ObjectID");

    danhsachtap.pushTypePara("so_tap", "Number");
    danhsachtap.pushTypePara("so_mua", "Number");
    danhsachtap.pushTypePara("so_phim", "Number");
    danhsachtap.pushTypePara("ten_tap", "string");
    danhsachtap.pushTypePara("luot_xem", "Number");
    danhsachtap.pushTypePara("anh_bia", "String");
    danhsachtap.pushTypePara("id_token_fb", "string");
    
    return danhsachtap;
}