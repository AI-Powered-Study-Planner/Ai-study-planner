import express from 'express'
import { getProgress } from '../controllers/progressController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

router.use(authMiddleware)

router.get('/', getProgress)

export default router