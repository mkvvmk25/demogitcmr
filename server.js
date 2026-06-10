let app = require("./app.js");
let dotenv = require("dotenv");

dotenv.config();
// require("./db.js");
app.listen(3001, "localhost", (err) => {
	if (err) {
		console.log("error in starting app");
	} else {
		console.log(`app is started at ${process.env.PORT_NUM}`);
	}
});
