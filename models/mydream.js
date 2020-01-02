var mongoose = require("mongoose");
 
var mydreamSchema = new mongoose.Schema({
  	name: String,
   	amount: String,
   	months: String,
	date: String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
});
 
module.exports = mongoose.model("Mydream", mydreamSchema);