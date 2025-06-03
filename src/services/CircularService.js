import Circular from "../models/Circular.js";
import CircularRepository from "../repositories/CircularRespository.js";

export default class CircularService {
    constructor() {
        this.circularRepository = new CircularRepository();
    }

    async create(circularData) {
        const newCircular = new Circular(circularData);

        // Validar los campos requeridos
        newCircular.validate();

        // Guardar en el repositorio
        return await this.circularRepository.create({...newCircular});
    }

    async getAll() {
        return await this.circularRepository.getAll();
    }

    async getById(id) {
        return await this.circularRepository.getById(id);
    }
}