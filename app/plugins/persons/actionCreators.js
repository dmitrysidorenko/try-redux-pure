angular.module('persons-api')
    .provider('persons-api.actionCreators', function (makeActionCreator) {
        var self = this;
        this.ADD_PERSON_WIDGET = 'ADD_PERSON_WIDGET';
        this.ADD_PERSON = 'ADD_PERSON';
        this.REMOVE_PERSON = 'REMOVE_PERSON';

        this.LOAD_PERSONS_REQUEST = 'LOAD_PERSONS_REQUEST';
        this.LOAD_PERSONS_SUCCESS = 'LOAD_PERSONS_SUCCESS';
        this.LOAD_PERSONS_FAILURE = 'LOAD_PERSONS_FAILURE';

        this.UPDATE_PERSON_REQUEST = 'UPDATE_PERSON_REQUEST';
        this.UPDATE_PERSON_SUCCESS = 'UPDATE_PERSON_SUCCESS';
        this.UPDATE_PERSON_FAILURE = 'UPDATE_PERSON_FAILURE';

        this.SAVE_PERSON_REQUEST = 'SAVE_PERSON_REQUEST';
        this.SAVE_PERSON_SUCCESS = 'SAVE_PERSON_SUCCESS';
        this.SAVE_PERSON_FAILURE = 'SAVE_PERSON_FAILURE';

        this.GET_PERSON_REQUEST = 'GET_PERSON_REQUEST';
        this.GET_PERSON_SUCCESS = 'GET_PERSON_SUCCESS';
        this.GET_PERSON_FAILURE = 'GET_PERSON_FAILURE';


        this.$get = ['personsService', function (personsService) {
            return {
                addPerson: makeActionCreator(self.ADD_PERSON, 'person'),
                removePerson: makeActionCreator(self.REMOVE_PERSON, 'person'),
                loadPersons: function (searchString) {
                    return {
                        types: [self.LOAD_PERSONS_REQUEST, self.LOAD_PERSONS_SUCCESS, self.LOAD_PERSONS_FAILURE],
                        shouldCallAPI: function (state) {
                            return true;
                        },
                        callAPI: function () {
                            return personsService.searchPersons(searchString);
                        },
                        payload: {
                            searchString: searchString
                        }
                    };
                },
                saveOrUpdatePerson: function (person) {
                    var isSave = !person.id;
                    var types = isSave
                        ? [self.SAVE_PERSON_REQUEST, self.SAVE_PERSON_SUCCESS, self.SAVE_PERSON_FAILURE]
                        : [self.UPDATE_PERSON_REQUEST, self.UPDATE_PERSON_SUCCESS, self.UPDATE_PERSON_FAILURE];
                    return {
                        types: types,
                        shouldCallApi: function () {
                            return true;
                        },
                        callAPI: function () {
                            debugger;
                            if (isSave) {
                                return personsService.savePerson(person);
                            } else {
                                return personsService.updatePerson(person);
                            }
                        },
                        payload: {
                            person: person
                        }
                    }
                },
                getPerson: function (person) {
                    return {
                        types: [self.GET_PERSON_REQUEST, self.GET_PERSON_SUCCESS, self.GET_PERSON_FAILURE],
                        shouldCallApi: function () {
                            return true;
                        },
                        callAPI: function () {
                            return personsService.getPerson(person);
                        },
                        payload: {
                            person: person
                        }
                    }
                }
            };
        }];
    });
