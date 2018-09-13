


/* __________________________________________________________


Utility 


/* __________________________________________________________ */

var packagesOnFile = [
{
	name:"accelerometer",
	ext:"js",
	versions:[
	{
		ver:"1.0"
	},
	{
		ver:"1.1"
	},
	{
		ver:"1.2"
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
	name:"evolve",
	ext:"js",
	versions:[
	{
		ver:"1.0"
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
	},
	{
		ver:"4.0"
	},
	{
		ver:"5.0"
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
	},
	{
		ver:"4.0"
	},
	{
		ver:"4.6.1"
	},
	{
		ver:"5.0"
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


var getDataFromArray = function (fileName) {


	var version = "1.0";
	var ext = "js";


	var found = packagesOnFile.find((p) => {

		return p.name == fileName;
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

	console.log("version array", versionArray);

	versionArray.map((value, index, array) => {


		const lastIndex = array.length - 1;

		if (index == lastIndex) {

			ext = value;
		}
		else {

			if (value)

			version += value + ".";

			if (index == lastIndex - 2) {
				version = version.substr(0, version.length-1);
			}

			if (index == 0 && array.length == 2) {
				version += "0"
			}

		}
	})


	return {
		version:version,
		ext:ext
	}

}




/*___________________________________________________________________*/




var forwardAddress = function (req) {

	console.log("\nurl is", req.url);

	var urlArray = req.url.split("/");
	
	var pack;
	var version;
	var ext;

	var fileName = urlArray[2];
	var fileArray = fileName.split((fileName.indexOf("-") > -1) ? "-" : ".")

	console.log("fileName", urlArray, fileName, fileArray);


	if (fileName.indexOf(".") > -1) {


		if (fileName.indexOf("-") > -1) {
			
			console.log("dash exists");

			

			pack = fileArray[0];

			var temp = getDataFromString(fileArray[1]);
			version = temp.version;
			ext = "." + temp.ext;


		}
		else {

			console.log("no dash");

			pack = fileArray[0];

			ext = "." + fileArray[1];
			var temp = getDataFromArray(pack);
			version = temp.version;

		}


		return {
			package:pack,
			version:version,
			file:pack + ext,
			order:["package", "version", "file"]
		};
	}
	else {
		return req.url;
	}

}


var urlString = function (urlObj) {


	var path = "";

	if (typeof urlObj === "object") {

		// path = urlObj["package"] + "/" + urlObj["version"] + "/" + urlObj["file"];

		urlObj.order.map((value, index) => {

			path += "/" + urlObj[value];
		});
	}
	else {

		path = url;
	}


	return path;
}



module.exports = {
	forwardAddress:forwardAddress,
	urlString:urlString
}