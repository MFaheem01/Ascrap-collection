import nodemailer from 'nodemailer'
import Inquiry from '../models/Inquiry.js'

// ─────────────────────────────────────────────────────────────
// Nodemailer transporter — uses Gmail App Password.
// Requires SMTP_USER and SMTP_PASS to be set in server/.env
// ─────────────────────────────────────────────────────────────
function createTransporter() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

// ─────────────────────────────────────────────────────────────
// POST /api/inquiries
// Body: { name, phone, email, service?, message? }
// Public — no authentication required.
// Saves to DB + sends notification email to NOTIFY_EMAIL.
// ─────────────────────────────────────────────────────────────
export const submitInquiry = async (req, res) => {
  try {
    const { name, phone, email, service, message } = req.body

    // 1. Persist the inquiry in MongoDB
    const inquiry = await Inquiry.create({ name, phone, email, service, message })

    // 2. Send notification email (non-blocking — failure won't break the API)
    const notifyEmail = process.env.NOTIFY_EMAIL
    const smtpUser = process.env.SMTP_USER
    const smtpPass = process.env.SMTP_PASS

    if (notifyEmail && smtpUser && smtpPass) {
      try {
        const transporter = createTransporter()

        const submittedAt = new Date().toLocaleString('en-AE', {
          timeZone: 'Asia/Dubai',
          dateStyle: 'full',
          timeStyle: 'short',
        })

        await transporter.sendMail({
          from: `"Askrap Collection Website" <${smtpUser}>`,
          to: notifyEmail,
          subject: `📦 New Pickup Request from ${name}`,
          html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <style>
                body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 0; }
                .wrapper { max-width: 600px; margin: 30px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
                .header { background: #1a5c2a; color: #ffffff; padding: 28px 32px; }
                .header h1 { margin: 0; font-size: 22px; }
                .header p { margin: 6px 0 0; font-size: 14px; opacity: 0.85; }
                .body { padding: 32px; }
                .field { margin-bottom: 20px; }
                .field label { display: block; font-size: 12px; font-weight: bold; text-transform: uppercase; color: #888; margin-bottom: 4px; letter-spacing: 0.05em; }
                .field .value { font-size: 16px; color: #1a1a1a; word-break: break-word; }
                .divider { border: none; border-top: 1px solid #eeeeee; margin: 24px 0; }
                .footer { background: #f9f9f9; padding: 16px 32px; font-size: 12px; color: #aaa; text-align: center; }
                .badge { display: inline-block; background: #d4a017; color: #fff; border-radius: 4px; padding: 3px 10px; font-size: 12px; font-weight: bold; margin-top: 4px; }
              </style>
            </head>
            <body>
              <div class="wrapper">
                <div class="header">
                  <h1>📦 New Pickup Request</h1>
                  <p>Received on ${submittedAt} (Dubai Time)</p>
                </div>
                <div class="body">
                  <div class="field">
                    <label>Full Name</label>
                    <div class="value">${name}</div>
                  </div>
                  <div class="field">
                    <label>Phone Number</label>
                    <div class="value">${phone}</div>
                  </div>
                  <div class="field">
                    <label>Email Address</label>
                    <div class="value">${email}</div>
                  </div>
                  ${service ? `
                  <div class="field">
                    <label>Service Requested</label>
                    <div class="value"><span class="badge">${service}</span></div>
                  </div>` : ''}
                  ${message ? `
                  <div class="field">
                    <label>Details / Message</label>
                    <div class="value" style="white-space:pre-line;">${message}</div>
                  </div>` : ''}
                  <hr class="divider" />
                  <p style="font-size:13px; color:#555;">
                    This inquiry has been saved to your database. Log in to the dashboard to manage all inquiries.
                  </p>
                </div>
                <div class="footer">Askrap Collection — Automated Notification &bull; Do not reply to this email.</div>
              </div>
            </body>
            </html>
          `,
        })
      } catch (emailErr) {
        // Log the email error but do NOT fail the request
        console.error('❌ Email notification failed:', emailErr.message)
      }
    } else {
      console.warn('⚠️  Email notification skipped: SMTP_USER, SMTP_PASS, or NOTIFY_EMAIL not set in .env')
    }

    res.status(201).json({
      success: true,
      message: 'Your request has been received. We will get back to you soon.',
      data: inquiry,
    })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

// ─────────────────────────────────────────────────────────────
// GET /api/inquiries   [protected — admin only]
// Returns all inquiries sorted by newest first.
// ─────────────────────────────────────────────────────────────
export const getInquiries = async (req, res) => {
  try {
    const filter = {}
    if (req.query.status) filter.status = req.query.status

    const inquiries = await Inquiry.find(filter).sort({ createdAt: -1 })
    res.json({ success: true, count: inquiries.length, data: inquiries })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// ─────────────────────────────────────────────────────────────
// PUT /api/inquiries/:id   [protected — admin only]
// Updates the status of an inquiry (new → contacted → resolved)
// ─────────────────────────────────────────────────────────────
export const updateInquiryStatus = async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true },
    )

    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry not found.' })
    }

    res.json({ success: true, message: 'Status updated.', data: inquiry })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

// ─────────────────────────────────────────────────────────────
// DELETE /api/inquiries/:id   [protected — admin only]
// Permanently removes an inquiry.
// ─────────────────────────────────────────────────────────────
export const deleteInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndDelete(req.params.id)

    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry not found.' })
    }

    res.json({ success: true, message: 'Inquiry deleted.' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}
