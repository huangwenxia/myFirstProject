// 为什么叫app.js呢，因为它是按照升序进行排列的，app.js这个文件就会排在前面，而且必须排在前面，所以建议大家叫app.js

'use strict';

angular.module('app',['ui.router']);//引入angularJS之后，会有一个全局对象叫做angular,这个对象有一个module函数，用它来创建模块
//但是现在创建之后它并不能使用因为还没有启动，启动方式：在html元素上添加指令ng-app

//'配置路由'：路由就是用来管理页面和业务逻辑的跳转以及加载。*#*#4636#*#*
//['ui.router'],一般引入一个模块之后就需要对他进行配置，单独创建一个文件夹，比如把配置文件单独提出来放到一个config目下
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