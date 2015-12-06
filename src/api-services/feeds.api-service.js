// Сервис получения данных
class FeedsApiService {
    constructor(url, itemsToGet, respnseHandler) {
        this.url = String(url || '');
        this.itemsToGet = itemsToGet;
        this.responseHandler = respnseHandler;
    }

    // получить порцию новых данных
    getData(sinceId) {
        var data = {
            limit: this.itemsToGet
        };
        if (sinceId) {
            data['since_id'] = sinceId;
        }
        var getDataPromise = new Promise((resolve, reject) => {
            $.ajax({
                url: this.url,
                jsonp: "callback",
                dataType: "jsonp",
                data: data,
                success: (response) => {
                    if (this.responseHandler && typeof this.responseHandler.handle === "function") {
                        resolve(this.responseHandler.handle(response));
                    } else {
                        resolve(response);
                    }
                },
                error: (xhr, status, errorThrown) => {
                    reject(errorThrown);
                }
            });
        });

        return getDataPromise;
    }
}
