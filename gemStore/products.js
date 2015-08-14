(function(){
    // include store-products module contained in products.js
    var app = angular.module('storeProducts', []);

    app.controller('ProductController', function(){

    });

    /*

    app.directive('productTitle', function(){
        return{
            restrict: 'E',
            templateUrl: 'product-title.html'
        }
    });

    app.directive('productDescription', function(){
        return {
            restrict: 'E',
            templateUrl: 'product-description.html'
        }
    });

    app.directive('productReview', function(){
        return {
            restrict: 'E',
            templateUrl: 'product-review.html',
            controller: function(){
                this.review = {};
                this.addReview = function(product){
                    this.review.createdOn = Date.now();
                    product.review.push(this.review);
                    this.review = {};
                }
            },
            controllerAs: 'review'
        }
    });

*/
})();