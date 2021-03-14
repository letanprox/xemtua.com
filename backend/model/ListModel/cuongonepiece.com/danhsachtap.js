const MainModel = require("../../MainModel.js");
module.exports = async (db) => {

    danhsachtap = new MainModel();

    await danhsachtap.dataModel(db,"mydb" , "danh_sach_tap");

    danhsachtap.pushTypePara("_id", "ObjectID");
    danhsachtap.pushTypePara("so_tap", "Number");
    danhsachtap.pushTypePara("so_mua", "Number");
    danhsachtap.pushTypePara("ten_tap", "string");
    danhsachtap.pushTypePara("luot_xem", "Number");
    danhsachtap.pushTypePara("anh_bia", "String");
    danhsachtap.pushTypePara("id_token_fb", "Number");
    // danhsachtap.pushTypePara("id_video_fb", "string");

    // danhsachtap.pushTypePara("id_", "Number");
    // danhsachtap.pushTypePara("id_nguoi_dung", "Number");
    // danhsachtap.pushTypePara("noi_dung", "String");
    // danhsachtap.pushTypePara("thoi_gian", "String");

    return danhsachtap;
}