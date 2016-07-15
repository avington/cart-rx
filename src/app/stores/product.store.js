var App;
(function (App) {
    var ProductStore = (function () {
        function ProductStore(dispatcher, productData) {
            var _this = this;
            this.dispatcher = dispatcher;
            this.productData = productData;
            this.initialize = function () {
                _this.emitter = new Rx.ReplaySubject(1);
                _this.productData.getAll().then(function (data) {
                    _this.list = data;
                    _this.emit();
                });
            };
            this.emit = function () {
                _this.emitter.onNext(_this.list);
            };
            this.subscribe = function (next, error) {
                return _this.emitter.subscribe(next, error);
            };
            this.unsubscribe = function () {
                return _this.emitter.unsubscribe();
            };
            this.initialize();
        }
        ProductStore.prototype.registerHandler = function (dispatcher, type, handler) {
            return dispatcher
                .filter(function (action) { return action.type === type; })
                .subscribe(handler.bind(this));
        };
        ;
        ProductStore.$inject = [
            'dispatcher',
            'productData'
        ];
        return ProductStore;
    }());
    angular
        .module('app')
        .service('productStore', ProductStore);
})(App || (App = {}));
