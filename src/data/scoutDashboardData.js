import clubProfiles from './clubProfiles'
import playerProfiles from './playerProfiles'
import professionals from './professionals'

const scoutRecord = professionals.find(person => person.id === 'amara-okafor')

export const initialScoutProfile = {
  ...scoutRecord,
  location: 'Lagos, Nigeria',
  specialization: 'Youth talent identification',
}

export const initialScoutShortlist = [
  { playerId: 'leo-carvalho', note: 'Track his next two academy fixtures.', list: 'Priority targets' },
  { playerId: 'elias-mensah', note: 'Review recent defensive clips.', list: 'Watch list' },
  { playerId: 'haruto-sato', note: '', list: 'Priority targets' },
]

const samplePlayers = Object.fromEntries(playerProfiles.map(player => [player.id, player]))

export const initialScoutReports = [
  {
    id: 'scout-report-leo-carvalho',
    playerId: 'leo-carvalho',
    playerName: samplePlayers['leo-carvalho'].name,
    position: samplePlayers['leo-carvalho'].position,
    age: samplePlayers['leo-carvalho'].age,
    currentClub: samplePlayers['leo-carvalho'].club,
    observedOn: '2026-11-22',
    competition: 'U19 Regional Development League',
    strengths: 'Receives well under pressure, scans early and progresses play with crisp forward passing.',
    areasForImprovement: 'Can add more defensive urgency after possession changes and improve his weaker-foot range.',
    recommendation: 'Recommend',
    notes: 'Good composure in a high-tempo match. Revisit after the winter fixtures.',
    ratings: { technical: 4, tactical: 4, physical: 3, decisionMaking: 4, positionSkill: 4 },
  },
  {
    id: 'scout-report-elias-mensah',
    playerId: 'elias-mensah',
    playerName: samplePlayers['elias-mensah'].name,
    position: samplePlayers['elias-mensah'].position,
    age: samplePlayers['elias-mensah'].age,
    currentClub: samplePlayers['elias-mensah'].club,
    observedOn: '2026-11-18',
    competition: 'Greater Accra Senior League',
    strengths: 'Strong recovery pace, stays engaged in one-versus-one duels and times overlapping runs well.',
    areasForImprovement: 'Final delivery can be more consistent when crossing at speed.',
    recommendation: 'Monitor',
    notes: 'Reliable defensive performance. Watch another match against a direct wide attacker.',
    ratings: { technical: 3, tactical: 4, physical: 5, decisionMaking: 3, positionSkill: 4 },
  },
  {
    id: 'scout-report-mateo-navarro',
    playerId: 'mateo-navarro',
    playerName: samplePlayers['mateo-navarro'].name,
    position: samplePlayers['mateo-navarro'].position,
    age: samplePlayers['mateo-navarro'].age,
    currentClub: samplePlayers['mateo-navarro'].club,
    observedOn: '2026-11-14',
    competition: 'Valencia U21 Showcase',
    strengths: 'Sets well, communicates clearly and shows confidence receiving back-passes.',
    areasForImprovement: 'Needs more consistency on high claims in traffic.',
    recommendation: 'Strongly recommend',
    notes: 'Promising foundation for his age group. Share the report with a goalkeeper coach for a second opinion.',
    ratings: { technical: 4, tactical: 4, physical: 4, decisionMaking: 4, positionSkill: 5 },
  },
]

export const initialScoutAssignments = [
  { id: 'assignment-northbridge-forward', clubId: 'northbridge-fc', title: 'Review emerging forwards', position: 'Forward', location: 'England', deadline: '12 December 2026', status: 'Active' },
  { id: 'assignment-atletico-midfield', clubId: 'atletico-aurora', title: 'Identify U21 midfield talent', position: 'Central Midfielder', location: 'Spain', deadline: '18 December 2026', status: 'Active' },
  { id: 'assignment-union-keepers', clubId: 'union-sporting', title: 'Watch goalkeeper prospects', position: 'Goalkeeper', location: 'Germany', deadline: '05 January 2027', status: 'Upcoming' },
]

export const initialScoutConnectedClubIds = ['northbridge-fc', 'atletico-aurora']
export const initialScoutConnectionRequests = ['union-sporting']
export const initialScoutDiscoveredPlayerIds = ['leo-carvalho', 'elias-mensah', 'mateo-navarro', 'haruto-sato']

export const initialScoutNotifications = [
  { id: 'assignment-update', title: 'New scouting assignment', detail: 'Northbridge FC has added a forward review to your sample workspace.', time: '30 minutes ago', read: false },
  { id: 'club-request', title: 'Club connection request', detail: 'Union Sporting would like to connect.', time: '3 hours ago', read: false },
  { id: 'report-reminder', title: 'Report follow-up', detail: 'Add a second observation to your Leo Carvalho report.', time: 'Yesterday', read: false },
  { id: 'player-view', title: 'New player profile added', detail: 'A new fictional profile is available in the player directory.', time: '2 days ago', read: true },
]

export const initialScoutActivity = [
  { id: 'scout-activity-discovery', type: 'discover', title: 'Player added to your discovery list', detail: 'Haruto Sato · Attacking Midfielder', time: 'Today' },
  { id: 'scout-activity-report', type: 'report', title: 'Scouting report completed', detail: 'Mateo Navarro · Valencia U21 Showcase', time: 'Yesterday' },
  { id: 'scout-activity-shortlist', type: 'shortlist', title: 'Shortlist note updated', detail: 'Elias Mensah · Watch list', time: 'Yesterday' },
  { id: 'scout-activity-connection', type: 'network', title: 'Club connection accepted', detail: `${clubProfiles.find(club => club.id === 'atletico-aurora').name} · Spain`, time: '2 days ago' },
]
