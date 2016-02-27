var express = require("express");
var app = express();

//Routes
app.get("/",function(req,res){
    
    res.send("Hi There!");
    
});

app.get("/bye",function(req,res){
    
    res.send("Goodbye!");
    
});

app.get("/dog",function(req,res){
    
    res.send("Meow!!");
    
});

//Acts as a CATCH ALL parameter
app.get("*",function(req,res){
   res.send("404 Error"); 
});


//Listener for Ports
app.listen(process.env.PORT,process.env.IP, function(){
    console.log("Server has started!");
});











