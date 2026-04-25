import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
    cb(null, unique + path.extname(file.originalname))
  },
})

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|pdf/
  const ext = path.extname(file.originalname).toLowerCase()
  allowed.test(ext) ? cb(null, true) : cb(new Error('Only images and PDF files are allowed'))
}

export default multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } })
