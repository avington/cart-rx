var App;
(function (App) {
    var template = "\n        <div class=\"product-list\">\n            <h3>Products</h3>\n            <ul>\n                <li ng-repeat=\"item in $ctrl.products track by item.ProductID\">\n                    <div class=\"product-item\">\n                        <div>{{item.ProductName}}</div>\n                        <button class=\"button\" type=\"button\" ng-click=\"$ctrl.cartActions.addItem(item)\">Add to Cart</button>\n                    </div>\n                    \n                </li>\n            </ul>\n        </div>\n    ";
    var component = {
        template: template,
        bindings: {},
        controller: 'ProductListController'
    };
    var ProductListController = (function () {
        function ProductListController($log, productStore, cartActions) {
            var _this = this;
            this.$log = $log;
            this.productStore = productStore;
            this.cartActions = cartActions;
            this.next = (function (products) {
                _this.products = products;
            });
            this.error = (function (error) {
                _this.$log.error('there was an error', error);
            });
            this.$onInit = function () {
                _this.productStore.subscribe(_this.next, _this.error);
            };
            this.$onDestroy = function () {
                _this.productStore.unsubscribe();
            };
        }
        ProductListController.$inject = [
            '$log',
            'productStore',
            'cartActions'
        ];
        return ProductListController;
    }());
    angular
        .module('app')
        .component('productList', component)
        .controller('ProductListController', ProductListController);
})(App || (App = {}));
