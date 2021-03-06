

/*

Parallax package

2017 Christopher Polito v2.0

*/




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


	    var $el = $("#" + $scope.scroll);
		var inner;
		var img;
		var mover;
		var total;
		var top;
		var shift;
		var offset;
		var active = false;

		var setup = function () {

			if ($scope.src && !$scope.inner) {

				active = true;

				inner = document.createElement("div");
				$(inner).addClass("absolute height150 width black-back z-minus-100");
				$(element).append(inner);


				img = document.createElement("img");
				$(img).addClass("absolute height80 width-auto center");
				img.src = $scope.src;
				$(inner).append(img);

				mover = img;

				//console.log("parallax: image");

			}
			else if ($scope.inner && !$scope.src) {

				active = true;

				inner = $(element).find("#" + $scope.inner)[0];
				//console.log("parallax: no image, inner id is: " + inner.id);
				mover = inner;
			}

			shift = ($(inner).height() - $(mover).height())/2*1600/$el.height();
		}

		var reset = function () {
			if (img) {
				fix({img:$(img), space:$(element), first:true});
				mover = img;
			}
			total = $(mover).height()*$(mover).height()/1600*0.8;
			//console.log("version2");
		}

		var scroll = function () {
			if (device.valid() && active) {

				var o = $(element).offset().top;
				var h = $el.height();

				if ($scope.top) top = -o*0.99;
				else top = -o/h*total - shift;

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
			src:"@",
			inner:"@",
			scroll:"@",
			top:"="
		},
		link:link
	};

}]);