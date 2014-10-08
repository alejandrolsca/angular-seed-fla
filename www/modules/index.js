// Starter App

(function(angular){
    'use strict';
    
    angular.module('app', [
        'ui.router',
        require('./parent-module').name,
        require('./other-module').name
    ])

    .run(function() {

    })

})(angular);

