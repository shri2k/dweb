var express = require('express');
var router = express.Router();
var fs = require('fs');
var Fuse = require('fuse.js');

medData = JSON.parse(fs.readFileSync('./data/data_copy.json').toString());
medDataFuse = new Fuse(medData, {
	keys: [{
		name: 'name',
		weight: 0.5,
	},
	{
		name: "med_type",
		weight: 0.1
	},
	{
		name: "generic",
		weight: 0.4
	}],
	shouldSort: true
});

/* GET home page. */
router.get('/', function(req, res, next) {
	// res.json(medData);
	res.render('index');
});
router.get('/lucky', function(req, res, next) {
	// res.json(medData);
	res.render('maps');
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
