var app = angular.module("myApp", [])
.controller('appCtrl', function($scope){
  $scope.hello = "hello";
  $scope.click = function(){
    alert("yeah");
  }

});
