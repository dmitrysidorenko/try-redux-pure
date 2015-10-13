angular.module('dashboard-api')
    .directive('dashboardWidget', function ($controller, $compile, $http, $templateCache) {
        return {
            scope: {
                widget: '=data'
            },
            compile: function (tElement, tAttrs) {
                return function (scope, $element) {
                    $element.data('$scope', null);
                    $http.get(scope.widget.template, {cache: $templateCache}).then(function (response) {
                        var html = response.data;
                        $element.html(html);
                        var link = $compile($element.contents());
                        var newScope = scope.$new();
                        var controller = $controller(scope.widget.controller, {
                            dashboardWidget: scope.widget,
                            $scope: newScope
                        });
                        $element.data('$ngControllerController', controller);
                        $element.children().data('$ngControllerController', controller);
                        link(newScope);
                        if (scope.$$phase) {
                            scope.$apply();
                        }
                    });
                }
            }
        }
    });
