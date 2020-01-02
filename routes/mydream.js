var express = require("express");
var router = express.Router();
var Mydream = require("../models/mydream");
var User = require("../models/user");
var middleware = require("../middleware");


router.get("/mydream", middleware.isLoggedIn, function(req, res){
	Mydream.find({}, function(err, allMydreams){
		if(err){
			console.log(err);
		}
		else {
			res.render("mydream/index", {mydreams : allMydreams});
		}
	});
});

router.post("/mydream", middleware.isLoggedIn, function(req, res){
	var name = req.body.name;
	var amount = req.body.amount;
	var months = req.body.months;
	var date = req.body.date;
	var author = {
		id: req.user._id,
		username: req.user.username
	};
	var newDream = {name:name, amount:amount, months:months, date:date, author:author}
	Mydream.create(newDream, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else {
			res.redirect("/mydream");
		}
	});
});


router.get("/mydream/new", middleware.isLoggedIn, function(req, res){
	res.render("mydream/new");
});


//EDIT MYDREAM
router.get("/mydream/:id/edit", middleware.isLoggedIn, function(req, res){
	Mydream.findById(req.params.id, function(err, foundMydream){
		res.render("mydream/edit", {mydream: foundMydream});
	});
});

//UPDATE MYDREAM
router.put("/mydream/:id", middleware.isLoggedIn, function(req, res){
	Mydream.findByIdAndUpdate(req.params.id, req.body.mydream, function(err, updatedDream){
		if(err){
			res.redirect("/mydream");
		} else {
			res.redirect("/mydream");
		}
	});
});


//DESTROY DREAM
router.delete("/mydream/:id", middleware.isLoggedIn, function(req, res){
	Mydream.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/mydream");
		} else {
			res.redirect("/mydream");
		}
	});
});



module.exports = router;