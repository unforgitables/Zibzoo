angular.module('zibzoo.merchant.order', [])
  .controller('MerchantOrdersController', ['$scope', 'order', function ($scope, order) {
    $scope.ordersList = order;

    $scope.itemFinished = function (currentOrder, index, parentIndex) {
      // console.log(currentOrder, index, parentIndex);
      currentOrder.food.splice(index, 1);
      // will complete the order if there are no more items left in the order.
      // if (currentOrder.food.length === 0) {
      //   $scope.finishedOrder(parentIndex, currentOrder.ID);
      // }
    };

    $scope.finishedOrder = function (index, userId) {
      // I assume i'll need some kinda id to ping the user later
      // console.log('index : ', index, 'id : ', userId);
      order.splice(index,1);
    };

    var incomingOrders = function (orderObj) {
      order.push(orderObj);
    };


  }]);

