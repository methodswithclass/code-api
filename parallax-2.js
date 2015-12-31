
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

	    	img = params.img;
	    	space = params.space;

	    	if ($(img)[0]) {

		    	if (params.first) aspect = img.width()/img.height();

		        var height = space.height()*1.2;
		        var width = height*aspect;
		        
		        if (checkWidth(width) == "under") {
		            console.log("width under " + name);
		            width = space.width();
		            height = width/aspect;
		            if (checkHeight(height) == "under") {
		                console.log("height under " + name);
		                height = space.height()*1.2;
		                width = height*aspect;
		            }
		        }
		        else if (checkWidth(width) == "over") {
		            console.log("width over " + name);
		            width = space.width()*1.2;
		            height = width/aspect;
		            if (checkHeight(height) == "under") {
		                console.log("height under " + name);
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

		if ($scope.src) {

			inner = document.createElement("div");
			$(inner).addClass("absolute height150 width z-minus-100");
			$(element).append(inner);


			img = document.createElement("img");
			$(img).addClass("absolute height80 width-auto hcenter");
			img.src = $scope.src;
			$(inner).append(img);

		}
		else {
			inner = $(element).first();
		}

		var top = -$scope.position*0.5*($(element).height() - $(inner).height());

		$(inner).css({top:top});


		if (device.valid()) {
			var scroll = function () {
				$(inner).css({top:$(inner).position().top*0.8});
			}

			setTimeout(function () {
				fix({img:$(img), space:$(element), first:true});
			}, 300);

			el.bind('scroll', scroll);

			angular.element($window).bind('resize', function () {
				scroll();
				fix({img:$(img), space:$(element), first:false});
			});	
		}	

	}

	return {
		scope:{
			src:"@",
			scroll:"@",
			position:"@"
		},
		link:link
	};

}]);