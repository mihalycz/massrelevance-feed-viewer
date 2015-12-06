// Сервис опроса api
class FeedsDataService {
    constructor (url, itemsToGet, pollingInterval) {
        this.feedsApiService = new FeedsApiService(url, itemsToGet, FeedsResponseHandler);
        this.interval = pollingInterval;
        this.lastEntityId = 0;
    }

    // начать процесс получения данных
    startPolling(resultCallback) {
        this.resultCallback = resultCallback;
        this.getData();
    }

    // шаг получения данных
    getData () {
        this.feedsApiService.getData(this.lastEntityId).then((feeds) => {
            if (feeds && feeds.length) {
                if (this.resultCallback && typeof this.resultCallback === 'function') {
                    this.resultCallback(feeds)
                }
                this.lastEntityId = feeds[0].id;
            }
            setTimeout(this.getData.bind(this), this.interval);
        }, (error) => {
            console.log(error);
            setTimeout(this.getData.bind(this), this.interval);
        });
    }
}
