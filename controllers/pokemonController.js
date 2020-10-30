const express = require('express');
const router = express.Router();

// const pokemon = require('../pokemon.js');
const Pokemon = require('../models').Pokemon;
const Trainer = require('../models').Trainer;

// router.get('/', (req, res) => {
//     res.render('index.ejs', {
//         pokemon: pokemon 
//     });  
// });

// New index page / 
router.get("/", (req, res) => {
    Pokemon.findAll().then((pokemon) => {
      res.render("index.ejs", {
        pokemon: pokemon,
      });
    });
  });

router.get('/new', (req, res) => {
    res.render('new.ejs');
});

// router.get('/:index', (req, res) => { 
//     res.render('show.ejs', { 
//         pokemon: pokemon[req.params.index] 
//     });
// });  

// New show route 
router.get("/:id", (req, res) => {
  console.log("Trainer", Trainer);
  Pokemon.findByPk(req.params.id, {
      include : [Trainer]
  })
  .then(pokemon => {
      res.render('show.ejs', {
          pokemon: pokemon
      });
  })
})

// router.post('/', (req, res) => {
//     pokemon.push(req.body);
//     res.redirect('/pokemon');
// });

// New create route / Pokemon.create to create new fruit w/ sequelize 
router.post("/", (req, res) => {
   
    Pokemon.create(req.body).then((newPokemon) => {
      res.redirect("/pokemon");
    });
  });

// router.delete('/:index', (req, res) => {
// 	pokemon.splice(req.params.index, 1); 
// 	res.redirect('/pokemon');  
// });

// New delete route / destroy sequeluze method 
router.delete("/:id", (req, res) => {
    Pokemon.destroy({ where: { id: req.params.id } }).then(() => {
      res.redirect("/pokemon");
    });
  });

// router.get('/:index/edit', function(req, res){
// 	res.render('edit.ejs', { 
// 		pokemon: pokemon[req.params.index], 
// 		index: req.params.index 
//     });
// });

// New edit route   
router.get("/:id/edit", function (req, res) {
    Pokemon.findByPk(req.params.id).then((pokemon) => {
      res.render("edit.ejs", {
        pokemon: pokemon,
      });
    });
  });

// router.put('/:index', (req, res) => { 
//     pokemon[req.params.index] = req.body;
//     res.redirect('/pokemon'); 
// });

// New edit method
router.put("/:id", (req, res) => {

    Pokemon.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    }).then((pokemon) => {
      res.redirect("/pokemon");
    });
  });


module.exports = router;