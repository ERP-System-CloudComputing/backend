import { Router } from 'express'
import staffRoutes from './staffRoutes.js'
import budgetRoutes from './budgetRoutes.js'
import anualBudgetRoutes from './anualBudgetRoutes.js'
import circularRoutes from './circularRoutes.js'
import fileRoutes from './filesRoutes.js'

const router = Router()

router.get('/', (req, res) => {
    res.json({ message: 'API v1' })
})

router.use('/staff',staffRoutes)
router.use('/budget', budgetRoutes)
router.use('/anualBudget', anualBudgetRoutes)
router.use('/circular', circularRoutes)
router.use('/files', fileRoutes)

export default router