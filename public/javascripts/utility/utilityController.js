var app = angular.module('utilityApp');

app.controller('IssueController',['$scope','issueService','$routeParams','$location', function($scope,issueService,$routeParams,$location){
	$scope.currentIssueNumber = $routeParams.param ? $routeParams.param : 1;
	$scope.loadIssue = function(issueNumber){
		$location.path("/tool/magazine/"+issueNumber);
	};

	$scope.addFeature = function(){
		issueService.addNewFeature($scope.currentIssueNumber, "new feature", $scope.lastPageOrder+1, "global", "productsBG").success(function(data, status, headers){
    		featureService.getAllPages($scope.currentFeatureID).success(function(data, status, headers){
				$scope.allPages = data.sort(comparePage);
				$scope.setLastPageOrder();
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

	//get all issues
	issueService.getAllIssues().success(function(data, status, headers){
		$scope.allIssues = data;
	});
	issueService.getIssue($scope.currentIssueNumber).success(function(data, status, headers){
		$scope.currentIssue = data;
	});
	issueService.getAllFeatures($scope.currentIssueNumber).success(function(data, status, headers){
		$scope.allFeatures = data.sort(compareFeature);
	});
}]);

