module App {

    const template: string = `
        <div>
            <h3>Shopping Cart</h3>
            <ul>
                <li ng-repeat="item in $ctrl.cartItems track by item.product.ProductID">
                    {{item.product.ProductName}} - {{item.qty}}
                </li>
            </ul>
        </div>
    `;

    const component: angular.IComponentOptions = {
        template: template,
        bindings: {},
        controller: 'CartProductListController'
    };

    class CartProductListController {

        static $inject: Array<string> = [
            '$log',
            '$timeout',
            'cartStore',
            'cartActions'
        ];

        constructor(
            private $log: angular.ILogService,
            private $timeout: angular.ITimeoutService,
            private cartStore: ICartStore,
            private cartActions: ICartAction
        ) {            
        }

        cartItems: Array<ICartItem>;

        $onInit = () => {
            this.cartStore.subscribe(this.next, this.error);
        };

        $onDestroy = () => {
            this.cartStore.unsubscribe();
        };

        next = ((cartItems) => {
            this.$timeout(() => this.cartItems = cartItems);
            
        });

        error = ((error) => {
            this.$log.error('there was an error', error);
        });

        
    }
    
    angular
        .module('app')
        .component('cartProductList', component)
        .controller('CartProductListController', CartProductListController);
}