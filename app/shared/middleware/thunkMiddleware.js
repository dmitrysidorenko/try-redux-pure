angular.module('shared').constant('thunkMiddleware', function thunkMiddleware(args) {
    var dispatch = args.dispatch;
    var getState = args.getState;

    return function (next) {
        return function (action) {
            return typeof action === 'function' ? action(dispatch, getState) : next(action);
        };
    };
});
