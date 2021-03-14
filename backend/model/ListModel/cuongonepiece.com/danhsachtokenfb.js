const MainModel = require("../../MainModel.js");
module.exports = async (db) => {

    danhsachtokenfb = new MainModel();

    await danhsachtokenfb.dataModel(db,"mydb" , "danh_sach_tokenfb");

    danhsachtokenfb.pushTypePara("_id", "ObjectID");
    danhsachtokenfb.pushTypePara("id_token", "Number");
    danhsachtokenfb.pushTypePara("token", "string");


    danhsachtokenfb.pushTypePara("so_tap", "Number");

    danhsachtokenfb.pushTypePara("so_phim", "Number");

    danhsachtokenfb.pushTypePara("id_video_fb", "string");

    return danhsachtokenfb;
}