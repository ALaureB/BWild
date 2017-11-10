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
	let date = new Date();
	connection.query('SELECT * FROM person', function (error, resultsbd, fields) {
		connection.query('SELECT * FROM person where id_p = ?', [req.params.id], function (error, results, fields) {
			connection.query('SELECT * FROM quote', function (error, resultsqt, fields) {	
				if (error) {
				console.log(error);
				}
				console.log(resultsbd);
				console.log(results);
				res.render('homepage', {
					title: 'Accueil - BWild !!',
					birthday : resultsbd.filter(function(valeur) {
    					return (valeur.birthday.getDate() == date.getDate() &&  valeur.birthday.getMonth() == date.getMonth());
					}),
					
					person : results[0],
					quote : resultsqt
				});	
			});	
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