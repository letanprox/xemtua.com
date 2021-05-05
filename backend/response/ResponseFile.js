//FILE SYSTEM
const fs = require("fs");
const path = require("path");

var listCheckJoinHTML = [
  ["addheadXemtua", "xemtua.com/HomePage.html" , "xemtua.com/AllShortVideoPage.html" , "xemtua.com/PlayerPage.html" , "xemtua.com/AllMangaPage.html"  , "xemtua.com/AllMoviePage.html" , "xemtua.com/AllAnimePage.html"],
  ["addheadCuongOnePice", "cuongonepiece.com/EpPage.html", "cuongonepiece.com/HomePage.html", "cuongonepiece.com/SearchPage.html", "cuongonepiece.com/AllEpPage.html" , "cuongonepiece.com/AllMoviePage.html" , "cuongonepiece.com/AllShortVideoPage.html"],
];

var preventFolder = [
  "backend","controller", "model" , "node_modules" , "request" , "response" , "route"
];

//READ AND RETURN CLIENT
module.exports = (res,req_bundle) => {
        req_bundle.filePath = String(req_bundle.filePath).replace(/\\/g,"/");
        // Read File
        fs.readFile(req_bundle.filePath, (err, content) => {
            if (err) {
              if (err.code == "ENOENT") {
                // Page Not Found
                fs.readFile(path.join(__dirname, "404.html"),(err, content) => {
                    res.writeHead(404, { "Content-Type": "text/html" });
                    res.end(content, "utf8");
                  }
                );
              }else{
                // Server Error
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
              }
            }else {

              let endResponsive = (content) => {
                if (!res.finished) {
                  try {
                    res.writeHead(200, { "Content-Type": req_bundle.contentType });
                    res.end(content, "utf8");
                  } catch (error) {
                      res.writeHead(500);
                      res.end("error", "utf8");
                  }
                } 
              }
              //File join HTML
              if(req_bundle.contentType === "text/html"){
                //check 
                let checkfor = false;
                let nameImplementFile;
                for(let i = 0; i < listCheckJoinHTML.length ; i++){
                  let check = false;
                  for(let j = 1 ; j < listCheckJoinHTML[i].length ; j++){
                    if((String(req_bundle.filePath)).includes(String(listCheckJoinHTML[i][j]))){
                      check = true;
                    } 
                  }
                  if(check === true){
                    checkfor = true;
                    nameImplementFile = listCheckJoinHTML[i][0];
                  }
                }
                //respon
                if(checkfor === true){
                  const InResponseFile = require("./InResponseFile/"+nameImplementFile+".js");
                  InResponseFile(content,endResponsive);
                }else{
                  endResponsive(content);
                }
              
              //FIle Only
              }else{
                let check = false;
                req_bundle.filePath.split('/').forEach(function(segpath){
                  for(let i = 0; i < preventFolder.length ; i++){
                    if(String(segpath) === String(preventFolder[i])) check = true; 
                  }
                });
                if(check === true)
                  endResponsive("FAil To LOad FIle System");
                else
                  endResponsive(content);
              }
            }
        });
}