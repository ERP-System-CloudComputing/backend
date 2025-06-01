import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import router from './routes/index.js'
import errorMiddleware from './middleware/errorMiddleware.js'
import cookieParser from 'cookie-parser'
dotenv.config()

const app = express()


// * Middleware para permitir CORS manualmente
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', process.env.APP_URL_FRONT || 'http://localhost:3000');
//     res.header('Access-Control-Allow-Credentials', 'true');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
//   });

// * Middleware para permitir CORS con el paquete cors
app.use(cors({
    origin: process.env.APP_URL_FRONT || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['Authorization'] // Importante para que el cliente pueda leer headers personalizados
}));

app.use(cookieParser())
app.use(express.json())
app.use('/api', router)
app.use(errorMiddleware)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT} 💫`);
})

