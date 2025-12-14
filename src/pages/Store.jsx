import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { storeItems } from '../data/mockData'
import styles from './Store.module.css'

export default function Store() {
  const { user, tokenBalance, deductTokens } = useApp()
  const [purchased, setPurchased] = useState(new Set())

  const handlePurchase = (item) => {
    if (!user) {
      alert('Please sign up first')
      return
    }
    if (tokenBalance < item.price) {
      alert('Insufficient tokens')
      return
    }
    deductTokens(item.price)
    setPurchased(new Set([...purchased, item.id]))
    alert(`Purchased ${item.name}! (Mock)`)
  }

  return (
    <div className={`container mx-auto px-gutter ${styles.pageContainer}`}>
      <div className={styles.header}>
        <h1 className={styles.title}>Cosmetic store</h1>
        <p className={styles.subtitle}>Customize your profile with exclusive items</p>
      </div>

      <div className={styles.itemsGrid}>
        {storeItems.map((item, idx) => (
          <div
            key={item.id}
            className={styles.itemCard}
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            <div className={styles.itemIcon}>{item.image}</div>
            <h3 className={styles.itemName}>{item.name}</h3>
            <p className={styles.itemDescription}>{item.description}</p>
            <div className={styles.itemFooter}>
              <span className={styles.itemPrice}>
                🪙 {item.price.toLocaleString()}
              </span>
              <button
                onClick={() => handlePurchase(item)}
                disabled={purchased.has(item.id) || tokenBalance < item.price}
                className={`${styles.purchaseButton} ${
                  purchased.has(item.id)
                    ? styles.ownedButton
                    : tokenBalance < item.price
                    ? styles.errorButton
                    : ''
                }`}
              >
                {purchased.has(item.id) ? 'Owned' : 'Purchase'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
