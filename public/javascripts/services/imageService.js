(function(){
	var servicemodule = angular.module('ImageServiceModule', []);
	
	servicemodule.factory('imageService',function($http){
		var getImageByID = function(imageID){
			return $http.get( "/images/show/"+imageID);
		};

		var getImagePathByID = function(imageID){
			return $http.get( "/images/images/"+imageID);
		};

		//required post an image and image path when submit, need to change to accept path param
		var updateImage = function(){
			return $http.post( "/images/fixImages");
		};
		//duplicate default background image to create new one
		var duplicateImageTo = function(issueNo,featureName,pageNo,channel,imageName){
			return $http.post( "/images/duplicateImageTo?issueNo="+issueNo+"&featureName="+ featureName +"&pageNo="+ pageNo +"&channel="+channel+"&imageName="+imageName);
		};

		return {
			getImageByID : function(imageID){return getImageByID(imageID);},
			getImagePathByID : function(imageID){return getImagePathByID(imageID);},
			updateImage : function(){return updateImage();},
			duplicateImageTo : function(issueNo,featureName,pageNo,channel,imageName){return duplicateImageTo(issueNo,featureName,pageNo,channel,imageName);}
		};
	});
})();