import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Blog title is required.'],
      trim: true,
    },

    slug: {
      type: String,
      required: [true, 'Slug is required.'],
      unique: true,
      lowercase: true,
      trim: true,
    },

    summary: {
      type: String,
      trim: true,
      default: '',
    },

    content: {
      type: String,
      required: [true, 'Blog content is required.'],
    },

    coverImage: {
      type: String,
      default: '',
    },

    author: {
      type: String,
      default: 'Askrap Team',
      trim: true,
    },

    tags: {
      type: [String],
      default: [],
    },

    isPublished: {
      type: Boolean,
      default: false,
    },
    publishedAt: {
      type: Date,
      default: null,
    }
  },
  { timestamps: true },
)

blogSchema.pre('save', function (next) {
  if (this.isModified('isPublished') && this.isPublished && !this.publishedAt) {
    this.publishedAt = new Date()
  }
  next()
})

const Blog = mongoose.model('Blog', blogSchema)
export default Blog
