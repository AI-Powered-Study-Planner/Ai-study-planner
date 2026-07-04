import cron from 'node-cron'
import User from '../models/User.js'
import Subject from '../models/Subject.js'
import StudyPlan from '../models/StudyPlan.js'
import sendEmail from './sendEmail.js'

export const startCronJobs = () => {

  // ─────────────────────────────────────────
  // EXAM REMINDER
  // Runs every day at 8:00 AM
  // '0 8 * * *' means: minute=0, hour=8, every day
  // ─────────────────────────────────────────
  cron.schedule('0 8 * * *', async () => {
    console.log('⏰ Running exam reminder cron job...')

    try {
      // get all verified users
      const users = await User.find({ isVerified: true })

      for (const user of users) {
        // get their subjects with exams in next 3 days
        const now = new Date()
        const threeDaysLater = new Date()
        threeDaysLater.setDate(threeDaysLater.getDate() + 3)

        const urgentSubjects = await Subject.find({
          user: user._id,
          examDate: { $gte: now, $lte: threeDaysLater }
        })

        if (urgentSubjects.length === 0) continue

        // get their pending tasks
        const studyPlan = await StudyPlan.findOne({ user: user._id })
        let pendingCount = 0

        if (studyPlan) {
          const allTasks = studyPlan.schedule.flatMap(d => d.tasks)
          pendingCount = allTasks.filter(t => !t.isCompleted).length
        }

        // build email content
        const subjectList = urgentSubjects.map(s => {
          const daysLeft = Math.ceil(
            (new Date(s.examDate) - now) / (1000 * 60 * 60 * 24)
          )
          return `<li><strong>${s.name}</strong> — in ${daysLeft} day${daysLeft === 1 ? '' : 's'}</li>`
        }).join('')

        // send reminder email
        await sendEmail(
          user.email,
          '⚠️ Exam Reminder — AI Study Planner',
          `
            <h2>Hello ${user.name}! 👋</h2>
            <p>You have upcoming exams very soon:</p>
            <ul>${subjectList}</ul>
            ${pendingCount > 0
              ? `<p>You still have <strong>${pendingCount} pending tasks</strong>. Don't wait! 💪</p>`
              : '<p>Great job! All tasks completed! 🎉</p>'
            }
            <p>Log in now and keep studying!</p>
            <a href="${process.env.CLIENT_URL}" 
               style="background:#667eea; color:white; padding:12px 24px; 
                      border-radius:8px; text-decoration:none;">
              Study Now 🚀
            </a>
          `
        )

        console.log(`✅ Reminder sent to ${user.email}`)
      }

    } catch (error) {
      console.error('Cron job error:', error.message)
    }
  })

  console.log('✅ Cron jobs started!')
}