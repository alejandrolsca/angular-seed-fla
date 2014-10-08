module.exports = (function(angular){
    'use strict';
    
    return angular.module('app.other-module',[])

    .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('other-module', {
            url: "/other-module",
            templateUrl: "modules/other-module/partials/other-module.html",
            controller: 'OtherModuleCtrl'
        })
    })

    .controller('OtherModuleCtrl',require('./controllers/other-module-ctrl'))
    
})(angular);