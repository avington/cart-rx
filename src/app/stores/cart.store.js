var App;
(function (App) {
    var ADD_ITEM = 'ADD_ITEM';
    var CartStore = (function () {
        function CartStore(dispatcher, productData) {
            var _this = this;
            this.dispatcher = dispatcher;
            this.productData = productData;
            this.initialize = function () {
                _this.cartItems = [];
                _this.emitter = new Rx.ReplaySubject(1);
                _this.registerHandler(_this.dispatcher, ADD_ITEM, _this.addItem);
            };
            this.emit = function () {
                _this.emitter.onNext(_this.cartItems);
            };
            this.subscribe = function (next, error) {
                return _this.emitter.subscribe(next, error);
            };
            this.unsubscribe = function () {
                return _this.emitter.unsubscribe();
            };
            this.initialize();
        }
        CartStore.prototype.registerHandler = function (dispatcher, type, handler) {
            return dispatcher
                .filter(function (action) { return action.type === type; })
                .subscribe(handler.bind(this));
        };
        ;
        CartStore.prototype.addItem = function (event) {
            var product = event.payload;
            var items = this.cartItems.filter(function (i) { return i.product.ProductID == product.ProductID; });
            if (items.length == 0) {
                this.cartItems.push({ qty: 1, product: product });
            }
            else {
                items[0].qty += 1;
            }
            this.emit();
        };
        ;
        CartStore.$inject = [
            'dispatcher',
            'productData'
        ];
        return CartStore;
    }());
    angular
        .module('app')
        .service('cartStore', CartStore);
})(App || (App = {}));
