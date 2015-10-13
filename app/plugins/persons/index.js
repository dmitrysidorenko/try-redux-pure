angular.module('persons', [
    'core',
    'shared',
    'persons-api',
    'dashboard-api'
])
    .config(['widgetsProvider', function (widgetsProvider) {
        widgetsProvider.registerWidget('person-widget', {
            controller: [
                '$scope',
                'persons-api.actionCreators',
                'widgetsManager',
                'dashboardWidget',
                'PersonWidgetHelper',
                function ($scope, actionCreators, widgetsManager, dashboardWidget, PersonWidgetHelper) {
                    var widget = widgetsManager.getWidgetById(dashboardWidget.id);
                    var helper = new PersonWidgetHelper(widget, update);

                    $scope.person = null;
                    $scope.isSaving = null;
                    $scope.error = null;

                    window.Scope = $scope;

                    $scope.removePerson = function (person) {
                        helper.removePerson(person);
                    };

                    $scope.save = function () {
                        helper.saveOrUpdatePerson($scope.person);
                    };

                    $scope.$on('$destroy', helper.destroy);

                    update();

                    function update() {
                        $scope.person = helper.getPerson();
                        $scope.isSaving = helper.getSaving();
                        $scope.error = helper.getError();
                        if ($scope.$$phase) {
                            $scope.$digest();
                        }
                    }
                }],
            template: 'plugins/persons/index.html'
        });
    }]);
