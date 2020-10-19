const express = require('express');
const router = express.Router();

const pokemon = require('../models/pokemon.js');

router.get('/', (req, res) => {
    res.render('index.ejs', {
        pokemon: pokemon 
    }); 
    
});

router.get('/new', (req, res) => {
    res.render('new.ejs');
});

router.get('/:index', (req, res) => { 
    res.render('show.ejs', { 
        pokemon: pokemon[req.params.index] 
    });
});  

router.post('/', (req, res) => {
    pokemon.push(req.body);
    res.redirect('/pokemon');
});

router.delete('/:index', (req, res) => {
	pokemon.splice(req.params.index, 1); 
	res.redirect('/pokemon');  
});

router.get('/:index/edit', function(req, res){
	res.render('edit.ejs', { 
		pokemon: pokemon[req.params.index], 
		index: req.params.index 
    });
});

router.put('/:index', (req, res) => { 
    pokemon[req.params.index] = req.body;
    res.redirect('/pokemon'); 
});


module.exports = router;