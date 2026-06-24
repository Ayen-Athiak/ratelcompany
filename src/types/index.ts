export interface Quote {
  id?: string
  name: string
  company?: string
  email: string
  phone?: string
  inquiry_type: string
  message: string
  status?: 'new' | 'read' | 'replied'
  created_at?: string
}

export interface Product {
  id: string
  name: string
  category: string
  description: string
  tags: string[]
  image_url?: string
  large?: boolean
  sort_order?: number
  created_at?: string
}

export interface Post {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  cover_image?: string
  published: boolean
  created_at: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  department: string
  bio: string
  photo_url?: string
  sort_order: number
}
