// Create web server

var express = require('express');
var router = express.Router();
var comments = require('../models/comments');
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false });

router.route('/')
  .get(function(req, res) {
    comments.retrieveAll(function(err, comments) {
      if (err)
        return res.json(err);
      return res.json(comments);
    });
  })
  .post(parseUrlencoded, function(req, res) {
    var comment = {
      name: req.body.name,
      comment: req.body.comment,
      date: new Date()
    };
    comments.insert(comment, function(err, comment) {
      if (err)
        return res.json(err);
      return res.json(comment);
    });
  });

module.exports = router;