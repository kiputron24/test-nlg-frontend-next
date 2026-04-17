import Table, { Column } from '@/components/commons/Table'
import { ScrapResult } from '@/types/scrap'

type Props = {
  results: ScrapResult[]
}

export default function ScrapResults({ results }: Props) {
  const columns: Column<ScrapResult>[] = [
    {
      key: 'name',
      label: 'Product Name',
      render: (r) => r.name,
    },
    {
      key: 'price',
      label: 'Price',
      render: (r) => r.priceFormatted,
    },
    {
      key: 'link',
      label: 'Link',
      render: (r) => (
        <a
          href={r.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#0120f1', textDecoration: 'underline' }}
        >
          View
        </a>
      ),
    },
  ]

  return (
    <Table
      columns={columns}
      data={results}
      keyExtractor={(r) => r.link}
      emptyText="No products found."
    />
  )
}
