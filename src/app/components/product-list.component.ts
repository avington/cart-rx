module App {

    const template: string = `
        <div class="product-list">
            <h3>Products</h3>
            <ul>
                <li ng-repeat="item in $ctrl.products track by item.ProductID">
                    <div class="product-item">
                        <div>{{item.ProductName}}</div>
                        <button class="button" type="button" ng-click="$ctrl.cartActions.addItem(item)">Add to Cart</button>
                    </div>
                    
                </li>
            </ul>
        </div>
    `;

    const component: angular.IComponentOptions = {
        template: template,
        bindings: {},
        controller: 'ProductListController'
    };

    class ProductListController {

        static $inject: Array<string> = [
            '$log',
            'productStore',
            'cartActions'
        ];

        constructor(
            private $log: angular.ILogService,
            private productStore: IProductStore,
            private cartActions: ICartAction
        ) {}

        subscription: Rx.Subscription;
        products: Array<IProduct>;

        next = ((products) => {
            this.products = products;
        });

        error = ((error) => {
            this.$log.error('there was an error', error);
        });

        $onInit = () => {
            this.productStore.subscribe(this.next, this.error);
        };

        $onDestroy = () => {
            this.productStore.unsubscribe();
        };


    }

    angular
        .module('app')
        .component('productList', component)
        .controller('ProductListController', ProductListController);
}