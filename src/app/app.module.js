var App;
(function (App) {
    angular
        .module('app', [
        'ui.router'
    ])
        .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('default', {
            url: '/',
            controller: function () { },
            controllerAs: '$ctrl',
            template: "<div class=\"default-container\">\n                    <div class=\"flex-container\">\n                        <product-list></product-list>\n                    </div>\n                    <div class=\"flex-container\">\n                        <cart-product-list></cart-product-list>\n                    </div>\n                    \n                    \n                </div>"
        });
        $urlRouterProvider.otherwise('/');
    });
})(App || (App = {}));
