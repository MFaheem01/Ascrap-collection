import mongoose from 'mongoose'

const contactSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: {
        values: ['email', 'phone', 'location'],
        message: 'Type must be one of: email, phone, location.',
      },
      required: [true, 'Contact type is required.'],
    },

    label: {
      type: String,
      required: [true, 'Label is required.'],
      trim: true,
    },
    value: {
      type: String,
      required: [true, 'Value is required.'],
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
  },
  { timestamps: true },
)

const Contact = mongoose.model('Contact', contactSchema)
export default Contact
