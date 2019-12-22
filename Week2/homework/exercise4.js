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

// Q-1 => All department numbers and the number of employees working there.
app.get('/allDepartmentNumbersAndNumberOfEmployees', (req, res) => {
  let sql = `SELECT employees.department_no, COUNT(*) FROM employees 
  RIGHT JOIN departments ON employees.department_no = departments.dept_no GROUP BY  department_no;`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('All department numbers and the number of employees working there....');
  });
});

// Q-2 => Sum of the salaries of all employees.
app.get('/sumOfSalaries', (req, res) => {
  let sql = `SELECT SUM(salary) FROM employees;`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Sum of the salaries of all employees...');
  });
});

// Q-3 => Average of the salaries of all employees.
app.get('/averageOfSalaries', (req, res) => {
  let sql = `SELECT AVG(salary) FROM employees;`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Average of the salaries of all employees....');
  });
});

// Q-4 => Sum of the salaries of the employees per department.
app.get('/sumOfSalariesOfEmployeesPerDepartment', (req, res) => {
  let sql = `SELECT department_no, SUM(salary) FROM employees GROUP BY department_no;`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Sum of the salaries of the employees per department...');
  });
});

// Q-5 => Minimum and maximum od the salaries per department.
app.get('/minAndMaxSalariesPerDepartment', (req, res) => {
  let sql = `SELECT department_no, MIN(salary),MAX(salary) FROM employees GROUP BY department_no;`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Minimum and maximum od the salaries per department...');
  });
});

// Q-6 => For each salary value, return the number of employees paid.
app.get('/theNumberOfEmployeesPaid', (req, res) => {
  let sql = `SELECT salary, COUNT(*) FROM employees GROUP BY salary ORDER BY salary;`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('For each salary value, return the number of employees paid...');
  });
});

app.listen('3000', () => {
  console.log('Server started on port 3000');
});