const MainModel = require("../../MainModel.js");
module.exports = async (db) => {

    danhsachrelate = new MainModel();

    await danhsachrelate.dataModel(db,"mydb" , "danh_sach_relate");

    danhsachrelate.pushTypePara("_id", "ObjectID");
    danhsachrelate.pushTypePara("index", "Number");
    danhsachrelate.pushTypePara("dex", "Number");
    danhsachrelate.pushTypePara("va", "Number");

    return danhsachrelate;
}