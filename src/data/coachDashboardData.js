import professionals from './professionals'

const coachRecord = professionals.find(person => person.id === 'sofia-andersen')

export const initialCoachProfile = {
  ...coachRecord,
  location: 'Copenhagen, Denmark',
  currentClub: 'Copenhagen Athletic',
  specialization: 'Player development & possession football',
  bio: 'A progressive coach focused on thoughtful player development, inclusive training environments and helping teams express themselves with confidence.',
  qualifications: ['UEFA A Licence', 'UEFA Elite Youth A Licence', 'MSc Sport Psychology'],
  expertise: ['Player development', 'Possession-based football', 'Team culture', 'Individual coaching'],
  achievements: ['Nordic Youth Development Award (2024)', 'Regional Academy Coach of the Season (2022)'],
  careerHistory: [
    { club: 'Copenhagen Athletic', team: 'First Team', position: 'Assistant Coach', period: '2022 – Present', highlight: 'Supports the senior coaching team with match preparation and player development.' },
    { club: 'Aarhus Performance Centre', team: 'U19 Academy', position: 'Academy Head Coach', period: '2016 – 2022', highlight: 'Led the U19 programme and helped establish individual development plans.' },
    { club: 'Odense Youth Football', team: 'U16 Academy', position: 'Youth Coach', period: '2012 – 2016', highlight: 'Built age-appropriate technical and decision-making sessions.' },
  ],
  image: coachRecord.image,
}

export const coachOpportunities = [
  {
    id: 'northbridge-academy-coach',
    clubId: 'northbridge-fc',
    title: 'Academy Head Coach',
    team: 'U18 Development Squad',
    country: 'England',
    location: 'Northbridge',
    level: 'Academy',
    deadline: '18 December 2026',
    requirements: 'UEFA A Licence or equivalent, experience leading an academy age group, and a player-centred coaching approach.',
    description: 'Lead the U18 coaching programme and support the transition from academy football into the senior development squad.',
  },
  {
    id: 'atletico-first-team-assistant',
    clubId: 'atletico-aurora',
    title: 'First-Team Assistant Coach',
    team: 'Senior Squad',
    country: 'Spain',
    location: 'Valencia',
    level: 'First team',
    deadline: '05 January 2027',
    requirements: 'UEFA A Licence, strong training-ground communication, and experience preparing opposition and match plans.',
    description: 'Work with the head coach on weekly training design, match preparation and individual player development.',
  },
  {
    id: 'union-youth-development-coach',
    clubId: 'union-sporting',
    title: 'Youth Development Coach',
    team: 'U16 Academy',
    country: 'Germany',
    location: 'Hamburg',
    level: 'Youth',
    deadline: '12 January 2027',
    requirements: 'A recognised coaching qualification, safeguarding awareness, and experience working with adolescent players.',
    description: 'Deliver structured technical and tactical sessions within a supportive academy environment.',
  },
  {
    id: 'lagos-community-coach',
    clubId: 'lagos-city-fc',
    title: 'Community Football Coach',
    team: 'Community Programme',
    country: 'Nigeria',
    location: 'Lagos',
    level: 'Community',
    deadline: '20 January 2027',
    requirements: 'Grassroots coaching experience, clear communication skills and a commitment to inclusive football.',
    description: 'Help deliver accessible weekly sessions for local players and support a positive community football programme.',
  },
]

export const initialCoachApplications = [
  { opportunityId: 'union-youth-development-coach', status: 'Under review', submittedAt: '18 November 2026' },
]

export const initialCoachSavedOpportunityIds = ['northbridge-academy-coach']
export const initialCoachConnectedClubIds = ['northbridge-fc', 'atletico-aurora']
export const initialCoachClubRequestIds = ['union-sporting']
export const initialCoachConnectedProfessionalIds = ['amara-okafor', 'daniel-mbeki', 'noah-van-dijk', 'elena-kovacs']
export const initialCoachConnectionRequestIds = ['lucas-moretti', 'james-adebayo']

export const initialCoachNotifications = [
  { id: 'coach-notification-application', title: 'Application update', detail: 'Your sample application to Union Sporting is under review.', time: 'Today', read: false },
  { id: 'coach-notification-connection', title: 'New connection request', detail: 'Lucas Moretti would like to connect with you.', time: 'Yesterday', read: false },
  { id: 'coach-notification-opportunity', title: 'New coaching opportunity', detail: 'Northbridge FC has posted an academy coaching vacancy.', time: '2 days ago', read: true },
]

export const initialCoachActivity = [
  { id: 'coach-activity-view', title: 'Your profile was viewed', detail: 'A club representative viewed your coaching profile.', time: 'Today', type: 'profile' },
  { id: 'coach-activity-application', title: 'Application moved to review', detail: 'Youth Development Coach · Union Sporting', time: 'Yesterday', type: 'application' },
  { id: 'coach-activity-network', title: 'Professional connection added', detail: 'Amara Okafor · Football Scout', time: '2 days ago', type: 'network' },
]

export const initialCoachMessages = [
  { id: 'coach-message-amara', professionalId: 'amara-okafor', text: 'I enjoyed your academy development notes. Let’s keep in touch.', time: 'Today, 10:24', unread: true },
  { id: 'coach-message-noah', professionalId: 'noah-van-dijk', text: 'The youth coaching workshop details are in the community feed.', time: 'Yesterday', unread: false },
]

export const coachLevels = [...new Set(coachOpportunities.map(opportunity => opportunity.level))].sort()
