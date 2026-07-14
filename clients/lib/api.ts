// API client
const BASE_URL = process.env.NEXT_PUBLIC_API_URL

// Read the stored JWT token
function getToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('askrap_token')
}

// Build request headers
function headers(extra?: HeadersInit): HeadersInit {
  const token = getToken()
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...extra,
  }
}

// Generic fetch wrapper
async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: headers(),
    ...options,
  })
  const data = await res.json()
  if (!res.ok) {
    throw new Error(data.message ?? `HTTP ${res.status}`)
  }
  return data as T
}

//  Auth 

export const authApi = {
  login: (email: string, password: string) =>
    request<{ success: boolean; token: string; admin: { id: string; email: string } }>(
      '/api/auth/login',
      { method: 'POST', body: JSON.stringify({ email, password }) },
    ),

  updateEmail: (newEmail: string) =>
    request('/api/auth/update-email', {
      method: 'PUT',
      body: JSON.stringify({ newEmail }),
    }),

  updatePassword: (currentPassword: string, newPassword: string) =>
    request('/api/auth/update-password', {
      method: 'PUT',
      body: JSON.stringify({ currentPassword, newPassword }),
    }),
}

// Services 

export type ApiService = {
  _id: string
  title: string
  slug: string
  description: string
  icon: string
  isActive: boolean
  order: number
  createdAt: string
  updatedAt: string
}

export const servicesApi = {
  getAll: () => request<{ success: boolean; count: number; data: ApiService[] }>('/api/services'),

  getById: (id: string) => request<{ success: boolean; data: ApiService }>(`/api/services/${id}`),

  create: (body: Omit<ApiService, '_id' | 'createdAt' | 'updatedAt'>) =>
    request<{ success: boolean; message: string; data: ApiService }>('/api/services', {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  update: (id: string, body: Partial<ApiService>) =>
    request<{ success: boolean; message: string; data: ApiService }>(`/api/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
    }),

  delete: (id: string) =>
    request<{ success: boolean; message: string }>(`/api/services/${id}`, { method: 'DELETE' }),
}

// Blogs 

export type ApiBlog = {
  _id: string
  title: string
  slug: string
  summary: string
  content: string
  coverImage: string
  author: string
  tags: string[]
  isPublished: boolean
  publishedAt: string | null
  createdAt: string
  updatedAt: string
}

export const blogsApi = {
  getAll: () => request<{ success: boolean; count: number; data: ApiBlog[] }>('/api/blogs'),

  getById: (id: string) => request<{ success: boolean; data: ApiBlog }>(`/api/blogs/${id}`),

  create: (body: Omit<ApiBlog, '_id' | 'createdAt' | 'updatedAt' | 'publishedAt'>) =>
    request<{ success: boolean; message: string; data: ApiBlog }>('/api/blogs', {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  update: (id: string, body: Partial<ApiBlog>) =>
    request<{ success: boolean; message: string; data: ApiBlog }>(`/api/blogs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
    }),

  delete: (id: string) =>
    request<{ success: boolean; message: string }>(`/api/blogs/${id}`, { method: 'DELETE' }),
}

//  Contact 

export type ContactType = 'email' | 'phone' | 'location'

export type ApiContact = {
  _id: string
  type: ContactType
  label: string
  value: string
  isActive: boolean
  order: number
  createdAt: string
  updatedAt: string
}

export const contactApi = {
  getAll: () =>
    request<{ success: boolean; count: number; data: ApiContact[] }>('/api/contact?all=true'),

  getByType: (type: ContactType) =>
    request<{ success: boolean; count: number; data: ApiContact[] }>(`/api/contact?type=${type}&all=true`),

  getById: (id: string) => request<{ success: boolean; data: ApiContact }>(`/api/contact/${id}`),

  create: (body: Omit<ApiContact, '_id' | 'createdAt' | 'updatedAt'>) =>
    request<{ success: boolean; message: string; data: ApiContact }>('/api/contact', {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  update: (id: string, body: Partial<ApiContact>) =>
    request<{ success: boolean; message: string; data: ApiContact }>(`/api/contact/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
    }),

  delete: (id: string) =>
    request<{ success: boolean; message: string }>(`/api/contact/${id}`, { method: 'DELETE' }),
}

// Inquiries (Contact Form Submissions) ─────────────────────────────────────────

export type InquiryStatus = 'new' | 'contacted' | 'resolved'

export type ApiInquiry = {
  _id: string
  name: string
  phone: string
  email: string
  service: string
  message: string
  status: InquiryStatus
  createdAt: string
  updatedAt: string
}

export type SubmitInquiryBody = {
  name: string
  phone: string
  email: string
  service?: string
  message?: string
}

export const inquiryApi = {
  /** Called by the public contact form — no auth required */
  submit: (body: SubmitInquiryBody) =>
    request<{ success: boolean; message: string; data: ApiInquiry }>('/api/inquiries', {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  /** Admin only */
  getAll: () =>
    request<{ success: boolean; count: number; data: ApiInquiry[] }>('/api/inquiries'),

  updateStatus: (id: string, status: InquiryStatus) =>
    request<{ success: boolean; message: string; data: ApiInquiry }>(`/api/inquiries/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    }),

  delete: (id: string) =>
    request<{ success: boolean; message: string }>(`/api/inquiries/${id}`, { method: 'DELETE' }),
}

