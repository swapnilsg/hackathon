var express = require('express');
var app = express();
var fs = require('fs'),
    xml2js = require('xml2js');
var parser = new xml2js.Parser();

app.set('view engine', 'ejs');

app.get('/ejs', function(req, res) {
    fs.readFile(__dirname+'/dumplist_1.xml', function(err, data) {
        parser.parseString(data, function (err, result) {
            var parseData = result.comments.row;
            //console.log(parseData);
            res.render('pages/index',{parseData:parseData});
        });
    });
});

app.get('/',function (req,res) {

    fs.readFile(__dirname+'/dumplist_4.xml', function(err, data) {
        parser.parseString(data, function (err, result) {
            //console.dir(JSON.stringify(result));

            var parseData = result.posts.row;
            res.set({'content-type':'text/html'});
            res.render('pages/post',{parseData:parseData});
        });
    });

});

app.get('/cat',function (req,res) {

    fs.readFile(__dirname+'/dumplist_5.xml', function(err, data) {
        parser.parseString(data, function (err, result) {
            var parseData = result;
            res.set({'content-type':'text/html'});
            res.send(parseData);
        });
    });

});


app.listen(3000,function () {
    console.log("server is listening on port 3000");
});