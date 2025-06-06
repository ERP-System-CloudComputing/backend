export default class Stock {
    constructor({
        image = '',
        name = '',
        id = '',
        category = '',
        quantity = 0,
        unitPrice = 0.0,
        totalCost = 0.0,
        inStock = 0,
        supplier = '',
    }) {
        this.image = image;
        this.name = name;
        this.id = id;
        this.category = category;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
        this.totalCost = totalCost;
        if (inStock <= 0) {
            this.inStock = quantity;
        }
        this.supplier = supplier;
    }

    validate() {
        if (!this.name) {
            throw new Error('Name is required');
        }
        if (this.quantity < 0) {
            throw new Error('Quantity cannot be negative');
        }
        if (this.unitPrice < 0) {
            throw new Error('Unit price cannot be negative');
        }
        if (this.totalCost < 0) {
            throw new Error('Total cost cannot be negative');
        }
        if (this.inStock < 0) {
            throw new Error('In stock cannot be negative');
        }
        if (!this.supplier) {
            throw new Error('Supplier is required');
        }
        if (!this.category) {
            throw new Error('Category is required');
        }
        if (!this.id) {
            throw new Error('ID is required');
        }
        if (!this.image) {
            throw new Error('Image is required');
        }
    }
}