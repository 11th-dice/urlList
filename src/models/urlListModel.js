import _ from 'lodash';

export function getUrlList (client, cb) {
	let sql;
	sql = 'SELECT title.url, title.title, sts.sts, it.insertTime ';
	sql += 'FROM urlListTitles title ';
	sql += 'INNER JOIN urlListStatus sts ON title.url = sts.url ';
	sql += 'LEFT JOIN urlListInsTime it ON title.url = it.url ';
	sql += 'WHERE sts <> 9 ';
	sql += 'ORDER BY it.insertTime desc;';
	
	let urlList = [];
	
	client.query(sql)
		.on('result', (queryRes) => {
			queryRes.on('row', (row) => {				
				urlList.push({
					title: row.title,
					url: row.url
				});
			})
			.on('end', (info) => cb(urlList));
		});
		
		client.end();
		
};

export function updateUrlList (c, url, title) {
	if (!url || !title) return;
	let sql = '';
	sql = 'INSERT INTO urlListTitles (url,title) VALUES ( :url, :title); ';

	c.query(sql, { url, title })
		.on('error', (err) => {
			console.log(err);
		});

	sql = 'INSERT INTO urlListStatus (url) VALUES ( :url );';
	c.query(sql, { url })
		.on('error', function (err) {
			console.log(err);
		});

	sql = 'INSERT INTO urlListInsTime (url, insertTime) VALUES ( :url, :insertTime);';
	var insertTime = (new Date()).toLocaleString();
	c.query(sql, { url, insertTime })
		.on('error', function (err) {
			console.log(err);
		});
};

export function deleteUrlList (c, argUrl) {
	let arrUrl;

	if (_.isArray(argUrl)) {
	arrUrl = argUrl;
	} else {
	arrUrl = [argUrl];
	}

	_.each(arrUrl, function (val, i) {
	c.query('update urlListStatus set sts = 9 where url = :url;',
		{ url: val });
	});
};
