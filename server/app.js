var express = require("express");
var bodyParser = require("body-parser");
var httpRequest = require('request');
var search = require("./search");

var app = express(); 
var urlencodedParser = bodyParser.urlencoded({extended: false});
app.use(express.static("../public"));

app.get("/search", function(request, response){
    search(request.query.query)
    .then(function(result) {
        response.send(result);
    });
});

app.post("/feedback", urlencodedParser, function(request, response){
    if(!request.body) return response.sendStatus(400);
    feedbackPost(request.body.email, request.body.message, request.body.title);
});

app.listen(80);

function feedbackPost(email, message, title) {
    httpRequest({
        url: "https://vlogstock-a0fe.restdb.io/rest/feedbacktable",
        method: 'POST',
        headers: {
            "content-type": "application/json",	
            "x-apikey": "595cca7bafce09e87211ea27",		
            "cache-control": "no-cache"
        },
        body: JSON.stringify({feedback: {email, message, title}})
    });
}