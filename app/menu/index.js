angular.module('menu', ['core', 'persons-api'])
    .controller('menu.IndexController', [
        '$scope',
        '$timeout',
        'persons-api.actionCreators',
        'dashboard-api.actionCreators',
        'appStore',
        'guid',
        function ($scope, $timeout, personsActionCreators, dashboardActionCreators, appStore, guid) {
            var store = appStore.getStore();
            $scope.searchString = "";
            $scope.showOmnibox = false;
            $scope.showCreateButton = false;
            $scope.searchPersons = store.getState().searchPersons;

            $scope.search = function () {
                $scope.showCreateButton = true;
                store.dispatch(personsActionCreators.loadPersons($scope.searchString));
            };

            $scope.createNewPerson = function () {
                var newPerson = {
                    id: null,
                    name: $scope.searchString,
                    guid: guid(),
                    $metadata: {
                        processingState: 'new',
                        error: ''
                    }
                };
                store.dispatch(personsActionCreators.addPerson(newPerson));
                var action = dashboardActionCreators.newWidgetPlease('person-widget', {
                    person: newPerson
                });
                store.dispatch(action);
            };

            $scope.onFocus = function () {
                $scope.showOmnibox = true;
                $scope.showCreateButton = false;
            };

            $scope.onBlur = function () {
                $timeout(function () {
                    $scope.showOmnibox = false;
                    $scope.showCreateButton = false;
                }, 300);
            };

            $scope.openWidget = function (person) {
                store.dispatch(personsActionCreators.addPerson(person));
                var action = dashboardActionCreators.newWidgetPlease('person-widget', {
                    person: person
                });
                store.dispatch(action);
            };

            store.subscribe(function () {
                $scope.searchPersons = store.getState().searchPersons;
            });
        }]);
