//Require packages
var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    mongoose       = require("mongoose"),
    Campground     = require("./models/campground"),
    Comment        = require("./models/comment"),
    passport       = require("passport"),
    LocalStrategy  = require("passport-local"),
    User           = require("./models/user"),
    expressSession = require("express-session"),
    seedDB         = require("./seeds"),
    methodOverride = require("method-override"),
    flash          = require("connect-flash");
    
    
//Require my routes
var commentRoutes = require("./routes/comments"),
campgroundRoutes  = require("./routes/campgrounds"),
indexRoutes       = require("./routes/index");


mongoose.connect("mongodb://localhost/yelp_camp");
//seedDB();

//USAGE
app.use(flash());
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));

//Passport config
app.use(expressSession({
    secret: "Once again, another secret!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//This is MIDDLEWARE that will be run on ALL ROUTES!
app.use(function(req,res,next){
    res.locals.user = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

app.set("view engine","ejs");

app.use(indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);


app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The YelpCamp server has started!"); 
});

