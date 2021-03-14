const MainModel = require("../../MainModel.js");
module.exports = async (db) => {

    danhsachdrivelist = new MainModel();

    await danhsachdrivelist.dataModel(db,"aidb" , "danh_sach_drivelist");

    danhsachdrivelist.pushTypePara("_id", "ObjectID");

    danhsachdrivelist.pushTypePara("name", "string");
    danhsachdrivelist.pushTypePara("id", "string");
    danhsachdrivelist.pushTypePara("index", "Number");

    return danhsachdrivelist;
}