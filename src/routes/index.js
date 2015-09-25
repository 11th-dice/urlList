import express from 'express';
let router = express.Router();
import Client  from 'mariasql';
import Promise from 'bluebird';

import settings from '../setting';
import {getUrlList, updateUrlList, deleteUrlList} from '../models/urlListModel';

let connectDB = settings.db;

/* GET home page. */
router.get('/', function (req, res, next) {
	let c = new Client();
	c.connect(connectDB);
	let obj = {};
	
	Promise.resolve(req.query.mode)
		.then((mode) => {
			if (mode === 'update') {
				return updateUrlList(c, req.query.url, req.query.title);
			} else if(mode === 'delete'){
				return deleteUrlList(c, req.query.deleteUrl);
			} else {
				return;
			}
		})
		.then(() => {

			obj.title = 'urlList';
			obj.list = [];

			return getUrlList(c);
		})
		.then((urlList) => {
			obj.list = urlList;
			res.render('index', obj);
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
