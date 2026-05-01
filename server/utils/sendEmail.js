import { Resend } from 'resend'

const sendEmail = async ({ to, subject, text }) => {
  const options = process.env.RESEND_BASE_URL ? { baseUrl: process.env.RESEND_BASE_URL } : {}
  const resend = new Resend(process.env.RESEND_API_KEY, options)
  const recipients = Array.isArray(to) ? to : to.split(',').map((e) => e.trim())
  const result = await resend.emails.send({
    from: process.env.EMAIL_FROM,
    to: recipients,
    subject,
    text,
  })
  if (result.error) throw new Error(result.error.message)
}

export default sendEmail
