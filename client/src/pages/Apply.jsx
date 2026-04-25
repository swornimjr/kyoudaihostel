import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getRooms } from '../services/api'
import api from '../services/api'

const initialForm = {
  nameEnglish: '', nameNepali: '', dateOfBirth: '', contactNo: '', email: '',
  district: '', municipality: '', wardNo: '', streetToleChowk: '',
  citizenshipNo: '', citizenshipIssueDate: '', citizenshipIssuePlace: '',
  educationalInstitute: '', classTime: '', levelOfStudy: '', stayDuration: '',
  moveInDate: '',
  bloodGroup: '', foodPreference: '', anyDisease: '', roomPreference: '',
  fatherName: '', fatherContact: '', fatherOccupation: '',
  motherName: '', motherContact: '', motherOccupation: '',
  spouseName: '', spouseContact: '', spouseOccupation: '',
  localGuardianName: '', localGuardianAddress: '', localGuardianContact: '',
  localGuardianOccupation: '', localGuardianRelation: '',
  identityDocs: [],
  wantsToVisit: false, preferredVisitDate: '',
  declared: false,
}

const ID_DOCS = ['Citizenship', 'College ID', 'License', 'Passport']

function SectionHeader({ title }) {
  return (
    <div className="flex items-center gap-3 my-6">
      <div className="flex-1 h-px bg-gray-200" />
      <span className="text-xs tracking-[0.3em] text-[#B5202A] font-medium px-2">{title}</span>
      <div className="flex-1 h-px bg-gray-200" />
    </div>
  )
}

function Field({ label, required, hint, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs tracking-widest text-gray-500">
        {label} {required && <span className="text-red-400">*</span>}
        {hint && <span className="normal-case tracking-normal text-gray-400 ml-1">{hint}</span>}
      </label>
      {children}
    </div>
  )
}

const inputCls = 'border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#1C2B4B] transition-colors'

export default function Apply() {
  const [searchParams] = useSearchParams()
  const [form, setForm] = useState({ ...initialForm, roomPreference: searchParams.get('room') || '' })
  const [files, setFiles] = useState({ ppPhoto: null, idDocFiles: [] })
  const [rooms, setRooms] = useState([])
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  useEffect(() => {
    getRooms().then((res) => setRooms(res.data)).catch(() => {})
  }, [])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    if (name === 'identityDocs') {
      setForm((prev) => ({
        ...prev,
        identityDocs: checked
          ? [...prev.identityDocs, value]
          : prev.identityDocs.filter((d) => d !== value),
      }))
    } else if (type === 'checkbox') {
      setForm((prev) => ({ ...prev, [name]: checked }))
    } else {
      setForm((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleFileChange = (e) => {
    const { name } = e.target
    if (name === 'ppPhoto') {
      setFiles((prev) => ({ ...prev, ppPhoto: e.target.files[0] || null }))
    } else if (name === 'idDocFiles') {
      setFiles((prev) => ({ ...prev, idDocFiles: Array.from(e.target.files) }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.identityDocs.length < 2) {
      setError('Please select at least 2 identity document types.')
      return
    }
    if (!form.declared) {
      setError('Please accept the declaration to proceed.')
      return
    }
    setStatus('loading')
    setError('')

    try {
      const fd = new FormData()
      const { declared, ...payload } = form
      Object.entries(payload).forEach(([k, v]) => {
        if (k === 'identityDocs') fd.append(k, JSON.stringify(v))
        else if (v !== '' && v !== false) fd.append(k, v)
      })
      if (files.ppPhoto) fd.append('ppPhoto', files.ppPhoto)
      files.idDocFiles.forEach((f) => fd.append('idDocFiles', f))

      await api.post('/applications', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
      setStatus('success')
      setForm(initialForm)
      setFiles({ ppPhoto: null, idDocFiles: [] })
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col">
        <section className="bg-[#1C2B4B] text-white py-20 text-center px-4">
          <p className="text-xs tracking-[0.4em] text-[#C9962A] mb-3">APPLICATION SUBMITTED</p>
          <h1 className="font-serif text-4xl font-bold tracking-widest">Thank You!</h1>
        </section>
        <div className="max-w-lg mx-auto px-4 py-20 text-center">
          <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-10 flex flex-col items-center gap-4">
            <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center text-green-600 text-2xl font-bold">✓</div>
            <h2 className="font-serif text-2xl font-bold text-[#1C2B4B]">Application Received</h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              We've received your application and will review it shortly. Our team will contact you via phone or email within 24 hours.
              Admission fee of NPR 1,200 is payable upon arrival.
            </p>
            <button onClick={() => setStatus('idle')}
              className="mt-2 bg-[#B5202A] text-white px-8 py-3 text-xs tracking-widest rounded hover:bg-[#8B1520] transition-colors">
              SUBMIT ANOTHER
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      <section className="bg-[#1C2B4B] text-white py-20 text-center px-4">
        <p className="text-xs tracking-[0.4em] text-[#C9962A] mb-3">JOIN US</p>
        <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-widest">Student Application</h1>
        <p className="text-gray-400 mt-4 max-w-md mx-auto">
          Fill in the form below. Admission fee of NPR 1,200 is payable upon arrival — no online payment required.
        </p>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-14 w-full">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 flex flex-col gap-5">

          <SectionHeader title="STUDENT'S PROFILE" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Full Name (IN CAPITALS)" required>
              <input name="nameEnglish" value={form.nameEnglish} onChange={handleChange} required
                placeholder="FULL NAME IN ENGLISH" className={`${inputCls} uppercase`} />
            </Field>
            <Field label="Name in Nepali">
              <input name="nameNepali" value={form.nameNepali} onChange={handleChange}
                placeholder="नेपाली नाम" className={inputCls} />
            </Field>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Field label="Date of Birth" required>
              <input name="dateOfBirth" value={form.dateOfBirth} onChange={handleChange} required
                placeholder="YYYY-MM-DD" className={inputCls} />
            </Field>
            <Field label="Contact No." required>
              <input name="contactNo" value={form.contactNo} onChange={handleChange} required
                placeholder="98XXXXXXXX" className={inputCls} />
            </Field>
            <Field label="Email">
              <input type="email" name="email" value={form.email} onChange={handleChange}
                placeholder="your@email.com" className={inputCls} />
            </Field>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="District" required>
              <input name="district" value={form.district} onChange={handleChange} required placeholder="District" className={inputCls} />
            </Field>
            <Field label="Metro/Sub-Metro/Rural/Municipality" required>
              <input name="municipality" value={form.municipality} onChange={handleChange} required placeholder="Municipality" className={inputCls} />
            </Field>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Ward No." required>
              <input name="wardNo" value={form.wardNo} onChange={handleChange} required placeholder="Ward No." className={inputCls} />
            </Field>
            <Field label="Street Name / Tole / Chowk">
              <input name="streetToleChowk" value={form.streetToleChowk} onChange={handleChange} placeholder="Tole / Chowk" className={inputCls} />
            </Field>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Field label="Citizenship No.">
              <input name="citizenshipNo" value={form.citizenshipNo} onChange={handleChange} placeholder="Citizenship No." className={inputCls} />
            </Field>
            <Field label="Date of Issue">
              <input name="citizenshipIssueDate" value={form.citizenshipIssueDate} onChange={handleChange} placeholder="YYYY-MM-DD" className={inputCls} />
            </Field>
            <Field label="Place of Issue">
              <input name="citizenshipIssuePlace" value={form.citizenshipIssuePlace} onChange={handleChange} placeholder="Place" className={inputCls} />
            </Field>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Educational Institute" required>
              <input name="educationalInstitute" value={form.educationalInstitute} onChange={handleChange} required placeholder="College / School Name" className={inputCls} />
            </Field>
            <Field label="Class Time">
              <input name="classTime" value={form.classTime} onChange={handleChange} placeholder="e.g. Morning / Evening" className={inputCls} />
            </Field>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Level of Study" required>
              <input name="levelOfStudy" value={form.levelOfStudy} onChange={handleChange} required placeholder="e.g. Bachelor, +2, Masters" className={inputCls} />
            </Field>
            <Field label="Duration of Stay" required>
              <input name="stayDuration" value={form.stayDuration} onChange={handleChange} required placeholder="e.g. 1 year, 6 months" className={inputCls} />
            </Field>
          </div>

          <Field label="Preferred Move-in Date" required>
            <input type="date" name="moveInDate" value={form.moveInDate} onChange={handleChange} required
              min={new Date().toISOString().split('T')[0]}
              className={inputCls} />
          </Field>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Blood Group">
              <input name="bloodGroup" value={form.bloodGroup} onChange={handleChange} placeholder="e.g. A+, O-" className={inputCls} />
            </Field>
            <Field label="Food Preference" required>
              <select name="foodPreference" value={form.foodPreference} onChange={handleChange} required className={`${inputCls} bg-white`}>
                <option value="">Select...</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="only-egg">Only Egg</option>
                <option value="non-vegetarian">Non-Vegetarian</option>
              </select>
            </Field>
          </div>

          <Field label="Any Disease / Medical Condition (if any)">
            <input name="anyDisease" value={form.anyDisease} onChange={handleChange} placeholder="Leave blank if none" className={inputCls} />
          </Field>

          <Field label="Room Preference">
            <select name="roomPreference" value={form.roomPreference} onChange={handleChange} className={`${inputCls} bg-white`}>
              <option value="">No preference</option>
              {rooms.filter((r) => r.availableBeds > 0).map((r) => (
                <option key={r._id} value={r._id}>
                  Room {r.roomNumber} · {r.name} — NPR {r.price.toLocaleString()}/month
                </option>
              ))}
            </select>
          </Field>

          <SectionHeader title="GUARDIAN'S PROFILE" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Field label="Father's Name" required>
              <input name="fatherName" value={form.fatherName} onChange={handleChange} required placeholder="Father's Full Name" className={inputCls} />
            </Field>
            <Field label="Contact No." required>
              <input name="fatherContact" value={form.fatherContact} onChange={handleChange} required placeholder="98XXXXXXXX" className={inputCls} />
            </Field>
            <Field label="Occupation">
              <input name="fatherOccupation" value={form.fatherOccupation} onChange={handleChange} placeholder="Occupation" className={inputCls} />
            </Field>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Field label="Mother's Name">
              <input name="motherName" value={form.motherName} onChange={handleChange} placeholder="Mother's Full Name" className={inputCls} />
            </Field>
            <Field label="Contact No.">
              <input name="motherContact" value={form.motherContact} onChange={handleChange} placeholder="98XXXXXXXX" className={inputCls} />
            </Field>
            <Field label="Occupation">
              <input name="motherOccupation" value={form.motherOccupation} onChange={handleChange} placeholder="Occupation" className={inputCls} />
            </Field>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Field label="Spouse Name">
              <input name="spouseName" value={form.spouseName} onChange={handleChange} placeholder="Spouse's Full Name" className={inputCls} />
            </Field>
            <Field label="Contact No.">
              <input name="spouseContact" value={form.spouseContact} onChange={handleChange} placeholder="98XXXXXXXX" className={inputCls} />
            </Field>
            <Field label="Occupation">
              <input name="spouseOccupation" value={form.spouseOccupation} onChange={handleChange} placeholder="Occupation" className={inputCls} />
            </Field>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Local Guardian Name">
              <input name="localGuardianName" value={form.localGuardianName} onChange={handleChange} placeholder="Guardian Name" className={inputCls} />
            </Field>
            <Field label="Address">
              <input name="localGuardianAddress" value={form.localGuardianAddress} onChange={handleChange} placeholder="Guardian Address" className={inputCls} />
            </Field>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Field label="Contact No.">
              <input name="localGuardianContact" value={form.localGuardianContact} onChange={handleChange} placeholder="98XXXXXXXX" className={inputCls} />
            </Field>
            <Field label="Occupation">
              <input name="localGuardianOccupation" value={form.localGuardianOccupation} onChange={handleChange} placeholder="Occupation" className={inputCls} />
            </Field>
            <Field label="Relation">
              <input name="localGuardianRelation" value={form.localGuardianRelation} onChange={handleChange} placeholder="e.g. Uncle, Relative" className={inputCls} />
            </Field>
          </div>

          <SectionHeader title="DOCUMENTS & PHOTO" />

          <div className="flex flex-col gap-2">
            <label className="text-xs tracking-widest text-gray-500">
              IDENTITY DOCUMENT TYPES <span className="text-red-400">*</span>
              <span className="normal-case tracking-normal text-gray-400 ml-1">(select at least 2)</span>
            </label>
            <div className="flex flex-wrap gap-4">
              {ID_DOCS.map((doc) => (
                <label key={doc} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="identityDocs" value={doc}
                    checked={form.identityDocs.includes(doc)} onChange={handleChange}
                    className="accent-[#B5202A]" />
                  <span className="text-sm text-gray-600">{doc}</span>
                </label>
              ))}
            </div>
          </div>

          <Field label="Upload ID Documents" hint="(images or PDF, max 5MB each, up to 4 files)">
            <input type="file" name="idDocFiles" onChange={handleFileChange}
              accept="image/*,.pdf" multiple
              className="text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:tracking-widest file:bg-[#1C2B4B] file:text-white hover:file:bg-[#152038] cursor-pointer" />
            {files.idDocFiles.length > 0 && (
              <p className="text-xs text-green-600">{files.idDocFiles.length} file(s) selected</p>
            )}
          </Field>

          <Field label="PP-Size Photo" hint="(required for admission form)" required>
            <input type="file" name="ppPhoto" onChange={handleFileChange}
              accept="image/*"
              className="text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:tracking-widest file:bg-[#B5202A] file:text-white hover:file:bg-[#8B1520] cursor-pointer" />
            {files.ppPhoto && (
              <p className="text-xs text-green-600">{files.ppPhoto.name}</p>
            )}
          </Field>

          <SectionHeader title="VISIT & DECLARATION" />

          <div className="bg-[#F7F3EE] rounded-lg p-4 flex flex-col gap-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" name="wantsToVisit" checked={form.wantsToVisit} onChange={handleChange}
                className="accent-[#B5202A] w-4 h-4" />
              <span className="text-sm text-gray-700">I would like to visit and inspect the hostel before admission</span>
            </label>
            {form.wantsToVisit && (
              <Field label="Preferred Visit Date">
                <input type="date" name="preferredVisitDate" value={form.preferredVisitDate} onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]} className={inputCls} />
              </Field>
            )}
          </div>

          <div className="bg-gray-50 rounded-lg p-4 text-xs text-gray-500 leading-relaxed border border-gray-100">
            I hereby declare that I am fully satisfied with the terms and conditions of the hostel. I agree to every rule and regulation of the hostel and would like to get admission. I promise that I will not violate any rules. If found, I accept any action taken by the hostel management. Therefore, I would like to request the hostel management to allow me to get admission.
          </div>

          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" name="declared" checked={form.declared} onChange={handleChange}
              className="accent-[#B5202A] w-4 h-4 mt-0.5 flex-shrink-0" />
            <span className="text-sm text-gray-600">I have read and agree to the above declaration <span className="text-red-400">*</span></span>
          </label>

          <div className="bg-[#F7F3EE] rounded-lg p-4 text-xs text-gray-500 border border-gray-100">
            <span className="font-semibold text-[#1C2B4B]">Payment on Arrival: </span>
            Admission fee of NPR 1,200 (valid 1 year) + first month rent is payable upon arrival. No online payment required.
          </div>

          {error && <p className="text-red-500 text-sm bg-red-50 px-4 py-3 rounded">{error}</p>}

          <button type="submit" disabled={status === 'loading'}
            className="bg-[#B5202A] hover:bg-[#8B1520] text-white py-3 tracking-widest text-sm rounded transition-colors disabled:opacity-60 mt-2">
            {status === 'loading' ? 'SUBMITTING...' : 'SUBMIT APPLICATION'}
          </button>

          <p className="text-xs text-gray-400 text-center">
            We will review your application and contact you within 24 hours.
          </p>
        </form>
      </section>
    </div>
  )
}
