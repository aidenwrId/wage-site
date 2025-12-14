import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import styles from './TokenBalance.module.css'

export default function TokenBalance() {
  const { tokenBalance, lockedTokens, availableTokens } = useApp()

  return (
    <div className={styles.container}>
      <div className={styles.balanceSection}>
        <div className={styles.balanceRow}>
          <span className={styles.tokenIcon}>🪙</span>
          <span className={styles.balanceAmount}>{tokenBalance.toLocaleString()}</span>
        </div>
        {lockedTokens > 0 && (
          <span className={styles.lockedAmount}>
            {lockedTokens.toLocaleString()} locked
          </span>
        )}
      </div>
      <div className={styles.divider} />
      <Link to="/tokens" className={styles.buyLink}>
        Buy tokens
      </Link>
    </div>
  )
}

