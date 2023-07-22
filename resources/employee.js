function fetchAndUpdateEmployee(employeeId) {
  $.ajax({
    url: "http://localhost:5000/getEmployeeById/" + employeeId, // Replace with your API endpoint to get the employee by ID
    method: "POST",
    success: function (data) {
      // Populate the modal with the employee data
      $("#existingEmployeeId").val(data.id);
      $("#existingEmployeeName").val(data.name);
      $("#existingEmployeeActive").val(data.active);
      // Show the modal
      // $("#updateEmployeeModal").modal("show");
    },
    error: function (error) {
      console.error("Error fetching employee data:", error);
    },
  });
}

$(document).ready(function () {
  var dataTable = $("#employee").DataTable({
    ajax: {
      url: "http://localhost:5000/employee", // Replace with your API endpoint
      method: "GET",
      dataSrc: "", // Use an empty string as data source to process the received JSON array directly
    },
    columns: [
      { data: "id", searchable: true }, // Map the 'id' property from the received JSON data to the first column
      { data: "name", searchable: true },
      { data: "active", searchable: true },
      {
        // Add the custom button column
        data: null,
        render: function (data, type, row) {
          // console.log("row", row.length);
          var updateButton =
            '<button type="button" onclick="fetchAndUpdateEmployee(' +
            data.id +
            ')" class="btn btn-primary" data-toggle="modal" data-target="#updateEmployeeModal">Update</button>';
          var successButton =
            // '<button type="button" class="btn btn-outline-success">Add</button>';
            '<button type="button" class="btn btn-success" data-toggle="modal" data-target="#exampleModal">Add</button>';
          return updateButton + " " + successButton;
          //   return '<button type="button" class="btn btn-outline-success">Add</button>';
          //   return '<button onclick="updateGig(' + data.id + ')">Update</button>';
        },
      },
    ],
    initComplete: function (settings) {
      // Check if the table has any data
      const tbody = document.querySelector("#employee tbody");
      if (tbody.rows.length <= 1) {
        $("#exampleModal").modal("show");
      }
    },
  });

  $("#employeeForm").submit(function (event) {
    // event.preventDefaut();
    // Gather form data
    var formData = {
      name: $("#employeeName").val(),
      active: $("#employeeActive").val(),
    };

    $.ajax({
      url: "http://localhost:5000/addEmployee", // Replace with your API endpoint for adding a new gig
      method: "POST",
      data: formData,
      success: function (response) {
        // Handle the successful response from the API
        console.log("New employee added successfully:", response);
        dataTable.ajax.reload();
      },
      error: function (error) {
        // Handle errors from the API
        console.error("Error adding new gig:", error);
      },
    });
  });

  $("#updateEmployeeForm").submit(function (event) {
    // event.preventDefaut();
    var id = $("#existingEmployeeId").val();
    var formData = {
      name: $("#existingEmployeeName").val(),
      active: $("#existingEmployeeActive").val(),
    };

    $.ajax({
      url: `http://localhost:5000/updateEmployee/${id}`, // Replace with your API endpoint for adding a new gig
      method: "POST",
      data: formData,
      success: function (response) {
        // Handle the successful response from the API
        console.log("employee updated successfully:", response);
        dataTable.ajax.reload();
      },
      error: function (error) {
        // Handle errors from the API
        console.error("Error updating employee:", error);
      },
    });
  });
});
