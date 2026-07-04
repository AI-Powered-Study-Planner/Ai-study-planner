import mongoose from 'mongoose'

const AnalyticsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  dayName: {
    type: String
  },
  hoursStudied: {
    type: Number,
    default: 0
  },
  tasksCompleted: {
    type: Number,
    default: 0
  },
  totalTasks: {
    type: Number,
    default: 0
  },
  subjectsStudied: [
    {
      subjectName: String,
      subjectColor: String,
      hoursStudied: Number,
      tasksCompleted: Number
    }
  ],
  streakDay: {
    type: Boolean,
    default: false
  }
}, { timestamps: true })

export default mongoose.models.Analytics || mongoose.model('Analytics', AnalyticsSchema);