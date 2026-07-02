import express from 'express'
import multer from 'multer'
import {
  aiGenerateSchedule,
  aiChat,
  uploadPDF
} from '../controllers/aiController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true)
  } else {
    cb(new Error('Only PDF files are allowed'), false)
  }
}

const upload = multer({ storage, fileFilter })

router.use(authMiddleware)

router.post('/generate-schedule', aiGenerateSchedule)
router.post('/chat', aiChat)
router.post('/upload-pdf', upload.single('file'), uploadPDF)

export default router