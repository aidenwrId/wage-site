import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import styles from './LandingPage.module.css'

export default function LandingPage() {
  const { user } = useApp()

  return (
    <div className={styles.pageContainer}>
      <div className={styles.background}>
        <div className={styles.backgroundBase}></div>
        <div className={styles.backgroundGlow1}></div>
        <div className={styles.backgroundGlow2}></div>
      </div>

      <div className={`container mx-auto px-gutter ${styles.content}`}>
        <div className={styles.hero}>
          <h1 className={styles.title}>Compete. Wager. Win.</h1>
          <p className={styles.subtitle}>
            Skill-based matchmaking platform where your abilities determine the outcome. 
            Create matches, set wagers, and prove you're the best.
          </p>

          <div className={styles.ctaGroup}>
            <Link
              to={user ? "/create-match" : "/signup"}
              className={styles.primaryButton}
            >
              Create match
            </Link>
            <Link
              to="/matches"
              className={styles.secondaryButton}
            >
              Browse matches
            </Link>
          </div>

          <div className={styles.featuresGrid}>
            <div className={`${styles.featureCard} ${styles.stagger1}`}>
              <div className={styles.featureIcon}>🎯</div>
              <h3 className={styles.featureTitle}>Skill-based</h3>
              <p className={styles.featureDescription}>
                Your performance determines the outcome. No luck, just skill.
              </p>
            </div>
            <div className={`${styles.featureCard} ${styles.stagger2}`}>
              <div className={styles.featureIcon}>⚡</div>
              <h3 className={styles.featureTitle}>Fast matchmaking</h3>
              <p className={styles.featureDescription}>
                Find opponents instantly. Join matches or create your own.
              </p>
            </div>
            <div className={`${styles.featureCard} ${styles.stagger3}`}>
              <div className={styles.featureIcon}>🏆</div>
              <h3 className={styles.featureTitle}>Fair competition</h3>
              <p className={styles.featureDescription}>
                Peer-to-peer wagers with transparent rules and results.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
