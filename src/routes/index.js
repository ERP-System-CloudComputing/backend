import { Router } from 'express'
import staffRoutes from './staffRoutes.js'
import budgetRoutes from './budgetRoutes.js'
import anualBudgetRoutes from './anualBudgetRoutes.js'
import circularRoutes from './circularRoutes.js'
import fileRoutes from './filesRoutes.js'
import beneficiaryRoutes from './beneficiaryRoutes.js'
import logisticsRoutes from './logisticsRoutes.js'
import memoRoutes from './memoRoutes.js'
import stockRoutes from './stockRoutes.js'

import voucherRoutes from './voucherRoutes.js'
import maintenanceRoutes from './maintenanceRoutes.js'
import capacityRoutes from './CapacityRoutes.js'
import SalaryDefinition from './salaryDefinitionRoutes.js';

const router = Router()

router.get('/', (req, res) => {
    res.json({ message: 'API v1' })
})

router.use('/staff',staffRoutes)
router.use('/salary-definitions', SalaryDefinition);
router.use('/budget', budgetRoutes)
router.use('/anualBudget', anualBudgetRoutes)
router.use('/circular', circularRoutes)
router.use('/files', fileRoutes)
router.use('/beneficiary', beneficiaryRoutes)
router.use('/logistics', logisticsRoutes)
router.use('/memo', memoRoutes)
router.use('/stock', stockRoutes)

router.use('/vouchers',voucherRoutes)
router.use('/maintenance',maintenanceRoutes)
router.use('/capacity',capacityRoutes)
export default router