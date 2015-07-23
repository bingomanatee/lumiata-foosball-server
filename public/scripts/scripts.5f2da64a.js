"use strict";angular.module("lumiataFoosballApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","ngMaterial"]).constant("MONGOLAB_API_KEY","8uHmSZH355k-nFgXmWDAsHT_GTvmsATk").constant("MONGOLAB_DATABASE","lumiata-foosball").config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).when("/players",{templateUrl:"views/players.html",controller:"PlayersCtrl",controllerAs:"players"}).otherwise({redirectTo:"/"})}]).controller("AppCtrl",["$scope","$timeout","$mdSidenav","$mdUtil","$log",function(a,b,c,d,e){function f(a){var b=d.debounce(function(){c(a).toggle().then(function(){e.debug("toggle "+a+" is done")})},300);return b}a.toggleLeft=f("left"),a.toggleRight=f("right")}]).controller("LeftCtrl",["$scope","$timeout","$mdSidenav","$log",function(a,b,c,d){a.close=function(){c("left").close().then(function(){d.debug("close LEFT is done")})}}]).controller("RightCtrl",["$scope","$timeout","$mdSidenav","$log",function(a,b,c,d){a.close=function(){c("right").close().then(function(){d.debug("close RIGHT is done")})}}]),angular.module("lumiataFoosballApp").controller("MainCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("lumiataFoosballApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("lumiataFoosballApp").controller("PlayersCtrl",["$scope","Players",function(a,b){a.createPlayer=function(){a.newPlayer||(a.newPlayer={name:"new player"})},a.newPlayer=null,a.players=[],b.all().then(function(b){a.players=b},function(){a.players=[]}),a.addPlayer=function(){a.newPlayer&&a.newPlayer.name&&(b.put(a.newPlayer).then(function(a){console.log("new player result:",a)},function(a){console.log("error: ",a)}),a.newPlayer=null)}}]),angular.module("lumiataFoosballApp").service("Players",["$q","MONGOLAB_DATABASE","MONGOLAB_API_KEY","$http",function(a,b,c,d){var e="https://api.mongolab.com/api/1/databases/"+b+"/collections/players",f={apiKey:c};return{all:function(){var b=a.defer();return d.get(e).success(function(a){b.resolve(a)}).error(function(a){b.reject(a)}),b.promise},put:function(b){var c=a.defer();return d.post(e,b,{params:f}).success(function(a){console.log("result of ",e,a),c.resolve(a)}).error(function(a,b){console.log("error of ",e,a),c.reject({data:a,status:b})}),c.promise}}}]),angular.module("lumiataFoosballApp").run(["$templateCache",function(a){a.put("views/about.html","<p>This is the about view.</p>"),a.put("views/main.html",'<div class="jumbotron"> <h1>\'Allo, \'Allo!</h1> <p class="lead"> <img src="images/yeoman.8cb970fb.png" alt="I\'m Yeoman"><br> Always a pleasure scaffolding your apps. </p> <p><a class="btn btn-lg btn-success" ng-href="#/">Splendid!<span class="glyphicon glyphicon-ok"></span></a></p> </div> <div class="row marketing"> <h4>HTML5 Boilerplate</h4> <p> HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites. </p> <h4>Angular</h4> <p> AngularJS is a toolset for building the framework most suited to your application development. </p> <h4>Karma</h4> <p>Spectacular Test Runner for JavaScript.</p> </div>'),a.put("views/players.html",'<md-button class="md-raised md-primary" ng-click="createPlayer()"> Create Player </md-button> <md-content layout-padding ng-if="newPlayer"> <form name="userForm"> <div layout layout-sm="column"> <md-input-container style="max-width: 20rem"> <label>Name</label> <input ng-model="newPlayer.name" required> </md-input-container> <div flex> <md-button class="md-raised md-primary" ng-click="addPlayer()"> Save Player </md-button> </div> </div> </form> </md-content> <md-list ng-if="players.length"> <md-subheader class="md-no-sticky">Players</md-subheader> <md-list-item ng-repeat="player in players"> <p> {{ player.name }} </p> </md-list-item> </md-list>')}]);