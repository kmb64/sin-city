angular.module('gemsApp', [])
  .service('profileService', ['$http', function ($http) {
    return function () {
      var getProfiles = function () {

        return $http({method: 'GET', url: 'profiles.json'}).
          success(function (data, status, headers, config) {
            return angular.fromJson(data);
          }).
          error(function (data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          });
      };
      return {
        getProfiles: getProfiles
      }
    }

  }])
  .controller('profileCtrl', ['$scope', 'profileService', function ($scope, profileService) {

    $scope.profile = {};

    var profilePromise = profileService().getProfiles();
    profilePromise.then(function(response){
      $scope.profile.girls = response.data.girls;
      $scope.profile.boys = response.data.boys;
    }, function(){
      console.log('Failed to retrieve profiles.');
    });

  }]).directive('textProfile', function(){
      return {
        restrict : 'E',
        templateUrl : 'views/profiles/text.html'
      }
    }).directive('photoProfile', function(){
      return {
        restrict : 'E',
        templateUrl : 'views/profiles/photo.html'
      }
    });
