'use client'

import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Product, ProductFormData } from '@/types/product'
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  syncProducts,
} from '@/services/productService'
import ProductTable from '@/components/product/ProductTable'
import ProductForm from '@/components/product/ProductForm'
import ProductModal from '@/components/product/ProductModal'
import DeleteConfirm from '@/components/product/DeleteConfirm'
import Pagination from '@/components/product/Pagination'
import Button from '@/components/commons/Button'
import styles from './page.module.scss'

const PER_PAGE = 10

type ModalMode = 'create' | 'edit' | 'delete' | null

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [page, setPage] = useState(1)
  const [mode, setMode] = useState<ModalMode>(null)
  const [selected, setSelected] = useState<Product | null>(null)

  const fetchProducts = useCallback(async (p: number) => {
    setLoading(true)
    setError(null)
    try {
      const result = await getProducts(p, PER_PAGE)
      setProducts(result.products)
      setTotal(result.total)
    } catch {
      setError('Failed to load products. Make sure the server is running.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProducts(page)
  }, [fetchProducts, page])

  function openCreate() {
    setSelected(null)
    setMode('create')
  }

  function openEdit(product: Product) {
    setSelected(product)
    setMode('edit')
  }

  function openDelete(product: Product) {
    setSelected(product)
    setMode('delete')
  }

  function closeModal() {
    setMode(null)
    setSelected(null)
  }

  async function handleCreate(data: ProductFormData) {
    setSubmitting(true)
    try {
      await createProduct(data)
      toast.success('Product added successfully.')
      closeModal()
      if (page === 1) {
        await fetchProducts(1)
      } else {
        setPage(1)
      }
    } catch {
      toast.error('Failed to add product.')
    } finally {
      setSubmitting(false)
    }
  }

  async function handleUpdate(data: ProductFormData) {
    if (!selected) return
    setSubmitting(true)
    try {
      await updateProduct(selected.id, data)
      toast.success('Product updated successfully.')
      closeModal()
      await fetchProducts(page)
    } catch {
      toast.error('Failed to update product.')
    } finally {
      setSubmitting(false)
    }
  }

  async function handleDelete() {
    if (!selected) return
    setSubmitting(true)
    try {
      await deleteProduct(selected.id)
      toast.success('Product deleted successfully.')
      closeModal()
      const isLastOnPage = products.length === 1 && page > 1
      if (isLastOnPage) {
        setPage(page - 1)
      } else {
        await fetchProducts(page)
      }
    } catch {
      toast.error('Failed to delete product.')
    } finally {
      setSubmitting(false)
    }
  }

  async function syncData() {
    setSubmitting(true)
    try {
      await syncProducts()
      toast.success('Sync completed successfully.')
      if (page === 1) {
        await fetchProducts(1)
      } else {
        setPage(1)
      }
    } catch {
      toast.error('Sync failed.')
    } finally {
      setSubmitting(false)
    }
  }

  const editInitial: ProductFormData | undefined = selected
    ? {
        name: selected.name,
        price: selected.price,
        stock: selected.stock,
        description: selected.description,
      }
    : undefined

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {/* Page Header */}
        <div className={styles.pageHeader}>
          <div className={styles.heading}>
            <h1 className={styles.title}>Product Management</h1>
            <p className={styles.subtitle}>
              {loading ? 'Loading...' : `${total} products registered`}
            </p>
          </div>
          <div className={styles.buttonGroup}>
            <Button onClick={openCreate} disabled={loading}>
              + Add Product
            </Button>
            <Button onClick={syncData} disabled={loading}>
              Sync Products
            </Button>
          </div>
        </div>

        {/* Error banner */}
        {error && (
          <div
            className={`${styles.card} ${styles.statusBox} ${styles.errorMsg}`}
          >
            <span>{error}</span>
            <button
              className={styles.retryBtn}
              onClick={() => fetchProducts(page)}
            >
              Retry
            </button>
          </div>
        )}

        {/* Table Card */}
        {!error && (
          <div className={styles.card}>
            {loading ? (
              <div className={`${styles.statusBox} ${styles.loading}`}>
                Loading products...
              </div>
            ) : (
              <ProductTable
                products={products}
                page={page}
                limit={PER_PAGE}
                onEdit={openEdit}
                onDelete={openDelete}
              />
            )}
          </div>
        )}

        {/* Pagination */}
        {!loading && !error && (
          <Pagination
            total={total}
            page={page}
            perPage={PER_PAGE}
            onChange={setPage}
          />
        )}
      </div>

      {/* Create Modal */}
      <ProductModal
        title="Add Product"
        isOpen={mode === 'create'}
        onClose={closeModal}
      >
        <ProductForm
          onSubmit={handleCreate}
          onCancel={closeModal}
          submitting={submitting}
        />
      </ProductModal>

      {/* Edit Modal */}
      <ProductModal
        title="Edit Product"
        isOpen={mode === 'edit'}
        onClose={closeModal}
      >
        <ProductForm
          initialData={editInitial}
          onSubmit={handleUpdate}
          onCancel={closeModal}
          submitting={submitting}
        />
      </ProductModal>

      {/* Delete Confirmation Modal */}
      <ProductModal
        title="Delete Product"
        isOpen={mode === 'delete'}
        onClose={closeModal}
      >
        {selected && (
          <DeleteConfirm
            productName={selected.name}
            onConfirm={handleDelete}
            onCancel={closeModal}
            submitting={submitting}
          />
        )}
      </ProductModal>
    </main>
  )
}
