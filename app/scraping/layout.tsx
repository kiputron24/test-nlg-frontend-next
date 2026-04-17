import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NLG - Scraping',
  description: 'Search for products across online marketplaces',
}

export default function ScrapingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
