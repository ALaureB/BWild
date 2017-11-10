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

/* GET home page. */
router.get('/homepage', function(req, res, next) {
	connection.query('SELECT * FROM person',function (error, results, fields) {
		// Stockage des visites pour page admin
		if (error) {
			console.log(error);
		}
		console.log(results);
		res.render('homepage', {
			title: 'Accueil - BWild !!',
			user: '#username',
			person : results[0]
		});
	});
});

/* Homepage Card for modifications */
router.get('/homepage-card:id(\\d+)', function(req, res) {
	connection.query('SELECT * FROM person WHERE id_p = ?',[req.params.id], function (error, results, fields) {
		if (error) {
			console.log(error);
		}
		console.log(results);
		res.render('card', {
		profil:results[0]
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