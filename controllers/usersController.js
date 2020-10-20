const express = require("express");
const router = express.Router();

const users = require("../models/users");

// Index 
router.get('/', (req, res) => {
    res.render('users/index.ejs'); // already looking in the views folder, still need to specify to look in users folder 
});

// each profile index
router.get('/profile/:index', (req, res) => { 
    res.render('users/profile.ejs', { 
        user: users[req.params.index], 
        index: req.params.index //... and its index in the array
    });
});  

// signUp page
router.get('/signUp', (req, res) => {
    res.render('users/signUp.ejs');
});

// signUp form w/ redirect 
router.post('/', (req, res) => {
    users.push(req.body);
    res.redirect(`/users/profile/${users.length - 1}`); // why just /users? 
});

// login page
router.get('/login', (req, res) => {
    res.render('users/login.ejs');
    console.log(req.body)
});

// POST LOGIN // pulled from cheat sheet - need to deed dive this! 
router.post("/login", (req, res) => {
    console.log(req.body);
    let index = users.findIndex(
      (user) =>
        user.username === req.body.username && user.password === req.body.password
    );

    if(index != -1){
        res.redirect(`/users/profile/${index}`);
    } else {
        res.send('incorrect user name or password');
    }
  });

// GET ==> prefilled the data from the model and show the edit form to the user
router.get('/profile/:index/edit', (req, res) => {
	res.render(
		'users/edit.ejs', //render views/edit.ejs
		{ //pass in an object that contains
			user: users[req.params.index], //the user object
			index: req.params.index //... and its index in the array
		}
	);
});

router.put('/profile/:index', (req, res) => {
    users[req.params.index] = req.body; // req.send or console.log to check for errors
    console.log(req.params);
    res.redirect(`/users/profile/${req.params.index}`) // defining index as a variable in router.post for login
})

// DELETE ==> single object // changed app ==> router and removed /fruit from delete fruit link
router.delete('/profile/:index', (req, res) => {
	users.splice(req.params.index, 1); //remove the item from the array, using splice() not pop() to be able to indicate which index
	res.redirect('/users');  //redirect back to index route
});




module.exports = router;