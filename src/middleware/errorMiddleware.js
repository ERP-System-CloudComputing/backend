export default function errorMiddleware(err,req,res,next){
   const statusCode = err.statusCode || 500
   console.error('Error en errorMiddlware: ', err.stack)
   res.status(statusCode).json({ message: err.message || "Unexpected error"})
}