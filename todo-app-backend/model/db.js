const mongoose = require("mongoose");

mongoose.connect("mongodb://sanket*********:***********@chatappdb-shard-00-00-qxx9t.gcp.mongodb.net:27017,chatappdb-shard-00-01-qxx9t.gcp.mongodb.net:27017,chatappdb-shard-00-02-qxx9t.gcp.mongodb.net:27017/ChatAppDB?ssl=true&replicaSet=ChatAppDB-shard-0&authSource=admin&retryWrites=true&w=majority", { useNewUrlParser: true }, (err) => {
    if (!err) {
        console.log("DB connection successful");
    } else {
        console.log("DB connection error " + err);
    }
});