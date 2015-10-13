angular.module('persons-api')
    .service('personsService', function ($q, $timeout, guid) {
        var data = {
            persons: getPersons()
        };

        function restore() {
            data.persons = getPersons();
        }

        function save() {
            setPersons(data.persons);
        }

        this.searchPersons = function (searchString) {
            return $q(function (resolve, reject) {
                $timeout(function () {
                    restore();
                    var error = null;
                    if (error) {
                        reject(error);
                    } else {
                        resolve(data.persons.filter(function (p) {
                            return p.name.indexOf(searchString > -1);
                        }));
                    }
                }, 1000);
            });
        };

        this.savePerson = function (person) {
            var defer = $q.defer();
            $timeout(function () {
                person = angular.extend(person, {
                    id: guid()
                });
                data.persons.push(person);
                save();
                defer.resolve(person);
            }, 1000);

            return defer.promise;
        };

        this.updatePerson = function (person) {
            var defer = $q.defer();
            $timeout(function () {
                restore();
                var savedPerson = data.persons.filter(function (p) {
                    return p.id === person.id;
                })[0];
                if (savedPerson) {
                    savedPerson.name = person.name;
                    save();
                }
                defer.resolve(true);
            }, 1000);

            return defer.promise;
        };

        this.removePerson = function (personId) {
            var defer = $q.defer();
            $timeout(function () {
                defer.resolve(true);
            }, 1000);

            return defer.promise;
        };

        function getPersons() {
            var str = localStorage.getItem('persons');
            try {
                return JSON.parse(str) || [];
            } catch (e) {
                return [];
            }
        }

        function setPersons(persons) {
            localStorage.setItem('persons', angular.toJson(persons));
        }
    });
