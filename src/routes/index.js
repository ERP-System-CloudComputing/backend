import { Router } from 'express'
import staffRoutes from './staffRoutes.js'
import budgetRoutes from './budgetRoutes.js'
import anualBudgetRoutes from './anualBudgetRoutes.js'
import circularRoutes from './circularRoutes.js'

const router = Router()

router.get('/', (req, res) => {
    res.json({ message: 'API v1' })
})

router.use('/staff',staffRoutes)
router.use('/budget', budgetRoutes)
router.use('/anualBudget', anualBudgetRoutes)
router.use('/circular', circularRoutes)

export default router