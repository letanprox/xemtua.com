const MainModel = require("../../MainModel.js");
module.exports = async (db) => {

    danhsachbinhluan = new MainModel();

    await danhsachbinhluan.dataModel(db,"mydb" , "danh_sach_binhluan");

    danhsachbinhluan.pushTypePara("_id", "ObjectID");
    danhsachbinhluan.pushTypePara("id_facebook", "string");
    danhsachbinhluan.pushTypePara("noi_dung", "String");
    danhsachbinhluan.pushTypePara("thoi_gian", "string");
    danhsachbinhluan.pushTypePara("ten_chat", "String");

    return danhsachbinhluan;
}