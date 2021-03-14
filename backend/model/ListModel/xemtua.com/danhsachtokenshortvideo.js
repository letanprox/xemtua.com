const MainModel = require("../../MainModel.js");
module.exports = async (db) => {

    danhsachtokenshortvideo = new MainModel();

    await danhsachtokenshortvideo.dataModel(db,"aidb" , "danh_sach_tokenshortvideo");

    danhsachtokenshortvideo.pushTypePara("_id", "ObjectID");

    danhsachtokenshortvideo.pushTypePara("id_token", "Number");
    danhsachtokenshortvideo.pushTypePara("token", "string");

    return danhsachtokenshortvideo;
}