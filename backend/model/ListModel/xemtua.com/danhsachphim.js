const MainModel = require("../../MainModel.js");
module.exports = async (db) => {

    danhsachphim = new MainModel();

    await danhsachphim.dataModel(db,"aidb" , "danh_sach_phim");

    danhsachphim.pushTypePara("_id", "ObjectID");

    danhsachphim.pushTypePara("so_phim", "Number");
    danhsachphim.pushTypePara("ten_phim", "String");
    danhsachphim.pushTypePara("anh_bia", "String");
    danhsachphim.pushTypePara("luot_xem", "Number");
    danhsachphim.pushTypePara("gioi_thieu", "String");

    danhsachphim.pushTypePara("tu_khoa", "string");
    danhsachphim.pushTypePara("tap_moi", "Number");
    danhsachphim.pushTypePara("dem_so", "Number");
    
    return danhsachphim;
}