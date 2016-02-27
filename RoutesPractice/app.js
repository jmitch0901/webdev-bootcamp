var express = require("express");
var app = express();


//Routes

app.get("/",function(req,res){
    res.send("Hi there, welcome to my assignment!");
});

app.get("/speak/:animal",function(req,res){
    var animal = req.params.animal;
    var sound;
    if(animal === "pig"){
        sound="Oink Oink!";
    } else if (animal === "cow"){
        sound="Moo";
    } else if (animal === "dog"){
        sound="Woof!"
    } else {
        res.send("Bad animal");
        return;
    }
    
    res.send("The "+animal+" says "+sound);
});

app.get("/repeat/:word/:count",function(req, res) {
   var count = req.params.count;
   var word = req.params.word;
   
   var stringBuilder = "";
   for(var i = 0; i < Number(count); i++){
       stringBuilder += word + " ";
   }
   
   res.send(stringBuilder);
});

app.get("*",function(req,res){
    res.send("Sorry, page not found!");
});




//Port Listener
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server running!");
});













