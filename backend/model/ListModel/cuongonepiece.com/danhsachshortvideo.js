const MainModel = require("../../MainModel.js");
module.exports = async (db) => {

    danhsachshortvideo = new MainModel();

    await danhsachshortvideo.dataModel(db,"mydb" , "danh_sach_shortvideo");

    danhsachshortvideo.pushTypePara("_id", "ObjectID");

    danhsachshortvideo.pushTypePara("index", "Number");
    danhsachshortvideo.pushTypePara("url_thumbnail", "String");
    danhsachshortvideo.pushTypePara("views", "Number");

    danhsachshortvideo.pushTypePara("id_video", "string");
    danhsachshortvideo.pushTypePara("id_token", "Number");
    danhsachshortvideo.pushTypePara("url_drive", "String");
    
    return danhsachshortvideo;
}