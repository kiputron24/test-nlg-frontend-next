import { useEffect, useState } from 'react'
import { ProductFormData } from '@/types/product'
import Button from '@/components/commons/Button'
import styles from './ProductForm.module.scss'

type Props = {
  initialData?: ProductFormData
  onSubmit: (data: ProductFormData) => void
  onCancel: () => void
  submitting?: boolean
}

type Errors = Partial<Record<keyof ProductFormData, string>>

const EMPTY: ProductFormData = { name: '', price: 0, stock: 0, description: '' }

export default function ProductForm({
  initialData,
  onSubmit,
  onCancel,
  submitting = false,
}: Props) {
  const [form, setForm] = useState<ProductFormData>(initialData ?? EMPTY)
  const [errors, setErrors] = useState<Errors>({})

  useEffect(() => {
    setForm(initialData ?? EMPTY)
    setErrors({})
  }, [initialData])

  function validate(): boolean {
    const e: Errors = {}
    if (!form.name.trim()) e.name = 'Product name is required'
    else if (form.name.trim().length < 2)
      e.name = 'Name must be at least 2 characters'
    if (!form.price || form.price <= 0) e.price = 'Price must be greater than 0'
    if (form.stock < 0) e.stock = 'Stock cannot be negative'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    onSubmit({
      ...form,
      name: form.name.trim(),
      description: form.description.trim(),
    })
  }

  function handleChange(field: keyof ProductFormData, value: string) {
    const parsed =
      field === 'price' || field === 'stock' ? Number(value) : value
    setForm((prev) => ({ ...prev, [field]: parsed }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate>
      <div className={styles.field}>
        <label className={styles.label}>Product Name</label>
        <input
          className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
          value={form.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="Enter product name"
        />
        {errors.name && <p className={styles.error}>{errors.name}</p>}
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label}>Price (Rp)</label>
          <input
            type="number"
            min={1}
            className={`${styles.input} ${errors.price ? styles.inputError : ''}`}
            value={form.price === 0 ? '' : form.price}
            onChange={(e) => handleChange('price', e.target.value)}
            placeholder="0"
          />
          {errors.price && <p className={styles.error}>{errors.price}</p>}
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Stock</label>
          <input
            type="number"
            min={0}
            className={`${styles.input} ${errors.stock ? styles.inputError : ''}`}
            value={form.stock === 0 ? '' : form.stock}
            onChange={(e) => handleChange('stock', e.target.value)}
            placeholder="0"
          />
          {errors.stock && <p className={styles.error}>{errors.stock}</p>}
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>
          Description <span className={styles.optional}>(optional)</span>
        </label>
        <textarea
          className={styles.textarea}
          value={form.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Short product description"
          rows={3}
        />
      </div>

      <div className={styles.actions}>
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={submitting}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={submitting}>
          {submitting
            ? 'Saving...'
            : initialData
              ? 'Save Changes'
              : 'Add Product'}
        </Button>
      </div>
    </form>
  )
}
