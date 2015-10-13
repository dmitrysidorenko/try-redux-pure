angular.module('shared').constant('createReducer',
    function createReducer(initialState, handlers) {
        return function reducer(state, action) {
            state = state || initialState;
            if (handlers.hasOwnProperty(action.type)) {
                return handlers[action.type](state, action);
            } else {
                return state;
            }
        }
    });
