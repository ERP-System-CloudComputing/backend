export default class Circular {
    constructor({
        title,
        message,
        sentFrom = '',
        sentTo = '',
        date = '',
    }) {
        this.title = title;
        this.message = message;
        this.sentFrom = sentFrom;
        this.sentTo = sentTo;
        this.date = date;
    }
}