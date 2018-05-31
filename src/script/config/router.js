'use strict';

angular.module('app').config(['$stateProvider','$urlRouterProvider',routerHelp]);
//大家很纳闷这个provider是个什么东西，provider就是对前面的这个服务（$state,$urlRouter）进行配置，一个入口
routerHelp.$inject = [ '$state', '$scope','$ionicPopup'  ];

function routerHelp($stateProvider,$urlRouterProvider) {
    $stateProvider.state('main',{
        //配置路由，主页面main
        url:'/main',//哈希值
        templateUrl:'view/main.html',
        controller:'mainCtrl'
    })

    $urlRouterProvider.otherwise('main')//默认跳转重定向路由
}