let settingDev = {
	db: {
		'host': 'localhost',
		'user': 'root',
		'password': '',
		'db': 'urlList'
	},
	testdb:{
		'host': 'localhost',
		'user': 'root',
		'password': '',
		'db': 'urlListTest'
	}

};

let settingPrd = {
	db: {
		'host': '192.168.1.3',
		'user': 'appUser',
		'password': '',
		'db': 'urlList'
	}
};

let settings;
if (process.env.NODE_ENV === 'production') {
	settings = settingPrd;
} else {
	settings = settingDev;
}

export default settings;
