angular.module('dashboard-api')
    .provider('dashboard-api.actionCreators', function (makeActionCreator) {
        var self = this;

        this.ADD_WIDGET = 'ADD_WIDGET';
        this.REMOVE_WIDGET = 'REMOVE_WIDGET';
        this.NEW_WIDGET_PLEASE_REQUEST = 'NEW_WIDGET_PLEASE_REQUEST';
        this.NEW_WIDGET_PLEASE_SUCCESS = 'NEW_WIDGET_PLEASE_SUCCESS';
        this.NEW_WIDGET_PLEASE_FAILURE = 'NEW_WIDGET_PLEASE_FAILURE';

        this.$get = ['widgets', '$q', 'guid', function (widgets, $q, guid) {
            return {
                addWidget: makeActionCreator(self.ADD_WIDGET, 'widget'),
                removeWidget: makeActionCreator(self.REMOVE_WIDGET, 'widget'),
                newWidgetPlease: function (widgetName, params) {
                    return {
                        types: [self.NEW_WIDGET_PLEASE_REQUEST, self.NEW_WIDGET_PLEASE_SUCCESS, self.NEW_WIDGET_PLEASE_FAILURE],
                        shouldCallAPI: function (state) {
                            return true;
                        },
                        callAPI: function () {
                            return $q(function (resolve, reject) {
                                var widgetDeclaration = widgets.getWidget(widgetName);
                                if (!widgetDeclaration) {
                                    reject('Widget with name "' + widgetName + '" does not exist')
                                } else {
                                    var newWidget = Object.assign({}, widgetDeclaration, {
                                        params: params,
                                        id: guid()
                                    });
                                    resolve(newWidget);
                                }
                            });
                        },
                        payload: {
                            widgetName: widgetName,
                            params: params
                        }
                    };
                }
            };
        }];
    });
