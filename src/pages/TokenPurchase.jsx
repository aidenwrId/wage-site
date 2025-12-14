import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { tokenPackages } from '../data/mockData'
import styles from './TokenPurchase.module.css'

export default function TokenPurchase() {
  const { addTokens } = useApp()
  const [selectedPackage, setSelectedPackage] = useState(null)

  const handlePurchase = (pkg) => {
    addTokens(pkg.tokens + (pkg.bonus || 0))
    alert(`Purchased ${pkg.tokens + (pkg.bonus || 0)} tokens for $${pkg.price.toFixed(2)}! (Mock checkout)`)
    setSelectedPackage(null)
  }

  return (
    <div className={`container mx-auto px-gutter ${styles.pageContainer} max-w-4xl`}>
      <div className={styles.header}>
        <h1 className={styles.title}>Purchase tokens</h1>
        <p className={styles.subtitle}>Buy tokens to create and join matches</p>
      </div>

      <div className={styles.packagesGrid}>
        {tokenPackages.map((pkg, idx) => (
          <div
            key={pkg.id}
            className={`${styles.packageCard} ${
              selectedPackage === pkg.id ? styles.packageCardSelected : ''
            }`}
            onClick={() => setSelectedPackage(pkg.id)}
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            {pkg.bonus > 0 && (
              <div className={styles.bonusBadge}>+{pkg.bonus} BONUS</div>
            )}
            <div className={styles.packageIcon}>🪙</div>
            <h3 className={styles.packageTokens}>{pkg.tokens.toLocaleString()} tokens</h3>
            {pkg.bonus > 0 && (
              <p className={styles.packageBonus}>+ {pkg.bonus} bonus tokens</p>
            )}
            <div className={styles.packagePrice}>${pkg.price.toFixed(2)}</div>
            <button
              onClick={(e) => {
                e.stopPropagation()
                handlePurchase(pkg)
              }}
              className={styles.purchaseButton}
            >
              Purchase
            </button>
          </div>
        ))}
      </div>

      <div className={styles.infoBox}>
        <h3 className={styles.infoTitle}>How it works</h3>
        <ul className={styles.infoList}>
          <li className={styles.infoItem}>• Tokens are required to create and join matches</li>
          <li className={styles.infoItem}>• Tokens are locked when a match starts</li>
          <li className={styles.infoItem}>• Winners receive all tokens from the match</li>
          <li className={styles.infoItem}>• This is a frontend placeholder — no real payment processing</li>
        </ul>
      </div>
    </div>
  )
}
