angular.module('shared').constant('callAPIMiddleware', function callAPIMiddleware(args) {
        var dispatch = args.dispatch;
        var getState = args.getState;

        return function (next) {
            return function (action) {
                var types = action.types;
                var callAPI = action.callAPI;
                var shouldCallAPI = action.shouldCallAPI || function () {
                        return true;
                    };
                var payload = action.payload;

                if (!types) {
                    // Normal action: pass it on
                    return next(action);
                }

                if (!Array.isArray(types) || types.length !== 3 || !types.every(function (type) {
                        return typeof type === 'string';
                    })) {
                    throw new Error('Expected an array of three string types.');
                }

                if (typeof callAPI !== 'function') {
                    throw new Error('Expected fetch to be a function.');
                }

                if (!shouldCallAPI(getState())) {
                    return;
                }

                var requestType = types[0];
                var successType = types[1];
                var failureType = types[2];

                dispatch(Object.assign({}, payload, {
                    type: requestType
                }));

                return callAPI().then(function (response) {
                        return dispatch(Object.assign({}, payload, {
                            response: response,
                            type: successType
                        }));
                    },
                    function (error) {
                        return dispatch(Object.assign({}, payload, {
                            error: error,
                            type: failureType
                        }))
                    }
                );
            };
        };
    }
);
