const MainModel = require("../../MainModel.js");
module.exports = async (db) => {

    danh_sach_idtokenfb = new MainModel();

    await danh_sach_idtokenfb.dataModel(db,"aidb" , "danh_sach_idtokenfb");

    danh_sach_idtokenfb.pushTypePara("_id", "ObjectID");
    danh_sach_idtokenfb.pushTypePara("id_token", "Number");
    danh_sach_idtokenfb.pushTypePara("token", "string");


    danh_sach_idtokenfb.pushTypePara("so_phim", "Number");
    
    danh_sach_idtokenfb.pushTypePara("so_tap", "Number");

    danh_sach_idtokenfb.pushTypePara("so_phimle", "Number");

    danh_sach_idtokenfb.pushTypePara("so_ova", "Number");

    danh_sach_idtokenfb.pushTypePara("id_video_fb", "string");

    return danh_sach_idtokenfb;
}