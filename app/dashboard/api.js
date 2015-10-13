angular.module('dashboard-api', [
    'core',
    'shared'
])
    .provider('widgets', function () {
        var widgets = {};

        function registerWidget(name, options) {
            widgets[name] = options;
        }

        function getWidget(name) {
            return widgets[name];
        }

        this.registerWidget = registerWidget;
        this.getWidget = getWidget;

        this.$get = function () {
            return {
                registerWidget: registerWidget,
                getWidget: getWidget
            }
        }
    })
    .service('widgetsManager', function (appStore) {
        var store = appStore.getStore();
        var data = {
            dashboard: store.getState().dashboard
        };
        store.subscribe(function () {
            data.dashboard = store.getState().dashboard;
        });

        this.getWidgetById = function (widgetId) {
            return data.dashboard.widgets.filter(function (w) {
                    return w.id === widgetId;
                })[0] || null;
        };
    })
;
