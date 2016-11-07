var mongodb = require('mongodb').MongoClient;

mongodb.connect('mongodb://localhost:27017/crunch',function (err, db) {

    console.log('Connected to Crunch DB!');
    var query = {"category_code" : "social"};
    var projection = {"name":1, "founded_year":1 , "_id": 0};

    var cursor = db.collection('companies').find(query);
    cursor.project(projection);

    cursor.forEach(
        function (doc) {
            console.log(doc);
    }),
        function (err) {
            return db.close();
    }

});