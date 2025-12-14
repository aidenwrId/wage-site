export const games = [
  {
    id: 'fortnite',
    name: 'Fortnite',
    icon: '🎮',
    modes: ['1v1', 'Box Fights', 'Zone Wars', 'Duos']
  },
  {
    id: 'cod',
    name: 'Call of Duty',
    icon: '🔫',
    modes: ['Multiplayer', 'Warzone']
  },
  {
    id: 'valorant',
    name: 'Valorant',
    icon: '💎',
    modes: ['Ranked', 'Custom']
  },
  {
    id: 'cs2',
    name: 'Counter-Strike 2',
    icon: '⚡',
    modes: ['5v5', 'Wingman']
  },
  {
    id: 'rocket-league',
    name: 'Rocket League',
    icon: '🚗',
    modes: ['1v1', '2v2', '3v3']
  },
  {
    id: 'r6',
    name: 'Rainbow Six Siege',
    icon: '🛡️',
    modes: ['Ranked', 'Custom']
  },
  {
    id: 'apex',
    name: 'Apex Legends',
    icon: '🏹',
    modes: ['Duos', 'Trios']
  },
  {
    id: 'lol',
    name: 'League of Legends',
    icon: '⚔️',
    modes: ['Ranked', 'Custom']
  },
  {
    id: 'overwatch',
    name: 'Overwatch 2',
    icon: '🎯',
    modes: ['Competitive', 'Custom']
  },
  {
    id: 'smash',
    name: 'Smash Bros',
    icon: '👊',
    modes: ['1v1']
  }
]

export const matchTypes = ['1v1', '2v2', 'Squads']

export const regions = ['NA East', 'NA West', 'EU', 'Asia', 'OCE']

export const mockMatches = [
  {
    id: '1',
    game: 'valorant',
    gameName: 'Valorant',
    mode: 'Ranked',
    matchType: '1v1',
    tokenWager: 500,
    creator: {
      username: 'ProGamer99',
      avatar: '👤',
      region: 'NA East'
    },
    players: [
      { username: 'ProGamer99', avatar: '👤', region: 'NA East' }
    ],
    maxPlayers: 2,
    status: 'waiting',
    rules: 'Best of 3, First to 13 rounds',
    createdAt: new Date(Date.now() - 1000 * 60 * 15)
  },
  {
    id: '2',
    game: 'fortnite',
    gameName: 'Fortnite',
    mode: 'Box Fights',
    matchType: '1v1',
    tokenWager: 1000,
    creator: {
      username: 'BuildMaster',
      avatar: '🏗️',
      region: 'EU'
    },
    players: [
      { username: 'BuildMaster', avatar: '🏗️', region: 'EU' }
    ],
    maxPlayers: 2,
    status: 'waiting',
    rules: 'First to 3 wins',
    createdAt: new Date(Date.now() - 1000 * 60 * 5)
  },
  {
    id: '3',
    game: 'cs2',
    gameName: 'Counter-Strike 2',
    mode: '5v5',
    matchType: 'Squads',
    tokenWager: 2500,
    creator: {
      username: 'TeamLeader',
      avatar: '🎖️',
      region: 'NA West'
    },
    players: [
      { username: 'TeamLeader', avatar: '🎖️', region: 'NA West' },
      { username: 'Player2', avatar: '👤', region: 'NA West' },
      { username: 'Player3', avatar: '👤', region: 'NA West' }
    ],
    maxPlayers: 10,
    status: 'waiting',
    rules: 'MR12, Best of 1',
    createdAt: new Date(Date.now() - 1000 * 60 * 30)
  },
  {
    id: '4',
    game: 'rocket-league',
    gameName: 'Rocket League',
    mode: '2v2',
    matchType: '2v2',
    tokenWager: 750,
    creator: {
      username: 'AerialKing',
      avatar: '🚁',
      region: 'NA East'
    },
    players: [
      { username: 'AerialKing', avatar: '🚁', region: 'NA East' },
      { username: 'Teammate1', avatar: '👤', region: 'NA East' }
    ],
    maxPlayers: 4,
    status: 'active',
    rules: 'Best of 5',
    createdAt: new Date(Date.now() - 1000 * 60 * 60)
  },
  {
    id: '5',
    game: 'apex',
    gameName: 'Apex Legends',
    mode: 'Trios',
    matchType: 'Squads',
    tokenWager: 1500,
    creator: {
      username: 'Champion',
      avatar: '🏆',
      region: 'EU'
    },
    players: [
      { username: 'Champion', avatar: '🏆', region: 'EU' },
      { username: 'SquadMate1', avatar: '👤', region: 'EU' },
      { username: 'SquadMate2', avatar: '👤', region: 'EU' }
    ],
    maxPlayers: 6,
    status: 'waiting',
    rules: 'First to 20 kills',
    createdAt: new Date(Date.now() - 1000 * 60 * 45)
  }
]

export const storeItems = [
  {
    id: '1',
    name: 'Elite Banner',
    type: 'banner',
    price: 500,
    image: '🎴',
    description: 'Show off your competitive spirit'
  },
  {
    id: '2',
    name: 'Animated Border',
    type: 'border',
    price: 1000,
    image: '✨',
    description: 'Glowing animated profile border'
  },
  {
    id: '3',
    name: 'Champion Nameplate',
    type: 'nameplate',
    price: 750,
    image: '💫',
    description: 'Premium nameplate effect'
  },
  {
    id: '4',
    name: 'Pro Title',
    type: 'title',
    price: 300,
    image: '🏅',
    description: 'Elite competitor title'
  }
]

export const tokenPackages = [
  {
    id: '1',
    tokens: 500,
    price: 4.99,
    bonus: 0
  },
  {
    id: '2',
    tokens: 1000,
    price: 9.99,
    bonus: 0
  },
  {
    id: '3',
    tokens: 2500,
    price: 19.99,
    bonus: 250
  }
]

