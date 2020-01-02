var express = require("express");
var router = express.Router();
var Spending = require("../models/spending");
var User = require("../models/user");
var middleware = require("../middleware");

router.get("/spending", middleware.isLoggedIn, function (req, res) {
	Spending.find({}, function (err, allSpendings) {
		if (err) {
			console.log(err);
		}
		else {
			res.render("spending/index", { spendings: allSpendings });
		}
	});
});

router.post("/spending", middleware.isLoggedIn, function (req, res) {
	var method = req.body.method;
	var name = req.body.name;
	var date = req.body.date;
	var amount = req.body.amount;
	var author = {
		id: req.user._id,
		username: req.user.username
	};
	var newspending = { method: method, name: name, date: date, amount: amount, author:author }
	Spending.create(newspending, function (err, newlyCreated) {
		if (err) {
			res.redirect("/spending");
		} else {
			res.redirect("/spending");
		}
	});
});


router.post('/deleteSpending', middleware.isLoggedIn, (req, res) => {
	Spending
		.findByIdAndDelete(req.body.id)
		.then((doc) => {
			res.redirect('/spending');
		})
		.catch((err)=> res.redirect('/spending'));
})

module.exports = router;