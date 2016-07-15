var App;
(function (App) {
    angular
        .module('app')
        .value('dispatcher', new Rx.Subject());
})(App || (App = {}));
