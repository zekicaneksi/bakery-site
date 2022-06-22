var express = require('express');
const path = require('path');
const fs = require('fs');
var app = express();

app.use(express.static('public'));

app.get('/', function(req, res){
   res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/categoryList', function (req, res) {

   var categoryList = [];
   
   fs.readdir(path.join(__dirname, 'public/assets/products'), (err, files) => {
     files.forEach(file => {
      categoryList.push(file);
     });
     res.json(categoryList);
   });
 
});

app.get('/productList', function(req, res){

   var productList = [];

   fs.readdir(path.join(__dirname, 'public/assets/products/' + req.query.category), (err, files) => {
      files.forEach(file => {
         productList.push(file.substring(0,file.indexOf('.')));
      });
      console.log(productList);
      res.json(productList);
    });

});

app.listen(8080);