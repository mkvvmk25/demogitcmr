let mysql = require("mysql2/promise");
let dotenv = require("dotenv");
dotenv.config();
console.log(process.env.DB_HOST, "✅✅✅✅");

let pool = mysql.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER_NAME,
	password: process.env.DB_USER_PASS,
	database: process.env.DB_NAME,
	connectionLimit: 10,
});

module.exports = pool;
