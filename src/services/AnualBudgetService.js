
export default class AnualBudgetService {
    constructor(anualBudgetModel) {
        this.anualBudgetModel = anualBudgetModel;
    }

    async create(data) {
        const anualBudget = new this.anualBudgetModel(data);
        return await anualBudget.save();
    }

    async getAll() {
        return await this.anualBudgetModel.find();
    }

    async getById(id) {
        return await this.anualBudgetModel.findById(id);
    }

    async update(id, data) {
        return await this.anualBudgetModel.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return await this.anualBudgetModel.findByIdAndDelete(id);
    }
}