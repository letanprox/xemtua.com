const MainModel = require("../../MainModel.js");
module.exports = async (db) => {

    danhsachlinkshortvideo = new MainModel();

    await danhsachlinkshortvideo.dataModel(db,"aidb" , "danh_sach_linkshortvideo");

    danhsachlinkshortvideo.pushTypePara("_id", "ObjectID");

    danhsachlinkshortvideo.pushTypePara("index", "Number");
    danhsachlinkshortvideo.pushTypePara("url_temp", "string");
    danhsachlinkshortvideo.pushTypePara("thoi_gian", "string");

    return danhsachlinkshortvideo;
}