var express = require('express');
var router = express.Router();
var Client = require('mariasql');
var updateUrlList = require('../models/update').updateUrlList;
var deleteUrlList = require('../models/update').deleteUrlList;
var connectDB = require('../../setting/connectDB.json');

import {getUrlList} from '../models/urlListModel';


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

	getUrlList(c, (urlList)=>{
		obj.list = urlList;
		res.render('index', obj);
	});

});


module.exports = router;
