var express = require("express");
var router = express.Router();

// Load models
const Todo = require('../models/todo');

var middleware = require("../middleware");

router.get("/todolist", middleware.isLoggedIn, (req, res) => {
    Todo.find({}, (err, allTodos) => {
        if(err) {
            console.log(err);
        } else {
            res.render("todo/index", { todos: allTodos });
        }
    });
});

router.post("/todolist", middleware.isLoggedIn, (req, res) => {
    var { item, priority } = req.body;
    var author = {
      id: req.user._id
    };
    var newTodo = { item, priority, author };
    Todo.create(newTodo, (err, newlycreated) => {
        if(err) {
          console.log(err);
        } else {
          res.redirect('/todolist');
        }
    })
});

router.post('/deleteTodo', middleware.isLoggedIn, (req, res) => {
	Todo
		.findByIdAndDelete(req.body.id)
		.then((doc) => {
			res.redirect('back');
		})
		.catch((err)=> res.redirect('/todolist'));
});

router.post('/markTodo', middleware.isLoggedIn, (req, res) => {
  if(req.body.completed == 0) {
    var completed = 1;
  } else {
    var completed = 0;
  }
	Todo
		.findByIdAndUpdate(req.body.id, { completed: completed })
		.then((doc) => {
			res.redirect('back');
		})
		.catch((err)=> res.redirect('/todolist'));
});

module.exports = router;