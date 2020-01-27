const mysql = require("mysql");
const util = require("util");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "company"
});

const connect = util.promisify(connection.connect.bind(connection));
const renderQuery = util.promisify(connection.query.bind(connection));

async function flatify(dept_no, emp_no) {
  try {
    await connect();
    await renderQuery("BEGIN");

    // Make the employee (identified by the employee number) a manager for the department (identified by the department number)
    // Set all employees in that department to report to this new manager
    const allEmployees = await renderQuery(
      `SELECT emp_no FROM Employees 
        JOIN Departments
        ON Employees.reports_to = Departments.manager
        WHERE dept_no=?`,
      dept_no
    );
    await renderQuery(
      "UPDATE Departments SET manager=? WHERE dept_no=?",
      emp_no,
      dept_no
    );
    allEmployees.forEach(async employee => {
      await renderQuery("UPDATE Employees SET reports_to = ? WHERE emp_no = ?", [
        [emp_no, employee]
      ]);
    });

    await renderQuery("COMMIT");
  } catch (err) {
    console.log(err);
  } finally {
    connection.end();
  }
}

flatify(9, 10);