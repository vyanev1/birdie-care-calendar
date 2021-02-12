var mysql = require("mysql");

const connection = mysql.createConnection({
    host: "birdie-test.cyosireearno.eu-west-2.rds.amazonaws.com",
    user: "test-read",
    //password: process.env.DB_PW,
    password: "xnxPp6QfZbCYkY8",
    database: "birdietest"
});

export default connection;