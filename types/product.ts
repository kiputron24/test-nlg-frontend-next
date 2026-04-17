export interface Product {
  id: number
  name: string
  price: number
  stock: number
  description: string
}

export type ProductFormData = Omit<Product, 'id'>

// ---------- Raw API shapes ----------

export interface ApiProduct {
  id: number
  external_id: number
  name: string
  price: string
  stock: number
  description: string
  created_at: string
  updated_at: string
  deleted_at: string | null
}

export interface ApiMeta {
  status: string
  message: string
  code: number
}

export interface ApiPaginatedData<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface ApiResponse<T> {
  meta: ApiMeta
  data: T
}

// ---------- Service return type ----------

export interface ProductsPage {
  products: Product[]
  total: number
  totalPages: number
  page: number
}
