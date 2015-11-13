var app = angular.module('createNewDirective', ['IssueServiceModule','FeatureServiceModule']);
 
app.directive("createnewpage", ['featureService',function(featureService) {
    return function(scope, element, attrs) {
        element.bind("click", function() {
        	scope.addPage();
        });
    };
}]);

app.directive("createnewfeature", ['issueService',function(issueService) {
    return function(scope, element, attrs) {
        element.bind("click", function() {
        	scope.addFeature();
        });
    };
}]);