var Client = require('mariasql');
var _ = require('lodash');
var sql;

function updateUrlList(c,url,title) {
	if (!url || !title) return;
	
	sql = 'INSERT INTO urlListTitles (url,title) VALUES ( :url, :title); ';      
	//sql += 'INSERT INTO urlListStatus (url) VALUES ( :url );';   
	c.query(sql,{
		url:url,
		title:title
	})
	.on('error',function (err) {
		console.log(err);
	});
	
	sql = 'INSERT INTO urlListStatus (url) VALUES ( :url );';   
	c.query(sql,{ url:url })
	.on('error',function (err) {
		console.log(err);
	});	
}

module.exports.updateUrlList = updateUrlList;

function deleteUrlList(c,arrUrl) {
	_.each(arrUrl,function (elm,i) {
		c.query('update urlListStatus set sts = 9 where url = :url;',
				{url:arrUrl[i]});
	});
}

module.exports.deleteUrlList = deleteUrlList;