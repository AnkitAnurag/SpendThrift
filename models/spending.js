var mongoose = require("mongoose");
 
var spendingSchema = new mongoose.Schema({
	name: String,
	date: String,
	day: String,
	month: String,
	year: String,
   	amount: Number,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	}
});
 
module.exports = mongoose.model("Spending", spendingSchema);