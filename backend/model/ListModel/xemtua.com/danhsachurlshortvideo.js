const MainModel = require("../../MainModel.js");
module.exports = async (db) => {

    danhsachurlshortvideo = new MainModel();

    await danhsachurlshortvideo.dataModel(db,"aidb" , "danh_sach_urlshortvideo");

    danhsachurlshortvideo.pushTypePara("_id", "ObjectID");

    danhsachurlshortvideo.pushTypePara("index", "Number");
    danhsachurlshortvideo.pushTypePara("url_temp", "string");
    danhsachurlshortvideo.pushTypePara("thoi_gian", "string");

    return danhsachurlshortvideo;
}