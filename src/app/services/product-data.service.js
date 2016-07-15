var App;
(function (App) {
    var ProductDataService = (function () {
        function ProductDataService($http, $q) {
            var _this = this;
            this.$http = $http;
            this.$q = $q;
            this.getAll = function () {
                var defer = _this.$q.defer();
                _this.$http.get('http://services.odata.org/V4/Northwind/Northwind.svc/Products?$top=10')
                    .then(function (response) {
                    defer.resolve(response.data.value);
                })
                    .catch(function (error) {
                    defer.reject(error);
                });
                return defer.promise;
            };
        }
        ProductDataService.$inject = [
            '$http',
            '$q'
        ];
        return ProductDataService;
    }());
    angular
        .module('app')
        .service('productData', ProductDataService);
})(App || (App = {}));
