//FILE SYSTEM
const http = require("http");
let url = require('url');

//CONNECT MONGO
let Connect = require("./Connect");
const connect = new Connect();

//RES REQ
const reqUest = require("./request/Request");
const resPonse = require("./response/Response");
const responseFile = require("./response/ResponseFile.js");

//LIST ROUTE
let routeother_ = require("./route/RouteOther");
const routeother = routeother_();
let routepanel_ = require("./route/RoutePanel");
const routepanel = routepanel_();
let routeapi_ = require("./route/RouteApi");
const routeapi = routeapi_();

//LIST MODEL
const listModel = [
'xemtua.com/danhsachshortvideo',
'xemtua.com/danhsachurlshortvideo',
'xemtua.com/danhsachtokenshortvideo',
'xemtua.com/danhsachrelate',
'xemtua.com/danhsachlinkshortvideo',

'xemtua.com/danhsachphim',
'xemtua.com/danhsachmua',
'xemtua.com/danhsachtap',
'xemtua.com/danhsachphimle',
'xemtua.com/danhsachova',

'xemtua.com/danhsachidtokenfb',
'xemtua.com/danhsachurltapfb',
'xemtua.com/danhsachurlphimlefb',
'xemtua.com/danhsachurlovafb',

'xemtua.com/danhsachlinktap',
'xemtua.com/danhsachlinkphimle',
'xemtua.com/danhsachlinkova',

'xemtua.com/danhsachtruyen',
'xemtua.com/danhsachchap',

'xemtua.com/danhsachbinhluan',
'xemtua.com/danhsachdriveapi',
'xemtua.com/danhsachdrivelist',



'cuongonepiece.com/danhsachtap',
'cuongonepiece.com/danhsachphim',
'cuongonepiece.com/danhsachchap',
'cuongonepiece.com/danhsachmua',
'cuongonepiece.com/danhsachbinhluan',
'cuongonepiece.com/danhsachtokenfb',
'cuongonepiece.com/danhsachurltapfb',
'cuongonepiece.com/danhsachurlphimfb',
'cuongonepiece.com/danhsachshortvideo',
'cuongonepiece.com/danhsachurlshortvideo',
'cuongonepiece.com/danhsachlinkshortvideo',
'cuongonepiece.com/danhsachtokenshortvideo',
'cuongonepiece.com/danhsachrelate',
'cuongonepiece.com/danhsachlinktap',
'cuongonepiece.com/danhsachlinkphim',

]

//SCANNER
const scanner = {};

//IP
const parseIp = (req) =>
    (typeof req.headers['x-forwarded-for'] === 'string'
        && req.headers['x-forwarded-for'].split(',').shift())
    || req.connection?.remoteAddress
    || req.socket?.remoteAddress
    || req.connection?.socket?.remoteAddress

//CREATE SERVER
let SERVER = async (db) => {
    for(let i = 0; i < listModel.length; i++){
        let fx = require("./model/ListModel/"+listModel[i]);
        scanner['modelx'+listModel[i]] = await fx(db);
    }
    http.createServer((req, res) => {
        
            scanner.req = req;
            scanner.res = res;

            if((req.url).includes("api")) scanner.req_bundle = reqUest(req,routeapi);
            else if((req.url).includes("panel")) scanner.req_bundle = reqUest(req,routepanel);
            else scanner.req_bundle = reqUest(req,routeother);
        
            if(scanner.req_bundle.contentType === "text/html") console.log(parseIp(req))

            if (scanner.req_bundle.status == 1) responseFile(scanner.res, scanner.req_bundle);
            else resPonse(scanner);
            
    }).listen(connect.portSERVER, () => console.log("server run on PORT:" + connect.portSERVER));;
}
//RUN SERVER
connect.connectMongoDB(SERVER);