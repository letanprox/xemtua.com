const MainModel = require("../../MainModel.js");
module.exports = async (db) => {

    danhsachphimembed = new MainModel();

    await danhsachphimembed.dataModel(db,"mydb" , "danh_sach_phim_embed");

    danhsachphimembed.pushTypePara("_id", "ObjectID");
    danhsachphimembed.pushTypePara("so_phim", "Number");
    danhsachphimembed.pushTypePara("url", "String");
    danhsachphimembed.pushTypePara("thoi_gian", "string");

    return danhsachphimembed;
}