/**
 * blog routes
 */

import { Router } from 'express'
import protect from '../middleware/auth.middleware.js'
import {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} from '../controllers/blog.controller.js'

const router = Router()

router.get('/', getBlogs)
router.get('/:id', getBlogById)
router.post('/', protect, createBlog)
router.put('/:id', protect, updateBlog)
router.delete('/:id', protect, deleteBlog)

export default router
