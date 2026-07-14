import mongoose from 'mongoose'

// Stores every "Request a Pickup" form submission from the public website.
// This is separate from the Contact model, which manages site-wide contact info
// (emails, phones, locations) displayed in the header/footer.

const inquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required.'],
      trim: true,
    },

    phone: {
      type: String,
      required: [true, 'Phone number is required.'],
      trim: true,
    },

    email: {
      type: String,
      required: [true, 'Email is required.'],
      trim: true,
      lowercase: true,
    },

    service: {
      type: String,
      default: '',
      trim: true,
    },

    message: {
      type: String,
      default: '',
      trim: true,
    },

    // Optional status tracking for the admin dashboard
    status: {
      type: String,
      enum: ['new', 'contacted', 'resolved'],
      default: 'new',
    },
  },
  { timestamps: true },
)

const Inquiry = mongoose.model('Inquiry', inquirySchema)
export default Inquiry
