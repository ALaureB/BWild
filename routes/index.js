var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const config = require('../config.js');

/* Connexion BDD */
const connection = mysql.createConnection(config);

connection.connect(function(err) {
	if (err) {
		console.error('error connecting: ' + err.stack);
		return;
	}
	console.log('connected as id ' + connection.threadId); // Vérification de la connexion en console
});

/* GET login page. */
router.get('/', function(req, res, next) {
	res.render('index', {
		title: 'BWild !!'
	});
});

/* GET home page personnalisée par login */
router.get('/homepage-:id(\\d+)', function(req, res, next) {
	connection.query('SELECT * FROM person where id_p = ?', [req.params.id], function (error, results, fields) {
		if (error) {
			console.log(error);
		}
		res.render('homepage', {
			title: 'Accueil - BWild !!',
			user: '#username',
			person : results[0]
		});
	});
});




/* GET Wildmates */
router.get('/profil', function(req, res, next) {
	res.render('wildmates')
});


/* GET my profile */
router.get('/login', function(req, res, next) {
	res.render('form')
});

module.exports = router;