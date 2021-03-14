module.exports = class Model {
    constructor() {
        this.dbo = null;
    }
    //MAIN QUERY
    async setModel(db, nameDb, nameCollection) {
        this.dbo = await db.db(nameDb);
        this.dbo = this.dbo.collection(nameCollection);
    }
    async select(query, projection, sort, skip, limit) {
        return await this.dbo.find(query).project(projection).sort(sort).skip(skip).limit(limit).toArray();
    }
    async insert(query) {
        await this.dbo.insertMany(query, (err, res) => {
            if (err) throw err;
        });
    }
    async update(myquery,newvalues) {
        await this.dbo.updateMany(myquery, newvalues, (err, res) => {
            if (err) throw err;
        });
    }
    async delete(query) {
        await this.dbo.deleteMany(query, (err, res) => {
            if (err) throw err;
        });
    }
    async count(query) {
        return await this.dbo.find(query).count();
    }


    //EX QUERY
    async select_(query, projection, sort, skip, limit, namequery){
        let array = [];
        if(Object.keys(query).length > 0){
            let match_ = {$match: query}
            array.push(match_);
        }
        if(limit != 0){
            let project_ = {$project: {'element': { $slice: [ "$"+namequery ,skip, limit] }}}
            array.push(project_);
        }
        if(Object.keys(projection).length > 0){
            let project__ = {$project: {'element': projection} }
            array.push(project__);
        }
        if(Object.keys(sort).length > 0){
            let unwind_ = {$unwind: '$element'}
            let getsort = {}
            if(sort.order != 0) getsort['element.'+ sort.element] = sort.order;
            let sort_ = {$sort:getsort}

            array.push(unwind_);
            array.push(sort_);
        }
        return await this.dbo.aggregate(array);
    }

    async search_(query, projection){
        return await this.dbo.find(query).project(projection).toArray();
    }

    async count_(query,namequery) {
        return await this.dbo.aggregate([
            {$match: query},
            {$project: { _id:0, "count":{$size:"$"+namequery} }},
        ]);
    }

    async insert_(query,myinsert) {
        await this.dbo.updateMany(
            query,
            {$push: myinsert},
        );
    }

    async delete_(query,deletequery){
        await this.dbo.updateMany(
            query,
            { $pull: deletequery }
        );
    }

    async update_(query,myupdate) {
        await this.dbo.updateMany(
            query,
            { $set: myupdate }
        );
    }

}