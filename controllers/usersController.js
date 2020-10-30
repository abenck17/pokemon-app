const express = require("express");
const router = express.Router();

// const users = require("../users");
const User = require('../models').Trainer;
const Team = require('../models').Team; 
const Pokemon = require('../models').Pokemon; 

// Index - Stays the same 
router.get('/', (req, res) => {
    res.render('users/index.ejs'); // already looking in the views folder, still need to specify to look in users folder 
});

// signUp page
router.get('/signUp', (req, res) => {
    res.render('users/signUp.ejs');
});

// login page
router.get('/login', (req, res) => {
    res.render('users/login.ejs');
    console.log(req.body)
});

// signUp form w/ redirect 
router.post('/', (req, res) => {
    User.create(req.body).then((newUser) => {
        res.redirect(`/users/profile/${newUser.id}`);
    });
});

// POST LOGIN // pulled from cheat sheet - need to deed dive this! 
router.post("/login", (req, res) => {
    User.findOne( {
        where: {
            username: req.body.username,
            password: req.body.password,
        },
    }).then((foundUser) => {
        res.redirect(`/users/profile/${foundUser.id}`);
    })
});

// each profile index
router.get("/profile/:id", (req, res) => {
    User.findByPk(req.params.id, {
      include: [{ model: Team }, { model: Pokemon }],
    }).then((singlePlayer) => {
      Team.findAll().then((allTeams) => {
        console.log(singlePlayer);
        res.render("users/profile.ejs", {
      user: singlePlayer,
      teams: allTeams,
        });
      });
    });
  });

// // GET ==> prefilled the data from the model and show the edit form to the user
// router.get('/profile/:index/edit', (req, res) => {
// 	res.render(
// 		'users/edit.ejs', //render views/edit.ejs
// 		{ //pass in an object that contains
// 			user: users[req.params.index], //the user object
// 			index: req.params.index //... and its index in the array
// 		}
// 	);
// });

router.put('/profile/:id', (req, res) => {
    console.log("REQ.BODY", req.body)
    User.update(req.body, {
        where: {
            id: req.params.id,
        },
        returning: true,
        
    }).then((updatedUser) => {
        // console.log("Update User", updatedUser)
        // Team.findByPk(req.body.team).then((foundTeam) => {
        //     User.findByPk(req.params.id).then((foundUser) => {
        //         foundUser.update( {
        //             where: { teamId: req.params.team}
        //         });
                res.redirect('/users');
            })
        })
//     });
// });



// DELETE ==> single object // changed app ==> router and removed /fruit from delete fruit link
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id,
        },
    }).then(() => {
        res.redirect('/users');
    });
});




module.exports = router;