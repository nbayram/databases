const mysql = require('mysql');
const { promisify } = require('util');

const connection = mysql.createConnection({
  user: 'hyfuser',
  password: 'hyfpassword',
  host: 'localhost'
});

const connect = promisify(connection.connect.bind(connection));
const execQuery = promisify(connection.query.bind(connection));

const projects = [
  {
    proj_name: 'Project-1',
    starting_date: new Date(),
    ending_date: new Date()
  },
  {
    proj_name: 'Project-2',
    starting_date: new Date(),
    ending_date: new Date()
  },
  {
    proj_name: 'Project-3',
    starting_date: new Date(),
    ending_date: new Date()
  },
  {
    proj_name: 'Project-4',
    starting_date: new Date(),
    ending_date: new Date()
  },
  {
    proj_name: 'Project-5',
    starting_date: new Date(),
    ending_date: new Date()
  },
  {
    proj_name: 'Project-6',
    starting_date: new Date(),
    ending_date: new Date()
  },
  {
    proj_name: 'Project-7',
    starting_date: new Date(),
    ending_date: new Date()
  },
  {
    proj_name: 'Project-8',
    starting_date: new Date(),
    ending_date: new Date()
  },
  {
    proj_name: 'Project-9',
    starting_date: new Date(),
    ending_date: new Date()
  },
  {
    proj_name: 'Project-10',
    starting_date: new Date(),
    ending_date: new Date()
  }
];

const employees = [
  {
    emp_name: 'Employee-1',
    salary: 12.35,
    reports_to: null,
  },
  {
    emp_name: 'Employee-2',
    salary: 12.35,
    reports_to: 1,
  },
  {
    emp_name: 'Employee-3',
    salary: 12.35,
    reports_to: 1,
  },
  {
    emp_name: 'Employee-4',
    salary: 12.35,
    reports_to: null,
  },
  {
    emp_name: 'Employee-5',
    salary: 12.35,
    reports_to: 4,
  },
  {
    emp_name: 'Employee-6',
    salary: 12.35,
    reports_to: 4,
  },
  {
    emp_name: 'Employee-7',
    salary: 12.35,
    reports_to: 4,
  },
  {
    emp_name: 'Employee-8',
    salary: 12.35,
    reports_to: 4,
  },
  {
    emp_name: 'Employee-9',
    salary: 12.35,
    reports_to: 1,
  },
  {
    emp_name: 'Employee-10',
    salary: 12.35,
    reports_to: 1,
  }
];

const departments = [
  {
    dept_name: 'Department-1',
    manager: 4
  },
  {
    dept_name: 'Department-2',
    manager: 6
  },
  {
    dept_name: 'Department-3',
    manager: 7
  },
  {
    dept_name: 'Department-4',
    manager: 8
  },
  {
    dept_name: 'Department-5',
    manager: 3
  },
  {
    dept_name: 'Department-6',
    manager: 9
  },
  {
    dept_name: 'Department-7',
    manager: 1
  },
  {
    dept_name: 'Department-8',
    manager: 10
  },
  {
    dept_name: 'Department-9',
    manager: 2
  },
  {
    dept_name: 'Department-10',
    manager: 5
  }
];

const main = async () => {
  try {
    // Connect to the db
    await connect();

    // Create a database called company
    execQuery('CREATE DATABASE IF NOT EXISTS company');

    // switch to company db
    await execQuery('USE company');

    // Create a table called Employees with the following fields (emp_no, emp_name, salary and reports_to)
    await execQuery(`CREATE TABLE IF NOT EXISTS Employees(emp_no int primary key auto_increment, emp_name varchar(50), salary float, reports_to int, foreign key (reports_to) references Employees(emp_no))`);

    // Create a table called Departments with the following fields (dept_no, dept_name and manager)
    await execQuery(`CREATE TABLE IF NOT EXISTS Departments(dept_no int primary key auto_increment, dept_name varchar(255), manager int, foreign key (manager) references Employees(emp_no))`);

    // Create a table called Projects with the following fields (proj_no, proj_name, starting_date, ending_date)
    await execQuery(`CREATE TABLE IF NOT EXISTS Projects(proj_no int primary key auto_increment, proj_name varchar(255), starting_date datetime, ending_date datetime)`);

    // Add new projects
    projects.forEach(async project => {
      await execQuery('INSERT INTO Projects SET ?', project);
    });

    employees.forEach(async emp => {
      await execQuery('INSERT INTO Employees SET ?', emp);
    });

    departments.forEach(async dep => {
      await execQuery('INSERT INTO Departments SET ?', dep);
    });

  } catch (err) {
    console.error(err);
  } finally {
    connection.end();
  }
};

main();