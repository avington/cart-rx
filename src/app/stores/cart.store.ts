module App {

    export interface ICartItem {
        qty: number;
        product: IProduct;
    }

    const ADD_ITEM = 'ADD_ITEM';

    export interface ICartStore {
        subscribe:  (next, error) => Rx.Subscription;
        unsubscribe: () => void;
    } 

    class CartStore implements ICartStore {

        static $inject: Array<string> = [
            'dispatcher',
            'productData'
        ];

        constructor(
            private dispatcher: Rx.Subject<any>,
            private productData: IProductDataService) {
            this.initialize();
        }

        emitter: any;

        private initialize = () => {
            this.cartItems = [];
            this.emitter = new Rx.ReplaySubject(1);
            this.registerHandler(this.dispatcher, ADD_ITEM, this.addItem);
            
        };

        cartItems: Array<ICartItem>;

        registerHandler(dispatcher, type, handler) {
            return dispatcher
                .filter(action => action.type === type)
                .subscribe(handler.bind(this));
        };

        emit = () => {
            this.emitter.onNext(this.cartItems);
        }; 

        subscribe = (next, error) => {
            return this.emitter.subscribe(next, error);
        };
        
        unsubscribe = () => {
            return this.emitter.unsubscribe();
        };

        private addItem(event: IEvent) {

            const product: IProduct = event.payload;

            const items: Array<ICartItem> = 
                this.cartItems.filter((i) => i.product.ProductID == product.ProductID);

            if (items.length == 0) {
                this.cartItems.push({ qty: 1, product: product });
            } else {
                items[0].qty += 1;
            }

            this.emit();
        };

    }

    angular
        .module('app')
        .service('cartStore', CartStore);
}