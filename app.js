const express = require("express");
require("dotenv").config();
const bodyparser = require("body-parser");
const path = require("path");
const app = express();
const db = require("./database/database");
const Employee = require("./models/employee/Employee");
//

// bodyparser middleware

app.use(bodyparser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(bodyparser.json());

//db connection

db.authenticate()
  .then(function () {
    console.log("database connected successfully");
    return db.sync();
  })
  .catch(function (err) {
    console.log("database error", err);
  });

execPath = process.cwd(); // __dirname

// to access static folders
app.use("/resources", express.static(path.join(execPath, "/resources")));

app.set("views", path.join(execPath, "views"));
app.set("view engine", "jade");

// app.get("/", function (req, res) {
//   res.send("success");
// });
const route = require("./routes");
app.use("/", route);

app.listen(5000);
