var express = require('express');
var router = express.Router();
var Client = require('mariasql');
var updateUrlList = require('../models/update').updateUrlList;
var deleteUrlList = require('../models/update').deleteUrlList;
var connectDB = require('../setting/connectDB.json');


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
	obj.title = 'Express';
	obj.list = [];
	sql = 'select * from urlListTitles inner join urlListStatus on urlListTitles.url = urlListStatus.url \
where sts <> 9;';
	c.query(sql)
		.on('result', function (queryRes) {
		queryRes.on('row', function (row) {

			obj.list.push({
				title: row.title,
				url: row.url,
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
