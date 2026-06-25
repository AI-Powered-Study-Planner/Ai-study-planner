import mongoose from 'mongoose'

const SubjectSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  examDate: {
    type: Date,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Medium'
  },
  totalChapters: {
    type: Number,
    default: 0
  },
  color: {
    type: String,
    default: '#667eea'
  }
}, { timestamps: true })

export default mongoose.model('Subject', SubjectSchema)