angular.module('gemsApp', [])
  .service('profileService', ['$http',function($http){
    return function(){
      var getProfiles = function(){

        return $http({method: 'GET', url: '/profiles.json'}).
          success(function(data, status, headers, config) {
            return angular.fromJson(data);
          }).
          error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          });
      };
      return {
        getProfiles : getProfiles
      }
    }

  }])
  .controller('profileCtrl', ['$scope','profileService', function ($scope, profileService) {

  $scope.profile = {};
  $scope.profile.gemma = profileService().getProfiles();
  console.log($scope.profile.gemma);

}]);