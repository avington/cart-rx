module App {

    

    export interface IProductStore {
        subscribe:  (next, error) => Rx.Subscription;
        unsubscribe: () => void;
    }


    class ProductStore implements IProductStore {

        static $inject: Array<string> = [
            'dispatcher',
            'productData'
        ];

        constructor(
            private dispatcher: Rx.Subject<any>,
            private productData: IProductDataService) {
            this.initialize();
        }

        private initialize = () => {
            this.emitter = new Rx.ReplaySubject(1);

            this.productData.getAll().then(data => {
                this.list = data;
                this.emit();
            });
        };

        emitter: any;
        list: Array<IProduct>;
        cartItems: Array<ICartItem>;

        registerHandler(dispatcher, type, handler) {
            return dispatcher
                .filter(action => action.type === type)
                .subscribe(handler.bind(this));
        };

        emit = () => {
            this.emitter.onNext(this.list);
        };

        subscribe = (next, error) => {
            return this.emitter.subscribe(next, error);
        };
        
        unsubscribe = () => {
            return this.emitter.unsubscribe();
        };

        


    }

    angular
        .module('app')
        .service('productStore', ProductStore);
}