import axios from 'axios'
import { ApiScrapResponse, ScrapResult } from '@/types/scrap'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

export async function searchProducts(keyword: string): Promise<ScrapResult[]> {
  const { data } = await api.get<ApiScrapResponse>('/scrap', {
    params: { keyword },
  })
  return data.data
}
