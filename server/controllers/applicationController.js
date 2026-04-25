import Application from '../models/Application.js'
import sendEmail from '../utils/sendEmail.js'

export const createApplication = async (req, res) => {
  try {
    const data = { ...req.body }

    // Parse identityDocs if sent as JSON string
    if (typeof data.identityDocs === 'string') {
      try { data.identityDocs = JSON.parse(data.identityDocs) } catch { data.identityDocs = [data.identityDocs] }
    }

    // Attach uploaded file paths
    if (req.files) {
      if (req.files.ppPhoto) data.ppPhoto = req.files.ppPhoto[0].path
      if (req.files.idDocFiles) data.idDocFiles = req.files.idDocFiles.map((f) => f.path)
    }

    const application = await Application.create(data)

    const adminEmails = process.env.ADMIN_EMAILS || ''

    // Notify all admins
    sendEmail({
      to: adminEmails,
      subject: `New Application — ${data.nameEnglish}`,
      text: `A new student application has been submitted.\n\nStudent: ${data.nameEnglish}\nContact: ${data.contactNo}\nEmail: ${data.email || '—'}\nInstitute: ${data.educationalInstitute}\nLevel: ${data.levelOfStudy}\nDuration: ${data.stayDuration}\nPreferred Move-in Date: ${data.moveInDate || '—'}\nFood: ${data.foodPreference}\nFather: ${data.fatherName} (${data.fatherContact})\nVisit requested: ${data.wantsToVisit === 'true' || data.wantsToVisit === true ? 'Yes' : 'No'}\n\nLog in to the admin dashboard to review and approve.`,
    }).catch(() => {})

    // Confirm to student if they provided email
    if (data.email) {
      sendEmail({
        to: data.email,
        subject: 'Application Received — Kyoudai Boy\'s Hostel',
        text: `Dear ${data.nameEnglish},\n\nThank you for submitting your application to Kyoudai Boy's Hostel, Kirtipur.\n\nWe have received your application and will review it shortly. Our team will contact you via phone (${data.contactNo}) or email within 24 hours.\n\nYour preferred move-in date: ${data.moveInDate || '—'}\nAdmission fee of NPR 1,200 is payable upon arrival.\n\nRegards,\nKyoudai Boy's Hostel\nKirtipur, Kathmandu`,
      }).catch(() => {})
    }

    res.status(201).json(application)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

export const getApplications = async (req, res) => {
  const applications = await Application.find()
    .populate('roomPreference', 'name roomNumber')
    .populate('roomAssigned', 'name roomNumber')
    .sort({ createdAt: -1 })
  res.json(applications)
}

export const deleteApplication = async (req, res) => {
  await Application.findByIdAndDelete(req.params.id)
  res.json({ message: 'Deleted' })
}

export const updateApplicationStatus = async (req, res) => {
  const application = await Application.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  )
  if (!application) return res.status(404).json({ message: 'Application not found' })
  res.json(application)
}
