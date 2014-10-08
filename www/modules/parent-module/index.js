module.exports = (function(angular){
    'use strict';
    
    return angular.module('app.parent-module',[
        require('./modules/child-module').name
    ])

    .config(function($stateProvider, $urlRouterProvider) {
        
        $urlRouterProvider.otherwise("/parent-module");

        $stateProvider
        .state('parent-module', {
            url: "/parent-module",
            templateUrl: "modules/parent-module/partials/parent-module.html",
            controller: 'ParentModuleCtrl'
        })
    })

    .controller('ParentModuleCtrl',require('./controllers/parent-module-ctrl'))
    
})(angular);