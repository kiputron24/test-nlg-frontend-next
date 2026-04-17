import styles from './Pagination.module.scss'

type Props = {
  total: number
  page: number
  perPage: number
  onChange: (page: number) => void
}

export default function Pagination({ total, page, perPage, onChange }: Props) {
  const totalPages = Math.ceil(total / perPage)
  if (totalPages <= 1) return null

  const pages: (number | '...')[] = []

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i)
  } else {
    pages.push(1)
    if (page > 3) pages.push('...')
    for (
      let i = Math.max(2, page - 1);
      i <= Math.min(totalPages - 1, page + 1);
      i++
    ) {
      pages.push(i)
    }
    if (page < totalPages - 2) pages.push('...')
    pages.push(totalPages)
  }

  return (
    <div className={styles.pagination}>
      <button
        className={styles.btn}
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        aria-label="Halaman sebelumnya"
      >
        ‹
      </button>

      {pages.map((p, i) =>
        p === '...' ? (
          <span key={`ellipsis-${i}`} className={styles.ellipsis}>
            …
          </span>
        ) : (
          <button
            key={p}
            className={`${styles.btn} ${p === page ? styles.active : ''}`}
            onClick={() => onChange(p as number)}
            aria-current={p === page ? 'page' : undefined}
          >
            {p}
          </button>
        ),
      )}

      <button
        className={styles.btn}
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Halaman berikutnya"
      >
        ›
      </button>
    </div>
  )
}
