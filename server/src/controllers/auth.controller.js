
import jwt from 'jsonwebtoken'
import Admin from '../models/Admin.js'

// ── Helper: sign a JWT for the given admin ID ─────────────────
const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  })

// ── Helper: standard success response ────────────────────────
const sendToken = (res, admin, statusCode = 200) => {
  const token = signToken(admin._id)
  res.status(statusCode).json({
    success: true,
    token,
    admin: {
      id: admin._id,
      email: admin.email,
    },
  })
}

// ─────────────────────────────────────────────────────────────
// POST /api/auth/login
// Body: { email, password }
// ─────────────────────────────────────────────────────────────
export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Validate that both fields were sent
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password.',
      })
    }

    // Find admin by email (password field is excluded by default, so select it)
    const admin = await Admin.findOne({ email: email.toLowerCase() }).select('+password')

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      })
    }

    // Compare the provided password against the stored hash
    const isMatch = await admin.comparePassword(password)
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      })
    }

    // Credentials are valid — issue a JWT
    sendToken(res, admin)
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// ─────────────────────────────────────────────────────────────
// PUT /api/auth/update-email   [protected]
// Body: { newEmail }
// Updates the admin's login email address.
// ─────────────────────────────────────────────────────────────
export const updateEmail = async (req, res) => {
  try {
    const { newEmail } = req.body

    if (!newEmail) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a new email address.',
      })
    }

    // req.admin.id is set by the protect middleware
    const admin = await Admin.findByIdAndUpdate(
      req.admin.id,
      { email: newEmail.toLowerCase().trim() },
      { new: true, runValidators: true },
    )

    res.json({
      success: true,
      message: 'Email updated successfully.',
      admin: { id: admin._id, email: admin.email },
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// ─────────────────────────────────────────────────────────────
// PUT /api/auth/update-password   [protected]
// Body: { currentPassword, newPassword }
// Verifies the current password before setting the new one.
// ─────────────────────────────────────────────────────────────
export const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both current and new passwords.',
      })
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 6 characters.',
      })
    }

    // Fetch admin with the password hash included
    const admin = await Admin.findById(req.admin.id).select('+password')

    // Verify the current password is correct before allowing change
    const isMatch = await admin.comparePassword(currentPassword)
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect.',
      })
    }

    // Update password — the pre-save hook will hash it automatically
    admin.password = newPassword
    await admin.save()

    res.json({ success: true, message: 'Password updated successfully.' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}
