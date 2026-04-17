'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import Hamburger from '@/components/icons/Hamburger'
import Close from '@/components/icons/Close'

import styles from './Navbar.module.scss'

const navLinks = [
  { label: 'Product', href: '/product' },
  { label: 'Scraping', href: '/scraping' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <Image
            src="/assets/img/logo.png"
            alt="NLG Logo"
            width={120}
            height={30}
            priority
          />
        </Link>

        {/* Desktop Nav Links */}
        <ul className={styles.navList}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={styles.navLink}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Hamburger */}
        <button
          className={styles.menuBtn}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <Close /> : <Hamburger />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={styles.mobileNavLink}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
