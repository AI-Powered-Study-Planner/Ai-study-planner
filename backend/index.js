import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './src/config/db.js'
import passport from './src/config/passport.js'

// routes
import authRoutes from './src/routes/auth.js'
import subjectRoutes from './src/routes/subjects.js'
import plannerRoutes from './src/routes/planner.js'
import dashboardRoutes from './src/routes/dashboard.js'
import progressRoutes from './src/routes/progress.js'
import aiRoutes from './src/routes/ai.js'
import analyticsRoutes from './src/routes/analytics.js'

// cron jobs
import { startCronJobs } from './src/utils/cronJobs.js'

connectDB()

const app = express()

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}))
app.use(express.json())
app.use(passport.initialize())

// all routes
app.use('/api/auth', authRoutes)
app.use('/api/subjects', subjectRoutes)
app.use('/api/planner', plannerRoutes)
app.use('/api/dashboard', dashboardRoutes)
app.use('/api/progress', progressRoutes)
app.use('/api/ai', aiRoutes)
app.use('/api/analytics', analyticsRoutes)

// test route
app.get('/', (req, res) => {
  res.send('AI Study Planner API is running ✅')
})

// start cron jobs
startCronJobs()

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`))