
/***********************************************************************************
  
		Utility Module v4.0

		JavaScript library with no other dependencies	

		contains several general functions for

		device type identification
		a utility with common functions across any project
		

		Methods with Class, LLC, 2016


***********************************************************************************/



(function (window) {

	// var mcshared = {};

	var desktop = "desktop";
	var mobile = "mobile";
	var ie = "internet explorer";

	var _mobile = false;

	// force the following checks to return true, render the mobile site on desktop for debugging purposes
	var forceMobile = function () {
		_mobile = true;
	}

	// blanket check for any mobile vs desktop user agent
	var checkMobile = function(forceMobile) {
		var check = false;
		(function(a,b){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);

		if (mcshared._mobile) return true;

		return check;
	}

	// distinguish between a few popular mobile user agents, desktop agents, and IE
	var whatDevice = function (forceMobile) {

		if (mcshared._mobile) return mobile;
		else if(navigator.userAgent.match(/Android/i) ||
	            navigator.userAgent.match(/webOS/i) ||
	            navigator.userAgent.match(/iPhone/i) ||
	            navigator.userAgent.match(/iPod/i) ||
	            navigator.userAgent.match(/iPad/i) ||
	            navigator.userAgent.match(/Blackberry/i) ) {

			return mcshared.mobile;
		}
		else if (navigator.userAgent.indexOf('Firefox') != -1 || navigator.userAgent.indexOf('Chrome') != -1 || navigator.userAgent.indexOf('Safari') != -1) {

			return mcshared.desktop;
		}
		else

			return mcshared.ie;

	}

	// wrapper for the above function
	var isMobile = function () {
		return checkMobile();
	}

	// wrapper for the above function
	var checkDevice = function () {
	 	return whatDevice();
	}

	// boolean check whether the device is in portait or lanscape view
	var isPortrait = function () {

		var width = $(window).width();
		var height = $(window).height();

		//console.log("width " + width + " height " + height);

		if (width < height) {
			return true;
		}

		return false;
	}

	// if you want to retrieve data from an object depending on state, name your keys "port" and "land", then call this function
	var getOrientation = function () {

		if (isPortrait()) {
			return {
				is:"port",
				isNot:"land"
			}
		}
		else {
			return {
				is:"land",
				isNot:"port"
			}
		}
	}

	var sum = function (array, $callback) {

		var sum = 0;

		var callback = function (value, index, array) {

			return value;
		}

		if ($callback) callback = $callback;

		for (var i in array) {

			sum += callback(array[i], i, array);
		}

		return sum;
	}

	var average = function (array, $callback) {

		var total = sum(array, $callback);

		return total/array.length;
	}

	var value = function (value, index, array) {
		return value;
	}

	var truncate = function (number, decimal) {
			
		var value = Math.floor(number*Math.pow(10, decimal))/Math.pow(10, decimal);
		
		return value;
	}

	var round = function (number, order) {

		var value = Math.round(number/order)*order;

		return value;
	}

	var resolveDigitString = function (digit) {
			
		if (digit < 10) {
			return "0" + digit;	
		}
		else {
			return "" + digit;	
		}
	}

	var last = function (array) {

    	return array[array.length-1];
	}

	var first = function (array) {

		return array[0];
	}

	var log = function(x, num) {
		return Math.log(x) / Math.log(num);
	}

	var exp = function (x) {

		return Math.exp(x);
	}

	var leadingzeros = function (number, zeros) {
			
		if (!zeros) zeros = 1;

		var digits = Math.floor(log(number*10, 10));
		var total = Math.floor(log(zeros, 10)) - digits;
		var leading = "";
		var i = 0;
		for (var i = 0; i <= total; i++) {
			leading += "0";
		}

		console.log(leading + digit);

		return leading + digit;
	}

	var shuffle = function (array) {
		var currentIndex = array.length, temporaryValue, randomIndex;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {

			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}

	  	return array;
	}


	// standard sort algorithm
	var sort = function (array, which, key) {

        var temp;

        var check = which == "asc" ? ((key ? array[j][key] : array[j]) > (key ? array[i][key] : array[i])) : ((key ? array[j][key] : array[j]) < (key ? array[i][key] : array[i]))

        for (var i in array) {

            for (var j in array) {
                if (check) {
                    temp = array[i];
                    array[i] = array[j];
                    array[j] = temp;
                }
            }
        }

        return array;

    }


	// generally solves a system of two linear equations of the form y = mx + b
	// inputs are two sets of y and x points, returns slope, m, and y = b when x = 0
	var linear = function (params) {

		var y1 = params.y1;
		var y2 = params.y2;
		var x1 = params.x1;
		var x2 = params.x2;
		var m;
		var b;

		if (x2 != x1) {
			m = (y2-y1)/(x2-x1);
			b = x1*m + y1;
		}
		else {
			m = 0;
			b = 0;
		}

		return {
			m:m,
			b:b
		}

	}

	var waitForElem = function (options, complete) {

        var count = 0;
        var result = false;
        var active = {}

        var checkElements = function (array) {

        	result = false;
        	active = {};

        	if (Array.isArray(array)) {

        		// console.log("###################\n\n\n\n\n\narray is array \n\n\n\n\n\n################")

        		for (var i in array) {

        			// console.log("element", array[i], "does not exist");

	        		if ($(array[i])[0]) {
	        			active[i] = true;
	        		}

        		}


	        	if (Object.keys(active).length < array.length-1) {

	        		result = true;
	        	}
	        	else {
	        		result = false;
	        	}

        	}
        	else {

        		// console.log("@@@@@@@@@@@@@@@@\n\n\n\n\n\n\n\n\array is single\n\n\n\n\n\n@@@@@@@@@@@@@@")

        		if ($(array)[0]) {
        			// console.log("element does not exist");
        			result = true;
        		}
        		else {
        			result = false;
        		}

        	}

        	return result;
        }

        var waitTimer = setInterval(function () {

            if (checkElements(options.elems) || count >= 500) {

            	// console.log("clear interval");

                clearInterval(waitTimer);
                waitTimer = null;

                if (count < 500) {

                	// console.log("run complete");
                    
                    if (typeof complete === "function") complete(options);
                }
                else {

                	// console.log("count limit reached");
                }
                
            }
            else {

                count++;
            }

        }, 30);
    }

	window.mcutil = {
		forceMobile:forceMobile,
		isMobile:isMobile,
		checkMobile:checkMobile,
		truncate:truncate,
		average:average,
		sum:sum,
		value:value,
		truncate:truncate,
		round:round,
		resolveDigitString:resolveDigitString,
		last:last,
		first:first,
		log:log,
		exp:exp,
		leadingzeros:leadingzeros,
		shuffle:shuffle,
		sort:sort,
		linear:linear,
		waitForElem:waitForElem
	}


})(window);