const MainModel = require("../../MainModel.js");
module.exports = async (db) => {

    danhsachbinhluan = new MainModel();

    await danhsachbinhluan.dataModel(db,"aidb" , "danh_sach_binhluan");

    danhsachbinhluan.pushTypePara("_id", "ObjectID");
    danhsachbinhluan.pushTypePara("so_phim", "Number");
    danhsachbinhluan.pushTypePara("so_tap", "Number");
    danhsachbinhluan.pushTypePara("so_phimle", "Number");

    danhsachbinhluan.pushTypePara("id_facebook", "string");
    danhsachbinhluan.pushTypePara("noi_dung", "String");
    danhsachbinhluan.pushTypePara("ten_chat", "String");
    danhsachbinhluan.pushTypePara("thoi_gian", "string");
    
    return danhsachbinhluan;
}