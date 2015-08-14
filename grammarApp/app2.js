     app.factory('exercisesJSON', ['$http', function($http){
         var exercisesJSON = {
            exercises: [],
            totExercises: 0,
             async: function(){
                 var promise = $http.get('/blank/writing_interface/ielts/encode_exercises.json').then(function(response){
                     return response;
         $scope.finishedLoading = false;
         exercisesJSON.async().then(function(response){
            // $rootScope.exerciseList = response.data;
            exercisesJSON.exercises = response.data;
             $scope.finishedLoading = true;
         });
     }]);

     app.directive('exerciseTemplate', function(){
         return{
             restrict: 'E',
            scope: true,
             templateUrl: '/modules/ielts/view/exercise-template.html'
        };
     });

    // inherits the scope of the top level controller
    app.directive('questionText', ['$compile', '$timeout', function($compile, $timeout){
        return {
            restrict: 'E',
            link: function(scope, element, attrs){
                $timeout(function(){
                    var i = 1; // gaps start with [1]..[n]
                    // replace each gap with an input, each input is binded to a property of an object. Objects have 2 keys:
                    // questionId and position -> {116: {1 : "hello", 2: "world"}}
                    var output = element.html().replace(/\[[0-9]\]/g, function(){
                        var next = i++;
                          // also, initialize the array position to blank so that the answer is marked to wrong by default
                        return '<input type="text" ng-model="answers[' + attrs.qid + '][' + next + ']" ng-init="answers[' + attrs.qid + '][' + next + '] = \'\'">';
                    });
                    // update the html of the element with the replaced content
                    element.html(output);
                    // recompile the template, this will allow Angular to detect the previous ng-model dynamically added
                    $compile(element.contents())(scope);
                });
            }
        }
    }]);

    app.controller('exerciseTemplateCtrl', ['$http', '$scope', '$sce', 'exercisesJSON', '$filter', '$compile', function($http, $scope, $sce, exercisesJSON, $filter, $compile){

         // store exercise ids in this array, useful to check the position
         var arrExerciseIds = [];
         $scope.isFirstExercise = true;
         $scope.isLastExercise = false;

        $scope.answers = {};
        // $scope.questionLength = 0;
        $scope.correctAnswers = {};

         $http.get('/blank/writing_interface/ielts/encode_exercises.json')
              .then(function(response){
                 $scope.firstExercise = response.data;
                exercisesJSON.exercises = response.data;

                 for(var i in response.data){
                     totExercises++;
                     arrExerciseIds.push(i); // get array of exercise ids
                 }
                exercisesJSON.totExercises = totExercises;
                 // show the first exercise in the list
                 displayedExercise = arrExerciseIds[0];
             });
                 $scope.isLastExercise = true;
             }
             displayedExercise = arrExerciseIds[index + 1];
        };

         $scope.displayPrevExercise = function(){
             index = arrExerciseIds.indexOf(displayedExercise);
             if((index - 1) >= 0){
                 displayedExercise = arrExerciseIds[index - 1];
             }
        };

         // determines if an exercise has to be displayed or not
         $scope.isDisplayed = function(id){
             return id === displayedExercise;
        };

         // parses the HTML of an exercise (remember to use ng-bind-html)
         $scope.parseHtml = function(input){
             return $sce.trustAsHtml(input);
        };

        $scope.checkAnswers = function(id){
            var e = exercisesJSON.exercises;
            var len = exercisesJSON.totExercises;
            var answersStatus = [];
            var correctAnswers = [];

            console.log(e);

            for(var e_id in e){
                // creates an answer array with the following format:
                // [{1: "first gap"}, {2: "second gap"}, {1: "first gap alternative"}, {3: "third gap"}, {2: "second gap alternative"}]
                var answers = [];
                var q = e[e_id].q;
                for(var q_id in q){
                    var a = q[q_id].a;
                    for(var a_id in a){
                        var a_obj = {};
                        var a_pos = a[a_id].p;
                        var a_ans = a[a_id].a;
                        a_obj[a_pos] = a_ans;
                        answers.push(a_obj);
                    }

                    /* gets the previous answers array and puts it in the following format:

                            var result = {
                                1: ["first gap", "first gap alternative"],
                                2: ["second gap", "second gap alternative"],
                                3: ["third gap"]
                            }
                     */
                    var result = {};
                    for(var i = 0; i < answers.length; i++){
                        for(var j in answers[i]){
                            if(!result.hasOwnProperty(j)){
                                result[j] = [answers[i][j]];
                            }
                            else{
                                result[j].push(answers[i][j]);
                            }
                        }
                    }
                    // now that we have all of our answers in the right order and sorted by gap position, create another object with the question id as key
                    $scope.correctAnswers[q_id] = result;
                }
            }

            var c = $scope.correctAnswers;
            var a = $scope.answers;

            /*
                format of a (user answers)

                a = question_id1 : {
                        gap_number1 : answer1,
                        ...
                        gap_numberN : answerN
                    },
                    question_id2: {
                        gap_number1: answer1,
                        ...
                        gap_numberN: answerN
                    }

            i        : question_id
            j        : gap_number
            a[i][j]  : answer
            c[i][j]  : array of correct answers

            */

           for(var i in a){
                for(var j in a[i]){
                    if(a[i][j] == ""){ // not answered
                        a[i][j] = 2;
                    }
                    else{
                        // if we find a correct answer, "correct" will return a value greater than -1 (the array position) and -1 otherwise
                        var correct = c[i][j].indexOf(a[i][j]);
                        if(correct > -1){
                            a[i][j] = 1;
                        }
                        else{
                            a[i][j] = 0;
                        }
                    }
                }
            }

            console.log($scope.correctAnswers);
        };
     }]);
 })();