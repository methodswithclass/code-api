var getAngularModules = function (application) {

	// console.log("application is", application);

	



	application.factory("general", ["$sce", function ($sce) {


		return {
			renderHtml:function (htmlCode) {
	        	return $sce.trustAsHtml(htmlCode);
	    	}
		}

	}])


}