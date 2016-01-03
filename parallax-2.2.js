
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
				//$(inner).addClass("absolute height150 width black-back z-minus-50");
				$(element).append(inner);

				$(inner).css({
					position:"absolute", 
					height:"150%", 
					width:"100%", 
					backgroundColor:"black", 
					zIndex:-50, 
					opacity:0.99
				});

				img = document.createElement("img");
				//$(img).addClass("absolute height80 width-auto center");
				img.src = $scope.src;
				$(inner).append(img);

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
				inner = $(element).find("#" + $scope.inner)[0];
			}

			sh = $(element).height();
			ph = $(inner).height();
		}



		var reset = function () {
			if (img) {
				fix({img:$(img), space:$(element), first:true});
			}
			ih = img ? $(img).height() : ph*0.8;
			g = (ph-ih)/2;
			h = $el.height();

			//console.log("sh:" + sh + " ph:" + ph + " ih:" + ih + " g:" + g + " h:" + h);

			if ($scope.top) {
				eqs = {m:-0.99, b:-1*(ph-sh)/2}
			}
			else if (ih < h) {

				eqs = linear({
					x1:2,
					y1:-1*g,

					x2:h-sh+2,
					y2:sh-ih-g
				});
			}
			else {
				eqs = {m:-0.99, b:-1*(ph-h)/2};
			}

			console.log("m:" + eqs.m + " b:" + eqs.b);
			
			
		}

		var scroll = function () {
			if (device.valid() && active) {

				o = $(element).offset().top - $el.offset().top;

				top = o*eqs.m + eqs.b;

				$(inner).css({top:top});
			}

			//console.log("version");
		}

		setTimeout(function () {
			setup();
		}, 200);

		setTimeout(function () {
			reset();
			scroll();
		}, 500)

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