/***********************************************************************************
  
		Parallax Module v2.1

		AngularJS library with no other dependencies	

		scrolls an image or DOM element at reduced rate compared to document scroll. 
		Takes image source or child element as input.

		contents:
		parallax scrolling directive


		Methods with Class, LLC, 2015


***********************************************************************************/



// import this module into your project
var parallax = angular.module("parallaxModule", []);


// determines whether current device can use parallax scrolling. IE and mobile devices return false.
parallax.factory("util", function () {

	var valid = function() {

		if (navigator.userAgent.indexOf('Firefox') != -1 || navigator.userAgent.indexOf('Chrome') != -1 || navigator.userAgent.indexOf('Safari') != -1) {

			return true;
		}

		return false;
	}

	var waitForElem = function (options, complete) {

		var c = {
			noexist:"noexist",
			found:"found",
			notfound:"notfound"
		}

        var count = 0;
        var result = false;
        var active = []

        var checkElements = function (array) {

        	if (array === undefined || array === null) {
        		return c.noexist;
        	}

        	result = c.found;
        	active = [];

        	if (Array.isArray(array)) {

        		// console.log("###################\n\n\n\n\n\narray is array \n\n\n\n\n\n################")

        		for (var i in array) {

        			// console.log("element", array[i], "does not exist");

	        		if ($(array[i])[0]) {
	        			active.push(true);
	        		}

        		}


	        	if (active.length >= array.length) {

	        		result = c.found;
	        	}
	        	else {
	        		result = c.notfound;
	        	}

        	}
        	else {

        		// console.log("@@@@@@@@@@@@@@@@\n\n\n\n\n\n\n\n\array is single\n\n\n\n\n\n@@@@@@@@@@@@@@")

        		if ($(array)[0]) {
        			// console.log("element does not exist");
        			result = c.found;
        		}
        		else {
        			result = c.notfound;
        		}

        	}

        	return result;
        }

        var stopTimer = function () {

        	clearInterval(waitTimer);
            waitTimer = null;
        }

        var waitTimer = setInterval(function () {


        	if (checkElements(options.elems) == c.noexist) {
        		stopTimer();
        	}
			else if (checkElements(options.elems) == c.found || count >= 500) {

            	// console.log("clear interval");

            	stopTimer();

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

	return {
		valid:valid,
		waitForElem:waitForElem
	}


});


// add this directive to the element you want to add a parallax scrolling element too
parallax.directive('parallax', ['util', '$window', function (u, $window) {


	// link function, see below for parameters
	var link = function ($scope, element, attr) {


		// adjusts the size of the image (defined in the directive 'src') to always be bigger than the parent
		var fixInside = function (params) {

			var $i = params.inside;
	    	var $s = params.space;
	    	
	    	var $iw = $i.width;
	    	var $ih = $i.height;
	    	var $sw = $s.width;
	    	var $sh = $s.height;

	    	var $ar = $iw/$ih;

			var goodAspect = function (width, height) {
				if (Math.abs($iw/$ih - $ar) < 0.01) return true;
				return false;
			}

			var checkHeight = function ($h) {
		        if ($h < $sh) return "under";
		        else if ($h > $sh*1.2) return "over";
		        return "good";
		    }

		    var checkWidth = function ($w) {
		        if ($w < $sw) return "under";
		        else if ($w > $sw*1.2) return "over";
		        return "good";
		    }

	        var $h = $sh*1.2;
	        var $w = $h*$ar;
	        
	        if (checkWidth($w) != "good") {
	            $w = $sw*1.2;
	            $h = $w/$ar;
	            if (checkHeight($h) == "under") {
	                $h = $sh*1.2;
	                $w = $h*$ar;
	            }
	        }

	        // console.log("adjust image", $w, $h);

	        return {
	        	width:$w,
	        	height:$h
	        }

	    }

	    // generally solves a system of two linear equations 
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


	    var $el = $("#" + $scope.scroll);
		var inner;
		var img;
		var top;
		var active = false;
		var factor = $scope.factor ? $scope.factor : 1;

		var o;
		var sh;
		var ph;
		var ih;
		var h;
		var g;

		var eqs;

		// if src is defined, add the image to the parent div dynamically, called when loaded
		var setup = function ($options, complete) {

			$(element).css({
				overflow:"hidden"
			});

			if ($scope.src && !$scope.inner) {

				active = true;


				inner = document.createElement("div");
				$(element).append(inner);

				// container div is always 150% taller than parent to allow enough room to parallax scroll
				$(inner).css({
					position:"absolute", 
					height:"150%", 
					width:"100%", 
					backgroundColor:"black", 
					zIndex:-50, 
					opacity:0.99
				});

				img = document.createElement("img");
				img.src = $scope.src;
				img.id = $scope.imgId;
				$(inner).append(img);


				// image is centered with in container, this is what is adjusted by fix()
				$(img).css({
					position:"absolute", 
					height:"80%", 
					width:"auto", 
					top:"50%", 
					left:"50%",
					"margin-right":"-50%",
					transform: 'translate(-50%, -50%)',
 					MozTransform: 'translate(-50%, -50%)',
 					WebkitTransform: 'translate(-50%, -50%)',
 					msTransform: 'translate(-50%, -50%)'
					
				});

			}
			else if ($scope.inner && !$scope.src) {
				active = true;
				inner = $(element).find($options.elems[1])[0];
			}

			sh = $(element).height();
			ph = $(inner).height();

			if (typeof complete === "function") complete();
		}



		// get parallax scroll parameters, solve linear equation for current values, called when loaded and anytime the window is resized
		var reset = function ($options) {

			var xBuffer = 100;
			var yBuffer = 20;


			var $inner = $options.elems[1];

			var getEqs = function ($ih) {

				g = (ph-$ih)/2;
				h = $($options.elems[0]).height();

				// console.log($scope.name, "sh:" + sh + " ph:" + ph + " ih:" + $ih + " g:" + g + " h:" + h);

				if (!$scope.top) {

					// console.log("equation", $scope.name ? $scope.name : "", "is linear");

					eqs = linear({
						x1:xBuffer,
						y1:yBuffer,

						x2:h + xBuffer,
						y2:(sh-ph) + yBuffer
					});

				}
				else {
					// console.log("equation", $scope.name ? $scope.name : "", "is simple");
					eqs = {m:-0.99, b:-1*(ph-sh)/2};
				}

				// console.log($scope.name, "m:" + eqs.m + " b:" + eqs.b);

			}

			if (img) {

				// u.waitForElem({elems:$options.elems[1]}, function (options) {

					// var $img = $options.elems[1];

					var ed = fixInside({
						inside:{
							width:$($inner).width(), 
							height:$($inner).height()
						}, 
						space:{
							width:$(element).width(),
							height:$(element).height()
						}
					});

					$($inner).css({width:ed.width, height:ed.height});

					getEqs(ed.height);

				// })
				
			}
			else {

				// console.log("adjust inner", $scope.adjustinner);

				if ($scope.adjustinner) {

					// console.log("adjust inner", $scope.inner);

					// u.waitForElem({elems:$options.elems[1]}, function (options) {

						

						// console.log("fix inside", $inner[0]);

						var ed = fixInside({
							inside:{
								width:$($inner).width(), 
								height:$($inner).height()
							}, 
							space:{
								width:$(element).width(),
								height:$(element).height()
							}
						});

						// console.log("inside fixed", ed.width, ed.height);

						$($inner).css({width:ed.width, height:ed.height});

					// });

				}

				getEqs(ph*0.8);

			}
			
		}

		// changes height of parallax scrolling element based on element offset compared to top of scrolling element
		var scroll = function ($options) {
			// if device is desktop and a parallax scrolling element is defined
			if (u.valid() && active) {

				o = $(element).offset().top;

				// console.log("offset", $scope.name, $(element).offset().top);

				top = o*eqs.m*factor + eqs.b;

				$($options.elems[1]).css({top:top});
			}

			//console.log("version 1 factor: " + factor);
		}


		var runSetup = function ($options, complete) {

			setup($options, complete);
		}

		var runResetAndScroll = function ($options) {

			if ($scope.getParams) {
				$scope.params = $scope.getParams($options);
			}

			reset($options);
			scroll($options);

			$(window).resize(function () {
				reset($options);
				scroll($options);
			});

			// console.log("parallax options", $options, [
			//             {"scroll":$($options.elems[0])[0]},
			//             {"inner":$($options.elems[1])[0])}
			// ]);

			$($options.elems[0]).scroll(function () {

				console.log(($($options.elems[0])[0] ? "parallax" : "no parallax"), "scroll");

				scroll($options);
			});
		}


		var count = 0;
		var paramsTimer;

		console.log("parallax scope", [
		            {"name": $scope.name}, 
		            {"src": $scope.src},
		            {"imgID": $scope.imgId},
		            {"inner": $scope.inner},
		            {"scroll": $scope.scroll},
		            {"top": $scope.top},
		            {"factor": $scope.factor},
		            {"adjustinner": $scope.adjustinner}
		])

		u.waitForElem({elems:"#" + $scope.scroll}, function (options) {

			runSetup(options, function () {
					
				u.waitForElem({elems:[options.elems, "#" + ($scope.inner ? + $scope.inner : $scope.imgId)]}, function ($options) {		
					runResetAndScroll($options);
				})

			});

		})


	}

	return {
		scope:{
			name:"@", 	// identifier. 						optional. debugging
			src:"@",	// image source. 					optional. required if inner is not defined, must be one, can't be both
			imgId:"@", 	// parallax parent element id
			inner:"@", 	// child element    id. 			optional. required if src is not defined, must be one, can't be both
			scroll:"@", // overflow:scroll 	id.			 	required. 
							// this module requires manual element overflow:scroll, 
							// it will not work with only the default window scroll
			top:"=", 	// is top or not 	boolean 		optional. true if the element has a zero offset when loaded
			factor:"=",	// multiplier		number			optional.	mulitplier to adjust speed of parallax effect as desired.
			adjustinner:"=" // to adjust the size of the inner element or not 		boolean
		},
		link:link
	};


}]);