const express = require("express");
require('dotenv').config();
const bodyparser = require("body-parser")
const path = require("path");
const app = express();
const db = require("./database/database")
const route = require("./routes")

// bodyparser middleware

app.use(bodyparser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(bodyparser.json()); 

//db connection

db.authenticate().then(function(){
    console.log("database connected successfully");
}).catch(function(err){
    console.log("database error",err);
})

execPath = process.cwd(); // __dirname

// to access static folders
app.use("/resources", express.static(path.join(execPath, "/resources")));
app.use("/",route);

app.set("views",path.join(execPath,"views"))
app.set("view engine","jade")


app.listen(5000,function(){
    console.log("app listens on port 5000");
})