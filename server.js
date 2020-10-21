const express = require('express');
const app = express();
const methodOverride = require('method-override');

app.use(express.static('public'));

app.use(methodOverride('_method'));

app.use(express.urlencoded({ extended: true }));

app.use("/pokemon", require("./controllers/pokemonController.js"));
app.use("/users", require("./controllers/usersController.js"));

app.listen(3000, ()=>{
    console.log("I am listening");
});