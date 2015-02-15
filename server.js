var express = require('express');
var path = require('path');
var Bourne = require("bourne");

var app = express();
var posts = new Bourne("simpleBlogPosts.json");
var comments = new Bourne("simpleBlogComments.json");

//app.configure(function () {
        app.use(express.json());
        app.use(express.static(path.join(__dirname, 'public')));
//});

//gets the Posts when the URL is hit and returns the data in JSON
app.get("/posts", function (req, res) {
        posts.find(function(err, results) {
                res.json(results);
        });
});

//posts a post to the server
app.post("/posts", function (req, res) {
        posts.insert(req.body, function (err, result) {
                res.json(result);
        });
});

//gets the index page of the application, put last to default to this location if nothing elseis found
app.get('/*', function (req, res) {
        res.render("index.ejs");
});


app.listen(3000);
