(function(){
	var servicemodule = angular.module('FeatureServiceModule', ['ImageServiceModule']);
	
	servicemodule.factory('featureService',['$http','imageService', function($http,imageService){
		var currentFeatureID;
		//get all pages
		var getAllPages = function(featureId){
			return $http.get( "/tool/magazine/API/features/pages/"+featureId);
		};

		//get feature info
		var getFeatureById = function(featureId){
			return $http.get( "/tool/magazine/API/features/"+featureId);
		};

		//get the all features from this issue
		var getAllFeatures = function(issueNumber){
			return $http.get( "/tool/magazine/API/issues/"+issueNumber+"/features");
		};

		function getFeatureFolderName(featureName){
			var newName = featureName.trim().replace(/\s/g, '_');
			return newName;
		}

		//add a new blank page to the feature
		var addNewPage = function(issueNo, featureID, featureName, pageNo, channel, imageName){
			return imageService.duplicateImageTo(issueNo, getFeatureFolderName(featureName), pageNo, channel,imageName).success(function(data){
				$http.post( "/tool/magazine/API/pages/addPage?issueNo="+ issueNo + "&featureID=" + featureID +"&featureName=" + getFeatureFolderName(featureName)+ "&pageNo=" + pageNo+ "&channel=" + channel);
			});
		};

		//delete a page
		var deletePage = function(pageID){
			console.log("remove page: " + pageID);
			return $http.delete( "/tool/magazine/API/pages/"+ pageID);
		}

		var getCurrentFeatureID = function(){
			return currentFeatureID;
		}

		return {
			currentFeatureID: currentFeatureID,
			getAllPages : function(featureId){return getAllPages(featureId);},
			getFeatureById : function(featureId){return getFeatureById(featureId);},
			getAllFeatures : function(issueNumber){return getAllFeatures(issueNumber);},
			addNewPage : function(issueNo, featureID, featureName, pageNo, channel,imageName){return addNewPage(issueNo,featureID, featureName, pageNo, channel,imageName);},
			deletePage : function(pageID){return deletePage(pageID);}
		};
	}]);
})();
