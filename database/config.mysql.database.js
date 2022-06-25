const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.MYSQL_CNN_HOST,
  user: process.env.MYSQL_CNN_USER,
  password: process.env.MYSQL_CNN_PASSWORD,
  database: process.env.MYSQL_CNN_DATABASE,
});

const dbMysqlConnection = async (data) => {
  try {
    console.log(data);
    await connection.connect();

    const dbResponse = await connection.query(
      "SELECT 1 + 1 AS solution",
      (err, rows, fields) => {
        if (err) throw err;
        console.log(rows)
        return rows
      }
    );
    // console.log(dbResponse);

    connection.end();

  } catch (error) {
    console.log(error);
    throw new Error("Error de base de datos. MYSQL");
  }
};

module.exports = {
    dbMysqlConnection
}


