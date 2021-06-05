const MainModel = require("../../MainModel.js");
module.exports = async (db) => {

    linhfb = new MainModel();

    await linhfb.dataModel(db,"aidb" , "linhfb");

    linhfb.pushTypePara("_id", "ObjectID");
    linhfb.pushTypePara("so_tap", "Number");
    linhfb.pushTypePara("so_phim", "Number");
    linhfb.pushTypePara("id_token", "Number");
    linhfb.pushTypePara("id_video", "string");
    linhfb.pushTypePara("url_video", "String");
    linhfb.pushTypePara("thoi_gian", "string");

    return linhfb;
}