const schemaEx = require("./SchemaEx");
const Model = require("./Model");
const { types } = require("util");

module.exports = class MainModel{

    constructor(){
        this.listElement = [];
    }

    getPara(head_params , body_params){
        return schemaEx(this.listElement,head_params,body_params);
    }

    pushTypePara(para, type_){
        this.listElement.push({id:para , type:type_});
    }

    async dataModel(db , namedb , namecollect){
        let dataModel = new Model();
        await dataModel.setModel(db, namedb, namecollect);
        this.dataModel = dataModel;
    }

}