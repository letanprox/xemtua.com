const MainModel = require("../../MainModel.js");
module.exports = async (db) => {

    danhsachphimle = new MainModel();

    await danhsachphimle.dataModel(db,"aidb" , "danh_sach_phimle");

    danhsachphimle.pushTypePara("_id", "ObjectID");

    danhsachphimle.pushTypePara("so_phimle", "Number");
    danhsachphimle.pushTypePara("so_phim", "Number");
    danhsachphimle.pushTypePara("ten_phimle", "string");
    danhsachphimle.pushTypePara("luot_xem", "Number");
    danhsachphimle.pushTypePara("anh_bia", "String");
    danhsachphimle.pushTypePara("tu_khoa", "string");
    danhsachphimle.pushTypePara("gioi_thieu", "String");
    danhsachphimle.pushTypePara("id_token_fb", "string");
    
    return danhsachphimle;
}