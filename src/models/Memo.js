export default class Memo {
    constructor({
        title = '',
        sentFrom = '',
        sentTo = '',
        date = '',
        action = '',
        haveAttachment = '',
        attachment = '',
        typeAttachment = '',
        body = '',
    }) {
        this.title = title;
        this.sentFrom = sentFrom;
        this.sentTo = sentTo;
        this.date = date;
        this.action = action;
        this.haveAttachment = haveAttachment;
        this.attachment = attachment;
        this.typeAttachment = typeAttachment;
        this.body = body;
    }

    validate () {
        if (!this.title) {
            throw new Error('Title is required');
        }
        if (!this.sentFrom) {
            throw new Error('Sent From is required');
        }
        if (!this.sentTo) {
            throw new Error('Sent To is required');
        }
        if (!this.date) {
            throw new Error('Date is required');
        }
        if (!this.action) {
            throw new Error('Action is required');
        }
        if (this.haveAttachment == 'Yes' && !this.attachment) {
            throw new Error('Attachment is required when haveAttachment is true');
        }
    }
}