/**
 * Resources:
 *
 * docs.angularjs.org/tutorial
 * docs.angularjs.org/guide -> learning resources
 * docs.angularjs.org/api
 * egghead.io
 * thinkster.io
 * kapeli.com/dash
 * meetup.com -> angular
 * soup-to-bits on codeshool
 * git real (course on codeschool)
 * javascript path on codeschool
 * coffeescript
 * javascript best practices
 *
 */


(function(){
    var app = angular.module('store', ['ngRoute', 'storeProducts']);
    // var app = angular.module('store', ['ngRoute']);

    // dependency injection uses array notation:
    // app.controller('...', function(){ ... });
    //
    // becomes
    //
    // app.controller('...', [$http, function(){ ... }]);
    app.controller('StoreController', ['$http', function($http){
        this.products = gems;
        // this.products = $http({ method: 'GET', url: '/products.json' });
        // this.products = $http.get('products.json', { apiKey: 'myApiKey'});

        // store is not visible as this in the scope of the $http service
        // var store = this;
        // store.products = [];

        /*
        $http.get('/products.jon').success(function(data){
            store.products = data;
        });
        */
    }]);

    app.controller('PanelController', function(){
        this.tab = 1;

        this.showTab = function(tab){
            this.tab = tab;
        }
        this.isSelected = function(tab){
            return this.tab === tab;
        }
    });


    var gems = [{
        name: 'Dodecahedron',
        price: 2.95,
        description: '...',
        canPurchase: false,
        soldOut: true,
        reviews: [{
            name: 'A name',
            rating: 3,
            description: 'This is a great item!',
            createdOn: 1416574146
        },
        {
            name: 'Another name',
            rating: 5,
            description: 'Awesome item!',
            createdOn: 1416574146
        }]
    },
    {
        name: 'Pentagonal Gem',
        price: 5.95,
        description: '...',
        canPurchase: true
    }];
})();