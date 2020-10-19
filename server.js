const express = require('express');
const app = express();
const methodOverride = require('method-override');

app.use(methodOverride('_method'));

app.use(express.urlencoded({ extended: true }));

app.use("/pokemon", require("./controllers/pokemonController.js"));

app.listen(3000, ()=>{
    console.log("I am listening");
});