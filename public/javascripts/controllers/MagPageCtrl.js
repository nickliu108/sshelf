//not in use, integrated into MagazineController.js
(function(){
	var app = angular.module('ngPageApp', ['PageServiceModule','FeatureServiceModule']);
	
	function compare(a,b) {
	  return a.page_order - b.page_order;
	}

	app.controller('PageController',['$scope','pageService','featureService','$location',function($scope,pageService,featureService,$location){
		$scope.loadPage = function(pageid){
			pageService.getPageContent(pageid).success(function(data, status, headers){
				$scope.pageNumber = data.page_order;
				$scope.pageContent = data;
				$('#tool-main-container').html(data.main.en);
				$('#tool-main-container').append('<img src="'+data.background.en+'">');

				featureService.getAllPages(data.feature_id).success(function(data, status, headers){
					$scope.allPages = data.sort(compare);
				});

				featureService.getFeatureById(data.feature_id).success(function(data, status, headers){
					$scope.feature_name = data.meta_data.feature_name.en;
				});
				//window.location.href = '/tool/magazine/pages/'+pageid;
				//$location.path('/tool/magazine/pages/'+pageid).replace().reload(false);
			});
		};

		$scope.loadPage(current_page_id);
	}]);
})();