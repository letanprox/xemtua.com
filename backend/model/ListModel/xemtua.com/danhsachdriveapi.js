const MainModel = require("../../MainModel.js");
module.exports = async (db) => {

    danhsachdriveapi = new MainModel();

    await danhsachdriveapi.dataModel(db,"aidb" , "danh_sach_driveapi");

    danhsachdriveapi.pushTypePara("_id", "ObjectID");

    danhsachdriveapi.pushTypePara("index", "Number");
    danhsachdriveapi.pushTypePara("client_id", "string");
    danhsachdriveapi.pushTypePara("client_secret", "string");
    danhsachdriveapi.pushTypePara("refresh_token", "string");
    danhsachdriveapi.pushTypePara("access_token", "string");
    danhsachdriveapi.pushTypePara("key_api", "string");
    danhsachdriveapi.pushTypePara("name_acc", "string");

    return danhsachdriveapi;
}