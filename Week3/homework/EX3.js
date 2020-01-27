const mysql = require("mysql");

const conn = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "new_world"
});

conn.connect(err => {
  if (err) console.log(err);
  else console.log("Connection is done!");
});

// Give an example of a value that can be passed as name that would take advantage of SQL-injection (for example, to insert new fake data in the database)
function getPopulation(cityOrCountry, name, cb) {
  conn.query(
    `SELECT Population FROM ${cityOrCountry} WHERE Name = ?`,
    name,
    function (err, result) {
      if (err) cb(err);
      if (result.length == 0) cb(new Error("Not found"));
      else cb(null, result[0].Population);
    }
  );
}

// Rewrite the function so that it is no longer vulnerable to SQL injection
getPopulation("city", `' OR ''='`, (err, result) => {
  if (err) console.log(err);
  else console.log(result);
});