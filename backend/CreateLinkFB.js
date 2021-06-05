const http      = require('http'),
      https     = require('https');
const path = require("path");
const readline = require('readline');
const fs = require("fs");
let fetch = require("node-fetch");
const { exec } = require("child_process");
var MongoClient = require('mongodb').MongoClient;
var urli = "mongodb://localhost:27017/";


MongoClient.connect(urli , { useUnifiedTopology: true } ,async function(err, db) {
    if (err) throw err;


let loadLinkVideoFB = async (so_tap,so_phim,token ,id_video) => {
    var data_array;
    var url = 'https://graph.facebook.com/'+ id_video + '?access_token=' + token + '&fields=source';
    const http      = require('http'),
          https     = require('https');
    let client = http;
    if (url.toString().indexOf("https") === 0) {
        client = https;
    }
    let fetchs = await fetch(url, {"method": "GET",});
    fetchs = await fetchs.json();
    data_array = JSON.parse(JSON.stringify(fetchs,null,2));

     dbo = await db.db("aidb");
     dbo = await dbo.collection("linhfb");

    await dbo.updateOne(
        {so_phim: Number(so_phim) , so_tap: Number(so_tap)},
        {$set: {url_video: String(data_array.source)}},
        { upsert: true }
    )
}

    var dbo = await db.db("aidb");
    var dbo = await dbo.collection("linhtokenfb");

    let select = await dbo.find({}).toArray();


    for(let i = 0; i < select.length; i++){
        let id_token = select[i].id_token;
        let token = select[i].token;
        let id_page = select[i].id_page;
        
        dbo = await db.db("aidb");
        dbo = await dbo.collection("linhfb");
        select_ = await dbo.find({id_token:Number(id_token)}).toArray();
        
        for(let k = 0; k < select_.length; k++){
            loadLinkVideoFB(select_[k].so_tap, select_[k].so_phim, token , select_[k].id_video)
        }

    }



    // let select = await dbo.find({}).toArray();
    //     select = JSON.parse(JSON.stringify(select[0]));

});