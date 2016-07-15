module App {

    export interface IEvent {
        type: string;
        payload: any;
    }

    angular
        .module('app')
        .value('dispatcher', new Rx.Subject());
}