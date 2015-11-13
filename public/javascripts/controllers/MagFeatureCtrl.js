//not in use, integrated into MagazineController.js
(function(){
	var app = angular.module('ngFeatureApp', ['FeatureServiceModule','createNewDirective']);
	$scope.currentFeatureID = $routeParams.param ? $routeParams.param : 1;
	app.controller('featureController',['$scope','featureService',function($scope,featureService){

		$scope.loadFeature = function(){
			//get current issue number
			featureService.getFeatureById($scope.currentFeatureID).success(function(data, status, headers){
				$scope.currentIssueNumber = data.issue_no;
				//get all features
				featureService.getAllFeatures(data.issue_no).success(function(data, status, headers){
					$scope.allFeatures = data;
				});
				//get current feature name and ID
				$scope.currentFeatureName= data.meta_data.feature_name;
				//get all pages
				featureService.getAllPages($scope.currentFeatureID).success(function(data, status, headers){
					$scope.allPages = data;
				});
			});
		};

		$scope.addPage = function(){
			featureService.addNewPage($scope.currentIssueNumber, $scope.currentFeatureID, "global").success(function(data, status, headers){
        		console.log("new page added");
        		featureService.getAllPages($scope.currentFeatureID).success(function(data, status, headers){
					$scope.allPages = data;
					console.log("refresh");
				});
        	});
		};

		$scope.deletePage = function(pageID){
			console.log("click "+pageID);
			featureService.deletePage(pageID).success(function(data, status, headers){
				console.log("click");
				featureService.getAllPages($scope.currentFeatureID).success(function(data, status, headers){
					$scope.allPages = data;
					console.log("refresh");
				});	
			});
		};

		//get assets
		$scope.getAssetByID = function(imageID){
			$http.get( "/images/images/"+imageID).success(function( imageData ) {
				console.log(imageData);
				return imageData;
			});
		};

		$scope.loadFeature(current_feature_feature);
	}]);
})();