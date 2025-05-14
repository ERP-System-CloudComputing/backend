import { Router } from 'express'
import staffRoutes from './staffRoutes.js'
const router = Router()

router.get('/', (req, res) => {
    res.json({ message: 'API v1' })
})

router.use('/staff',staffRoutes)
export default router