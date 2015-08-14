(function(){
    var app = angular.module('ielts', []);

    app.factory('exercisesJSON', ['$http', function($http){
        var exercisesJSON = {
            async: function(){
                var promise = $http.get('/blank/writing_interface/ielts/encode_exercises.json').then(function(response){
                    return response;
                });
                return promise;
            }
        };
        return exercisesJSON;
    }]);

    app.controller('loadingCtrl', ['$scope', '$rootScope', 'exercisesJSON', function($scope, $rootScope, exercisesJSON){
        $scope.finishedLoading = false;

        exercisesJSON.async().then(function(response){
            $rootScope.exerciseList = response.data;
            $scope.finishedLoading = true;
        });
    }]);

    app.directive('exerciseTemplate', function(){
        return{
            restrict: 'E',
            templateUrl: '/modules/ielts/view/exercise-template.html'
        }
    });

    app.controller('exerciseTemplateCtrl', ['$http', '$scope', '$sce', function($http, $scope, $sce){

        // store exercise ids in this array, useful to check the position
        var arrExerciseIds = [];
        var displayedExercise = 0;
        var index = 0;
        var totExercises = 0;

        $scope.isFirstExercise = true;
        $scope.isLastExercise = false;

        $http.get('/blank/writing_interface/ielts/encode_exercises.json')
             .then(function(response){
                $scope.firstExercise = response.data;
                for(var i in response.data){
                    totExercises;
                    arrExerciseIds.push(i); // get array of exercise ids
                }
                // show the first exercise in the list
                displayedExercise = arrExerciseIds[0];
            });

        // this function gets the next id of the array of exercise ids
        $scope.displayNextExercise = function(){
            index = arrExerciseIds.indexOf(displayedExercise);

            $scope.isFirstExercise = false;
            if(index == totExercises - 1){
                $scope.isLastExercise = true;
            }
            displayedExercise = arrExerciseIds[index  1];
        }

        $scope.displayPrevExercise = function(){
            index = arrExerciseIds.indexOf(displayedExercise);
            if((index - 1) == 0){
                $scope.isFirstExercise = true;
            }
            else{
                $scope.isFirstExercise = false;
            }
            if((index - 1) >= 0){
                displayedExercise = arrExerciseIds[index - 1];
            }
        }

        // determines if an exercise has to be displayed or not
        $scope.isDisplayed = function(id){
            return id === displayedExercise;
        }

        // parses the HTML of an exercise (remember to use ng-bind-html)
        $scope.parseHtml = function(input){
            return $sce.trustAsHtml(input);
        }
    }]);

})();