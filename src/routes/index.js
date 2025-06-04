import { Router } from 'express'
import staffRoutes from './staffRoutes.js'
import voucherRoutes from './voucherRoutes.js'
import maintenanceRoutes from './maintenanceRoutes.js'
const router = Router()

router.get('/', (req, res) => {
    res.json({ message: 'API v1' })
})

router.use('/staff',staffRoutes)
router.use('/vouchers',voucherRoutes)
router.use('/maintenance',maintenanceRoutes)
export default router