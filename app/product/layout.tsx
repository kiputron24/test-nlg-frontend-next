import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NLG - Product',
  description: 'Manage products with ease',
}

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
