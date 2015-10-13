angular.module('core', [])
    .constant('reducers', {
        reducers: {},
        getReducers: function () {
            return this.reducers;
        },
        addReducer: function (name, reducer) {
            this.reducers[name] = reducer;
        }
    });
