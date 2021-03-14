class SetRoute{
    constructor() {
        this.listFile = {"state":[]};
        this.listFile.state["xemtua.com"] = [];
        this.listFile.state["cuongonepiece.com"] = [];
    }
    pushRoute(root,method,name,file){
        if(!file.includes("Panel")) file = root+"/"+file;
        this.data = { 
            "method":method,
            "name":name, 
            "file":file, 
        };
        this.listFile.state[root].push(this.data);
    }
    getRoute(){
        return this.listFile;
    }
}

module.exports = new SetRoute();