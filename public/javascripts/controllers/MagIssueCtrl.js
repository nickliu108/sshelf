//not in use, integrated into MagazineController.js
(function(){
	var app = angular.module('ngmodel', ['IssueServiceModule','ui.bootstrap']);
	
	function compare(a,b) {
	  return a.feature_rank - b.feature_rank;
	}

	app.controller('NgController',['$scope','issuerService', function($scope,issuerService){
		//get all issues
		issuerService.getAllIssues().success(function(data, status, headers){
			$scope.allIssues = data;
		});

		$scope.loadIssue = function(newIssueNumber){
			issuerService.getIssue(newIssueNumber).success(function(data, status, headers){
				$scope.currentIssue = data;
			});
			issuerService.getAllFeatures(newIssueNumber).success(function(data, status, headers){
				$scope.allFeatures = data.sort(compare);

			});
		};

		//get assets
		$scope.getAssetByID = function(imageID){
			$http.get( "/images/images/"+imageID).success(function( imageData ) {
				console.log(imageData);
				return imageData;
			});
		};

		//load issue 1 to start with
		$scope.loadIssue(1);
	}]);

	app.controller('IssueModalController', ['$scope','issuerService','$modal', '$log' ,function( $scope, issuerService, $modal, $log) {
		$scope.items = ['item1', 'item2', 'item3'];

		issuerService.getAllFeatures(1).success(function(data, status, headers){
			$scope.allFeatures = data.sort(compare);
		});

	    $scope.open = function (size) {
		    var modalInstance = $modal.open({
		      	templateUrl: '/javascripts/template/modal/index.html',
		      	controller: 'ModalInstanceCtrl',
		      	size: size,
		      	resolve: {
		        	allFeatures: function () {
		          		return $scope.allFeatures;
		        	}
		      	}
			});

			modalInstance.result.then(function (selectedItem) {
		      	$scope.selected = selectedItem;
		    }, function () {
		      	$log.info('Modal dismissed at: ' + new Date());
		    });
		};
	}]);

	app.controller('ModalInstanceCtrl', function ($scope, $modalInstance, allFeatures) {

	  	$scope.allFeatures = allFeatures;
	  	$scope.selected = {
	    	feature: $scope.allFeatures[0]
	  	};

	  	$scope.ok = function () {
	    	$modalInstance.close($scope.selected.feature);
	  	};

	  	$scope.cancel = function () {
	    	$modalInstance.dismiss('cancel');
	  	};
	});
})();