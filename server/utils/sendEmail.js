import { Resend } from 'resend'

const sendEmail = async ({ to, subject, text }) => {
  const resend = new Resend(process.env.RESEND_API_KEY)
  const recipients = Array.isArray(to) ? to : to.split(',').map((e) => e.trim())
  await resend.emails.send({
    from: process.env.EMAIL_FROM,
    to: recipients,
    subject,
    text,
  })
}

export default sendEmail
