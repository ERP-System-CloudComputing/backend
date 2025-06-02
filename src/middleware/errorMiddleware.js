export default function errorMiddleware(err, req, res, next) {
    if (!err) 
        return res.status(500).json({ message: 'Internal Server Error', success: false});
    
    const statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';

    //    console.error('Error en errorMiddlware: ', err.stack)
    console.error('Error en errorMiddleware: ', {
        message,
        statusCode,
        stack: err.stack,
        type: err.isCredentialError ? 'CredentialError' : 'ServerError',
        path: req.path
        // fullError: JSON.stringify(err, Object.getOwnPropertyNames(err))
    });

   res.status(statusCode).json({ message: err.message || "Unexpected error", success: false });
}