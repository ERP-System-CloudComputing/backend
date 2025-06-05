export default class LogisticsRequest {
    constructor({
        title = '',
        purpose = '',
        amount = 0,
        requestedBy = '',
        sentTo = '',
        status = 'PENDING',
        dateFrom = '',
        dateTo = '',
        attachment = {}
    }) {
        this.title = title;
        this.purpose = purpose;
        this.amount = amount;
        this.requestedBy = requestedBy;
        this.sentTo = sentTo;
        this.status = status;
        this.dateFrom = dateFrom;
        this.dateTo = dateTo;
        this.attachment = attachment;
    }

    validate() {
        if (!this.title || !this.purpose || this.amount <= 0 || !this.requestedBy || !this.sentTo) {
            throw new Error('Invalid logistics request data');
        }
        if (this.dateFrom && this.dateTo && new Date(this.dateFrom) > new Date(this.dateTo)) {
            throw new Error('Invalid date range');
        }
    }
}