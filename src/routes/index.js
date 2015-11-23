import express from 'express';
const router = express.Router();
const db = require('../models');
const _ = require('lodash');


/* GET home page. */
router.get('/', function (req, res, next) {
  db.urllist.findAll()
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

router.put('/', (req, res, next) => {
	let c = new Client();
	c.connect(connectDB);
	
	updateUrlList(c, req.query.url, req.query.title);
	res.redirect('/');
});

router.delete('/', (req, res, next) => {
	let c = new Client();
	c.connect(connectDB);
	
	deleteUrlList(c, req.query.deleteUrl);
	res.redirect('/');
});

module.exports = router;
