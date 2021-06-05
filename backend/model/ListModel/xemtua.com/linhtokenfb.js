const MainModel = require("../../MainModel.js");
module.exports = async (db) => {

    linhtokenfb = new MainModel();

    await linhtokenfb.dataModel(db,"aidb" , "linhtokenfb");

    linhtokenfb.pushTypePara("_id", "ObjectID");
    linhtokenfb.pushTypePara("id_token", "Number");
    linhtokenfb.pushTypePara("id_page", "string");
    linhtokenfb.pushTypePara("token", "string");
    linhtokenfb.pushTypePara("name", "string");
    linhtokenfb.pushTypePara("thoi_gian", "string");

    return linhtokenfb;
}