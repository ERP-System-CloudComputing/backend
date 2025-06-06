export default class AnualBudget {
    constructor({
        year,
        totalAmount = 0,
        createdAt = new Date(),
        updatedAt = new Date()
    }) {
        this.year = year;
        this.totalAmount = totalAmount;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}