import { useState } from 'react'
import { Link } from 'react-router-dom'
import { mockMatches, games, matchTypes } from '../data/mockData'
import { GameIcon, TokenIcon } from '../components/GameIcon'
import styles from './BrowseMatches.module.css'

export default function BrowseMatches() {
  const [filters, setFilters] = useState({
    game: '',
    matchType: '',
    minTokens: '',
    maxTokens: ''
  })

  const filteredMatches = mockMatches.filter(match => {
    if (filters.game && match.game !== filters.game) return false
    if (filters.matchType && match.matchType !== filters.matchType) return false
    if (filters.minTokens && match.tokenWager < parseInt(filters.minTokens)) return false
    if (filters.maxTokens && match.tokenWager > parseInt(filters.maxTokens)) return false
    return true
  })

  const getGameAccentColor = (gameId) => {
    const colors = {
      'fortnite': '#3EE6A8',
      'cod': '#6B7CFF',
      'valorant': '#6B7CFF',
      'cs2': '#3EE6A8',
      'rocket-league': '#F2B84B',
      'r6': '#6B7CFF',
      'apex': '#F2B84B',
      'lol': '#3EE6A8',
      'overwatch': '#F2B84B',
      'smash': '#6B7CFF'
    }
    return colors[gameId] || '#3EE6A8'
  }

  return (
    <div className={styles.pageContainer}>
      <div className={`container mx-auto px-gutter py-12 ${styles.content}`}>
        <div className={styles.header}>
          <h1 className={styles.title}>Browse matches</h1>
          <p className={styles.subtitle}>Find your next competitive match</p>
        </div>

        {/* Filters */}
        <div className={styles.filtersContainer}>
          <div className={styles.filtersGrid}>
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Game</label>
              <select
                value={filters.game}
                onChange={(e) => setFilters({ ...filters, game: e.target.value })}
                className={styles.filterInput}
              >
                <option value="">All Games</option>
                {games.map((game) => (
                  <option key={game.id} value={game.id}>
                    {game.name}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Match Type</label>
              <select
                value={filters.matchType}
                onChange={(e) => setFilters({ ...filters, matchType: e.target.value })}
                className={styles.filterInput}
              >
                <option value="">All Types</option>
                {matchTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Min Tokens</label>
              <input
                type="number"
                value={filters.minTokens}
                onChange={(e) => setFilters({ ...filters, minTokens: e.target.value })}
                className={styles.filterInput}
                placeholder="0"
              />
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Max Tokens</label>
              <input
                type="number"
                value={filters.maxTokens}
                onChange={(e) => setFilters({ ...filters, maxTokens: e.target.value })}
                className={styles.filterInput}
                placeholder="No limit"
              />
            </div>
          </div>
        </div>

        {/* Match List */}
        <div className={styles.matchesList}>
          {filteredMatches.map((match, idx) => {
            const accentColor = getGameAccentColor(match.game)
            return (
              <Link
                key={match.id}
                to={`/match/${match.id}`}
                className={`${styles.matchCard} ${styles.matchCardStagger}`}
                style={{
                  '--match-accent-color': accentColor,
                  animationDelay: `${(idx + 2) * 0.08}s`
                }}
              >
                <div className={styles.matchCardContent}>
                  <div className={styles.matchCardLeft}>
                    <div className={styles.gameIconWrapper}>
                      <GameIcon gameId={match.game} className={styles.gameIcon} />
                    </div>
                    <div className={styles.matchInfo}>
                      <h3 className={styles.gameName}>{match.gameName}</h3>
                      <div className={styles.matchMeta}>
                        <span className={styles.modeBadge}>{match.mode}</span>
                        <span className={styles.matchTypeBadge}>{match.matchType}</span>
                      </div>
                      <div className={styles.matchDetails}>
                        <span className={styles.tokenAmount}>
                          <TokenIcon className={styles.tokenIcon} />
                          {match.tokenWager.toLocaleString()}
                        </span>
                        <span className={styles.detailSeparator}>•</span>
                        <span>Created by {match.creator.username}</span>
                        <span className={styles.detailSeparator}>•</span>
                        <span>
                          {match.players.length}/{match.maxPlayers} players
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className={`${styles.statusBadge} ${
                    match.status === 'active' 
                      ? styles.statusActive 
                      : styles.statusWaiting
                  }`}>
                    {match.status === 'active' ? 'In progress' : 'Waiting'}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {filteredMatches.length === 0 && (
          <div className={styles.emptyState}>
            <p>No matches found</p>
          </div>
        )}
      </div>
    </div>
  )
}
