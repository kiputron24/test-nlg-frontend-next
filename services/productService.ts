import axios from 'axios'
import {
  Product,
  ProductFormData,
  ApiProduct,
  ApiResponse,
  ApiPaginatedData,
  ProductsPage,
} from '@/types/product'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

function mapProduct(p: ApiProduct): Product {
  return {
    id: p.id,
    name: p.name,
    price: parseFloat(p.price),
    stock: p.stock,
    description: p.description,
  }
}

export async function getProducts(page = 1, limit = 10): Promise<ProductsPage> {
  const { data } = await api.get<ApiResponse<ApiPaginatedData<ApiProduct>>>(
    '/products',
    {
      params: { page, limit },
    },
  )
  return {
    products: data.data.items.map(mapProduct),
    total: data.data.pagination.total,
    totalPages: data.data.pagination.totalPages,
    page: data.data.pagination.page,
  }
}

export async function createProduct(
  payload: ProductFormData,
): Promise<Product> {
  const { data } = await api.post<ApiResponse<ApiProduct>>('/products', payload)
  return mapProduct(data.data)
}

export async function updateProduct(
  id: number,
  payload: ProductFormData,
): Promise<Product> {
  const { data } = await api.put<ApiResponse<ApiProduct>>(
    `/products/${id}`,
    payload,
  )
  return mapProduct(data.data)
}

export async function deleteProduct(id: number): Promise<void> {
  await api.delete(`/products/${id}`)
}

export async function syncProducts(): Promise<void> {
  await api.post('/products/sync')
}
