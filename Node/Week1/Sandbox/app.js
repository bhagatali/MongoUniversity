var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

MongoClient.connect('mongodb://localhost:27017/crunch',function (err,db) {

    assert.equal(null,err);
    console.log("Connection to Crunch DB, successful!");

    db.collection('companies').find({}).toArray(function (error,documents) {

        assert.equal(null,error);
        console.log('Read data from companies collections.');

        documents.forEach(function (doc) {
            console.log(doc.name);
        });

        db.close();
    });

    console.log("Aysnc call to find() in progress....")
});