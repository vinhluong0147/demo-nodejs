var express = require('express');
var router = express.Router();
var Product = require('../model/product')
/* GET home page. */
router.get('/', function(req, res, next) {

  var products = Product.find();
  res.render('index', { title: 'Express', products: products });
});

module.exports = router;
