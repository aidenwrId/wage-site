import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { games, matchTypes } from '../data/mockData'
import styles from './CreateMatch.module.css'

export default function CreateMatch() {
  const navigate = useNavigate()
  const { user, availableTokens, deductTokens, lockTokens } = useApp()
  const [formData, setFormData] = useState({
    game: '',
    mode: '',
    matchType: '1v1',
    tokenWager: '',
    rulePreset: '',
    customRules: ''
  })

  const selectedGame = games.find(g => g.id === formData.game)
  const wagerAmount = parseInt(formData.tokenWager) || 0

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!user) {
      alert('Please sign up first')
      return
    }
    if (wagerAmount > availableTokens) {
      alert('Insufficient tokens')
      return
    }
    if (wagerAmount <= 0) {
      alert('Wager must be greater than 0')
      return
    }

    deductTokens(wagerAmount)
    lockTokens(wagerAmount)
    navigate('/matches')
  }

  return (
    <div className={`container mx-auto px-gutter ${styles.pageContainer} max-w-2xl`}>
      <div className={styles.header}>
        <h1 className={styles.title}>Create match</h1>
        <p className={styles.subtitle}>Set up your competitive match</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formPanel}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Game *</label>
            <select
              required
              value={formData.game}
              onChange={(e) => setFormData({ ...formData, game: e.target.value, mode: '' })}
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

          {selectedGame && (
            <div className={styles.formGroup}>
              <label className={styles.label}>Mode *</label>
              <select
                required
                value={formData.mode}
                onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
                className={styles.select}
              >
                <option value="">Select a mode</option>
                {selectedGame.modes.map((mode) => (
                  <option key={mode} value={mode}>
                    {mode}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className={styles.formGroup}>
            <label className={styles.label}>Match type *</label>
            <select
              required
              value={formData.matchType}
              onChange={(e) => setFormData({ ...formData, matchType: e.target.value })}
              className={styles.select}
            >
              {matchTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              Token wager * (Available: {availableTokens.toLocaleString()})
            </label>
            <input
              type="number"
              required
              min="1"
              max={availableTokens}
              value={formData.tokenWager}
              onChange={(e) => setFormData({ ...formData, tokenWager: e.target.value })}
              className={styles.input}
              placeholder="Enter wager amount"
            />
            {wagerAmount > 0 && (
              <p className={styles.helpText}>
                This will lock {wagerAmount.toLocaleString()} tokens until the match completes
              </p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Rule preset</label>
            <select
              value={formData.rulePreset}
              onChange={(e) => setFormData({ ...formData, rulePreset: e.target.value })}
              className={styles.select}
            >
              <option value="">Custom</option>
              <option value="best-of-3">Best of 3</option>
              <option value="best-of-5">Best of 5</option>
              <option value="first-to-10">First to 10</option>
              <option value="single-match">Single match</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Custom rules</label>
            <textarea
              value={formData.customRules}
              onChange={(e) => setFormData({ ...formData, customRules: e.target.value })}
              className={styles.textarea}
              placeholder="Enter custom match rules..."
            />
          </div>
        </div>

        {wagerAmount > 0 && (
          <div className={styles.warningBox}>
            <p className={styles.warningText}>
              ⚠️ {wagerAmount.toLocaleString()} tokens will be deducted and locked when you create this match
            </p>
            <p className={styles.warningSubtext}>
              Tokens will be redistributed to the winner when the match completes
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={wagerAmount > availableTokens || wagerAmount <= 0}
          className={styles.submitButton}
        >
          Create match
        </button>
      </form>
    </div>
  )
}
