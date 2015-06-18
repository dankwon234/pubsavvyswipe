var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('staging/home', {'title':'Home'});
});



router.get('/:page', function(req, res, next) {
	var page = req.params.page;
	res.render('staging/'+page, {'title':page.toUpperCase()});
});

module.exports = router;
