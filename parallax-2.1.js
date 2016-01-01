
angular.module("parallaxModule", [])

.factory("device", function () {

	var valid = function() {

		if (navigator.userAgent.indexOf('Firefox') != -1 || navigator.userAgent.indexOf('Chrome') != -1 || navigator.userAgent.indexOf('Safari') != -1) {

			return true;
		}

		return false;
	}

	return {
		valid:valid
	}


})

.directive('parallax', ['device', '$window', function (device, $window) {

	var link = function ($scope, element, attr) {

		var fix = function (params) {

			var img = params.img;
	    	var space = params.space;
	    	var aspect;

			var goodAspect = function (width, height) {
				if (Math.abs(width/height - aspect) < 0.01) return true;
				return false;
			}

			var checkHeight = function (height) {
		        if (height < space.height()) return "under";
		        else if (height > space.height()*1.2) return "over";
		        return "good";
		    }

		    var checkWidth = function (width) {
		        if (width < space.width()) return "under";
		        else if (width > space.width()*1.5) return "over";
		        return "good";
		    }

	    	if ($(img)[0]) {

		    	if (params.first) aspect = img.width()/img.height();

		        var height = space.height()*1.2;
		        var width = height*aspect;
		        
		        if (checkWidth(width) == "under") {
		            //console.log("width under " + name);
		            width = space.width();
		            height = width/aspect;
		            if (checkHeight(height) == "under") {
		                //console.log("height under " + name);
		                height = space.height()*1.2;
		                width = height*aspect;
		            }
		        }
		        else if (checkWidth(width) == "over") {
		            //console.log("width over " + name);
		            width = space.width()*1.2;
		            height = width/aspect;
		            if (checkHeight(height) == "under") {
		                //console.log("height under " + name);
		                height = space.height()*1.2;
		                width = height*aspect;
		            }
		        }

		        img.css({height:height, width:width});
	    	}
	        
	    }

	    var linear = function (params) {

			var y1 = params.y1;
			var y2 = params.y2;
			var x1 = params.x1;
			var x2 = params.x2;
			var frac;
			var m;
			var b;

			// frac = (y1*x2 - y2*x1)/(x2-x1);
			// m = y2/x2 - frac/x1;
			// b = frac*(x2/x1);

			if (o2 != 0) { 
				b = (y1 - y2*(x1/x2))/(1-o1/o2);
				m = (y2-b)/x2;
			}
			else if (o1 != 0) {
				b = y2;
				m = (y1-y2)/x1;
			}
			else {
				console.log("eqs is zero");
				b = 0;
				m = 0;
			}

			return {
				m:m,
				b:b
			}

		}


	    var $el = $("#" + $scope.scroll);
		var inner;
		var img;
		var mover;
		var total;
		var top;
		var shift;
		var offset;
		var active = false;

		var o;
		var sh;
		var ph;
		var ih;
		var h;
		var g;

		var eqs;

		var setup = function () {

			if ($scope.src && !$scope.inner) {

				active = true;

				inner = document.createElement("div");
				$(inner).addClass("absolute height150 width black-back border-white z-minus-50");
				$(element).append(inner);


				img = document.createElement("img");
				$(img).addClass("absolute height80 width-auto center");
				img.src = $scope.src;
				$(inner).append(img);

			}
			else if ($scope.inner && !$scope.src) {
				active = true;
				inner = $(element).find("#" + $scope.inner)[0];
			}

			//shift = ($(inner).height() - $(mover).height())/2*1200/$el.height();
		}



		var reset = function () {
			if (img) {
				fix({img:$(img), space:$(element), first:true});
			}
			sh = $(element).height();
			ph = $(inner).height();
			ih = img ? $(img).height() : ph*0.8;
			g = (ph-ih)/2;
			h = $el.height();

			console.log("top of image: " + g);

			eqs = linear({
				x1:0,
				y1:-1*g,

				x2:h, 
				y2:sh-g
			});
			
			
		}

		var scroll = function () {
			if (device.valid() && active) {

				o = $(element).offset().top - $el.offset().top;

				if ($scope.top) top = -o*0.99;
				else top = o*eqs.m + eqs.b;

				if ($scope.name == "nuplae") {
					console.log("offset: " + o + " top: " + top);
				}

				$(inner).css({top:top});
			}

			//console.log("version");
		}

		setTimeout(function () {
			setup();
			reset();
			scroll();
		}, 300);

		angular.element($window).bind('resize', function () {
			reset();
			scroll();
		});

		$el.bind('scroll', scroll);

	}

	return {
		scope:{
			name:"@",
			src:"@",
			inner:"@",
			scroll:"@",
			top:"="
		},
		link:link
	};

}]);