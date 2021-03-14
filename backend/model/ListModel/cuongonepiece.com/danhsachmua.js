const MainModel = require("../../MainModel.js");
module.exports = async (db) => {

    danhsachmua = new MainModel();

    await danhsachmua.dataModel(db,"mydb" , "danh_sach_mua");

    danhsachmua.pushTypePara("_id", "ObjectID");
    danhsachmua.pushTypePara("so_mua", "Number");
    danhsachmua.pushTypePara("ten_mua", "string");
    danhsachmua.pushTypePara("khoang_tap", "string");

    return danhsachmua;
}