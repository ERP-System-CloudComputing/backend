export default class Beneficiary {
    constructor({
        accountName = '',
        accountNumber = '',
        bankName = '',
        authorizerSignatureData = '',
        verifierSignatureData = ''
    }) {
        this.accountName = accountName;
        this.accountNumber = accountNumber;
        this.bankName = bankName;
        this.verifierSignature = authorizerSignatureData;
        this.authorizerSignature = verifierSignatureData;
    }

    validate() {
        if (!this.accountName) {
            throw new Error('El nombre de la cuenta es obligatorio');
        }
        if (!this.accountNumber) {
            throw new Error('El número de cuenta es obligatorio');
        }
        if (!this.bankName) {
            throw new Error('El nombre del banco es obligatorio');
        }
        if (!this.verifierSignature || !this.authorizerSignature) {
            throw new Error('Faltan firmas de verificación o autorización');
        }
    }
}