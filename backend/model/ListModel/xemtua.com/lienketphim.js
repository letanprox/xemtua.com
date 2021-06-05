const MainModel = require("../../MainModel.js");
module.exports = async (db) => {

    lienketphim = new MainModel();

    await lienketphim.dataModel(db,"aidb" , "lienketphim");

    lienketphim.pushTypePara("_id", "ObjectID");
    lienketphim.pushTypePara("so_phim", "Number");
    lienketphim.pushTypePara("name_phim", "string");

    return lienketphim;
}