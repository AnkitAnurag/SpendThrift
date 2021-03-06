var express = require("express");
var router = express.Router();
var Spending = require("../models/spending");
var User = require("../models/user");
var Budget = require("../models/budget");
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
	// var method = req.body.method;
	var name = req.body.name;
	var date = req.body.date;
	var amount = req.body.amount;
	var author = {
		id: req.user._id,
		username: req.user.username
	};
	var month=date.charAt(5)+date.charAt(6);
	var day=date.charAt(8)+date.charAt(9);
	var year=date.charAt(0)+date.charAt(1)+date.charAt(2)+date.charAt(3);
	var newspending = { name: name, date: date, month:month, day:day, year:year, amount: amount, author:author }
	Spending.create(newspending, function (err, newlyCreated) {
		if (err) {
			res.redirect("/spending");
		} else {
			res.redirect("/spending");
			//console.log(newspending);
		}
	});
});

//New Routes for Spending

router.get('/spending/monthwiseanalysis',function(req,res){
	Spending.find({month:00}, function (err, allSpendings) {
		if (err) {
			console.log(err);
		}
		else {
			res.render("spending/monthwise", { spendings: allSpendings });
		}
	});
});

router.post('/spending/monthwiseanalysis',function(req,res){
	var month = req.body.month;
	Spending.find({month:month}, function (err, allSpendings) {
		if (err) {
			console.log(err);
		}
		else {
			res.render("spending/monthwise", { spendings: allSpendings });
		}
	});
});

router.get('/spending/todaysexpense',function(req,res){
	Spending.find({}, function (err, allSpendings) {
		if (err) {
			console.log(err);
		}
		else {
			res.render("spending/todaysexpense", { spendings: allSpendings });
		}
	});
});

router.get('/spending/currentmonthanalysis',function(req,res){
	Spending.find({}, function (err, allSpendings) {
		if (err) {
			console.log(err);
		}
		else {
			res.render("spending/currentmonth", { spendings: allSpendings });
		}
	});
});

router.get('/spending/budgetvexpense',function(req,res){
	Spending.find({}, function (err, allSpendings) {
		Budget.find({}, function (err, budget){
		if (err) {
			console.log(err);
		}
		else {
			res.render("spending/budgetvexpense", { spendings: allSpendings, budgets: budget });
		}
	})});
});

router.post("/spending/budgetvexpense", function (req, res) {
	var budget = req.body.budget;
	var author = {
		id: req.user._id,
		username: req.user.username
	};
	var budget = { budget:budget, author:author }
	Budget.create(budget, function (err, newlyCreated) {
		if (err) {
			res.redirect("/spending/budgetvexpense");
		} else {
			res.redirect("/spending/budgetvexpense");
		}
	});
});

router.put("/spending/budgetvexpense/:budget_id", function (req, res) {
	var budget = req.body.budget;
	Budget.findByIdAndUpdate(req.params.budget_id, { budget:budget}, function(err, updatedBudget){
		if(err){
			res.redirect("/spending/budgetvexpense");
		} else {
			res.redirect("/spending/budgetvexpense");
		}
	});
});


//Delete Spending

router.post('/deleteSpending', middleware.isLoggedIn, (req, res) => {
	Spending
		.findByIdAndDelete(req.body.id)
		.then((doc) => {
			res.redirect('back');
		})
		.catch((err)=> res.redirect('/spending'));
})

module.exports = router;