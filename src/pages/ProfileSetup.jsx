import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { games, regions } from '../data/mockData'
import styles from './Auth.module.css'

const avatars = ['👤', '🎮', '🏆', '⚡', '🔥', '💎', '🎯', '👑', '🦾', '🤖']

export default function ProfileSetup() {
  const navigate = useNavigate()
  const { user, setUser } = useApp()
  const [profile, setProfile] = useState({
    avatar: user?.avatar || avatars[0],
    primaryGame: '',
    region: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    setUser({
      ...user,
      ...profile
    })
    navigate('/matches')
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.card}>
        <h1 className={styles.title}>Complete your profile</h1>
        <p className={styles.subtitle}>Set up your competitive profile</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Avatar</label>
            <div className={styles.avatarGrid}>
              {avatars.map((avatar) => (
                <button
                  key={avatar}
                  type="button"
                  onClick={() => setProfile({ ...profile, avatar })}
                  className={`${styles.avatarButton} ${
                    profile.avatar === avatar ? styles.avatarButtonSelected : ''
                  }`}
                >
                  {avatar}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Primary game</label>
            <select
              value={profile.primaryGame}
              onChange={(e) => setProfile({ ...profile, primaryGame: e.target.value })}
              className={styles.select}
            >
              <option value="">Select a game</option>
              {games.map((game) => (
                <option key={game.id} value={game.id}>
                  {game.name}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Region</label>
            <select
              value={profile.region}
              onChange={(e) => setProfile({ ...profile, region: e.target.value })}
              className={styles.select}
            >
              <option value="">Select your region</option>
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className={styles.submitButton}>
            Complete setup
          </button>
        </form>
      </div>
    </div>
  )
}

