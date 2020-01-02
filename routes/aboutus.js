var express = require("express");
var router = express.Router();
var middleware = require("../middleware");

router.get("/aboutus", middleware.isLoggedIn, function(req, res){
	res.render("aboutus/index");
});

module.exports = router;