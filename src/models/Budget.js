export default class Budget {
    constructor({
        annualBudgetId,
        number,
        description,
        amount,
        actualAmount = 0,
        variance = 0,
        requestDate,
        receivingOffice = '',
        status = 'PENDING', // PENDING, APPROVED
        createdAt = new Date(),
        updatedAt = new Date()
    }) {
        this.annualBudgetId = annualBudgetId;
        this.number = number;
        this.description = description;
        this.amount = amount;
        this.actualAmount = actualAmount;
        this.variance = variance;
        this.requestDate = requestDate;
        this.receivingOffice = receivingOffice;
        this.status = status; // DRAFT, PENDING_APPROVAL, APPROVED, REJECTED, COMPLETED, CANCELLED
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}