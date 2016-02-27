var express = require("express"),
router = express.Router();

var passport = require("passport");
var User = require("../models/user");



//===================ROUTES==========================

router.get("/", function(req,res){
    res.render("landings");
});


//==============Auth Routes=============================

//show register form
router.get("/register", function(req, res) {
    res.render("register");
});

router.post("/register",function(req, res) {
   User.register(new User({username:req.body.username}),req.body.password,function(err,user){
       if(err){
           console.log("ERR -> "+err);
           req.flash("error",err);
           return res.render("register");
       }
       
       
       passport.authenticate("local")(req,res,function(){
           req.flash("success","Welcome to the Awesomness");
           res.redirect("/campgrounds");
       });
   }); 
});

//show login form
router.get("/login", function(req, res) {
    res.render("login");
});


//login logic
router.post("/login",passport.authenticate("local",
{
    successRedirect:"/campgrounds",
    failureRedirect:"/login"
}),
function(req, res) {
   //empty intentionally
});


//logout
router.get("/logout",function(req, res) {
   req.logout();
   req.flash("success","You have successfully logged out");
   res.redirect("/campgrounds");
});


module.exports = router;