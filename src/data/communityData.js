export const currentCommunityUser = {
  id: 'current-user',
  name: 'Jordan Ellis',
  handle: '@jordan.ellis',
  type: 'Football fan',
  country: 'England',
  image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=85',
}

export const communityAccounts = [
  {
    id: 'amara-okafor', name: 'Amara Okafor', handle: '@amara.scouts', type: 'Football scout',
    country: 'Nigeria', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=180&q=85', verified: true,
    bio: 'Finding tomorrow’s talent, one match at a time.',
  },
  {
    id: 'sofia-andersen', name: 'Sofia Andersen', handle: '@coachsofia', type: 'Football coach',
    country: 'Denmark', image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=180&q=85', verified: true,
    bio: 'Developing confident players and brave teams.',
  },
  {
    id: 'leo-carvalho', name: 'Leo Carvalho', handle: '@leocarvalho', type: 'Player',
    country: 'Brazil', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=180&q=85', verified: false,
    bio: 'Midfielder. Always learning, always playing.',
  },
  {
    id: 'lucas-moretti', name: 'Lucas Moretti', handle: '@lucasmoretti', type: 'Football agent',
    country: 'Italy', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=180&q=85', verified: true,
    bio: 'Building thoughtful, long-term player careers.',
  },
  {
    id: 'daniel-mbeki', name: 'Daniel Mbeki', handle: '@danielmbeki', type: 'Football manager',
    country: 'South Africa', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=180&q=85', verified: false,
    bio: 'Team-first leadership. People before tactics.',
  },
  {
    id: 'james-adebayo', name: 'James Adebayo', handle: '@jamesonfilm', type: 'Football analyst',
    country: 'England', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=180&q=85', verified: true,
    bio: 'Making the details of the game easier to see.',
  },
  {
    id: 'northbridge-fc', name: 'Northbridge FC', handle: '@northbridgefc', type: 'Football club',
    country: 'England', image: 'https://images.unsplash.com/photo-1508098682722-e99c643e7f0b?auto=format&fit=crop&w=180&q=85', verified: true,
    bio: 'Together for the game. Northbridge, always.',
  },
]

export const communityClubs = [
  { id: 'northbridge-fc', name: 'Northbridge FC', location: 'England · Premier Development', initials: 'NB', color: '#155b43', followers: '18.4k' },
  { id: 'lagos-city', name: 'Lagos City FC', location: 'Nigeria · National League', initials: 'LC', color: '#bc8e25', followers: '12.8k' },
  { id: 'atletico-porto', name: 'Atlético Porto', location: 'Brazil · Série A', initials: 'AP', color: '#8a2d3e', followers: '9.6k' },
]

export const communityTopics = [
  { id: 'next-gen', label: 'NextGenTalent', posts: '2.4k posts' },
  { id: 'matchday', label: 'Matchday', posts: '1.8k posts' },
  { id: 'womens-game', label: 'WomensGame', posts: '960 posts' },
  { id: 'grassroots', label: 'GrassrootsFootball', posts: '742 posts' },
]

export const communityCategories = ['Matchday', 'Scouting', 'Coaching', 'Club life', 'Fan discussion']

export const samplePostImages = [
  {
    src: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1200&q=85',
    alt: 'Floodlit football pitch before a match',
  },
  {
    src: 'https://images.unsplash.com/photo-1508098682722-e99c643e7f0b?auto=format&fit=crop&w=1200&q=85',
    alt: 'Football players competing on the pitch',
  },
  {
    src: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=85',
    alt: 'Football match in a full stadium',
  },
]

export const communityPosts = [
  {
    id: 'amara-next-gen', authorId: 'amara-okafor', time: '18 min ago', category: 'Scouting',
    content: 'Spent the weekend at the U19 invitational in Accra. The energy, technical quality and confidence on show were special. There is so much talent waiting for the right pathway. Who are you keeping an eye on this season?',
    image: samplePostImages[1], topics: ['next-gen', 'grassroots'], likes: 128, liked: false,
    comments: [
      { id: 'amara-comment-1', author: 'Sofia Andersen', text: 'The pathway conversation matters just as much as the first look. Great work.', time: '12 min ago' },
      { id: 'amara-comment-2', author: 'Leo Carvalho', text: 'Would love to see more of these tournaments get international attention.', time: '8 min ago' },
    ],
  },
  {
    id: 'northbridge-matchday', authorId: 'northbridge-fc', time: '42 min ago', category: 'Matchday',
    content: 'A late equaliser, a brilliant away end and a point earned the hard way. Days like this remind us why we love the game. Thank you to everyone who made the trip. 💚',
    image: samplePostImages[0], topics: ['matchday'], likes: 342, liked: false,
    comments: [
      { id: 'northbridge-comment-1', author: 'Jordan Ellis', text: 'What a finish. The travelling support was incredible!', time: '30 min ago' },
    ],
  },
  {
    id: 'sofia-training', authorId: 'sofia-andersen', time: '1 hr ago', category: 'Coaching',
    content: 'A small coaching thought: give players a problem to solve, then give them room to solve it. Today’s session was full of brave decisions because the players owned the challenge. What’s one principle you keep coming back to?',
    image: null, topics: ['grassroots'], likes: 86, liked: true,
    comments: [],
  },
  {
    id: 'daniel-womens-game', authorId: 'daniel-mbeki', time: '2 hrs ago', category: 'Club life',
    content: 'Proud to see our women’s programme welcome another group of young players this week. Growing the game means making sure every player can see a place for themselves in it.',
    image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Women’s football team training together', topics: ['womens-game', 'grassroots'], likes: 204, liked: false,
    comments: [
      { id: 'daniel-comment-1', author: 'Amara Okafor', text: 'A brilliant commitment to the next generation. Keep going!', time: '1 hr ago' },
    ],
  },
  {
    id: 'lucas-careers', authorId: 'lucas-moretti', time: '3 hrs ago', category: 'Fan discussion',
    content: 'The best career moves are not always the biggest moves. The right people, a clear role and room to grow can change everything. What makes a club feel like the right fit to you?',
    image: null, topics: ['matchday'], likes: 57, liked: false,
    comments: [],
  },
  {
    id: 'james-analysis', authorId: 'james-adebayo', time: '5 hrs ago', category: 'Scouting',
    content: 'A quick reminder from the analysis room: context matters. A number is a starting point for a better question, not the whole answer. What’s one metric you wish people interpreted more carefully?',
    image: null, topics: ['next-gen'], likes: 73, liked: false,
    comments: [],
  },
  {
    id: 'leo-home-game', authorId: 'leo-carvalho', time: 'Yesterday', category: 'Matchday',
    content: 'Nothing beats walking out at home and hearing the whole stand behind you. Grateful for the support and ready for the next one. Vamos! ⚽',
    image: null, topics: ['matchday'], likes: 96, liked: false,
    comments: [],
  },
]

export const followedAccountIds = ['amara-okafor', 'sofia-andersen']
export const followedClubIds = ['northbridge-fc']
