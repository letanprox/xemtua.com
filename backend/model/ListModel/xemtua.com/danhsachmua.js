const MainModel = require("../../MainModel.js");
module.exports = async (db) => {

    danhsachmua = new MainModel();

    await danhsachmua.dataModel(db,"aidb" , "danh_sach_mua");

    danhsachmua.pushTypePara("_id", "ObjectID");

    danhsachmua.pushTypePara("so_mua", "Number");
    danhsachmua.pushTypePara("so_phim", "Number");
    danhsachmua.pushTypePara("ten_mua", "String");
    danhsachmua.pushTypePara("khoang_tap", "string");
    
    return danhsachmua;
}