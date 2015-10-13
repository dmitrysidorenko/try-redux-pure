angular.module('persons')
    .config([
        'reducers',
        'persons-api.actionCreatorsProvider',
        'guid',
        'createReducer',
        function (reducers, actionCreators, guid, createReducer) {
            var initialState = [];
            var handlers = {};
            handlers[actionCreators.ADD_PERSON] = function (state, action) {
                return state.concat(action.person);
            };
            handlers[actionCreators.REMOVE_PERSON] = function (state, action) {
                return state.filter(function (p) {
                    return p.guid !== action.person.guid;
                });
            };
            handlers[actionCreators.SAVE_PERSON_REQUEST] = function (state, action) {
                var newPerson = Object.assign({}, action.person, {
                    $metadata: Object.assign({},
                        action.person.$metadata,
                        {
                            processingState: 'saving',
                            error: null
                        })
                });
                var newState = state.slice();
                var existedPerson = newState.filter(function (p) {
                    return p.guid === action.person.guid;
                });
                if (existedPerson) {
                    newState.splice(newState.indexOf(existedPerson), 1, newPerson);
                } else {
                    newState.push(newPerson);
                }
                return newState;
            };
            handlers[actionCreators.SAVE_PERSON_SUCCESS] = function (state, action) {
                var newPerson = Object.assign({}, action.response, {
                    $metadata: Object.assign({},
                        action.person.$metadata,
                        {
                            processingState: 'saved',
                            error: null
                        })
                });
                var newState = state.slice();
                var existedPerson = newState.filter(function (p) {
                    return p.guid === action.person.guid;
                });
                if (existedPerson) {
                    newState.splice(newState.indexOf(existedPerson), 1, newPerson);
                } else {
                    newState.push(newPerson);
                }
                return newState;
            };
            handlers[actionCreators.SAVE_PERSON_FAILURE] = function (state, action) {
                var newPerson = Object.assign({}, action.person, {
                    $metadata: Object.assign({},
                        action.person.$metadata,
                        {
                            processingState: 'failed',
                            error: action.error
                        })
                });
                var newState = state.slice();
                var existedPerson = newState.filter(function (p) {
                    return p.guid === action.person.guid;
                });
                if (existedPerson) {
                    newState.splice(newState.indexOf(existedPerson), 1, newPerson);
                } else {
                    newState.push(newPerson);
                }
                return newState;
            };

            reducers.addReducer('persons', createReducer(initialState, handlers));
        }]);
