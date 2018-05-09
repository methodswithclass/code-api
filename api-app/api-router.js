


var apiExpress = require("express");
var apiRouter = apiExpress.Router();

const path = require("path");

const trans = require("./url-transform.js");



apiRouter.use(function (req, res, next) {


	var urlObj = trans.forwardAddress(req);
	var path;

	console.log("forward url:", urlObj);
	
	if (typeof urlObj === "object") {

		console.log("url", urlObj);

		// path = path.join(urlString(url));

		path = "/api" + trans.urlString(urlObj);

		console.log("forward path", path);

		res.redirect(path);
	}
	else {
		next();
	}
	
});



module.exports = apiRouter;