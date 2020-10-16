const express = require('express');
const app = express();//app is an object

const pokemon = require('./models/pokemon.js'); //NOTE: it must start with ./ if it's just a file, not an NPM package


app.get('/pokemon/:index', (req, res) => { // :index can be anything
    res.render('show.ejs', { //second param must be an object
        pokemon: pokemon[req.params.index] //there will be a variable available inside the ejs file called fruit, its value is fruits[req.params.index]
    });
});  

// GET ==> Route to our homepage, and user can click on url to create a new fruit 
app.get('/pokemon', (req, res) => {
    res.render('index.ejs', {
        pokemon: pokemon //there will be a variable available inside the ejs file called pokemons, its value is pokemon[req.params.index]
    }); // {} callback function
    
});

app.listen(3000, ()=>{
    console.log("I am listening");
});