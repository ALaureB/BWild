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

/* GET /login */
router.get('/login', function(req, res) {
    // page de login (formulaire)
    res.render('form');
});
// POST /admin (page d'affichage une fois le login et password validés)
router.post('/login', function(req, res) {
    // page de login 
    // puis
    // redirection vers /admin/logged (page d'accueil de l'espace admin)
    let email = req.body.email;
    let password = req.body.password;
    connection.query('SELECT * FROM person WHERE email = "' + email + '" AND password = "' + password + '";', function(error, results, fields) {
        if (error) {
			console.log(error);
		}
        if (results.length === 0) {
            res.send("You were mistaken !");
        } else {
            req.session.connected = true;
            res.redirect('/logged');
        }
    });
});

// GET /logged
router.get('/logged', function(req, res) {
    if (req.session.connected) {
        res.redirect('/homepage');
    } else {
        res.redirect('/login');
    }
});

// LOGOUT
router.get('/logout', function(req, res) {
	req.session.destroy(function() {
		res.redirect('/');
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


module.exports = router;