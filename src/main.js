// основной класс приложения
class MassRevFeedViewer {
    constructor() {
        if (MassRevFeedViewer._instance) {
            throw new Error('Error: Instantiation failed: Use getInstance() instead of new.');
        }
        MassRevFeedViewer._instance = this;
    }

    static getInstance() {
        return MassRevFeedViewer._instance;
    }

    // метод запуска приложения
    static run(opts) {
        var options = $.extend({
            containerId: null, // идентификатор dom-контейнера
            url: null, // url сервиса данных
            pollingInterval: 5000, // интервал опроса сервиса даных в миллисекундах
            itemsToGet: 3 // количество записей данных для получения
        }, opts);


        if (!options.containerId || !$("#" + options.containerId).length) {
            throw new Error('Error: There is no output container selected');
        }

        if (!options.url) {
            throw new Error('Error: No data url');
        }

        var feedsDataService = new FeedsDataService(options.url, options.itemsToGet, options.pollingInterval);
        var feedsUiComponent = new FeedsUiComponent($("#" + options.containerId), options.itemsToGet);

        feedsDataService.startPolling(feedsUiComponent.redraw.bind(feedsUiComponent));
    }

}
