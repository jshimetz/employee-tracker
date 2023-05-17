const express = require('express');
const app = express();
const DB = require('./db/DB');

// Prompt for updating employee manager
{
  type: "list",
  name: "updateEmployeeManager",
  message: "Select an employee to update their manager:",
  choices: employeeChoices
},
{
  type: "list",
  name: "newManager",
  message: "Select a new manager for the employee:",
  choices: employeeChoices
}

// Prompt for viewing employees by manager
{
  type: "list",
  name: "viewEmployeesByManager",
  message: "Select a manager to view their employees:",
  choices: employeeChoices
}

// Prompt for viewing employees by department
{
  type: "list",
  name: "viewEmployeesByDepartment",
  message: "Select a department to view its employees:",
  choices: departmentChoices
}

// Prompt for deleting departments, roles, and employees
{
  type: "list",
  name: "deleteOption",
  message: "Select an option to delete:",
  choices: ["Delete Department", "Delete Role", "Delete Employee"]
}

// Prompt for viewing department budget
{
  type: "list",
  name: "viewDepartmentBudget",
  message: "Select a department to view its total utilized budget:",
  choices: departmentChoices
}


app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
