// ! This file is for verify the token and revoke it
const revokedToken = new Set();

export default class TokenService {
    static revokedToken (token) {
        try {
            revokedToken.add(token);
        } catch (error) {
            throw { message: 'Error al revocar el token -> ', error, statusCode: 500 };
        }
    }

    // * Metodo para comprobar la revocación del token:
    static async isTokenRevoked(token) {
    try {
        return revokedToken.has(token);
    } catch (error) {
        throw { message: 'Error al comprobar la revocación del token -> ', error, statusCode: 500 };
    }
}
}