var express = require("express");
var bodyParser = require("body-parser");
var httpRequest = require('request');
var search = require("./search");
var prognosis = require("./prognosis");

var app = express(); 
var urlencodedParser = bodyParser.urlencoded({extended: false});
app.use(express.static("../public"));

app.get("/search", function(request, response){
    search(request.query.query)
    .then(function(result) {
        response.send(result);
    });
});

app.get("/prognosis", function(request, response){
    prognosis(request.query.id)
    .then(function(result) {
        response.send({result});
    });
});

app.get("/last", function(request, response){
    getRandomChannelName()
    .then(function(result) {
        response.send(result);
    });
});

app.get("/random", function(request, response){
    getRandomChannelName()
    .then(function(result) {
        response.send(result);
    });
});

app.post("/feedback", urlencodedParser, function(request, response){
    if(!request.body) return response.sendStatus(400);
    feedbackPost(request.body.email, request.body.message, request.body.title);
});

app.post("/modal", urlencodedParser, function(request, response){
    if(!request.body) return response.sendStatus(400);
    modalPost(request.body.name, request.body.budget, request.body.niche,request.body.email);
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

function modalPost(name, budget, niche, email) {
    httpRequest({
        url: "https://vlogstock-a0fe.restdb.io/rest/advertizers",
        method: 'POST',
        headers: {
            "content-type": "application/json",	
            "x-apikey": "595cca7bafce09e87211ea27",		
            "cache-control": "no-cache"
        },
        body: JSON.stringify({advert: {name, budget, niche, email}})
    });
}

function getRandomChannelName() {
    return new Promise((resolve, reject) => {
        const channels= ["Getmovies", "EeOneGuy", "MashaMedvedTV", "AdamThomasMoran",
            "FROST", "SlivkiShow", "TheBrainDit", "This is Хорошо", "TheKateClapp",
            "TheBrianMaps", "Maryana Ro", "Sasha Spilberg", "DaiFiveTop", "Maria Way",
            "ДНЕВНИК ХАЧА", "Druzhko Show", "Склад Чайки", "Трансформатор", "SOBOLEV",
            "Wylsacom", "Kulibin TV", "Научпок", "Dmitry Puchkov", "Anastasiya Shpagina",
            "Алёна Венум", "Dennis Semenikhin", "Elli Di Pets", "proektKOZA", "Elena Sheidlin",
            "Ed Sheeran", "Clean Bandit", "T-Series", "LuisFonsiVEVO"];
        const index = Math.floor(Math.random() * channels.length);
        search(channels[index])
        .then(function(result) {
            resolve({title: result.title, img: result.img});
        });
    });
}