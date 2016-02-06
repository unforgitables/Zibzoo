angular.module('zibzoo.merchant.order', [])
  .controller('MerchantOrdersController', ['$scope', 'Order', 'Socket', '$stateParams', '$window', function ($scope, Order, Socket, $stateParams, $window) {

    $scope.ordersList = Order.order;

    $scope.itemFinished = function (currentOrder, index, parentIndex) {
      // console.log(currentOrder, index, parentIndex);
      Order.order[parentIndex].menuItems.splice(index, 1);
      if (Order.order[parentIndex].menuItems.length === 0) {
        $scope.finishedOrder(parentIndex, currentOrder.ID);
      }
    };

    $scope.finishedOrder = function (index, order) {

      Socket.emit('orderFinished', order);
      // Order.callDbOrderFinished(order); // call to update the db

      Order.order.splice(index, 1);
      Order.setLocalStorage();
      // set up a db call place the finished order in the db
    };

    var listenOnMerchId = $stateParams.merchantId;

    Socket.emit('menuConnect', listenOnMerchId);

    Socket.on('newOrder', function (newOrder) {
      console.log("HEARD");
      console.log("NEWORDER", newOrder);
      newOrder.orderNumber = Order.order.total++;
      Order.order.push(newOrder);
      Order.setLocalStorage();
    });
  }]);
