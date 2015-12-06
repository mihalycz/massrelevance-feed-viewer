// контейнер с данными записи
class Feed {
    constructor(feed) {
        this.id = String(feed['entity_id'] || '');
        this.name = String(feed.user && feed.user.name ?  feed.user.name : '');
        this.text = String(feed.text || '');
    }
}
