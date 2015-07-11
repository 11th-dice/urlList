var express = require('express');
var router = express.Router();
var Client = require('mariasql');
var updateUrlList = require('../models/update').updateUrlList;
var deleteUrlList = require('../models/update').deleteUrlList;
var connectDB = require('../../setting/connectDB.json');
var _ = require('lodash');

/* GET home page. */
router.get('/', function (req, res, next) {
	var c = new Client();
	c.connect(connectDB);

	var sql = '';

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

	sql = 'SELECT title.url, title.title, sts.sts, it.insertTime ';
	sql += 'FROM urlListTitles title ';
	sql += 'INNER JOIN urlListStatus sts ON title.url = sts.url ';
	sql += 'LEFT JOIN urlListInsTime it ON title.url = it.url ';
	sql += 'WHERE sts <> 9 ';
	sql += 'ORDER BY it.insertTime desc;';
	c.query(sql)
		.on('result', function (queryRes) {
		queryRes.on('row', function (row) {
			var insertTime = row.insertTime;
			if (!insertTime) insertTime = '';
			 
			obj.list.push({
				title: row.title,
				url: row.url,
				insertTime: insertTime,
				sts: row.sts
			});
		})
			.on('end', function (info) {
			res.render('index', obj);
		});
	});

	c.end();

});


module.exports = router;
