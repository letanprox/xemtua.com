const MainModel = require("../../MainModel.js");
module.exports = async (db) => {

    danhsachvideodirect = new MainModel();

    await danhsachvideodirect.dataModel(db,"mydb" , "danh_sach_video_direct");

    danhsachvideodirect.pushTypePara("_id", "ObjectID");
    danhsachvideodirect.pushTypePara("so_tap", "Number");
    danhsachvideodirect.pushTypePara("url", "String");
    danhsachvideodirect.pushTypePara("thoi_gian", "string");

    return danhsachvideodirect;
}