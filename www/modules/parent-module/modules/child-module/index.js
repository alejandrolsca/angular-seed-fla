module.exports = (function(angular){
    'use strict';
    
    return angular.module('app.child-module',[])

    .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('child-module', {
            url: "/parent-module/child-module",
            templateUrl: "modules/parent-module/modules/child-module/partials/child-module.html",
            controller: 'ChildModuleCtrl'
        })
    })

    .controller('ChildModuleCtrl',require('./controllers/child-module-ctrl'))
    
})(angular);