(function(){
	var servicemodule = angular.module('TemplateServiceModule', []);
	
	servicemodule.factory('templateService',function($http){
		//get page
		var getTemplate = function(templateName){
			return $http.get( "/partials/"+templateName);
		};

		return {
			getTemplate : function(templateName){return getTemplate(templateName);},
		};
	});
})();