const express = require('express');
const mysql = require('mysql');
const {
  employees,
  departments
} = require('./data.js');

const app = express();

const db = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'week_2_company'
});

db.connect(err => {
  if (err) {
    throw err;
  }
  console.log('mysql connected...');
});

// Q-1 => Write a query that retrieves all employees and their corresponding manager 's full name
app.get('/allEmployeesWithManagerName', (req, res) => {
  let sql = `SELECT emp1.*, 
  emp2.manager AS "manager's_id", emp2.full_name AS "manager's full_name" 
  FROM employees emp1, employees emp2 
  WHERE emp1.manager = emp2.employee_no;`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('All employees and their corresponding managers full name...');
  });
});

//  Q-2 => Write a query that retrieves all employees and their working department title.
// If no employee worked in a specific department, return the department too
app.get('/allEmployeesWithWorkingDepartmentTitle', (req, res) => {
  let sql = `SELECT employees.*, departments.dept_no, departments.title FROM departments 
  LEFT JOIN employees ON employees.department_no = departments.dept_no;`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('All employees and their working department title...');
  });
});

app.listen('3000', () => {
  console.log('Server started on port 3000');
});