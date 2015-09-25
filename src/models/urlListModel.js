import _ from 'lodash';
import Promise from 'bluebird';

export function getUrlList (client) {
	let sql;
	sql = 'SELECT title.url, title.title ';
	sql += 'FROM urlListTitles title ';
	sql += 'INNER JOIN urlListStatus sts ON title.url = sts.url ';
	sql += 'LEFT JOIN urlListInsTime it ON title.url = it.url ';
	sql += 'WHERE sts <> 9 ';
	sql += 'ORDER BY it.insertTime desc;';
	
	return getExecuteQueryPromise(client, sql);
};

export function updateUrlList (c, url, title) {
	if (!url || !title) return;
	let queryTitles, queryStatus, queryTime;
	queryTitles = 'INSERT INTO urlListTitles (url,title) VALUES ( :url, :title); ';
	queryStatus = 'INSERT INTO urlListStatus (url) VALUES ( :url );';
	queryTime = 'INSERT INTO urlListInsTime (url, insertTime) VALUES ( :url, :insertTime);';
	let insertTime = (new Date()).toLocaleString();
	
	let arrQueries = [
		getExecuteQueryPromise(c, queryTitles, {url, title})
		,getExecuteQueryPromise(c, queryTime, { url, insertTime })
		,getExecuteQueryPromise(c, queryStatus, { url })
		];
		
	return Promise.all(arrQueries)
	.catch((err) => {
		console.log(err);
		return err;
	});
};

export function deleteUrlList (c, argUrl) {
	let arrUrl,query;
	arrUrl = _.isArray(argUrl) ? argUrl : [argUrl];
		
	query = 'UPDATE urlListStatus SET sts = 9';
	query += ' WHERE';
	_.forEach(arrUrl, (val, i) => {
		if (i !== 0) query += ` or`;
		query += ` url = '${val}'`;
	});
	query += ';';

	return getExecuteQueryPromise(c, query);
};

function getExecuteQueryPromise(client, query, queryArg = undefined) {
	return new Promise((resolve, reject) => {
		let result;
		client.query(query, queryArg)
			.on('result', (res) => {
				let rows = [];
				res
				.on('error', reject)
				.on('row', (row) => { if (row) rows.push(row); })
				.on('end', (info) => { result = rows.length === 0 ? info : rows; }); })
			.on('error', reject)
			.on('end', () => { resolve(result); });
	});	
}