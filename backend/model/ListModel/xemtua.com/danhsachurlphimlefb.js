const MainModel = require("../../MainModel.js");
module.exports = async (db) => {

    danhsachurlphimlefb = new MainModel();

    await danhsachurlphimlefb.dataModel(db,"aidb" , "danh_sach_urlphimlefb");

    danhsachurlphimlefb.pushTypePara("_id", "ObjectID");
    danhsachurlphimlefb.pushTypePara("so_phimle", "Number");
    danhsachurlphimlefb.pushTypePara("so_phim", "Number");
    danhsachurlphimlefb.pushTypePara("url", "String");
    danhsachurlphimlefb.pushTypePara("thoi_gian", "string");

    return danhsachurlphimlefb;
}