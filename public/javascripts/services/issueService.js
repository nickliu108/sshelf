(function(){
	var servicemodule = angular.module('IssueServiceModule', []);
	
	servicemodule.factory('issueService',function($http){
		var getIssue = function(issueNumber){
			return $http.get( "/tool/magazine/API/issues/"+issueNumber);
		};

		//get all issues
		var getAllIssues = function(){
			return $http.get( "/tool/magazine/API/issues");
		};
		//get the most recent issue
		var getRecentIssue = function(){
			return $http.get( "/tool/magazine/API/recentIssue");
		};
		//get all features from an issue
		var getAllFeatures = function(issueNumber){
			return $http.get( "/tool/magazine/API/issues/"+issueNumber+"/features");
		};

		function getIssueFolderName(featureName){
			var newName = featureName.trim().replace(/\s/g, '_');
			return newName;
		}

		//add a new feature
		var addNewFeature = function(issueNo, featureName, featureOrder, imageName){
			return imageService.duplicateImageTo(issueNo, getIssueFolderName(featureName), "", "",imageName).success(function(data){
				$http.post( "/tool/magazine/API/pages/addPage?issueNo="+ issueNo +"&featureName=" + featureName + "&featureOrder=" + featureOrder);
			});
		};

		return {
			getIssue : function(issueNumber){return getIssue(issueNumber);},
			getAllIssues : function(issueNumber){return getAllIssues();},
			getRecentIssue : function(){return getRecentIssue();},
			getAllFeatures : function(issueNumber){return getAllFeatures(issueNumber);},
			addNewFeature : function(issueNo, featureName, featureOrder, imageName){return addNewFeature(issueNo, featureName, featureOrder, imageName);},
		};
	});
})();