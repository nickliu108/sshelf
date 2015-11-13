(function(){
	var servicemodule = angular.module('PageServiceModule', []);
	
	servicemodule.factory('pageService',function($http){
		//get page
		var getPageContent = function(pageid){
			return $http.get( "/tool/magazine/API/pages/"+pageid);
		};

		return {
			getPageContent : function(pageid){return getPageContent(pageid);},
		};
	});
})();