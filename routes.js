const express = require("express");
const router = express.Router();
const employee_controller = require("./models/employee/controller")

router.get("/",function(req,res){
    res.render("home")
})


// employee
router.get("/employee",employee_controller.getAllEmployee)


module.exports = router;