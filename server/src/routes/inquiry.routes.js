/**
 * Inquiry routes
 * POST   /api/inquiries          → public  (website contact form)
 * GET    /api/inquiries          → protected (admin dashboard)
 * PUT    /api/inquiries/:id      → protected (update status)
 * DELETE /api/inquiries/:id      → protected (remove record)
 */

import { Router } from 'express'
import protect from '../middleware/auth.middleware.js'
import {
  submitInquiry,
  getInquiries,
  updateInquiryStatus,
  deleteInquiry,
} from '../controllers/inquiry.controller.js'

const router = Router()

router.post('/', submitInquiry)                         // Public — called by the website form
router.get('/', protect, getInquiries)                  // Admin only
router.put('/:id', protect, updateInquiryStatus)        // Admin only
router.delete('/:id', protect, deleteInquiry)           // Admin only

export default router
