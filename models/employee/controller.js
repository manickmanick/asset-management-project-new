const employee = require("./Employee");
module.exports = {
  getAllEmployee: function (req, res) {
    employee
      .findAll({})
      .then(function (result) {
        res.status(200).send(result);
      })
      .catch(function (err) {
        console.log(err);
        res.status(400).send("Error while fetching data", err);
      });
  },
  addEmployee: function (req, res) {
    const { name, active } = req.body;
    employee
      .create({
        name,
        active,
      })
      .then((result) => {
        console.log("New employee created:", result);
        res.status(200).send("New employee created successfully");
      })
      .catch((err) => {
        console.error("Error creating a new employee:", err);
        res.status(500).send("Error creating a new employee");
      });
  },
  updateEmployee: function (req, res) {
    var id = req.params.id;
    const { name, active } = req.body;
    employee
      .update(
        {
          name,
          active,
        },
        {
          where: { id },
        },
      )
      .then((rowsUpdated) => {
        if (rowsUpdated > 0) {
          console.log("employee updated successfully");
          res.status(200).send("employee updated successfully");
        } else {
          console.log("No employee found with the given ID");
          res.status(404).send("No employee found with the given ID");
        }
      })
      .catch((err) => {
        console.error("Error updating the employee:", err);
        res.status(500).send("Error updating the employee");
      });
  },
  getEmployeeById: function (req, res) {
    var empid = parseInt(req.params.id);
    employee
      .findOne({
        where: { id: empid },
      })
      .then((employee) => {
        if (!employee) {
          // If no employee is found, return an error response
          return res.status(404).send("Employee not found");
        }

        // If an employee is found, send the employee data as the response
        res.status(200).json(employee);
      })
      .catch((err) => {
        console.error("Error fetching employee data by ID:", err);
        res.status(500).send("Error fetching employee data by ID");
      });
  },
};
