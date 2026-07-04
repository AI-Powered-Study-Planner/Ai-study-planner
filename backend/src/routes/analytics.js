import express from 'express'
import {
  logTodaySession,
  getWeeklyAnalytics,
  getSummary
} from '../controllers/analyticsController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

router.use(authMiddleware)

router.post('/log', logTodaySession)
router.get('/weekly', getWeeklyAnalytics)
router.get('/summary', getSummary)

export default router