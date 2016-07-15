var App;
(function (App) {
    var template = "\n        <div>\n            <h3>Shopping Cart</h3>\n            <ul>\n                <li ng-repeat=\"item in $ctrl.cartItems track by item.product.ProductID\">\n                    {{item.product.ProductName}} - {{item.qty}}\n                </li>\n            </ul>\n        </div>\n    ";
    var component = {
        template: template,
        bindings: {},
        controller: 'CartProductListController'
    };
    var CartProductListController = (function () {
        function CartProductListController($log, $timeout, cartStore, cartActions) {
            var _this = this;
            this.$log = $log;
            this.$timeout = $timeout;
            this.cartStore = cartStore;
            this.cartActions = cartActions;
            this.$onInit = function () {
                _this.cartStore.subscribe(_this.next, _this.error);
            };
            this.$onDestroy = function () {
                _this.cartStore.unsubscribe();
            };
            this.next = (function (cartItems) {
                _this.$timeout(function () { return _this.cartItems = cartItems; });
            });
            this.error = (function (error) {
                _this.$log.error('there was an error', error);
            });
        }
        CartProductListController.$inject = [
            '$log',
            '$timeout',
            'cartStore',
            'cartActions'
        ];
        return CartProductListController;
    }());
    angular
        .module('app')
        .component('cartProductList', component)
        .controller('CartProductListController', CartProductListController);
})(App || (App = {}));
