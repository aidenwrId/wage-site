import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { mockMatches, games } from '../data/mockData'
import styles from './MatchPage.module.css'

export default function MatchPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, unlockTokens, addTokens } = useApp()
  const [isInVoice, setIsInVoice] = useState(false)
  const [chatMessages, setChatMessages] = useState([
    { user: 'System', message: 'Match created. Waiting for players...', time: new Date() }
  ])
  const [newMessage, setNewMessage] = useState('')

  const match = mockMatches.find(m => m.id === id)
  if (!match) {
    return (
      <div className="container mx-auto px-gutter py-12">
        <p>Match not found</p>
      </div>
    )
  }

  const game = games.find(g => g.id === match.game)
  const slotsAvailable = match.maxPlayers - match.players.length
  const canJoin = slotsAvailable > 0 && !match.players.find(p => p.username === user?.username)

  const handleJoin = () => {
    if (!user) {
      navigate('/signup')
      return
    }
    alert('Joined match! (Mock)')
  }

  const handleSubmitResult = () => {
    if (!user || !match.players.find(p => p.username === user.username)) {
      alert('Only match participants can submit results')
      return
    }
    unlockTokens(match.tokenWager)
    addTokens(match.tokenWager * 2)
    alert('Result submitted! Tokens redistributed. (Mock)')
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!newMessage.trim()) return
    setChatMessages([
      ...chatMessages,
      { user: user?.username || 'Guest', message: newMessage, time: new Date() }
    ])
    setNewMessage('')
  }

  return (
    <div className={`container mx-auto px-gutter ${styles.pageContainer} max-w-6xl`}>
      <div className={styles.header}>
        <button
          onClick={() => navigate('/matches')}
          className={styles.backButton}
        >
          ← Back to matches
        </button>
        <div className={styles.headerContent}>
          <span className={styles.gameIcon}>{game?.icon}</span>
          <div className={styles.headerText}>
            <h1>{match.gameName} — {match.mode}</h1>
            <p>{match.matchType} match</p>
          </div>
        </div>
      </div>

      <div className={styles.contentGrid}>
        <div className={styles.mainContent}>
          <div className={`${styles.panel} ${styles.stagger1}`}>
            <div className={styles.statusHeader}>
              <h2 className={styles.panelTitle}>Match status</h2>
              <span className={`${styles.statusBadge} ${
                match.status === 'active' ? styles.statusActive : styles.statusWaiting
              }`}>
                {match.status === 'active' ? 'In progress' : 'Waiting for players'}
              </span>
            </div>
            <div className={styles.statsGrid}>
              <div className={styles.stat}>
                <p className={styles.statLabel}>Token wager</p>
                <p className={styles.statValue}>🪙 {match.tokenWager.toLocaleString()}</p>
              </div>
              <div className={styles.stat}>
                <p className={styles.statLabel}>Players</p>
                <p className={styles.statValue}>{match.players.length}/{match.maxPlayers}</p>
              </div>
            </div>
            {canJoin && (
              <button onClick={handleJoin} className={styles.joinButton}>
                Join match ({slotsAvailable} slot{slotsAvailable > 1 ? 's' : ''} available)
              </button>
            )}
          </div>

          <div className={`${styles.panel} ${styles.stagger2}`}>
            <h2 className={styles.panelTitle}>Players</h2>
            <div className={styles.playersList}>
              {match.players.map((player, idx) => (
                <div key={idx} className={styles.playerCard}>
                  <div className={styles.playerInfo}>
                    <span className={styles.playerAvatar}>{player.avatar}</span>
                    <div className={styles.playerDetails}>
                      <h4>{player.username}</h4>
                      <p>{player.region}</p>
                    </div>
                  </div>
                  {match.status === 'active' && (
                    <span className={styles.playerStatus}>● Active</span>
                  )}
                </div>
              ))}
              {Array.from({ length: slotsAvailable }).map((_, idx) => (
                <div key={`empty-${idx}`} className={styles.emptySlot}>
                  <p className={styles.emptySlotText}>Empty slot</p>
                </div>
              ))}
            </div>
          </div>

          <div className={`${styles.panel} ${styles.stagger3}`}>
            <h2 className={styles.panelTitle}>Match rules</h2>
            <div className={styles.rulesContent}>
              <p className={styles.rulesText}>
                {match.rules || match.customRules || 'No custom rules specified'}
              </p>
            </div>
          </div>

          {match.status === 'active' && match.players.find(p => p.username === user?.username) && (
            <div className={styles.panel}>
              <h2 className={styles.panelTitle}>Submit result</h2>
              <p className={styles.description}>
                Report the match outcome. Tokens will be redistributed to the winner.
              </p>
              <button onClick={handleSubmitResult} className={styles.submitButton}>
                Submit match result
              </button>
            </div>
          )}
        </div>

        <div className={styles.sidebar}>
          <div className={`${styles.panel} ${styles.stagger1}`}>
            <h2 className={styles.panelTitle}>Voice channel</h2>
            {!isInVoice ? (
              <button onClick={() => setIsInVoice(true)} className={styles.voiceButton}>
                Join voice channel
              </button>
            ) : (
              <div>
                <div className={styles.playersList}>
                  {match.players.map((player, idx) => (
                    <div key={idx} className={styles.playerCard}>
                      <div className={styles.playerInfo}>
                        <span className={styles.playerAvatar}>{player.avatar}</span>
                        <span>{player.username}</span>
                      </div>
                      <span className={styles.playerStatus}>● Speaking</span>
                    </div>
                  ))}
                </div>
                <div className={styles.voiceControls}>
                  <button onClick={() => setIsInVoice(false)} className={styles.leaveButton}>
                    Leave VC
                  </button>
                  <button className={styles.muteButton}>🔇 Mute</button>
                </div>
              </div>
            )}
          </div>

          <div className={`${styles.panel} ${styles.chatContainer} ${styles.stagger2}`}>
            <h2 className={styles.panelTitle}>Match chat</h2>
            <div className={styles.chatMessages}>
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={styles.chatMessage}>
                  <span className={styles.chatUser}>{msg.user}:</span>{' '}
                  <span className={styles.chatText}>{msg.message}</span>
                </div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className={styles.chatForm}>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className={styles.chatInput}
              />
              <button type="submit" className={styles.chatSendButton}>
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
