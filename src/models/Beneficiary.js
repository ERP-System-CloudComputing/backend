export default class Beneficiary {
    constructor(
        accountName = '',
        accountNumber = '',
        bankName = '',
        verifierSignature = '',
        authorizerSignature = '',
    ) {
        this.accountName = accountName;
        this.accountNumber = accountNumber;
        this.bankName = bankName;
        this.verifierSignature = verifierSignature;
        this.authorizerSignature = authorizerSignature;
    }

    validate() {
        if (!this.accountName || !this.accountNumber || !this.bankName) {
            throw new Error('Faltan datos del beneficiario');
        }
        if (isNaN(this.accountNumber)) {
            throw new Error('El número de cuenta debe ser un número válido');
        }
        if (!this.verifierSignature || !this.authorizerSignature) {
            throw new Error('Faltan firmas de verificación o autorización');
        }
    }
}