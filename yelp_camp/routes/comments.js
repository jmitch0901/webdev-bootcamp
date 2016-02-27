var express = require("express"),
router = express.Router({mergeParams:true});//So we can grab the :id correctly from the parent route

var Campground = require("../models/campground"),
Comment = require("../models/comment");
var middleWare = require("../middleware");




// ========== COMMENTS ROUTES =======================


//NEW
router.get("/new",middleWare.isLoggedIn,function(req, res) {
    Campground.findById(req.params.id,function(err,campground){
        if(!err){
            res.render("comments/new",{campground:campground});
        } else {
            console.log("ERROR: "+err);
            req.flash("error","There was a server error. Sorry about that! Logout, Login, and try again.");
        }
    })
});

//CREATE
router.post("/",middleWare.isLoggedIn,function(req, res) {
    //Lookup campground using id
    Campground.findById(req.params.id,function(err,campground){
        if(!err){
            Comment.create(req.body.comment,function(err,comment){
                if(err){
                    console.log("ERR: "+err);
                    req.flash("error","There was a server error. Sorry about that! Logout, Login, and try again.");
                } else {
                    //first, add username AND id to the comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    
                    campground.comments.push(comment);
                    campground.save();
                    console.log(comment);
                    
                    res.redirect("/campgrounds/"+campground._id);
                }
            });
        } else {
            console.log("ERROR: "+err);
            req.flash("error","There was a server error. Sorry about that! Logout, Login, and try again.");
            res.redirect("/campgrounds");
        }
    });
});

//EDIT
router.get("/:id_comment/edit",middleWare.checkCommentOwnership,function(req,res){
    Comment.findById(req.params.id_comment,function(err,comment){
        
        if(err){
            req.flash("error","There was a server error. Sorry about that! Logout, Login, and try again.");
            return res.redirect("back");
        }
        
        res.render("comments/edit",{id_campground:req.params.id,comment:comment});
        
    });
    
});

//UPDATE
router.put("/:id_comment",middleWare.checkCommentOwnership,function(req,res){
    Comment.findByIdAndUpdate(req.params.id_comment,req.body.comment,function(err,comment){
        if(err){
            req.flash("error","There was a server error. Sorry about that! Logout, Login, and try again.");
            return res.redirect("back");
        }
        
        req.flash("success","Successfully updated comment");
        res.redirect("/campgrounds/"+req.params.id);
    });
});

//DELETE
router.delete("/:id_comment",middleWare.checkCommentOwnership,function(req,res){
    Comment.findByIdAndRemove(req.params.id_comment,function(err){
       if(err){
           req.flash("error","There was a server error. Sorry about that! Logout, Login, and try again.");
           res.redirect("back");
       } else {
           req.flash("success","Deleted Successfully");
           res.redirect("/campgrounds/"+req.params.id);
       }
    });
    
});

module.exports = router;