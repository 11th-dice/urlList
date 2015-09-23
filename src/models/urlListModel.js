
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
				let insertTime = row.insertTime || '';
				
				urlList.push({
					title: row.title,
					url: row.url,
					insertTime: insertTime,
					sts: row.sts
				});
			})
			.on('end', (info) => cb(urlList));
		});
		
		client.end();
		
};