(function(){
    var app = angular.module('grammarApp', ['ui.bootstrap']);

    app.factory('TabNumber', function(){
        return {tab: 1};
    });

    app.directive("closeButton", ['$scope', 'TabNumber', function($scope, TabNumber){
        return {
            link: function(scope, element, attrs){
                element.bind("click", function(){
                    TabNumber.tab = 1;
                });
            }
        }
    }]);

    /*
        throws an error because it needs to run on a server
     */
    /*
    app.directive("bottommenu", function(){
        return {
            restrict: 'E',
            templateUrl: 'bottommenu.html'
        }
    });
    */

    app.filter('reverse', function(){
        return function(input){
            if(input) return input.split("").reverse().join("");
        }
    });
    /*----------------------------------------------------------------------------------------------------
                                            Menu Controller
    ----------------------------------------------------------------------------------------------------*/

    app.controller('menuCtrl', ['$scope', '$modal', '$log', 'TabNumber', function($scope, $modal, $log, TabNumber){

        $scope.oneAtATime = true;
        $scope.categories = menu;

        $scope.selectedSubcategory = null;

        function selectSubcategory(subcategory){
            $scope.selectedSubcategory = subcategory;
        }

        $scope.isSearching = false;

        function expandAccordion(){
            $scope.isSearching = true;
            $scope.oneAtATime = false;

            if($scope.searchText == "" || $scope.searchText == " " || !$scope.searchText){
                $scope.isSearching = false;
                $scope.oneAtATime = true;
            }
        }

        $scope.showBottomMenu = false;

        function setBottomMenu(){
            // $scope.showBottomMenu = true;
        }

        $scope.selectSubcategory = selectSubcategory;
        $scope.expandAccordion = expandAccordion;
        $scope.setBottomMenu = setBottomMenu;

    }]);

    app.controller('PanelController', ['$scope', 'TabNumber', function($scope, TabNumber){
        // initial tab
        TabNumber.tab = 1;

        function isSelected(tab){
            return TabNumber.tab == tab;
        }

        function selectTab(tab){
            TabNumber.tab = tab;
        }

        $scope.isSelected = isSelected;
        $scope.selectTab = selectTab;
    }]);


    /*----------------------------------------------------------------------------------------------------
                                            Menu elements
    ----------------------------------------------------------------------------------------------------*/

    var menu = [
    {
        id: 1,
        name: "Nouns, names and pronouns",
        subcategories: [
            {id: 1, name: "proper nouns", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at elit vitae nisl pretium facilisis nec tempor dui. Sed maximus mi vel justo eleifend, a semper lacus volutpat. Aliquam dignissim ex quis nunc tristique, eget scelerisque ex lobortis. Suspendisse non placerat purus. Aenean quis orci sagittis, porttitor ligula et, sodales nunc. Donec lobortis imperdiet molestie. Nam et ornare urna. Mauris in mi turpis. Mauris at euismod neque. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum tincidunt cursus porta. In elit massa, hendrerit eget sagittis et, fringilla ut urna. Aliquam nec ipsum nisl.</p><p>Sed eleifend odio eget magna ullamcorper ullamcorper. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla pretium sem sed libero vehicula, eget fermentum erat lobortis. Phasellus lorem metus, mollis nec lobortis nec, imperdiet eu leo. Morbi dignissim porta urna, ut posuere magna maximus at. Fusce vulputate, augue ac gravida pretium, erat ligula dictum metus, ut posuere arcu arcu et mi. Morbi posuere dapibus ante, a commodo lorem pretium a."},
            {id: 2, name: "plurals", text: "text for plurals"},
            {id: 3, name: "group nouns", text: "text for group nouns"},
            {id: 4, name: "subject / object pronouns", text: "text for subject / object pronouns"},
            {id: 5, name: "possessives"},
            {id: 6, name: "reflexive pronouns"},
            {id: 7, name: "relative pronouns"},
            {id: 8, name: "indefinite pronouns"}
        ]
    },
    {
        id: 2,
        name: "Adjectives and adverbs",
        subcategories: [
            {id: 9, name: "adjectives"},
            {id: 10, name: "adverbs of frequency"},
            {id: 11, name: "adverbs of manner"},
            {id: 12, name: "comparatives"},
            {id: 13, name: "superlatives"},
            {id: 14, name: "so, such, quite, rather"},
            {id: 15, name: "too, enough, not enough"},
            {id: 16, name: "too + adjective + too"},
            {id: 17, name: "so / such...that"}
        ]
    },
    {
        id: 3,
        name: "short words",
        subcategories: [
            {id: 18, name: "articles"},
            {id: 19, name: "this, that, these, those"},
            {id: 20, name: "each, every, either, etc."},
            {id: 21, name: "question words"},
            {id: 22, name: "conjunctions"},
            {id: 23, name: "some, any, no"},
            {id: 24, name: "much, many, a little, a few"},
            {id: 25, name: "prepositions of time"},
            {id: 26, name: "prepositions of place"}
        ]
    }
        ];
})();