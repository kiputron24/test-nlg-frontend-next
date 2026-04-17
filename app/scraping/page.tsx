'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { ScrapResult } from '@/types/scrap'
import { searchProducts } from '@/services/scrapService'
import ScrapResults from '@/components/scrap/ScrapResults'
import Button from '@/components/commons/Button'
import styles from './page.module.scss'

export default function ScrapPage() {
  const [keyword, setKeyword] = useState('')
  const [results, setResults] = useState<ScrapResult[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (!keyword.trim()) {
      toast.error('Please enter a keyword.')
      return
    }

    setLoading(true)
    try {
      const data = await searchProducts(keyword)
      setResults(data)
      setSearched(true)
      toast.success(`Found ${data.length} products.`)
    } catch {
      toast.error('Failed to search products.')
      setSearched(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {/* Page Header */}
        <div className={styles.heading}>
          <h1 className={styles.title}>Product Scraping</h1>
          <p className={styles.subtitle}>
            Search for products across online marketplaces
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className={styles.searchCard}>
          <div className={styles.searchField}>
            <label className={styles.label}>Search Keyword</label>
            <div className={styles.searchGroup}>
              <input
                type="text"
                className={styles.searchInput}
                placeholder="e.g., Keyboard murah, Laptop gaming..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                disabled={loading}
              />
              <Button type="submit" disabled={loading}>
                {loading ? 'Searching...' : 'Search'}
              </Button>
            </div>
          </div>
        </form>

        {/* Results Section */}
        {searched && !loading && (
          <>
            {results.length > 0 ? (
              <>
                <div className={styles.resultCount}>
                  Found {results.length} product
                  {results.length !== 1 ? 's' : ''}
                </div>
                <div className={styles.resultCard}>
                  <ScrapResults results={results} />
                </div>
              </>
            ) : (
              <div className={styles.emptyState}>
                <p>No products found for "{keyword}"</p>
              </div>
            )}
          </>
        )}

        {loading && (
          <div className={styles.loadingState}>Searching for products...</div>
        )}
      </div>
    </main>
  )
}
