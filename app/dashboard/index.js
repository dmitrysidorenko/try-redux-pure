angular.module('dashboard', ['dashboard-api', 'core', 'shared'])
    .controller('dashboard.IndexController', ['$scope', 'widgets', 'appStore', 'dashboard-api.actionCreators', function ($scope, widgets, appStore, actionCreators) {
        var store = appStore.getStore();

        angular.extend($scope, {
            dashboard: store.getState().dashboard
        });

        angular.extend($scope, {
            removeWidget: function (widget) {
                store.dispatch(actionCreators.removeWidget(widget));
            }
        });

        var unsubscribe = store.subscribe(function () {
            $scope.dashboard = store.getState().dashboard;
        });

    }])
    .config(['reducers', 'dashboard-api.actionCreatorsProvider', function (reducers, actionCreators) {
        reducers.addReducer('dashboard', function (state, action) {
            state = state || {
                    addingWidgetError: null,
                    widgets: [],
                    isAddingWidget: false
                };

            switch (action.type) {
                case actionCreators.NEW_WIDGET_PLEASE_REQUEST:
                    return updateState(state.widgets, {
                        isAddingWidget: true,
                        addingWidgetError: null
                    });

                case actionCreators.NEW_WIDGET_PLEASE_SUCCESS:
                    return updateState(state.widgets.concat(action.response), {
                        isAddingWidget: false,
                        addingWidgetError: null
                    });

                case actionCreators.NEW_WIDGET_PLEASE_FAILURE:
                    return updateState(state.widgets, {
                        isAddingWidget: false,
                        addingWidgetError: action.error
                    });

                case actionCreators.ADD_WIDGET:
                    return updateState(state.widgets.concat(action.widget));

                case actionCreators.REMOVE_WIDGET:
                    var widgetIndex = state.widgets.indexOf(action.widget);
                    if (widgetIndex > -1) {
                        var newWidgetList = state.widgets.slice();
                        newWidgetList.splice(widgetIndex, 1);
                        return updateState(newWidgetList);
                    }
                    return state;

                default:
                    return state;
            }

            function updateState(widgets, otherParams) {
                return Object.assign({}, state, otherParams, {
                    widgets: widgets
                });
            }
        });
    }]);
