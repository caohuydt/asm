var express = require("express");                        
var app = express();

app.use(express.static("public"));
app.set("view engine","ejs");                 
app.set("views","./views");    
app.listen("6969");
console.log("I am sever. weather to now...");

app.get("/",function(req,res){
    res.render("homepage");
})