const express = require('express');
const mysql = require('mysql');
const {
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

app.get('/createDepartmentTable', (req, res) => {
  let sql = `CREATE TABLE IF NOT EXISTS departments (
    dept_number INT PRIMARY KEY, 
    title VARCHAR(250), 
    description VARCHAR(250), 
    address VARCHAR(250))`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.table(result);
    res.send('Departments table created...');
  });
});

departments.forEach(department => {
  let sql = 'INSERT INTO departments SET ?';
  db.query(sql, department, (err, result) => {
    if (err) {
      throw err;
    }
    console.table(result);
  });
});

app.listen('3000', () => {
  console.log('Server started on port 3000');
});