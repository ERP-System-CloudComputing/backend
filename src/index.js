import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import router from './routes/index.js'
import errorMiddleware from './middleware/errorMiddleware.js'
dotenv.config()

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN || '*', // Permite solicitudes desde cualquier origen por defecto
    credentials: true, // Permite el intercambio de cookies
}))
app.use(express.json())
app.use('/api', router)

app.use(errorMiddleware)
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT} 💫`);
})

