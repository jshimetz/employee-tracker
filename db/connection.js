const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'employee_db'
});
// Update employee manager
function updateEmployeeManager(employeeId, newManagerId) {
    return new Promise((resolve, reject) => {
      connection.query(
        `UPDATE employee SET manager_id = ? WHERE id = ?`,
        [newManagerId, employeeId],
        (err, res) => {
          if (err) reject(err);
          resolve();
        }
      );
    });
  }
// View employees by manager
function getEmployeesByManager(managerId) {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
        FROM employee e
        INNER JOIN role r ON e.role_id = r.id
        INNER JOIN department d ON r.department_id = d.id
        LEFT JOIN employee m ON e.manager_id = m.id
        WHERE e.manager_id = ?`,
        [managerId],
        (err, res) => {
          if (err) reject(err);
          resolve(res);
        }
      );
    });
  }
// View employees by department
function getEmployeesByDepartment(departmentId) {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
        FROM employee e
        INNER JOIN role r ON e.role_id = r.id
        INNER JOIN department d ON r.department_id = d.id
        LEFT JOIN employee m ON e.manager_id = m.id
        WHERE d.id = ?`,
        [departmentId],
        (err, res) => {
          if (err) reject(err);
          resolve(res);
        }
      );
    });
  }
// Delete department
function deleteDepartment(departmentId) {
    return new Promise((resolve, reject) => {
      connection.query(
        `DELETE FROM department WHERE id = ?`,
        [departmentId],
        (err, res) => {
          if (err) reject(err);
          resolve();
        }
      );
    });
  }
  
  // Delete role
  function deleteRole(roleId) {
    return new Promise((resolve, reject) => {
      connection.query(
        `DELETE FROM role WHERE id = ?`,
        [roleId],
        (err, res) => {
          if (err) reject(err);
          resolve();
        }
      );
    });
  }
  
  // Delete employee
  function deleteEmployee(employeeId) {
    return new Promise((resolve, reject) => {
      connection.query(
        `DELETE FROM employee WHERE id = ?`,
        [employeeId],
        (err, res) => {
          if (err) reject(err);
          resolve();
        }
      );
    });
  }
// View total utilized budget of a department
function getDepartmentBudget(departmentId) {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT d.name AS department, SUM(r.salary) AS utilized_budget
        FROM employee e
        INNER JOIN role r ON e.role_id = r.id
        INNER JOIN department d ON r.department_id = d.id
        WHERE d.id = ?
        GROUP BY d.name`,
        [departmentId],
        (err, res) => {
          if (err) reject(err);
          resolve(res);
        }
      );
    });
  }
          

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to the database as id ' + connection.threadId);
});

module.exports = connection;
