let pool = require("./../db");
let bcrypt = require("bcrypt");
let jsonwebtoken = require("jsonwebtoken");
module.exports.login = async (req, res, next) => {
	try {
		let user = req.body;
		let dbuser = await pool.query(
			"select email,password from users where email=?",
			[user.email],
		);
		dbuser = dbuser[0];
		if (dbuser.length == 0) {
			throw new Error("no user exixts");
		}
		let exUser = dbuser[0];
		let same = await bcrypt.compare(user.password, exUser.password);
		if (!same) throw new Error("invalid cred");

		// generate jsonwebtoken token
		let token = jsonwebtoken.sign(
			{ email: exUser.email },
			process.env.JWT_SECRET,
			{
				expiresIn: "1h",
			},
		);
		res.json({
			status: "success deva update",
			token: token,
		});

		// pass
	} catch (err) {
		next(err);
	}
	//
};

module.exports.signup = async (req, res, next) => {
	try {
		// i get info
		let user = req.body;
		console.log("34");

		// email exists or not if not
		let dbuser = await pool.query("select 1 from users where email=?", [
			user.email,
		]);
		dbuser = dbuser[0];
		if (dbuser.length > 0) {
			throw new Error("there exist user");
		}

		// hash pass
		let hashpass = await bcrypt.hash(user.password, 10);
		
		let uc = await pool.query(
			`
			insert into users (name, email,password) values (?,?,?)`,
			[user.name, user.email, hashpass],
		);

		//
		res.json({
			status: "success updated 123",
			data: uc[0],
		});
	} catch (err) {
		console.log(err);
		next(err);
	}
};

// module.exports = { login };
