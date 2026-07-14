// MongoDB connection utility

import mongoose from 'mongoose'

let cachedPromise = null

const connectDB = async () => {
  // If already connected, return the connection
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection
  }

  // If not connected and no connection promise exists, start connection
  if (!cachedPromise) {
    const opts = {
      bufferCommands: false, // Disable buffering so we get immediate errors if connection fails
    }
    console.log('🔄 Connecting to MongoDB...')
    cachedPromise = mongoose.connect(process.env.MONGO_URI, opts)
      .then((mongooseInstance) => {
        console.log(`✅ MongoDB connected: ${mongooseInstance.connection.host}`)
        return mongooseInstance.connection
      })
      .catch((error) => {
        console.error(`❌ MongoDB connection error: ${error.message}`)
        cachedPromise = null // Reset cache on failure to allow retry
        throw error
      })
  }

  return cachedPromise
}

export default connectDB
