
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
		var total;
		var top;
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

				console.log("parallax: image");

			}
			else if ($scope.inner && !$scope.src) {

				active = true;

				inner = $(element).find("#" + $scope.inner)[0];
				console.log("parallax: no image, inner id is: " + inner.id);
			}
		}

		var reset = function () {
			fix({img:$(img), space:$(element), first:true});
			total = 0.4*Math.abs((img ? $(img).height() : $(inner).height()) - $(element).height());
		}

		var scroll = function () {
			if (device.valid() && active) {
				var min = $(element).height()/($el.height() + 2*$(element).height());

				percent = $(element).offset().top/($el.height() + 2*$(element).height());
				percent = percent > 1+min ? 1 : percent;
				percent = percent < -1*min ? 0 : percent;

				if (percent != 0 && percent != 1){
					console.log("percent: " + percent + "window height: " + $el.height());
				}

				top = -total;
				
				//console.log("window top " + el.offset().top);

				$(inner).css({top:top});
			}

			console.log("version");
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
			top:"=",
			position:"@",
			factor:"@"
		},
		link:link
	};

}]);