var MongoClient = require('mongodb').MongoClient;
var urli = "mongodb://localhost:27017/";

var count = 1;

console.log("run time " + count);

MongoClient.connect(urli , { useUnifiedTopology: true } ,async function(err, db) {

    let listAllDEx = [];

    if (err) throw err;
    var dbo = await db.db("mydb");
    var dbo = await dbo.collection("danh_sach_relate");

    let index = 1;
    let check = true;
    while(check==true){

        select = await dbo.find({index:Number(index)}).count();
        if(select >= 1){
            let arrayIndex = []; arrayIndex.push(index);
            let condray = []; condray.push({$ne: ['$$relate.dex',Number(index)]});
            select = await dbo.aggregate([
                {$match:{index:Number(index)}},
                {$project:{ _id:0, relate: {$filter: {
                        input: '$relate',
                        as: 'relate',
                        cond: { $and: condray }
                }}}},
                {$unwind:"$relate"},
                {$sort:{"relate.va":-1}},
                {$limit:2}
            ]);
            await select.forEach(element => {
                    InCreDEX(arrayIndex,Number(element.relate.va),Number(element.relate.dex));
            });

        } else check = false;
        index = index+1;
        
    }

    async function InCreDEX(arrayIndexx,va,index){

        let arrayIndex = [];
        arrayIndex = arrayIndex.concat(arrayIndexx);
        arrayIndex.push(va);
        arrayIndex.push(index);

        listAllDEx.push(arrayIndex);

        let condray = [];
        for(let k = 0; k <= arrayIndex.length ; k++){
            condray.push({$ne: ['$$relate.dex',Number(arrayIndex[k])]});
            k = k + 1;
        }
        select = await dbo.aggregate([
            {$match:{index:Number(index)}},
            {$project:{ _id:0, relate: {$filter: {
                    input: '$relate',
                    as: 'relate',
                    cond: { $and: condray }

            }}}},
            {$unwind:"$relate"},
            {$sort:{"relate.va":-1}},
            {$limit:2},
        ]);

            await select.forEach(element => {
                if(arrayIndex.length <= 7){
                    InCreDEX(arrayIndex,Number(element.relate.va),Number(element.relate.dex));
                }
            });   
    }

    setTimeout(async function(){
        

        for(let i = 0; i < listAllDEx.length ; i++){
            let arrayIndex = [];
            arrayIndex = arrayIndex.concat(listAllDEx[i]);

            if(arrayIndex.length > 4){

                let tova = 0;
                for(let i = 1; i < arrayIndex.length ; i+=2){
                    tova = tova + arrayIndex[i];
                }
                tova = Math.floor(tova/((arrayIndex.length+1)/2-1));
                console.log(arrayIndex);
                console.log(tova);
        
                let select = await dbo.find({index:Number(arrayIndex[0])}).project({_id:0,relate: {$elemMatch: {dex:Number(arrayIndex[arrayIndex.length-1])}}}).toArray();
                select = await JSON.parse(JSON.stringify(select));

                if(select[0].hasOwnProperty('relate')){
                    console.log({index: Number(arrayIndex[0]) , "relate.dex":Number(arrayIndex[arrayIndex.length-1]) }, {$inc: {"relate.$.va": Number(tova-Number(select[0].relate[0].va))}});
                    if(Number(select[0].relate[0].va) < tova) await dbo.update({index: Number(arrayIndex[0]) , "relate.dex":Number(arrayIndex[arrayIndex.length-1]) }, {$set: {"relate.$.va": 1 }});
                }else{
                    await dbo.update({ index: Number(arrayIndex[0]) },{ $push: { relate:{dex : Number(arrayIndex[arrayIndex.length-1]), va:1}}});
                }

            }
        }

     }, 3000);

});


