
var Campground = require("../models/campground");
var Comment = require("../models/comment");


var middlewareObj = {
    
    checkCampgroundOwnership: function(req,res,next){
        if(!req.isAuthenticated()){
            req.flash("error","You must be logged in to do that!");
            return res.redirect("back");
        }
    
        Campground.findById(req.params.id,function(err,campground){
            if(err){
                return res.redirect("back");
            } else {
    
                if(!campground.author.id.equals(req.user._id)){
                    req.flash("error","You do not have permissions to do that.");
                    return res.redirect("back");
                }
        
                next();
            }
        });
    },
    
    isLoggedIn: function(req,res,next){

        if(req.isAuthenticated()){
            return next();
        }
    
        req.flash("success","Please Login First");
        res.redirect("/login");
    },
    
    checkCommentOwnership: function checkCommentOwnership(req,res,next) {
        
        if(!req.isAuthenticated()) {
            req.flash("error","You must be logged in to do that!");
            return res.redirect("back");
        }
    
        Comment.findById(req.params.id_comment,function(err, comment) {
            
            if(err){
                req.flash("error","There was a server error. Sorry about that! Logout, Login, and try again.");
                return res.redirect("back");
            }
            
            if(!comment.author.id.equals(req.user._id)) {
                req.flash("error","You do not have permissions to do that.");
                return res.redirect("back");
            }
            
            next();
        });
    }
};


module.exports = middlewareObj;