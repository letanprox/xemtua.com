const MainModel = require("../../MainModel.js");
module.exports = async (db) => {

    danhsachtruyen = new MainModel();

    await danhsachtruyen.dataModel(db,"aidb" , "danh_sach_truyen");

    danhsachtruyen.pushTypePara("_id", "ObjectID");

    danhsachtruyen.pushTypePara("so_truyen", "Number");
    danhsachtruyen.pushTypePara("ten_truyen", "String");
    danhsachtruyen.pushTypePara("anh_bia", "String");
    danhsachtruyen.pushTypePara("luot_xem", "Number");
    

    danhsachtruyen.pushTypePara("tu_khoa", "string");
    danhsachtruyen.pushTypePara("chap_moi", "Number");
    danhsachtruyen.pushTypePara("dem_so", "Number");

    return danhsachtruyen;
}