/**
 * ============================================================
 * controllers/service.controller.js — Services CRUD
 * ============================================================
 * Handles all create / read / update / delete operations for
 * the scrap collection services shown on the website.
 *
 * Public  (no token needed):
 *   GET  /api/services           — List all active services
 *   GET  /api/services/:id       — Get a single service by ID
 *
 * Protected (admin JWT required):
 *   POST   /api/services         — Create a new service
 *   PUT    /api/services/:id     — Update an existing service
 *   DELETE /api/services/:id     — Delete a service
 * ============================================================
 */

import Service from '../models/Service.js'

// ─────────────────────────────────────────────────────────────
// GET /api/services
// Returns all services sorted by their display order.
// Public — no authentication required.
// ─────────────────────────────────────────────────────────────
export const getServices = async (_req, res) => {
  try {
    const services = await Service.find().sort({ order: 1, createdAt: -1 })
    res.json({ success: true, count: services.length, data: services })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// ─────────────────────────────────────────────────────────────
// GET /api/services/:id
// Returns a single service by its MongoDB _id.
// Public — no authentication required.
// ─────────────────────────────────────────────────────────────
export const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id)

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found.',
      })
    }

    res.json({ success: true, data: service })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// ─────────────────────────────────────────────────────────────
// POST /api/services   [protected]
// Body: { title, slug, description, icon, isActive, order }
// Creates a new service entry.
// ─────────────────────────────────────────────────────────────
export const createService = async (req, res) => {
  try {
    const service = await Service.create(req.body)
    res.status(201).json({
      success: true,
      message: 'Service created successfully.',
      data: service,
    })
  } catch (error) {
    // Handle duplicate slug error (MongoDB unique index violation)
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'A service with this slug already exists.',
      })
    }
    res.status(400).json({ success: false, message: error.message })
  }
}

// ─────────────────────────────────────────────────────────────
// PUT /api/services/:id   [protected]
// Body: any subset of { title, slug, description, icon, isActive, order }
// Updates an existing service.
// ─────────────────────────────────────────────────────────────
export const updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }, // Return updated doc; run schema validators
    )

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found.',
      })
    }

    res.json({
      success: true,
      message: 'Service updated successfully.',
      data: service,
    })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

// ─────────────────────────────────────────────────────────────
// DELETE /api/services/:id   [protected]
// Permanently removes a service from the database.
// ─────────────────────────────────────────────────────────────
export const deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id)

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found.',
      })
    }

    res.json({ success: true, message: 'Service deleted successfully.' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}
