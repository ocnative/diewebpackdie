// 'Strict' throws an error if we write any bad syntax
"use strict"
var express = require('express');
var app = express();
var path = require('path');

// Configure middleware to define a folder for our static files and images
app.use(express.static('public'))

app.get('*', function(req, res){
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})
// Configure listener on PORT 3000
app.listen(3000, function(){
  console.log('app is listening on port 3000');
})
