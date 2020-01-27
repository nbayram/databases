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

const updateDatabase = async () => {
  try {
    await connect();

    // Think about how many new tables are needed. skill_id && skill_name
    await renderQuery(`CREATE TABLE IF NOT EXISTS skills (skill_id INT PRIMARY KEY AUTO_INCREMENT, skill_name VARCHAR(20))`);

    // Write a query for each table that needs to be created. Make sure to also specify the correct data types for each column
    await renderQuery(`CREATE TABLE IF NOT EXISTS employee_skills (employee_no INT, skill_id INT, FOREIGN KEY(employee_no) REFERENCES Employees(emp_no), FOREIGN KEY(skill_id) REFERENCES skills(skill_id))`);

    // Add 5 rows to each table. Create the dataset yourself (it needs to be relevant to the table)
    const skills = [
      {
        skill_name: "Product Management"
      },
      {
        skill_name: "React"
      },
      {
        skill_name: "SQL"
      },
      {
        skill_name: "Node.js"
      },
      {
        skill_name: "SCRUM"
      }
    ];

    skills.forEach(async skill => {
      await renderQuery(`INSERT INTO skills SET ?`, skill);
    });
  } catch (err) {
    console.error(err);
  } finally {
    connection.end();
  }
};

updateDatabase();
