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

    async update(id, circularData) {
        let existingCircular = await this.circularRepository.getById(id);

        existingCircular = new Circular(existingCircular);

        // Actualizar los campos del circular existente con los nuevos datos
        Object.assign(existingCircular, circularData);

        // Validar los campos requeridos
        existingCircular.validate();

        // Guardar en el repositorio
        return await this.circularRepository.update(id, {...existingCircular});
    }
}