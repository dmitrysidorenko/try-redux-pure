angular.module('dashboard').config([
    'reducers',
    'dashboard-api.actionCreatorsProvider',
    'createReducer',
    function (reducers, actionCreators, createReducer) {
        var initialState = {
            addingWidgetError: null,
            widgets: [],
            isAddingWidget: false
        };
        var handlers = {};
        handlers[actionCreators.NEW_WIDGET_PLEASE_REQUEST] = function (state, action) {
            return updateState(state, state.widgets, {
                isAddingWidget: true,
                addingWidgetError: null
            });
        };
        handlers[actionCreators.NEW_WIDGET_PLEASE_SUCCESS] = function (state, action) {
            return updateState(state, state.widgets.concat(action.response), {
                isAddingWidget: false,
                addingWidgetError: null
            });
        };
        handlers[actionCreators.NEW_WIDGET_PLEASE_FAILURE] = function (state, action) {
            return updateState(state, state.widgets, {
                isAddingWidget: false,
                addingWidgetError: action.error
            });
        };
        handlers[actionCreators.ADD_WIDGET] = function (state, action) {
            return updateState(state, state.widgets.concat(action.widget));
        };
        handlers[actionCreators.REMOVE_WIDGET] = function (state, action) {
            var widgetIndex = state.widgets.indexOf(action.widget);
            if (widgetIndex > -1) {
                var newWidgetList = state.widgets.slice();
                newWidgetList.splice(widgetIndex, 1);
                return updateState(state, newWidgetList);
            }
            return state;
        };

        reducers.addReducer('dashboard', createReducer(initialState, handlers));

        function updateState(state, widgets, otherParams) {
            return Object.assign({}, state, otherParams, {
                widgets: widgets
            });
        }
    }]);
