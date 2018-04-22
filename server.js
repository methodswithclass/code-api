const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const apiRouter = require("./api-app/api-router");

const middleware = require("./middleware/middleware.js");


const config = require("./config.js");

const sass = require("./node-sass");



var PORTS = {
	heroku:8080,
	http:80,
	livereload:config.livereloadPort,
	misc1:4000,
	misc2:4200,
	misc3:4210
}



sass.render(
{
	file:path.join(__dirname, "http://code.methodswithclass.com/api/classes/2.0/classes.scss"),
	[
		{file:path.join(__dirname, "assets/css/classes.css")}
	]
}, 
function(err, result) { 

	if (err) {
		console.log(err);
	}
	else {
		console.log(result);
	}
});



app.use(middleware.refresh());
if (process.env.NODE_ENV == "production") app.use(middleware.forceSSL());
else {console.log("development environment")}

app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));




app.use(require('connect-livereload')({
	port: PORTS.livereload
}));


app.use("/api", apiRouter);

app.use("/", express.static(path.join(__dirname, "dist")));




var env = process.env.NODE_ENV;
var port;

	
if (process.env.PORT) {
	port = process.env.PORT;
}
else if (env == "production") {

	port = PORTS.heroku;

}
else if (env == "development") {

	port = PORTS.misc2;
}
else {

	port = PORTS.misc1;
}



var listener = app.listen(port, function () {

	console.log("listening on port", listener.address().port);
});



