angular.module('shared')
    .constant('makeActionCreator', function makeActionCreator() {
        var type = arguments[0];
        var argNames = Array.prototype.slice.call(arguments, 1);
        var args = arguments;

        return function () {
            var action = {
                type: type
            };
            Array.prototype.forEach.call(arguments, function (arg, index) {
                action[argNames[index]] = arg;
            });
            return action;
        }
    }
);
