module App {

    angular
        .module('app',[
            'ui.router'
        ])
        .config(($stateProvider: angular.ui.IStateProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider) => {

            $stateProvider.state('default', {
                url: '/',
                controller: function(){},
                controllerAs: '$ctrl',
                template: `<div class="default-container">
                    <div class="flex-container">
                        <product-list></product-list>
                    </div>
                    <div class="flex-container">
                        <cart-product-list></cart-product-list>
                    </div>
                    
                    
                </div>`
            });

            $urlRouterProvider.otherwise('/');
        });

}
