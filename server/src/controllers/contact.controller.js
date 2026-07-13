import Contact from '../models/Contact.js'

// ─────────────────────────────────────────────────────────────
// GET /api/contact
// Returns all contact entries sorted by order then creation date.
// Accepts optional query param: ?type=email | phone | location
// Public — no authentication required.
// ─────────────────────────────────────────────────────────────
export const getContacts = async (req, res) => {
  try {
    const filter = {}

    // Filter by type if provided as a query param (?type=email)
    if (req.query.type) {
      filter.type = req.query.type
    }

    // By default, public requests should only see active entries
    // (Admin panel can pass ?all=true to see inactive ones too)
    if (req.query.all !== 'true') {
      filter.isActive = true
    }

    const contacts = await Contact.find(filter).sort({ order: 1, createdAt: -1 })

    res.json({ success: true, count: contacts.length, data: contacts })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// ─────────────────────────────────────────────────────────────
// GET /api/contact/:id
// Returns a single contact entry by its MongoDB _id.
// Public — no authentication required.
// ─────────────────────────────────────────────────────────────
export const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id)

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact entry not found.',
      })
    }

    res.json({ success: true, data: contact })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// ─────────────────────────────────────────────────────────────
// POST /api/contact   [protected]
// Body: { type, label, value, isActive, order }
// Creates a new email, phone, or location entry.
// ─────────────────────────────────────────────────────────────
export const createContact = async (req, res) => {
  try {
    const contact = await Contact.create(req.body)
    res.status(201).json({
      success: true,
      message: 'Contact entry created successfully.',
      data: contact,
    })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

// ─────────────────────────────────────────────────────────────
// PUT /api/contact/:id   [protected]
// Body: any subset of { type, label, value, isActive, order }
// Updates an existing contact entry.
// ─────────────────────────────────────────────────────────────
export const updateContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    )

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact entry not found.',
      })
    }

    res.json({
      success: true,
      message: 'Contact entry updated successfully.',
      data: contact,
    })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

// ─────────────────────────────────────────────────────────────
// DELETE /api/contact/:id   [protected]
// Permanently removes a contact entry.
// ─────────────────────────────────────────────────────────────
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id)

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact entry not found.',
      })
    }

    res.json({ success: true, message: 'Contact entry deleted successfully.' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}
