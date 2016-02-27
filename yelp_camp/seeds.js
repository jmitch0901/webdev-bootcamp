var mongoose = require("mongoose"),
Campground = require("./models/campground"),
Comment = require("./models/comment");

var data = [
    {
        name:"Cloud's Rest",
        image: "http://www.fs.usda.gov/Internet/FSE_MEDIA/stelprdb5115588.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }, 
    {
        name:"Desert Mesa",
        image: "http://www.lovemyparks.com/cms/files/Image/WS%20Campground%202.JPG",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        name:"Canyon Floor",
        image: "http://medora.com/data/upfiles/media/2010campground-TentCouple2DSC_2751.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }
];
function seedDB(){
    Campground.remove({},function(err){
        if(!err){
            console.log("Removed campgrounds");
            //Add some campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(!err){
                        console.log("Added a seeded campground.");
                        //Add a few comments
                        Comment.create(
                            {
                                text: "I wish there was internet!",
                                author: "Homer"
                                
                            }, function(err, comment){
                                if(!err){
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("Created a comment!");
                                } else {
                                     console.log("you got an error: "+err)
                                }
                            });
                    } else {
                        console.log("you got an error: "+err)
                    }
                });
            });
        } else {
            console.log("You got an error: "+err);
        }
    });
}

module.exports = seedDB;