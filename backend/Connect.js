module.exports = class Connect{
    constructor(){
        // HOST DOMAIN
        this.host = 'localhost';
        this.portSERVER = 80;

        // MONGO DB
        this.port = '27017';
        this.user = 'tan';
        this.password = '12345';
        this.MongoClient = require('mongodb').MongoClient;
        this.mongoOptions = {
            useUnifiedTopology: true , 
            poolSize: 10000,
        }
    }
    //MONGO CONNECT
    async connectMongoDB (callback){
        let url = "mongodb://"+this.user+":"+this.password+"@"+this.host+":"+this.port+"/";
        this.MongoClient.connect(url,this.mongoOptions, function(err, db) {
            if (err) throw err;
            else callback(db);
        });
    }

}
