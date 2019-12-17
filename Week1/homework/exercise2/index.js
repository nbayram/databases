const mysql = require('mysql');
const { promisify } = require('util');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'new_world'
});

const connect = promisify(connection.connect.bind(connection));
const runQuery = promisify(connection.query.bind(connection));

const main = async () => {
  try {
    // Connect to DB
    await connect();

    const query1 = await runQuery('SELECT name, Population FROM country WHERE Population > 8000000;');
    console.table(query1);

    const query2 = await runQuery('SELECT name FROM country WHERE name LIKE "%land%";');
    console.table(query2);

    const query3 = await runQuery('SELECT name, population FROM city WHERE population BETWEEN 500000 AND 1000000;');
    console.table(query3);

    const query4 = await runQuery('SELECT name FROM country WHERE continent = "Europe";');
    console.table(query4);

    const query5 = await runQuery('SELECT name, SurfaceArea FROM country ORDER BY SurfaceArea DESC;');
    console.table(query5);

    const query6 = await runQuery('SELECT name, countrycode from city where countrycode LIKE "NLD";');
    console.table(query6);

    const query7 = await runQuery(`SELECT population, name FROM city WHERE name LIKE 'Rotterdam';`);
    console.table(query7);

    const query8 = await runQuery(`SELECT name, SurfaceArea FROM country ORDER BY SurfaceArea DESC LIMIT 10;`);
    console.table(query8);

    const query9 = await runQuery(`SELECT name, population FROM city ORDER BY population DESC LIMIT 10;`);
    console.table(query9);

    const query10 = await runQuery(`SELECT SUM(population) FROM country;`);
    console.table(query10);

  } catch (err) {
    console.error(err);
  } finally {
    connection.end();
  }
};

main();