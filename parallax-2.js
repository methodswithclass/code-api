
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

		var el = $("#" + $scope.scroll);

		var fix = function (params) {

			var goodAspect = function (width, height) {

				if (Math.abs(width/height - aspect) < 0.01) {
					return true;
				}

				return false;
			}

			var checkHeight = function (height) {

		        if (height < space.height()) {

		            return "under";
		        }
		        else if (height > space.height()*1.2) {

		            return "over";
		        }

		        return "good";

		    }

		    var checkWidth = function (width) {

		        if (width < space.width()) {
		            return "under";
		        }
		        else if (width > space.width()*1.5) {

		            return "over";
		        }

		        return "good";
		    }

	    	img = params.img;
	    	space = params.space;

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
		       
		       	
		       	if (checkWidth(width) && checkHeight(height)) {
		       		console.log("image good");
		       		if (goodAspect(width, height)) {
		       			console.log("aspect is good " + name + " " + aspect);
		       		}
		       		else {
			       		console.log("aspect is bad " + name + " " + aspect);
			       	}
		       	}

		        img.css({height:height, width:width});
	    	}
	        
	    }


		var inner;
		var img;
		var hasImg;

		if ($scope.src) {

			hasImg = true;

			inner = document.createElement("div");
			$(inner).addClass("absolute height150 width z-minus-100");
			$(element).append(inner);


			img = document.createElement("img");
			$(img).addClass("absolute height80 width-auto hcenter");
			img.src = $scope.src;
			$(inner).append(img);

		}
		else {
			hasImg = false;
		}

		var total;
		var top;
		var offset;

		var reset = function () {
			if (!hasImg) {
				inner = $(element).first();
				console.log("inner id is: " + inner.id);
			}
			fix({img:$(img), space:$(element), first:true});
			total = Math.abs($(inner).height() - $(element).height());
			top = -$scope.position*total;
		}

		var scroll = function () {
			if (device.valid()) {
				offset = $(element).offset().top;
				$(inner).css({top:-$scope.factor*offset/1200*total});
			}
		}

		setTimeout(function () {
			reset();
			$(inner).css({top:top});
		}, 300);

		el.bind('scroll', scroll);

		angular.element($window).bind('resize', function () {
			reset();
			scroll();
		});

		console.log("done");

	}

	return {
		scope:{
			src:"@",
			scroll:"@",
			position:"@",
			factor:"@"
		},
		link:link
	};

}]);