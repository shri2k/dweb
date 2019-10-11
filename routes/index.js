var express = require('express');
var router = express.Router();
var fs = require('fs');
var Fuse = require('fuse.js');

medData = JSON.parse(fs.readFileSync('./data/data.json').toString());
medDataFuse = new Fuse(medData, {
	keys: ['name', 'med_type', 'generic', 'manufacturer'],
	shouldSort: true
});

/* GET home page. */
router.get('/', function(req, res, next) {
	res.json(medData);
	// res.render('index', { data:  JSON.stringify(http_response)});
});

router.get('/search', function(req, res, next){
	var result = medDataFuse.search(req.query.q);
	var data = {
		medData: result,
		search_q: req.query.q
	};
	res.render('search', {data: data});
})

module.exports = router;
