var Mydream = require("../models/mydream");
var Spending = require("../models/spending");
var middlewareObj = {};

middlewareObj.checkDreamOwnership = function(req, res, next) {
	if(req.isAuthenticated()){
		Mydream.findById(req.params.id, function(err, foundMydream){
			if(err){
				req.flash("error", "Oh Snap! Your dream not found!");
				res.redirect("back");
			} else {
			if(foundMydream.author.id.equals(req.user._id)) {
				next();
			} else {
				req.flash("error", "You don't have the permission to do that!");
				res.redirect("back");
			}
			}
		});
	} else {
		req.flash("error", "You need to be logged in to do that!");
		res.redirect("back");
	}
}

middlewareObj.checkSpendingOwnership = function(req, res, next) {
	if(req.isAuthenticated()){
		Spending.findById(req.params.id, function(err, foundSpending){
			if(err){
				res.redirect("back");
			} else {
			if(foundSpending.author.id.equals(req.user._id)) {
				next();
			} else {
				req.flash("error", "You don't have the permission to do that!");
				res.redirect("back");
			}
			}
		});
	} else {
		req.flash("error", "You need to be logged in to do that!");
		res.redirect("back");
	}
}

middlewareObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error", "You need to be logged in to do that!");
	res.redirect("/login");
}

module.exports = middlewareObj;