let express = require("express");
let authRouter = require("./routes/authRouter");

let app = express();
// app.use((req, res, next) => {});
app.use(express.json());
// app.use((req, res, next) => {
// 	console.log("1234");

// 	// next(new Error("qwerty"));
// 	next();
// });
// app.use((req, res, next) => {
// 	console.log("12");

// 	next();
// });

app.use("/auth", authRouter);

app.use((err, req, res, next) => {
	res.status(500).json({
		status: "fail from Global error handler updates",
		msg: err.message,
	});
});

module.exports = app;
