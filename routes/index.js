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
    db:'urlList'
  });
  
  var sql = '';

  
  if (!!req.query.url && !!req.query.title) {

    sql = 'INSERT INTO urlListTitles (url,title) VALUES ( :url, :title); ';      
    sql += 'INSERT INTO urlListStatus (url) VALUES ( :url );';   
     c.query(sql,{
       url:req.query.url,
       title:req.query.title
       })
    .on('error',function (err) {
      console.log(err);
    });
  }
  

  var obj = {};
  obj.title = 'Express';
  obj.list = [];
  sql = 'select * from urlListTitles inner join urlListStatus on urlListTitles.url = urlListStatus.url;';
  c.query(sql)
    .on('result',function (queryRes) {
      queryRes.on('row',function (row) {

        obj.list.push({
          title:row.title,
          url:row.url,
          sts:row.sts
        });
      })
      .on('end',function (info) {
        res.render('index',obj);              
      });
    });
  
  c.end();

});


module.exports = router;
