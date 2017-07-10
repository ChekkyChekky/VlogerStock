var express = require("express");
var search = require("./search");

var app = express(); 
app.use(express.static("../public"));

app.get("/search", function(request, response){
    search(request.query.query)
    .then(function(result) {
        response.send(result);
    });
});

app.listen(80);