export interface ScrapResult {
  name: string
  price: number
  priceFormatted: string
  link: string
}

export interface ApiMeta {
  status: string
  message: string
  code: number
}

export interface ApiScrapResponse {
  meta: ApiMeta
  data: ScrapResult[]
}
