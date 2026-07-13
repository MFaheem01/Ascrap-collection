/**
 contact routes
 */

import { Router } from 'express'
import protect from '../middleware/auth.middleware.js'
import {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} from '../controllers/contact.controller.js'

const router = Router()
router.get('/', getContacts)
router.get('/:id', getContactById)
router.post('/', protect, createContact)
router.put('/:id', protect, updateContact)
router.delete('/:id', protect, deleteContact)

export default router
