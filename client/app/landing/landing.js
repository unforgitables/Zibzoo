angular.module('zibzoo.landing', [])
  .controller('LandingController', ['$scope', '$state', 'vendor', 'location', function ($scope, $state, vendor, location) {
    $scope.location = null;
    $scope.vendors = [];

    $scope.findVendors = function () {
      if ($scope.selectedPlace) {
        var latitude = $scope.selectedPlace.geometry.location.lat();
        var longitude = $scope.selectedPlace.geometry.location.lng();
        
        $state.go('vendors', { latlng: latitude + ',' + longitude });
      }
    };

    $scope.getVendors = function (params) {
      vendor.getVendors(params)
        .then(function (vendors) {
          vendor.setData($scope, vendors.data);
        })
        .catch(function (error) {
          $scope.status = error.status;
        });
    };

    location.getCurrentLocation(function (location) {
      $scope.location = location;
      $scope.$apply();
      
      // $scope.getVendors({
      //   latitude: location.latitude,
      //   longitude: location.longitude
      // });

      $scope.getVendors({});
    });
  }]);
