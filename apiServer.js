"use strict"
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const nodeMailer = require('nodemailer');
const path = require('path');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname + '/public/')))

// APIs
var mongoose = require('mongoose');
mongoose.connect('mongodb://bubbavader:DarthVader@ds135797.mlab.com:35797/bookshop');

var db = mongoose.connection;
db.on('error', console.error.bind(console, '# MongoDB - connection error: '));

// --->>> SET UP SESSIONS <<<----
app.use(session({
  secret: 'mySecretString',
  saveUninitialized: false,
  resave:false,
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 2}, // 2 days in milliseconds
  store: new MongoStore({mongooseConnection: db, ttl: 2 * 24 * 60 * 60})
  //ttl: 2 days * 24 hours * 60 minutes * 60 seconds
}))
  // SAVE SESSION CART API
  app.post('/api/cart', function(req, res){
    var cart = req.body;
    req.session.cart = cart;
    req.session.save(function(err){
      if(err){
        throw err;
      }
      res.json(req.session.cart);
    })
  });
  // GET SESSION CART API
  app.get('/api/cart', function(req, res){
    if(typeof req.session.cart !== 'undefined'){
      res.json(req.session.cart);
    }
  });
//--->>> END SESSION SET UP <<<----


var Books = require('./models/books.js');

//---->>> POST BOOKS <<<-----
app.post('/api/books', function(req, res){
  var book = req.body;

  Books.create(book, function(err, books){
    if(err){
      throw err;
    }
    res.json(books);
  })
});

//----->>>> GET BOOKS <<<---------
app.get('/api/books', function(req, res){
  Books.find(function(err, books){
    if(err){
      throw err;
    }
    res.json(books)
  })
});

//---->>> DELETE BOOKS <<<------
app.delete('/api/books/:_id', function(req, res){
  var query = {_id: req.params._id};

  Books.remove(query, function(err, books){
    if(err){
      console.log("# API DELETE BOOKS: ", err);
    }
    res.json(books);
  })
});

//---->>> UPDATE BOOKS <<<------
app.put('/api/books/:_id', function(req, res){
  var book = req.body;
  var query = {_id : req.params._id};
  // if the field doesn't exist $set will set a new field
  var update = {
    '$set':{
      title:book.title,
      description:book.description,
      image:book.image,
      price:book.price
    }
  };
    // When true returns the updated document
    var options = {new: true};

    Books.findOneAndUpdate(query, update, options, function(err, books){
      if(err){
        throw err;
      }
      res.json(books);
    })

})

  // --->>> POST SEND INQUIRY MAIL API <<<------
  app.post('/api/contact', (req, res) => {
    const SMTPClient = nodeMailer.createTransport({
      host: 'smtp.gmail.com',
      auth: {
        user: 'ocnative007@gmail.com',
        pass: '007Phrog!'
      }
    });

    const mailOptions = {
      from: 'ocnative007@gmail.com',
      to: 'abdulmujeebj@gmail.com, lrpc949@gmail.com',
      subject: 'New Inquiry mail from website.com',
      html: `<h3>Name:</h3> ${req.body.name}` +
            `<h3>Email:</h3> ${req.body.email}` +
            `<h3>Message:</h3> ${req.body.message}`
    }

    SMTPClient.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log('err sending mail', err)
        return res.send({err});
      }

      res.send({success: info.messageId})
    })
  });

  // --->>> GET BOOKS IMAGES API <<<------
  app.get('/api/images', function(req, res){

    const imgFolder = __dirname + '/public/images/';
    // REQUIRE FILE SYSTEM
    const fs = require('fs');
    //READ ALL FILES IN THE DIRECTORY
    fs.readdir(imgFolder, function(err, files){
      if(err){
        return console.error(err);
      }
      //CREATE AN EMPTY ARRAY
      const filesArr = [];
      //var i = 1;
      // ITERATE ALL IMAGES IN THE DIRECTORY AND ADD TO THE ARRAY
      files.forEach(function(file){
        filesArr.push({name: file});
        //i++
      });
      // SEND THE JSON RESPONSE WITH THE ARARY
      res.json(filesArr);
    })
  })


// END APIs

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/public/index.html'))
})

app.listen(process.env.PORT || 3000, function(err){
  if(err){
    return console.log(err);
  }
  console.log('API Server is listening on http://localhost:3000');
});
