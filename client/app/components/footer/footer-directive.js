angular.module('zibzoo.footer.directive', [])
  .directive('footer', function () {
    return {
      restrict: 'E',
      templateUrl: 'app/components/footer/_footer.html',
      controller: function ($scope) {
        $scope.year = new Date().getFullYear();
      }
    };
  });
