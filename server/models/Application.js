import mongoose from 'mongoose'

const applicationSchema = new mongoose.Schema({
  // Student Profile
  nameEnglish: { type: String, required: true },
  nameNepali: { type: String },
  dateOfBirth: { type: String, required: true },
  contactNo: { type: String, required: true },
  email: { type: String },
  district: { type: String, required: true },
  municipality: { type: String, required: true },
  wardNo: { type: String, required: true },
  streetToleChowk: { type: String },
  citizenshipNo: { type: String },
  citizenshipIssueDate: { type: String },
  citizenshipIssuePlace: { type: String },
  educationalInstitute: { type: String, required: true },
  classTime: { type: String },
  levelOfStudy: { type: String, required: true },
  stayDuration: { type: String, required: true },
  bloodGroup: { type: String },
  foodPreference: { type: String, enum: ['vegetarian', 'only-egg', 'non-vegetarian'], required: true },
  anyDisease: { type: String },
  roomPreference: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },

  // Guardian Profile
  fatherName: { type: String, required: true },
  fatherContact: { type: String, required: true },
  fatherOccupation: { type: String },
  motherName: { type: String },
  motherContact: { type: String },
  motherOccupation: { type: String },
  spouseName: { type: String },
  spouseContact: { type: String },
  spouseOccupation: { type: String },
  localGuardianName: { type: String },
  localGuardianAddress: { type: String },
  localGuardianContact: { type: String },
  localGuardianOccupation: { type: String },
  localGuardianRelation: { type: String },

  // Documents
  identityDocs: [{ type: String }],
  idDocFiles: [{ type: String }],
  ppPhoto: { type: String },

  // Move-in
  moveInDate: { type: String, required: true },

  // Visit request
  wantsToVisit: { type: Boolean, default: false },
  preferredVisitDate: { type: String },

  // Status
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  formNo: { type: String },

  // Admin fields
  roomAssigned: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
  monthlyFee: { type: Number },
  admittingDate: { type: String },
  approvedBy: { type: String },
}, { timestamps: true })

export default mongoose.model('Application', applicationSchema)
