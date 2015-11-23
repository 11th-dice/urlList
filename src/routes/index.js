import express from 'express';
const router = express.Router();
const db = require('../models');
const _ = require('lodash');


/* GET home page. */
router.get('/', function (req, res, next) {
  db.urllist.findAll({ where: { sts: 0 }})
    .then((urllists) => {
      let model = {};
      model.title = 'urllist';
      model.list = [];
      _.forEach(urllists, (urllist) => {
        model.list.push({
          id: urllist.id
          , url: urllist.url
          , title: urllist.title
        });
      });
      res.render('index', model);
    });
});

router.post('/', (req, res, next) => {
  db.urllist.upsert({
    title: req.body.title || req.query.title
    , url: req.body.url || req.query.url
    })
    .then((result) => {
      res.redirect('/');
    });
});

router.get('/delete', (req, res, next) => {
  db.urllist.update({
    sts: 9
  }, { where: { id: { in: req.query.id }}})
  .then((result) => {
    res.redirect('/');
  });
});

module.exports = router;
