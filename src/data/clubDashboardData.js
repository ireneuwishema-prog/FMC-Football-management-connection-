import clubProfiles from './clubProfiles'
import opportunityData from './opportunityData'

const dashboardClub = clubProfiles.find(club => club.id === 'northbridge-fc')

const opportunityDetails = {
  'northbridge-forward-trial': {
    ageRange: '18–24',
    applicationDeadline: '30 June 2027',
  },
  'northbridge-midfield-scouting': {
    ageRange: '17–22',
    applicationDeadline: '15 July 2027',
  },
}

export const initialClubOpportunities = opportunityData
  .filter(opportunity => opportunity.clubId === dashboardClub.id)
  .map(opportunity => ({
    ...opportunity,
    ...opportunityDetails[opportunity.id],
    location: 'Northbridge, England',
    competition: dashboardClub.league,
    status: 'Active',
  }))

export const initialClubApplications = [
  { id: 'application-marcus-forward', playerId: 'marcus-adeyemi', opportunityId: 'northbridge-forward-trial', appliedAt: '24 November 2026', status: 'New' },
  { id: 'application-theo-forward', playerId: 'theo-martin', opportunityId: 'northbridge-forward-trial', appliedAt: '22 November 2026', status: 'Under review' },
  { id: 'application-ines-forward', playerId: 'ines-ferreira', opportunityId: 'northbridge-forward-trial', appliedAt: '20 November 2026', status: 'Shortlisted' },
  { id: 'application-leo-midfield', playerId: 'leo-carvalho', opportunityId: 'northbridge-midfield-scouting', appliedAt: '25 November 2026', status: 'New' },
  { id: 'application-haruto-midfield', playerId: 'haruto-sato', opportunityId: 'northbridge-midfield-scouting', appliedAt: '21 November 2026', status: 'Under review' },
  { id: 'application-amani-midfield', playerId: 'amani-otieno', opportunityId: 'northbridge-midfield-scouting', appliedAt: '18 November 2026', status: 'Rejected' },
]

export const initialClubShortlistIds = ['elias-mensah', 'youssef-amrani', 'mateo-navarro']
export const initialClubProfessionalIds = ['amara-okafor', 'lucas-moretti', 'sofia-andersen']
export const initialClubConnectionRequests = ['elena-kovacs', 'daniel-mbeki']

export const initialClubNotifications = [
  { id: 'application-update', title: 'A new player application arrived', detail: 'Marcus Adeyemi applied for the forward trial.', time: '20 minutes ago', read: false },
  { id: 'connection-request', title: 'Professional connection request', detail: 'Elena Kovács would like to connect with Northbridge FC.', time: '2 hours ago', read: false },
  { id: 'opportunity-reminder', title: 'Recruitment deadline reminder', detail: 'Your forward trial closes on 30 June 2027.', time: 'Yesterday', read: false },
  { id: 'profile-view', title: 'Your club profile is getting noticed', detail: '18 new sample profile views this week.', time: '2 days ago', read: true },
]

export const clubDashboardActivity = [
  { id: 'activity-application', type: 'application', title: 'New forward application received', detail: 'Marcus Adeyemi · First-team forward trial', time: '20 minutes ago' },
  { id: 'activity-network', type: 'network', title: 'A professional wants to connect', detail: 'Elena Kovács · Sporting Director', time: '2 hours ago' },
  { id: 'activity-shortlist', type: 'shortlist', title: 'Player added to shortlist', detail: 'Elias Mensah · Right Back', time: 'Yesterday' },
  { id: 'activity-profile', type: 'profile', title: 'Club profile viewed 18 times', detail: 'A sample activity update', time: '2 days ago' },
]
