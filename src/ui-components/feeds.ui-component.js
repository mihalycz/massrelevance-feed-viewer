// компонент пользовательского интерфейса
class FeedsUiComponent {
    constructor (container, itemsToShow) {
        this.container = container;
        this.itemsToShow = itemsToShow;
        this.feeds = [];
    }

    // перерисовать компонент
    redraw(feeds) {
        if (feeds && feeds.length) {
            var newFeeds = [];
            for (var idxFeeds = feeds.length - 1; idxFeeds >= 0; idxFeeds -= 1) {
                var currentFeed = feeds[idxFeeds];
                var domObj = $(this.getFeedMarkup(currentFeed.name, currentFeed.text));

                if (this.feeds.length === this.itemsToShow) {
                    this.feeds[this.feeds.length - 1].remove();
                    this.feeds.pop();
                }
                this.feeds.unshift(domObj);
                newFeeds.unshift(domObj);
            }
            this.container.prepend(newFeeds);
        }
    }

    // получить разметку для элемента данных
    getFeedMarkup(name, text) {
        return '<div class="feed-item-container">' +
            '<h1>' + (name || '') + '</h1>' +
            '<p>' + (text ? this.urlify(text) : '') + '</p>' +
        '</div>'
    }

    // обернуть все ссылки в соотв. dom-элемент
    urlify(text) {
        var urlRegex = /(https?:\/\/[^\s]+)/g;
        return text.replace(urlRegex, function(url) {
            return '<a href="' + url + '">' + url + '</a>';
        })
    }
}
