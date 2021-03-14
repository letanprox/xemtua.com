const MainModel = require("../../MainModel.js");
module.exports = async (db) => {

    danhsachphimdirect = new MainModel();

    await danhsachphimdirect.dataModel(db,"mydb" , "danh_sach_phim_direct");

    danhsachphimdirect.pushTypePara("_id", "ObjectID");
    danhsachphimdirect.pushTypePara("so_phim", "Number");
    danhsachphimdirect.pushTypePara("url", "String");
    danhsachphimdirect.pushTypePara("thoi_gian", "string");

    return danhsachphimdirect;
}