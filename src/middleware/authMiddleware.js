import jwt from 'jsonwebtoken';
import TokenService from '../services/tokenService.js';
import StaffRepository from '../repositories/StaffRepository.js';

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    // console.log('Autorization header:', authHeader);

    if (!authHeader) 
        return res.status(401).json({ message: 'No se proporcionó el token de autorización' });

    const token = authHeader.split(' ')[1];

    
    
    try {
        // ! 1. Decodificar el token que se está mandando
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        
        // * Verificar que el token coincida con el almacenado
        const staffRepository = new StaffRepository();
        const user = await staffRepository.getById(decoded.id);

        if (!user) {
            throw { message: 'User no found', statusCode: 401 }
        }
    
        // ! 2. Obtener el token de la sesión
        const existingToken = await staffRepository.getSessionByToken(decoded.id)
        // console.log(existingToken);
        
        // ? Comparamos si el token de la URL y el token otorgado al usuario es el mismo O que no haya sido revocado
        // console.log(token);
        
        if (existingToken !== token) 
            throw { message: 'Token Inválido', statusCode: 401}
        
        req.user = decoded
        next()
        
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
            res.status(401).json({ 
                message: 'Token Expirado...',
                code: 'TOKEN_EXPIRED'
            });
        }
        res.status(401).json({ message: 'Token Inválido' });
    }
}

export default authMiddleware;