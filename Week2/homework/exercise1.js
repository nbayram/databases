const express = require('express');
const mysql = require('mysql');
const {
  employees
} = require('./data.js');

const app = express();

const db = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword'
});

db.connect(err => {
  if (err) {
    throw err;
  }
  console.log('mysql connected...');
});

app.get('/createdb', (req, res) => {
  let sql = 'CREATE DATABASE IF NOT EXISTS week_2_company';
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Database created...');
  });
});

app.get('/use week_2_company Database', (req, res) => {
  let sql = 'USE week_2_company';
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Changed to week_2_company Database...');
  });
});

app.get('/createEmployeeTable', (req, res) => {
  let sql = `CREATE TABLE IF NOT EXISTS employees (
    employee_no INT PRIMARY KEY AUTO_INCREMENT, 
    full_name VARCHAR(250), 
    salary FLOAT, 
    address VARCHAR(250), 
    manager INT, 
    department_no INT, 
    FOREIGN KEY(manager) REFERENCES employees(employee_no))`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.table(result);
    res.send('Employees table created...');
  });
});

employees.forEach(employee => {
  let sql = `INSERT INTO employees SET ?`;
  db.query(sql, employee, (err, result) => {
    if (err) {
      throw err;
    }
    console.table(result);
  });
});

app.get('/addForeignKey', (req, res) => {
  let sql = 'ALTER TABLE employees ADD Constraint FOREIGN KEY(department_no) REFERENCES departments(dept_number)';
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.table(result);
    res.send('Foreign Key Added...');
  });
});

app.listen('3000', () => {
  console.log('Server started on port 3000');
});