export default class Circular {
    constructor({
        title = '',
        message = '',
        sentFrom = '',
        sentTo = '',
        date = '',
        type = 'Sent'
    }) {
        this.title = title;
        this.message = message;
        this.sentFrom = sentFrom;
        this.sentTo = sentTo;
        this.date = date;
        this.type = type; // 'Sent' o 'Received'
    }

    // Método para validar los campos requeridos
    validate() {
        if (!this.title || !this.message) {
            throw new Error('El titulo y el mensaje son campos requeridos.');
        }
        if (!this.sentFrom) {
            throw new Error('El campo Sent From es obligatorio.');
        }
        if (!this.sentTo) {
            throw new Error('El campo Sent To es obligatorio.');
        }
        if (!this.date) {
            throw new Error('El campo Date es obligatorio.');
        }
    }
}