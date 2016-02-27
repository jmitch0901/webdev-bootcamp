var express = require("express"),
app=express(),
mongoose = require("mongoose"),
passport = require("passport"),
bodyParser = require("body-parser"),
User = require("./models/user"),
LocalStrategy = require("passport-local"),
passportLocalMongoose = require("passport-local-mongoose"),
expressSession = require("express-session")
;

mongoose.connect("mongodb://localhost/auth_demo");
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressSession({
    secret: "I love my doges",
    resave: false,
    saveUninitialized: false
}));

//For PassPort
passport.use(new LocalStrategy(User.authenticate()));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());    //PassportLocalMongoose added these functions within our objects
passport.deserializeUser(User.deserializeUser());//PassportLocalMongoose added these functions within our objects


app.set("view engine","ejs");

//======================ROUTES=========================


app.get("/",function(req,res){
    res.render("home");
});

//Add MIDDLEWARE to ensure the user has a session token
app.get("/secret",isLoggedIn,function(req,res){
    res.render("secret");
});

//Middleware to detect if the user is currently logged in.
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();//Next is the callback function to be called on the GET request
    }
    res.redirect("/login");
}

app.get("/register",function(req,res){
    res.render("register");
});

app.post("/register",function(req,res){
    //AUTHENTICATE the user
    User.register(new User({username:req.body.username}),req.body.password,function(err,user){
        if(err){
            console.log("ERR -> "+err);
            return res.render("register");
        }
        
        //We can change local to a different strategy, like FaceBook
        passport.authenticate("local")(req,res,function(){
            res.redirect("/secret");
        });
    });
});


//Login Routes
app.get("/login",function(req,res){
    res.render("login");
});

//login logic using MIDDLEWARE. Runs BEFORE our final route callback
app.post("/login",passport.authenticate("local",{
    successRedirect: "/secret",
    failureRedirect: "/login"
}),function(req, res) {
    //Empty intentionally
});

app.get("/logout",function(req, res) {
    req.logout();
    res.redirect("/");
});




//====================LISTENERS=========================
app.listen(process.env.PORT,process.env.IP, function(){
    console.log("Server Started");
});