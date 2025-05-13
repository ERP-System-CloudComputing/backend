import { Router } from 'express'
import personalRoutes from './personalRoutes.js'
const router = Router()

router.get('/', (req, res) => {
    res.json({ message: 'API v1' })
})

router.use('/personal',personalRoutes)
export default router