import opportunityData from './opportunityData'
import playerProfiles from './playerProfiles'
import professionals from './professionals'

const agentRecord = professionals.find(person => person.id === 'lucas-moretti')
const playersById = Object.fromEntries(playerProfiles.map(player => [player.id, player]))

export const initialAgentProfile = {
  ...agentRecord,
  agencyName: agentRecord.organization,
  location: 'Milan, Italy',
  specializations: ['Career planning', 'Contract negotiation', 'European football'],
}

export const initialAgentRepresentations = [
  {
    id: 'agent-player-leo',
    playerId: 'leo-carvalho',
    careerStatus: 'Developing at current club',
    representationStatus: 'Career planning',
    list: 'Development pathway',
    notes: 'Review development goals before the next season.',
  },
  {
    id: 'agent-player-marcus',
    playerId: 'marcus-adeyemi',
    careerStatus: 'Exploring next steps',
    representationStatus: 'Exploratory discussion',
    list: 'Senior prospects',
    notes: 'Discuss preferred playing environment and timeline.',
  },
  {
    id: 'agent-player-elias',
    playerId: 'elias-mensah',
    careerStatus: 'Open to new opportunities',
    representationStatus: 'Career planning',
    list: 'Senior prospects',
    notes: '',
  },
]

export const initialAgentPlayerLists = ['Senior prospects', 'Development pathway']
export const agentCareerOpportunities = opportunityData

export const initialAgentPlayerRequests = [
  {
    id: 'agent-player-request-haruto',
    playerId: 'haruto-sato',
    message: 'Interested in exploring a development pathway and career-planning conversation.',
    receivedAt: 'Today',
  },
  {
    id: 'agent-player-request-youssef',
    playerId: 'youssef-amrani',
    message: 'Would like to discuss potential opportunities for the next season.',
    receivedAt: 'Yesterday',
  },
]

export const initialAgentApplications = [
  {
    id: 'agent-inquiry-leo-midfield',
    playerId: 'leo-carvalho',
    opportunityId: 'northbridge-midfield-scouting',
    status: 'Inquiry sent',
    updatedAt: '25 November 2026',
  },
  {
    id: 'agent-inquiry-marcus-forward',
    playerId: 'marcus-adeyemi',
    opportunityId: 'northbridge-forward-trial',
    status: 'Under review',
    updatedAt: '23 November 2026',
  },
]

export const initialAgentConnectedProfessionalIds = ['amara-okafor', 'sofia-andersen', 'elena-kovacs']
export const initialAgentConnectionRequestIds = ['daniel-mbeki', 'james-adebayo']
export const initialAgentConnectedClubIds = ['northbridge-fc', 'atletico-aurora']
export const initialAgentClubRequestIds = ['union-sporting']

export const initialAgentConversations = [
  {
    id: 'agent-chat-elena',
    professionalId: 'elena-kovacs',
    unread: 2,
    updatedAt: '9:42 AM',
    messages: [
      { id: 'elena-message-1', sender: 'them', text: 'We are reviewing midfield profiles for the next intake.', time: '9:31 AM' },
      { id: 'elena-message-2', sender: 'you', text: 'I can share a sample profile through the opportunity inquiry flow.', time: '9:42 AM' },
    ],
  },
  {
    id: 'agent-chat-amara',
    professionalId: 'amara-okafor',
    unread: 0,
    updatedAt: 'Yesterday',
    messages: [
      { id: 'amara-message-1', sender: 'them', text: 'Good to connect. Let’s keep each other updated on emerging talent.', time: 'Yesterday' },
    ],
  },
  {
    id: 'agent-chat-sofia',
    professionalId: 'sofia-andersen',
    unread: 1,
    updatedAt: 'Monday',
    messages: [
      { id: 'sofia-message-1', sender: 'them', text: 'I have a few development notes that may help with career planning.', time: 'Monday' },
    ],
  },
]

export const initialAgentNotifications = [
  { id: 'agent-new-inquiry', title: 'New player inquiry', detail: 'Haruto Sato requested a sample career-planning conversation.', time: '35 minutes ago', read: false },
  { id: 'agent-opportunity', title: 'Opportunity deadline approaching', detail: 'Northbridge FC’s forward trial closes on 30 June 2027.', time: '3 hours ago', read: false },
  { id: 'agent-connection', title: 'Professional connection request', detail: 'Daniel Mbeki would like to connect.', time: 'Yesterday', read: false },
  { id: 'agent-application-update', title: 'Opportunity status updated', detail: 'The midfielder inquiry is marked under review.', time: '2 days ago', read: true },
]

export const initialAgentActivity = [
  { id: 'agent-activity-inquiry', type: 'inquiry', title: 'Player opportunity inquiry updated', detail: `${playersById['leo-carvalho'].name} · ${agentCareerOpportunities.find(item => item.id === 'northbridge-midfield-scouting').title}`, time: 'Today' },
  { id: 'agent-activity-player', type: 'player', title: 'Player added to your workspace', detail: `${playersById['elias-mensah'].name} · Career planning`, time: 'Yesterday' },
  { id: 'agent-activity-network', type: 'network', title: 'New professional connection', detail: 'Sofia Andersen · Football Coach', time: '2 days ago' },
  { id: 'agent-activity-opportunity', type: 'opportunity', title: 'New opportunity available', detail: 'Atlético Aurora · U23 full-back assessment', time: '3 days ago' },
]

