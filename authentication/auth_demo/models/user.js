var mongoose = require("mongoose"),
passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
   username: String,
   password: String
});
UserSchema.plugin(passportLocalMongoose); //Adds authentication methods into our schema
module.exports = mongoose.model("User",UserSchema);