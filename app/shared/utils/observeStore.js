angular.module('shared')
    .constant('observeStore', function observeStore(store, select, onChange) {
        var currentState;

        function handleChange() {
            var nextState = select(store.getState());
            if (nextState !== currentState) {
                currentState = nextState;
                onChange(currentState);
            }
        }

        var unsubscribe = store.subscribe(handleChange);
        handleChange();
        return unsubscribe;
    });
