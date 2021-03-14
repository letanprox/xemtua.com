//FILE SYSTEM
const path = require("path");

//MY FILE
const getContentType = require("./ContentType");
const route = require("./Route");

//RETURN REQUEST BUNDLE
module.exports =  (req,returnRoute) => {

    console.log(req.headers.host)

    if(req.headers.host === "localhost") req.headers.host = "www.cuongonepiece.com";
    if(String(req.headers.host).includes("xemtua")){ 
        console.log("XXXXXX")
        req.headers.host = "www.xemtua.com";}

    let filePath = route(req.headers.host,req.method,req.url,returnRoute);
    let index;
    let contentType;
    let status = 0;

    if (path.extname(filePath) != "") {
        filePath = path.join("../", filePath);
        contentType = getContentType(path.extname(filePath));
        status = 1;
    }else{
        str = filePath.toString();
        filePath = str.substring(0, str.indexOf("@"));
        index = str.substring(str.indexOf("@") + 1, str.length);  
    }
    filePath = decodeURI(filePath);
    return {
        status,
        filePath,
        index,
        contentType
    }
}