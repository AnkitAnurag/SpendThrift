require("dotenv").config();

var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose   = require("mongoose");
var flash = require("connect-flash");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var methodOverride = require('method-override');
var session = require('express-session');


var Mydream = require("./models/mydream");
var Spending = require("./models/spending");
var User = require("./models/user");
var Todo = require("./models/todo");


var indexRoutes = require("./routes/index");
var homeRoutes = require("./routes/home");
var spendingRoutes = require("./routes/spending");
var mydreamRoutes = require("./routes/mydream");
var aboutusRoutes = require("./routes/aboutus");
var TodoRoutes = require("./routes/todo");


var url = process.env.DATABASEURL

mongoose.connect(url,{
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false
	});

app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride('_method'));
app.use(flash());

// Express session
app.use(
	session({
	  secret: 'secret',
	  resave: true,
	  saveUninitialized: true
	})
  );

// Back button cached sessions destroy
app.use(function(req, res, next) {
	res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
	next();
});
  

//PASSPORT CONFIGURATION

require('./config/passport')(passport);

// app.use(require("express-session")({
// 	secret: "Once again Rusty wins cutest dog!!",
// 	resave: false,
// 	saveUninitialized: false
// }));
// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());


// Passport middleware
app.use(passport.initialize());
app.use(passport.session());


app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.success_msg = req.flash('success_msg');
  	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash("error");
	next();
});


app.use(indexRoutes);
app.use(homeRoutes);
app.use(spendingRoutes);
app.use(mydreamRoutes);
app.use(aboutusRoutes);
app.use(TodoRoutes);


app.listen(process.env.PORT || 3000, () => {
    console.log("The SpendThrift server has started!!!!");
});