module App {


    export interface ICartAction {
        actions: {
            addItem: string;
        }

        addItem: (item: IProduct) => void;
        
    }

    class CartAction implements ICartAction {

        static $inject: Array<string> = [
            '$log',
            'dispatcher'
        ];

        constructor(
            private $log: angular.ILogService,
            private dispatcher: Rx.Subject<IEvent>) {

            this.initialize();

        }

        actions: {
            addItem: string;
        };

        initialize = () => {
            this.actions = {
                addItem: 'ADD_ITEM'
            };
        };

        addItem = (product: IProduct) => {
            // simulate an API call delay before updating the data
            const source = Rx.Observable
                .return(product)
                .delay(1000);

            const next = (product) => {
                const action: IEvent = {
                    type: this.actions.addItem,
                    payload: product 
                };

                this.dispatcher.onNext(action)
            };

            const err = (err) => {
                this.$log.error('there was an error', err);
            };

            const complete = () => {
                this.$log.info('subscription completed');
            }

            source
                .subscribe(next, err, complete);
                

        }

        
    }

    angular
        .module('app')
        .service('cartActions', CartAction)
}