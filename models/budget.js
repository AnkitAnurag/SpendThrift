var mongoose = require("mongoose");
 
var budgetSchema = new mongoose.Schema({
  	budget:Number,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
});
 
module.exports = mongoose.model("Budget", budgetSchema);