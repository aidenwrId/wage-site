import { Link, useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import TokenBalance from './TokenBalance'
import styles from './Layout.module.css'

export default function Layout({ children }) {
  const location = useLocation()
  const { user } = useApp()
  const isAuthPage = location.pathname === '/signup' || location.pathname === '/profile-setup'

  return (
    <div className="min-h-screen flex flex-col relative z-10">
      {!isAuthPage && (
        <header className={styles.header}>
          <div className="container mx-auto px-gutter">
            <nav className={styles.nav}>
              <Link to="/" className={styles.logo}>
                SkillMatch
              </Link>
              
              <div className={styles.navLinks}>
                <Link to="/matches" className={styles.navLink}>
                  Browse matches
                </Link>
                <Link to="/create-match" className={styles.navLink}>
                  Create match
                </Link>
                <Link to="/store" className={styles.navLink}>
                  Store
                </Link>
                
                {user ? (
                  <div className={styles.userSection}>
                    <TokenBalance />
                    <div className={styles.userInfo}>
                      <span>{user.avatar}</span>
                      <span>{user.username}</span>
                    </div>
                  </div>
                ) : (
                  <Link to="/signup" className={styles.signUpButton}>
                    Sign up
                  </Link>
                )}
              </div>
            </nav>
          </div>
        </header>
      )}
      
      <main className="flex-1 relative z-10">
        {children}
      </main>
      
      {!isAuthPage && (
        <footer className={styles.footer}>
          <div className="container mx-auto px-gutter">
            <p className={styles.footerText}>
              SkillMatch — Competitive skill-based gaming platform
            </p>
          </div>
        </footer>
      )}
    </div>
  )
}

