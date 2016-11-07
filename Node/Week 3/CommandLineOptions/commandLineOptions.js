var MongoClient = require('mongodb').MongoClient,
    commandLineArgs = require('command-line-args');

var options = commandLineOptions();

MongoClient.connect('mongodb://localhost:27017/crunch',function (err,db) {
    console.log("Connected!");

    var query = queryOptions(options);
    var projections =  {"name":1, "founded_year":1 , "number_of_employees" : 1, "category_code": 1, "_id": 0};

    var cursor = db.collection("companies").find(query,projections);
    // cursor.project(projections);

    var numMatches = 0;

    cursor.forEach(
        function (docs) {
            numMatches++;
            console.log(docs);
        },
        function (error) {
            console.log("Our query was:" + JSON.stringify(query));
            console.log("Matching documents: " + numMatches);
            return db.close();
        });

});

function queryOptions(options){

    console.log("Options are ...");
    console.log(options);

    var query = {
        "founded_year": {
            "$gte" : options.firstYear,
            "$lte" : options.lastYear
        }
    };

    if ("category" in options){
        query.category_code = options.category;
    };

    if ("employees" in options){
      query.number_of_employees = {"$gte": options.employees };
    };

    return query;
};

function commandLineOptions() {

    var cli = commandLineArgs([
        {name: "category", alias: "c", type: String},
        {name: "firstYear", alias: "f", type: Number},
        {name: "lastYear", alias: "l", type: Number},
        {name: "employees", alias: "e", type: Number}
    ]);

    var options = cli.parse();

    if ( !(("firstYear" in options) && ("lastYear" in options))) {
        console.log(cli.getUsage({
            title: "Usage",
            description: "The first two options below are required. The rest are optional."
        }));
        process.exit();
    }

    return options;
};