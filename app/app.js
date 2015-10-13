'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ui.router',
    'core',
    'shared',
    'menu',
    'dashboard',
    'persons'
])
    .provider('appStore', function (reducers, callAPIMiddleware, thunkMiddleware) {
        var createStoreWithMiddleware = Redux.applyMiddleware(thunkMiddleware, callAPIMiddleware)(Redux.createStore);

        var reducer = Redux.combineReducers(reducers.getReducers());
        var store = createStoreWithMiddleware(reducer);

        function getStore() {
            return store;
        }

        this.getStore = getStore;

        this.$get = function () {
            return {
                getStore: getStore
            };
        };
    })
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/dashboard");
        $stateProvider
            .state('app', {
                url: '/',
                template: '<ui-view name="menu"></ui-view><ui-view name="content"></ui-view>',
                abstract: true
            })
            .state('app.dashboard', {
                url: "dashboard",

                views: {
                    'content': {
                        controller: 'dashboard.IndexController',
                        templateUrl: "dashboard/index.html"
                    },
                    'menu': {
                        templateUrl: 'menu/index.html',
                        controller: 'menu.IndexController'
                    }
                }
            });

    });
