/**
 * auth routes
 */

import { Router } from 'express'
import protect from '../middleware/auth.middleware.js'
import {
  login,
  updateEmail,
  updatePassword,
} from '../controllers/auth.controller.js'

const router = Router()
router.post('/login', login)
router.put('/update-email', protect, updateEmail)
router.put('/update-password', protect, updatePassword)

export default router
