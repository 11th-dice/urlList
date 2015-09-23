import express from 'express';
let router = express.Router();
import Client  from 'mariasql';

import {settings} from '../setting';
import {getUrlList, updateUrlList, deleteUrlList} from '../models/urlListModel';

let connectDB = settings.db;

/* GET home page. */
router.get('/', function (req, res, next) {
	var c = new Client();
	c.connect(connectDB);

	switch (req.query.mode) {
		case 'update':
			updateUrlList(c, req.query.url, req.query.title);
			break;

		case 'delete':
			deleteUrlList(c, req.query.deleteUrl);
			break;

		default:
			break;
	}

	var obj = {};
	obj.title = 'urlList';
	obj.list = [];

	getUrlList(c, (urlList) => {
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
