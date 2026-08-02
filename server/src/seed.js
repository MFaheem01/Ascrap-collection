// One-time script to seed the admin account

import 'dotenv/config'
import mongoose from 'mongoose'
import dns from 'dns'
import Admin from './models/Admin.js'

dns.setServers(['8.8.8.8', '1.1.1.1'])

const seed = async () => {
  try {
    // Connect to the database
    await mongoose.connect(process.env.MONGO_URI)
    console.log('✅  Connected to MongoDB')

    // Remove any existing admin account (reset)
    await Admin.deleteMany({})

    // Create the admin with credentials from .env
    const admin = await Admin.create({
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
    })

    console.log(`✅  Admin account created: ${admin.email}`)
    console.log('🔑  You can now log in at POST /api/auth/login')
  } catch (error) {
    console.error('❌  Seed failed:', error.message)
  } finally {
    await mongoose.disconnect()
    process.exit()
  }
}

seed()
