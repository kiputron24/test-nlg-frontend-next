import Button from '@/components/commons/Button'
import styles from './DeleteConfirm.module.scss'

type Props = {
  productName: string
  onConfirm: () => void
  onCancel: () => void
  submitting?: boolean
}

export default function DeleteConfirm({
  productName,
  onConfirm,
  onCancel,
  submitting = false,
}: Props) {
  return (
    <div className={styles.wrapper}>
      <p className={styles.message}>
        Are you sure you want to delete the product{' '}
        <strong className={styles.highlight}>{productName}</strong>? This action
        cannot be undone.
      </p>
      <div className={styles.actions}>
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={submitting}
        >
          Cancel
        </Button>
        <button
          className={styles.deleteBtn}
          onClick={onConfirm}
          disabled={submitting}
        >
          {submitting ? 'Deleting...' : 'Yes, Delete'}
        </button>
      </div>
    </div>
  )
}
