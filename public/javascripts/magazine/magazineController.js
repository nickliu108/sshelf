var app = angular.module('myApp', ['IssueServiceModule','FeatureServiceModule','PageServiceModule','createNewDirective','ui.bootstrap','ngRoute']);
  app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/tool/magazine/:issueNumber/features/:featureID', {
        templateUrl: '/tool/magazine/partials/:issueNumber/featurePage/:featureID',
        controller: "featureController"
      }).
      when('/tool/magazine/', {
        templateUrl: '/tool/magazine/partials/issuePage',
        controller: "IssueController"
      }).
      when('/tool/magazine/:issueNumber', {
        templateUrl: '/tool/magazine/partials/issuePage',
        controller: "IssueController"
      }).
      when('/tool/magazine/:issueNumber/features/:featureID/pages/:pageID', {
        templateUrl: '/tool/magazine/partials/specificPage',
        controller: "PageController"
      });
      // otherwise({
      //   redirectTo: '/tool/magazine/'
      // });
    $locationProvider.html5Mode(true);
}]);

function compareFeature(a,b) {
  	return a.feature_rank - b.feature_rank;
}

function comparePage(a,b) {
  	return a.page_order - b.page_order;
}

app.controller('IssueController',['$scope','issueService','$routeParams','$location', function($scope,issueService,$routeParams,$location){
	$scope.currentIssueNumber = $routeParams.issueNumber ? $routeParams.issueNumber : 1;
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
		console.log("get all issues: "+ data);
	});
	issueService.getIssue($scope.currentIssueNumber).success(function(data, status, headers){
		$scope.currentIssue = data;
		console.log("get current issue: "+ data);
	});
	issueService.getAllFeatures($scope.currentIssueNumber).success(function(data, status, headers){
		$scope.allFeatures = data.sort(compareFeature);
	});
}]);

app.controller('IssueModalController', ['$scope','issueService','$modal', '$log' ,function( $scope, issueService, $modal, $log) {
	$scope.items = ['item1', 'item2', 'item3'];

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

app.controller('featureController',['$scope','featureService','$routeParams','$location',function($scope,featureService,$routeParams,$location){
	console.log("feature controller loaded");
	$scope.currentFeatureID = $routeParams.featureID;
	$scope.currentIssueNumber = $routeParams.issueNumber;
	//why load feature is redirecting and where is /tool/magazine/features/:featureId handled??
	$scope.loadFeature = function(featureID){
		console.log("redirect to: "+ "/tool/magazine/partial/features/"+featureID);
		$location.path("/tool/magazine/features/"+featureID);
	};

	$scope.addPage = function(){
		featureService.addNewPage($scope.currentIssueNumber, $scope.currentFeatureID, $scope.currentFeatureName, $scope.lastPageOrder+1, "global", "productsBG").success(function(data, status, headers){
    		featureService.getAllPages($scope.currentFeatureID).success(function(data, status, headers){
				$scope.allPages = data.sort(comparePage);
				$scope.setLastPageOrder();
			});
    	});
	};

	$scope.deletePage = function(pageID){
		featureService.deletePage(pageID).success(function(data, status, headers){
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

	$scope.setLastPageOrder = function(){
		//if no pages
		if(!$scope.allPages.length){
			$scope.lastPageOrder = 0;
		}
		else{
			newLastOrder = ($scope.allPages)[$scope.allPages.length - 1].page_order;
			$scope.lastPageOrder = parseInt(newLastOrder,10);
		}
	};

	//get current issue number
	featureService.getFeatureById($scope.currentFeatureID).success(function(data, status, headers){
		console.log("try to load feature by id: "+data._id);
		console.log("current issue number: "+$scope.currentIssueNumber);
		//get all features
		featureService.getAllFeatures($scope.currentIssueNumber).success(function(data, status, headers){
			console.log("get all features: "+data);
			$scope.allFeatures = data.sort(compareFeature);
		});
		//get current feature name and ID
		$scope.currentFeatureName= data.meta_data.feature_name.en;
		//get all pages
		featureService.getAllPages($scope.currentFeatureID).success(function(data, status, headers){
			$scope.allPages = data.sort(comparePage);
			$scope.setLastPageOrder();
		});
	});
	$scope.loadFeature($scope.currentFeatureID);
}]);

app.controller('PageController',['$scope','pageService','featureService','$location','$routeParams',function($scope,pageService,featureService,$location,$routeParams){
	$scope.currentPageID = $routeParams.pageID;
	$scope.loadPage = function(pageid){
		$location.path("/tool/magazine/pages/"+pageid);
		pageService.getPageContent(pageid).success(function(data, status, headers){
			$scope.pageNumber = data.page_order;
			$scope.pageContent = data;
			$('#tool-main-container').html(data.main.en);
			$('#tool-main-container').append('<img src="'+data.background.en+'">');

			featureService.getAllPages(data.feature_id).success(function(data, status, headers){
				$scope.allPages = data.sort(comparePage);
			});

			featureService.getFeatureById(data.feature_id).success(function(data, status, headers){
				$scope.feature_name = data.meta_data.feature_name.en;
			});
			console.log(pageid);
		});
	};

	$scope.loadPage($scope.currentPageID);
}]);