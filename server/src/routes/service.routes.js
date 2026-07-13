/**
 * service routes
 */

import { Router } from 'express'
import protect from '../middleware/auth.middleware.js'
import {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} from '../controllers/service.controller.js'

const router = Router()

router.get('/', getServices)
router.get('/:id', getServiceById)
router.post('/', protect, createService)
router.put('/:id', protect, updateService)
router.delete('/:id', protect, deleteService)

export default router
