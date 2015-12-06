// Обработчик получения ответа от api
class FeedsResponseHandler {
    static handle(feeds) {
        var result = [];
        if (feeds && feeds.length) {
            for (var feedIdx = 0, feedsLength = feeds.length; feedIdx < feedsLength; feedIdx += 1) {
                result.push(new Feed(feeds[feedIdx]));
            }
        }
        return result;
    }
}