var mysql = require("mysql");

const connection = mysql.createConnection({
    host: "birdie-test.cyosireearno.eu-west-2.rds.amazonaws.com",
    user: "test-read",
    password: process.env.DB_PW,
    database: "birdietest"
});

export default connection;
