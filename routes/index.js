var express = require("express");
var router = express.Router();
const bcrypt = require('bcryptjs');
var passport = require("passport");

var User = require("../models/user");


router.get("/", function(req, res){
	res.render("landing");
});


// REGISTER FORM

router.get("/signup", function(req,res){
	res.render("register");
});

router.post('/signup', (req, res) => {
	const { name, email, password, password2 } = req.body;
	let errors = [];
  
	if (!name || !email || !password || !password2) {
	  errors.push({ msg: 'Please enter all fields' });
	}
  
	if (password != password2) {
	  errors.push({ msg: 'Passwords do not match' });
	}
  
	if (password.length < 6) {
	  errors.push({ msg: 'Password must be at least 6 characters' });
	}
  
	if (errors.length > 0) {
	  res.render('register', {
		errors,
		name,
		email,
		password,
		password2
	  });
	} else {
	  User.findOne({ email: email }).then(user => {
		if (user) {
		  errors.push({ msg: 'Email already exists' });
		  res.render('register', {
			errors,
			name,
			email,
			password,
			password2
		  });
		} else {
		  const newUser = new User({
			name,
			email,
			password
		  });
  
		  bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(newUser.password, salt, (err, hash) => {
			  if (err) throw err;
			  newUser.password = hash;
			  newUser
				.save()
				.then(user => {
				//   req.flash(
				// 	'success_msg',
				// 	'You are now registered! Login to continue.'
				//   );
				//   res.redirect('/login');
				passport.authenticate("local")(req,res, function(){
					req.flash("success_msg", "Welcome to SpendThrift " + user.name + "!");
					res.redirect("/home");
				});
				})
				.catch(err => console.log(err));
			});
		  });
		}
	  });
	}
  });


//LOGIN ROUTES
router.get("/login", function(req, res){
	res.render("login");
});

router.post("/login", passport.authenticate("local",
	{
		successRedirect: "/home",
		failureRedirect: "/login",
		failureFlash: true
	}), function(req,res){
});


//LOGOUT

router.get("/logout", function(req, res){
	req.logout();
	req.flash("success", "Logged you out!!");
	res.redirect("/login");
});

module.exports = router;