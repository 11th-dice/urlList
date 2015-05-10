var Client = require('mariasql');
var _ = require('lodash');
var sql;

module.exports.updateUrlList = function (c, url, title) {
	if (!url || !title) return;

	sql = 'INSERT INTO urlListTitles (url,title) VALUES ( :url, :title); ';      
	//sql += 'INSERT INTO urlListStatus (url) VALUES ( :url );';   
	c.query(sql, {
		url: url,
		title: title
	})
		.on('error', function (err) {
		console.log(err);
	});

	sql = 'INSERT INTO urlListStatus (url) VALUES ( :url );';
	c.query(sql, { url: url })
		.on('error', function (err) {
		console.log(err);
	});
};


module.exports.deleteUrlList = function (c, argUrl) {
		var arrUrl;
		if (_.isArray(arrUrl)){
			arrUrl = argUrl;
		} else {
			arrUrl = [argUrl];
		}
		
		_.each(arrUrl, function (elm, i) {
		c.query('update urlListStatus set sts = 9 where url = :url;',
			{ url: arrUrl[i] });
		});
};
