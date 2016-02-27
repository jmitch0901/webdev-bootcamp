var express = require("express");
var app = express();

app.use(express.static("public")); //Tell express we want to serve the public folder for stylesheets, etc.
app.set("view engine","ejs"); //Tell express we will render html using ejs. We dont need to type extensions in routes.


app.get("/",function(req,res){
    res.render("index");
});

app.get("/love/:thing",function(req, res) {
   var thing = req.params.thing;
   
   res.render("love",{thing:thing});
});

app.get("/posts",function(req, res) {
   var posts = [
        {title:"Post 1", author:"Susy"},   
        {title:"My adorable pet bunny!", author:"Charlie"}, 
        {title:"Can you believe it?", author:"Jon"}
    ]; 
    
    res.render("posts",{posts:posts});
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is running!");
});















