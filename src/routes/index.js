import { Router } from 'express'
import staffRoutes from './staffRoutes.js'
import voucherRoutes from './voucherRoutes.js'
const router = Router()

router.get('/', (req, res) => {
    res.json({ message: 'API v1' })
})

router.use('/staff',staffRoutes)
router.use('/vouchers',voucherRoutes)
export default router