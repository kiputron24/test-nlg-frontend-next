import React from 'react'

export default function ArrowUp({
  className,
  width = 24,
  height = 24,
}: {
  className?: string
  width?: number
  height?: number
}) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 19V5M5 12l7-7 7 7" />
    </svg>
  )
}
