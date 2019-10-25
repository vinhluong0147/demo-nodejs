var express = require('express');
var router = express.Router();
var Mongo = require('mongodb').MongoClient;
var passport = require('passport')
require('../config/passport')
var csrf = require('csurf')
const url = "mongodb://localhost:27017/"
var csrfProtection = csrf()
router.use(csrfProtection)


router.get('/', function (req, res, next) {
  Mongo.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("shopping");

    dbo.collection("products").find({}).toArray(function(err, result) {
      if (err) throw err;
      var products = [];
      for(let data of result){
        products.push(data)
      }
      db.close();
       res.render('index', {products: products});
    });
  }); 
});

router.get('/user/signup', function(req, res, next) {
  res.render('user/signup', {csrfToken: req.csrfToken()})
})

router.post('/user/signup', passport.authenticate('local.signup', {
  successRedirect: '/user/profile',
  failureRedirect: '/user/signup',
  failureFlash: true
}))

router.get('/user/profile', function(req, res, next) {
  res.render('user/profile')
})


module.exports = router;
