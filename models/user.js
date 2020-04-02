var mongoose = require("mongoose");
//var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
	name: {
		type: String
		// required: true
		},
	email: {
		type: String
		// required: true
		},
	password: {
		type: String
		// required: true
		},
	date: {
		type: Date,
		default: Date.now
		}
	  // },
	// facebook: {
	// 		id: String,
	// 		token: String,
	// 		email: String,
	// 		name: String
	// },
	// google: {
	// 		id: String,
	// 		token: String,
	// 		email: String,
	// 		name: String
	// }
});

//UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);