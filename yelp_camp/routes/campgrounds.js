var express = require("express"),
router = express.Router();

var Campground = require("../models/campground");
var middleWare = require("../middleware");


//SHOW
router.get("/",function(req, res) {
    Campground.find({},function(err,campgrounds){
       if(err){
           req.flash("error","There was a server error. Sorry about that! Logout, Login, and try again.");
           console.log("You got an error: "+err);
       } else {
           res.render("campgrounds/index",{campgrounds:campgrounds});
       }
    });
});

//EDIT
router.get("/:id/edit",middleWare.checkCampgroundOwnership,function(req, res) {
    Campground.findById(req.params.id,function(err,campground){
            res.render("campgrounds/edit",{campground:campground});
    });
});

//UPDATE
router.put("/:id",middleWare.checkCampgroundOwnership ,function(req,res){
    //find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,campground){
        if(err){
            req.flash("error","There was a server error. Sorry about that! Logout, Login, and try again.");
            res.redirect("/campgrounds");
        } else {
            req.flash("success","Successful edit to "+campground.name);
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
    //redirect somewhere
});

//CREATE
router.post("/",middleWare.isLoggedIn,function(req,res){
    
    var name = req.body.name;
    var img = req.body.image;
    var description = req.body.description;
    
    //Save the user information
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    
    Campground.create({name:name,image:img,description:description,author:author},function(err,newCreated){
        if(err){
            req.flash("error","There was a server error. Sorry about that! Logout, Login, and try again.");
            console.log("You got an error: "+err);
        } else {
            req.flash("success","Successfully created "+newCreated.name+"!");
            res.redirect("/campgrounds");
        }
    });
});

//DELETE
router.delete("/:id",middleWare.checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndRemove(req.params.id,function(err){
       if(err){
           console.log("ERR -> "+err);
           req.flash("error","There was a server error. Sorry about that! Logout, Login, and try again.");
           res.redirect("/campgrounds");
       } else {
           req.flash("success","Successfully deleted");
           res.redirect("/campgrounds");
       } 
    });
});

router.get("/new",middleWare.isLoggedIn,function(req, res) {
    res.render("campgrounds/new");
});

router.get("/:id",function(req,res){
    var id = req.params.id;
    Campground.findById(id).populate("comments").exec(function(err, campground){
        if(err){
            console.log("You got an error: "+err);
            req.flash("error","There was a server error. Sorry about that! Logout, Login, and try again.");
        } else {
            res.render("campgrounds/show",{campground:campground});
        }
    });
    
});

module.exports = router;