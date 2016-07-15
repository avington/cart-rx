module App {

    export interface IProduct {
        ProductID: number;
        ProductName: string;
        SupplierID?: number;
        CategoryID?: number;
        QuantityPerUnit?: string;
        UnitPrice?: number;
        UnitsInStock?: number;
        UnitsOnOrder?: number;
        ReorderLevel?: number;
        Discontinued?: boolean;
    }

    export interface IProductDataService {
        getAll: () => angular.IPromise<Array<IProduct>>
    }

    class ProductDataService implements IProductDataService {

        static $inject: Array<string> = [
            '$http',
            '$q'
        ]

        constructor(
           private $http: angular.IHttpService,
           private $q: angular.IQService 
        ) {}

        getAll = () => {
            const defer = this.$q.defer();
            this.$http.get('http://services.odata.org/V4/Northwind/Northwind.svc/Products?$top=10')
                .then((response: any) => {
                    defer.resolve(response.data.value);
                })
                .catch((error) => {
                    defer.reject(error);
                });
            
            return defer.promise;
        }

    }

    angular
        .module('app')
        .service('productData', ProductDataService);
}