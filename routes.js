const express = require("express");
const router = express.Router();
const employee_controller = require("./models/employee/controller");

router.get("/", function (req, res) {
  res.render("home");
});

// employee
router.get("/employee", employee_controller.getAllEmployee);
router.post("/addEmployee", employee_controller.addEmployee);
router.post("/updateEmployee/:id", employee_controller.updateEmployee);
router.post("/getEmployeeById/:id", employee_controller.getEmployeeById);

module.exports = router;
