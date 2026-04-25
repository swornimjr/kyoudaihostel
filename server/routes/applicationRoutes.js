import express from 'express'
import { createApplication, getApplications, updateApplicationStatus, deleteApplication } from '../controllers/applicationController.js'
import protect from '../middleware/authMiddleware.js'
import upload from '../middleware/upload.js'

const router = express.Router()

const uploadFields = upload.fields([
  { name: 'ppPhoto', maxCount: 1 },
  { name: 'idDocFiles', maxCount: 4 },
])

router.post('/', uploadFields, createApplication)
router.get('/', protect, getApplications)
router.put('/:id', protect, updateApplicationStatus)
router.delete('/:id', protect, deleteApplication)

export default router
