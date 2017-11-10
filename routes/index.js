var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
  	title: 'BWild !!' 
  });
});

/* GET home page. */
router.get('/homepage', function(req, res, next) {
	res.render('homepage', {
		title: 'Accueil - BWild !!',
		user: '#username'
	});
});

router.get('/profil', function(req, res, next) {
	res.render('wildmates')
});

router.get('/login', function(req, res, next) {
	res.render('form')
});

module.exports = router;