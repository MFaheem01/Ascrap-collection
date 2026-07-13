// Express app configuration

import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

import authRoutes from './routes/auth.routes.js'
import serviceRoutes from './routes/service.routes.js'
import blogRoutes from './routes/blog.routes.js'
import contactRoutes from './routes/contact.routes.js'

const app = express()

//Middleware
app.use(cors({ origin: true, credentials: true }))
app.use(express.json())
app.use(morgan('dev'))

//API Routes  
app.use('/api/auth', authRoutes)
app.use('/api/services', serviceRoutes)
app.use('/api/blogs', blogRoutes)
app.use('/api/contact', contactRoutes)

app.get('/', (_req, res) => {
  res.json({ message: '🟢 Askrap Collection API is running.' })
})

app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Route not found.' })
})

//Global Error Handler
app.use((err, _req, res, _next) => {
  console.error('❌ Error:', err.message)
  const status = err.status || 500
  res.status(status).json({
    success: false,
    message: err.message || 'Internal server error.',
  })
})

export default app
