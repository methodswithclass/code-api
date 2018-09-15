

var gulp = require("gulp");
var merge = require("merge-stream");
var imagemin = require('gulp-imagemin');

var htmlDest = "dist/";

var mainScripts = [
   	"src/assets/js/supporting-code.js",
    "api/parallax/5.0/parallax.js",
    "api/shared/2.0/shared.js",
    "src/state/stateModule.js",
    "src/app.js",
    "src/**/*.js"
]


var sassStyles = [
	"api/classes/2.0/classes.scss",
	"src/assets/css/styles.scss"
]


var cssStyles = [
	'temp/**/*.css',
	"node_modules/@fortawesome/fontawesome-free/css/all.css"
]


var shimFile = "node_modules/@babel/polyfill/dist/polyfill.js";


var vendorScripts = [
	"node_modules/jquery.scrollto/jquery.scrollTo.js"
]


var miscSrc = [
	'src/assets/config/**/*.*'
]


// var minify = process.env.NODE_ENV == "production";

var minify = {
	main:{
		full:{
			make:true,
			inject:false
		},
		min:{
			make:false,
			inject:true
		}
	},
	vendor:{
		full:{
			make:true,
			inject:true
		},
		min:{
			make:false,
			inject:false
		}
	}
}



var livereloadPort = 4120;


module.exports = {
	gulp:{
		shimFile:shimFile,
		htmlDest:htmlDest,
		mainScripts:mainScripts,
		vendorScripts:vendorScripts,
		sassStyles:sassStyles,
		cssStyles:cssStyles,
		miscSrc:miscSrc,
		minify:minify
	},
	livereloadPort:livereloadPort
}



