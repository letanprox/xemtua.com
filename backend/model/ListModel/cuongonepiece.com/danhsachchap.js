const MainModel = require("../../MainModel.js");
module.exports = async (db) => {

    danhsachchap = new MainModel();

    await danhsachchap.dataModel(db,"mydb" , "danh_sach_chap");

    danhsachchap.pushTypePara("_id", "ObjectID");
    danhsachchap.pushTypePara("so_chap", "Number");
    danhsachchap.pushTypePara("anh_bia", "String");

    danhsachchap.pushTypePara("stt", "Number");
    danhsachchap.pushTypePara("anh", "String");
    danhsachchap.pushTypePara("anh_ngang", "string");

    return danhsachchap;
}