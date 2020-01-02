var express = require("express");
var router = express.Router();
var middleware = require("../middleware");

router.get("/home", middleware.isLoggedIn, function(req, res){
	res.render("home/index");
});

module.exports = router;