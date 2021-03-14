const MainModel = require("../../MainModel.js");
module.exports = async (db) => {

    danhsachchap = new MainModel();

    await danhsachchap.dataModel(db,"aidb" , "danh_sach_chap");

    danhsachchap.pushTypePara("_id", "ObjectID");

    danhsachchap.pushTypePara("so_chap", "Number");
    danhsachchap.pushTypePara("so_truyen", "Number");

    danhsachchap.pushTypePara("so_anh", "Number");
    danhsachchap.pushTypePara("url_anh", "String");
    danhsachchap.pushTypePara("anh_ngang", "string");
    
    return danhsachchap;
}