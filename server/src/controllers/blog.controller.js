import Blog from '../models/Blog.js'

// ─────────────────────────────────────────────────────────────
// GET /api/blogs
// Returns all blog posts sorted newest first.
// Accepts optional query param: ?published=true to filter only
// published articles (useful for the public-facing website).
// ─────────────────────────────────────────────────────────────
export const getBlogs = async (req, res) => {
  try {
    // Build filter — if ?published=true, show only live posts
    const filter = {}
    if (req.query.published === 'true') {
      filter.isPublished = true
    }

    const blogs = await Blog.find(filter)
      .sort({ publishedAt: -1, createdAt: -1 }) // Latest first
      .select('-content')                        // Exclude full content in list view (lighter payload)

    res.json({ success: true, count: blogs.length, data: blogs })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// ─────────────────────────────────────────────────────────────
// GET /api/blogs/:id
// Returns a single blog post with its full content.
// Public — no authentication required.
// ─────────────────────────────────────────────────────────────
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found.',
      })
    }

    res.json({ success: true, data: blog })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// ─────────────────────────────────────────────────────────────
// POST /api/blogs   [protected]
// Body: { title, slug, summary, content, coverImage, author,
//         tags, isPublished }
// Creates a new blog post.
// ─────────────────────────────────────────────────────────────
export const createBlog = async (req, res) => {
  try {
    const blog = await Blog.create(req.body)
    res.status(201).json({
      success: true,
      message: 'Blog post created successfully.',
      data: blog,
    })
  } catch (error) {
    // Handle duplicate slug
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'A blog post with this slug already exists.',
      })
    }
    res.status(400).json({ success: false, message: error.message })
  }
}

// ─────────────────────────────────────────────────────────────
// PUT /api/blogs/:id   [protected]
// Body: any subset of blog fields
// Updates an existing blog post.
// ─────────────────────────────────────────────────────────────
export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    )

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found.',
      })
    }

    res.json({
      success: true,
      message: 'Blog post updated successfully.',
      data: blog,
    })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

// ─────────────────────────────────────────────────────────────
// DELETE /api/blogs/:id   [protected]
// Permanently removes a blog post.
// ─────────────────────────────────────────────────────────────
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id)

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found.',
      })
    }

    res.json({ success: true, message: 'Blog post deleted successfully.' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}
