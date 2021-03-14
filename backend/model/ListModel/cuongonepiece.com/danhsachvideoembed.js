const MainModel = require("../../MainModel.js");
module.exports = async (db) => {

    danhsachvideoembed = new MainModel();

    await danhsachvideoembed.dataModel(db,"mydb" , "danh_sach_video_embed");

    danhsachvideoembed.pushTypePara("_id", "ObjectID");
    danhsachvideoembed.pushTypePara("so_tap", "Number");
    danhsachvideoembed.pushTypePara("url", "String");
    danhsachvideoembed.pushTypePara("thoi_gian", "string");

    return danhsachvideoembed;
}