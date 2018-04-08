


var apiExpress = require("express");
var apiRouter = apiExpress.Router();

const path = require("path");



var packagesOnFile = [
{
	name:"accelerometer",
	ext:"js",
	versions:[
	{
		ver:"1.0"
	}
	]
},
{
	name:"classes",
	ext:"css",
	versions:[
	{
		ver:"1.0"
	},
	{
		ver:"2.0"
	}
	]

},
{
	name:"console",
	ext:"js",
	versions:[
	{
		ver:"1.0"
	}
	]
},
{
	name:"parallax",
	ext:"js",
	versions:[
	{
		ver:"1.0"
	},
	{
		ver:"2.0"
	},
	{
		ver:"2.1"
	},
	{
		ver:"2.2"
	},
	{
		ver:"3.0"
	}
	]
},
{
	name:"shared",
	ext:"js",
	versions:[
	{
		ver:"1.0"
	},
	{
		ver:"2.0"
	},
	{
		ver:"2.1"
	},
	{
		ver:"3.0"
	}
	]
},
{
	name:"mcglobal",
	ext:"js",
	versions:[
	{
		ver:"1.0"
	}
	]
},
{
	name:"mcshared",
	ext:"js",
	versions:[
	{
		ver:"1.0"
	}
	]
}
]


var getDataFromArray = function (packageName) {


	var version = "1.0";
	var ext = "js";


	var found = packagesOnFile.find((p) => {

		return p.name == packageName;
	})

	if (found) {
		var temp = found.versions;

		version = temp[temp.length -1].ver;
		ext = found.ext;
	}

	return {
		version:version,
		ext:ext
	}

}


var getDataFromString = function (str) {

	var versionArray = str.split(".");
	var version = "";
	var ext;

	versionArray.map((value, index, array) => {

		if (index == array.length - 1) {

			ext = value;
		}
		else {

			version += value;

			if (index <= array.length - 3) {
				version += ".";
			}
		}
	})


	return {
		version:version,
		ext:ext
	}

}



var forwardAddress = function (req) {

	console.log("\nurl is", req.url);

	var urlArray = req.url.split("/");
	var package;
	var packageName;
	var packageArray;
	var version;
	var ext;
	var dashIndex;
	var periodIndex;

	// console.log("url array", urlArray);


	if (urlArray.length <= 2) {


		packageName = urlArray[1];


		dashIndex = packageName.search("-");
		periodIndex = packageName.search(".");


		if (dashIndex != -1) {
			
			console.log("dash");

			packageArray = packageName.split("-");

			package = packageArray[0];

			var temp = getDataFromString(packageArray[1]);

			version = temp.version;
			ext = temp.ext;

		}
		else {

			console.log("no dash");

			packageArray = packageName.split(".");

			package = packageArray[0];
			ext = packageArray[1];
			
			var temp = getDataFromArray(package);

			version = temp.version;

		}


		return [package, version, package + "." + ext];
	}
	else {
		return req.url;
	}

}


var urlString = function (url) {


	var path = "";

	if (Array.isArray(url)) {

		url.map((value, index) => {

			path += "/" + value;
		})
	}
	else {

		path = url;
	}


	return path;
}


apiRouter.use(function (req, res, next) {


	var url = forwardAddress(req);
	var path;

	console.log("forward url:", url);
	
	if (Array.isArray(url)) {

		console.log("url", url);

		// path = path.join(urlString(url));

		path = "/api" + urlString(url);

		console.log("forward path", path);

		res.redirect(path);
	}
	else {
		next();
	}
	
});



module.exports = apiRouter;