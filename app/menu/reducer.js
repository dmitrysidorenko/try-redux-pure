angular.module('menu')
    .config(['reducers', 'persons-api.actionCreatorsProvider', function (reducers, actionCreators) {
        reducers.addReducer('searchPersons', function (state, action) {
            state = state || {
                    isFetching: false,
                    persons: [],
                    error: null
                };
            switch (action.type) {

                case actionCreators.LOAD_PERSONS_REQUEST:
                    return Object.assign({}, state, {
                        error: null,
                        isFetching: true
                    });

                case actionCreators.LOAD_PERSONS_SUCCESS:
                    return Object.assign({}, state, {
                        error: null,
                        persons: action.response,
                        isFetching: false
                    });

                case actionCreators.LOAD_PERSONS_FAILURE:
                    return Object.assign({}, state, {
                        error: action.error,
                        persons: [],
                        isFetching: false
                    });

                default:
                    return state;
            }
        });
    }]);

