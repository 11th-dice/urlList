import {expect} from 'chai';
import {getUrlList, updateUrlList, deleteUrlList} from '../../src/models/urlListModel';
import Client from 'mariasql';
import _ from 'lodash';
import settings from '../../src/setting';

let c;
let defaultUrlList = [
		{
			title: 'yahoo',
			url: 'http://www.yahoo.co.jp/'
		},
		{
			title: '妹･真菜ちゃん射ペストストリーwithドラマCD　2種',
			url: 'http://www.pixiv.net/member_illust.php?mode=manga&illust_id=51362219'
		}
	];

describe('getUrlList', function () {
	before(() => {
		c = new Client();
		c.connect(settings.testdb);
		});
	after(() => { c.destroy(); });
	
	it('正常系', function () {
		let urlList = defaultUrlList;

		return getUrlList(c)
		.then((resultList) => {
			expect(resultList).to.deep.equal(urlList);
		}, (err) => expect(false).to.be.ok);
	});
});

describe('updateUrlList', function () {
	let updateUrl = {
			title: 'hogehoge',
			url: 'http://www.hoge/fuga' + (new Date).getTime()
	};
	
	before(() => {
		c = new Client();
		c.connect(settings.testdb);
		});
	after(() => {
		return deleteUrlList(c, updateUrl.url)
		.then(() => {
			c.destroy();
		});
	});
	
	it('update 正常系', function () {
		return updateUrlList(c, updateUrl.url, updateUrl.title)
			.then(() => getUrlList(c))
			.then((resultUrlList) => {
				let urlList = [updateUrl, ...defaultUrlList];
				expect(resultUrlList).to.deep.equal(urlList);
			});
	});

});
