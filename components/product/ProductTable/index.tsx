import Table, { Column } from '@/components/commons/Table'
import { Product } from '@/types/product'
import styles from './ProductTable.module.scss'

type Props = {
  products: Product[]
  page?: number
  limit?: number
  onEdit: (product: Product) => void
  onDelete: (product: Product) => void
}

export default function ProductTable({
  products,
  page = 1,
  limit = 10,
  onEdit,
  onDelete,
}: Props) {
  const offset = (page - 1) * limit

  const columns: Column<Product>[] = [
    {
      key: 'no',
      label: 'No',
      render: (_, idx) => offset + idx + 1,
    },
    {
      key: 'name',
      label: 'Product Name',
      tdClassName: styles.name,
      render: (p) => p.name,
    },
    {
      key: 'price',
      label: 'Harga',
      render: (p) =>
        new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR',
          minimumFractionDigits: 0,
        }).format(p.price),
    },
    {
      key: 'stock',
      label: 'Stock',
      render: (p) => (
        <span
          className={`${styles.badge} ${
            p.stock === 0
              ? styles.badgeEmpty
              : p.stock <= 10
                ? styles.badgeLow
                : styles.badgeOk
          }`}
        >
          {p.stock}
        </span>
      ),
    },
    {
      key: 'description',
      label: 'Description',
      tdClassName: styles.description,
      render: (p) => p.description || '—',
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (p) => (
        <div className={styles.actions}>
          <button className={styles.editBtn} onClick={() => onEdit(p)}>
            Edit
          </button>
          <button className={styles.deleteBtn} onClick={() => onDelete(p)}>
            Delete
          </button>
        </div>
      ),
    },
  ]

  return (
    <Table
      columns={columns}
      data={products}
      keyExtractor={(p) => p.id}
      emptyText="No products yet. Click the button above to add one."
    />
  )
}
