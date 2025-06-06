import { Router } from 'express'
import staffRoutes from './staffRoutes.js'
import SalaryDefinition from './salaryDefinitionRoutes.js';

const router = Router()

router.get('/', (req, res) => {
    res.json({ message: 'API v1' })
})

router.use('/staff',staffRoutes)
router.use('/salary-definitions', SalaryDefinition);
export default router