var App;
(function (App) {
    var CartAction = (function () {
        function CartAction($log, dispatcher) {
            var _this = this;
            this.$log = $log;
            this.dispatcher = dispatcher;
            this.initialize = function () {
                _this.actions = {
                    addItem: 'ADD_ITEM'
                };
            };
            this.addItem = function (product) {
                // simulate an API call delay before updating the data
                var source = Rx.Observable
                    .return(product)
                    .delay(1000);
                var next = function (product) {
                    var action = {
                        type: _this.actions.addItem,
                        payload: product
                    };
                    _this.dispatcher.onNext(action);
                };
                var err = function (err) {
                    _this.$log.error('there was an error', err);
                };
                var complete = function () {
                    _this.$log.info('subscription completed');
                };
                source
                    .subscribe(next, err, complete);
            };
            this.initialize();
        }
        CartAction.$inject = [
            '$log',
            'dispatcher'
        ];
        return CartAction;
    }());
    angular
        .module('app')
        .service('cartActions', CartAction);
})(App || (App = {}));
