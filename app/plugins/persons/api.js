angular.module('persons-api', [
    'core',
    'shared'
])
    .factory('PersonWidgetHelper', [
        'persons-api.actionCreators',
        'appStore',
        function (actionCreators, appStore) {
            function PersonWidgetHelper(widget, updateCallback) {
                var store = appStore.getStore();
                var data = {
                    person: null,
                    isSaving: false,
                    error: null
                };

                update();

                this.getPerson = function () {
                    return Object.assign({}, data.person);
                };
                this.getSaving = function () {
                    return data.isSaving;
                };
                this.getError = function () {
                    return data.error;
                };

                this.saveOrUpdatePerson = function (person) {
                    store.dispatch(actionCreators.saveOrUpdatePerson(person));
                };
                this.removePerson = function (person) {
                    store.dispatch(actionCreators.removePerson(person));
                };

                this.destroy = store.subscribe(function () {
                    update();
                    updateCallback();
                });

                function update() {
                    var state = store.getState();
                    data.person = findPerson(state.persons, widget.params.person.guid);
                    data.isSaving = data.person ? data.person.$metadata.processingState === 'saving' : false;
                    data.error = data.person ? data.person.$metadata.error : null;
                }
            }

            function findPerson(persons, guid) {
                return persons.filter(function (p) {
                        return p.guid === guid;
                    })[0] || null;
            }

            return PersonWidgetHelper;
        }]);
