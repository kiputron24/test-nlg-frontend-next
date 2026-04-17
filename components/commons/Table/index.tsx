import styles from './Table.module.scss'

export type Column<T> = {
  key: string
  label: string
  thClassName?: string
  tdClassName?: string
  render: (row: T, rowIndex: number) => React.ReactNode
}

type Props<T> = {
  columns: Column<T>[]
  data: T[]
  keyExtractor: (row: T) => string | number
  emptyText?: string
}

export default function Table<T>({
  columns,
  data,
  keyExtractor,
  emptyText = 'Tidak ada data.',
}: Props<T>) {
  if (data.length === 0) {
    return (
      <div className={styles.empty}>
        <p>{emptyText}</p>
      </div>
    )
  }

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={`${styles.th} ${col.thClassName ?? ''}`}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={keyExtractor(row)} className={styles.row}>
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={`${styles.td} ${col.tdClassName ?? ''}`}
                >
                  {col.render(row, rowIndex)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
