const MainModel = require("../../MainModel.js");
module.exports = async (db) => {

    danhsachova = new MainModel();

    await danhsachova.dataModel(db,"aidb" , "danh_sach_ova");

    danhsachova.pushTypePara("_id", "ObjectID");

    danhsachova.pushTypePara("so_ova", "Number");
    danhsachova.pushTypePara("so_phim", "Number");
    danhsachova.pushTypePara("ten_ova", "string");
    danhsachova.pushTypePara("luot_xem", "Number");
    danhsachova.pushTypePara("anh_bia", "String");
    danhsachova.pushTypePara("tu_khoa", "string");
    danhsachova.pushTypePara("id_token_fb", "string");
    
    return danhsachova;
}