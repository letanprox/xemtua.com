const MainModel = require("../../MainModel.js");
module.exports = async (db) => {
    
    danhsachphim = new MainModel();

    await danhsachphim.dataModel(db,"mydb" , "danh_sach_phim");

    danhsachphim.pushTypePara("_id", "ObjectID");
    danhsachphim.pushTypePara("so_phim", "Number");
    danhsachphim.pushTypePara("ten_phim", "string");
    danhsachphim.pushTypePara("thoi_luong", "Number");
    danhsachphim.pushTypePara("luot_xem", "Number");
    danhsachphim.pushTypePara("anh_bia", "String");
    danhsachphim.pushTypePara("id_token_fb", "Number");

    return danhsachphim;
}