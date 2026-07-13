import mongoose from 'mongoose'

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Service title is required.'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Slug is required.'],
      unique: true,
      lowercase: true,
      trim: true,
    },

    description: {
      type: String,
      required: [true, 'Description is required.'],
      trim: true,
    },

    icon: {
      type: String,
      default: 'Recycle',
      trim: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      default: '',
    },
    location: {
      type: String,
      default: 'Dubai, UAE',
    },
    rating: {
      type: Number,
      default: 5.0,
    },
    price: {
      type: String,
      default: 'Best Rates',
    },
  },
  { timestamps: true },
)

const Service = mongoose.model('Service', serviceSchema)
export default Service
