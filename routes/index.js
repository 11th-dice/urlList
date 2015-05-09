var express = require('express');
var router = express.Router();
var Client = require('mariasql');


/* GET home page. */
router.get('/', function(req, res, next) {
  var c = new Client();
  c.connect({
    host: '192.168.1.15',
    user: 'appUser',
    password: 'kszk3081abk',
  });
  
  if (false && !req.param('url') && !req.param('title')) {
    c.query('INSERT INTO urlList.urlListTitles (url,title)\n' +
      'VALUES ('+req.param('url')+ ','+req.param('title')+');');
  }
  
  var sql = 'use urlList;\n';
  c.query(sql);
  
  sql = 'select * from urlListTitles inner join urlListStatus on urlListTitles.url = urlListStatus.url;';
  c.query(sql)
    .on('result',function (queryRes) {
      queryRes.on('row',function (row) {

        var obj = {};
        obj.title = 'Express';
      
        obj.list = [{
          title:'google',
          url:'http://google.co.jp',
          sts:0
        },
        {
          title:'yahoo',
          url:'http://yahoo.co.jp',
          sts:1
        },
        {
          title:row.title,
          url:row.url,
          sts:row.sts
        }
        ];
        
        res.render('index',obj);              
      })
      .on('end',function (info) {

      });
    });
  
  

});


module.exports = router;
