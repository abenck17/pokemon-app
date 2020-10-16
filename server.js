const express = require('express');
const app = express();


const methodOverride = require('method-override');


app.use(methodOverride('_method'));

app.use((req, res, next) => {
    console.log('I run for all routes');
    next();
});


app.use(express.urlencoded({ extended: true }));

const pokemon = require('./models/pokemon.js'); 


app.get('/pokemon/new', (req, res) => {
    res.render('new.ejs');
});

app.get('/pokemon/:index', (req, res) => { 
    res.render('show.ejs', { 
        pokemon: pokemon[req.params.index] 
    });
});  

 
app.get('/pokemon', (req, res) => {
    res.render('index.ejs', {
        pokemon: pokemon 
    }); 
    
});

app.post('/pokemon', (req, res) => {
    pokemon.push(req.body);
    res.redirect('/pokemon');
});

app.delete('/pokemon/:index', (req, res) => {
	pokemon.splice(req.params.index, 1); 
	res.redirect('/pokemon');  
});

app.get('/pokemon/:index/edit', function(req, res){
	res.render('edit.ejs', { 
		pokemon: pokemon[req.params.index], 
		index: req.params.index 
    });
});

app.put('/pokemon/:index', (req, res) => { 
    pokemon[req.params.index] = req.body;
    res.redirect('/pokemon'); 
});

app.listen(3000, ()=>{
    console.log("I am listening");
});