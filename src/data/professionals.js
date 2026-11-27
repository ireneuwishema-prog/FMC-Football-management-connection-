export const professionalCategories = [
  { role: 'Football Scout', title: 'Football Scouts', description: 'Spot emerging talent and build a sharper global scouting network.', icon: 'Binoculars' },
  { role: 'Football Agent', title: 'Football Agents', description: 'Meet trusted representatives and create new opportunities for players.', icon: 'Handshake' },
  { role: 'Football Coach', title: 'Football Coaches', description: 'Connect with people committed to developing players and teams.', icon: 'GraduationCap' },
  { role: 'Football Manager', title: 'Football Managers', description: 'Share leadership experience and discover your next connection.', icon: 'Trophy' },
  { role: 'Sporting Director', title: 'Sporting Directors', description: 'Build relationships across recruitment, operations and club strategy.', icon: 'Building2' },
  { role: 'Football Analyst', title: 'Football Analysts', description: 'Bring data, insight and fresh perspectives to the beautiful game.', icon: 'ChartNoAxesCombined' },
]

const professionals = [
  {
    id: 'amara-okafor', name: 'Amara Okafor', role: 'Football Scout', country: 'Nigeria', experience: 11,
    organization: 'Lagos Athletic Group', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85',
    bio: 'A relationship-first scout focused on identifying technically gifted young players and helping them find the right development environment.',
    verified: true, careerHistory: [
      { organization: 'Lagos Athletic Group', role: 'Head of Scouting', period: '2021 – Present' },
      { organization: 'Coastal Talent Network', role: 'Regional Scout', period: '2015 – 2021' },
      { organization: 'Riverside Academy', role: 'Youth Development Coordinator', period: '2012 – 2015' },
    ],
    qualifications: ['FA Talent Identification Level 2', 'CAF C Coaching Licence', 'BSc Sport Management'],
    expertise: ['Youth recruitment', 'West African talent', 'Player development'],
  },
  {
    id: 'lucas-moretti', name: 'Lucas Moretti', role: 'Football Agent', country: 'Italy', experience: 9,
    organization: 'Northstar Player Group', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=85',
    bio: 'A player representative who takes a long-term approach to career planning, contract support and building strong club relationships.',
    verified: true, careerHistory: [
      { organization: 'Northstar Player Group', role: 'Senior Football Agent', period: '2019 – Present' },
      { organization: 'Moretti Sports Advisory', role: 'Player Relations Consultant', period: '2016 – 2019' },
    ],
    qualifications: ['FIFA Football Agent Licence', 'UEFA Certificate in Football Management'],
    expertise: ['Career planning', 'Contract negotiation', 'European football'],
  },
  {
    id: 'sofia-andersen', name: 'Sofia Andersen', role: 'Football Coach', country: 'Denmark', experience: 14,
    organization: 'Copenhagen Athletic', image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=900&q=85',
    bio: 'A progressive coach passionate about creating inclusive training environments and helping players express themselves on the pitch.',
    verified: true, careerHistory: [
      { organization: 'Copenhagen Athletic', role: 'First-Team Assistant Coach', period: '2022 – Present' },
      { organization: 'Aarhus Performance Centre', role: 'Academy Head Coach', period: '2016 – 2022' },
    ],
    qualifications: ['UEFA A Licence', 'UEFA Elite Youth A Licence', 'MSc Sport Psychology'],
    expertise: ['Player development', 'Possession-based football', 'Team culture'],
  },
  {
    id: 'daniel-mbeki', name: 'Daniel Mbeki', role: 'Football Manager', country: 'South Africa', experience: 18,
    organization: 'Cape Peninsula FC', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=85',
    bio: 'An experienced team leader who builds resilient squads through clear communication, thoughtful preparation and a strong club culture.',
    verified: false, careerHistory: [
      { organization: 'Cape Peninsula FC', role: 'First-Team Manager', period: '2023 – Present' },
      { organization: 'Highveld United', role: 'Head Coach', period: '2017 – 2023' },
      { organization: 'Durban Sporting', role: 'Assistant Manager', period: '2011 – 2017' },
    ],
    qualifications: ['CAF A Coaching Licence', 'Advanced Diploma in Sports Leadership'],
    expertise: ['Squad leadership', 'Match preparation', 'Talent development'],
  },
  {
    id: 'elena-kovacs', name: 'Elena Kovács', role: 'Sporting Director', country: 'Hungary', experience: 16,
    organization: 'Danube City FC', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=85',
    bio: 'A club executive bringing together recruitment, academy pathways and football operations around a shared sporting vision.',
    verified: true, careerHistory: [
      { organization: 'Danube City FC', role: 'Sporting Director', period: '2020 – Present' },
      { organization: 'Central European Football Group', role: 'Recruitment Director', period: '2014 – 2020' },
    ],
    qualifications: ['UEFA Certificate in Football Management', 'MBA, International Sport Business'],
    expertise: ['Club strategy', 'Recruitment systems', 'Academy pathways'],
  },
  {
    id: 'james-adebayo', name: 'James Adebayo', role: 'Football Analyst', country: 'England', experience: 7,
    organization: 'Bristol Harbour FC', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=85',
    bio: 'A performance analyst translating match data into clear, practical insights that support coaches and players.',
    verified: false, careerHistory: [
      { organization: 'Bristol Harbour FC', role: 'First-Team Performance Analyst', period: '2022 – Present' },
      { organization: 'West Country Academy', role: 'Academy Analyst', period: '2019 – 2022' },
    ],
    qualifications: ['FA Level 2 Talent Identification', 'MSc Performance Analysis'],
    expertise: ['Opposition analysis', 'Video analysis', 'Set-piece insights'],
  },
  {
    id: 'gabriel-silva', name: 'Gabriel Silva', role: 'Football Scout', country: 'Brazil', experience: 6,
    organization: 'Aurora Futebol', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=900&q=85',
    bio: 'A regional scout who combines in-person observation with a deep knowledge of Brazil’s youth and development competitions.',
    verified: true, careerHistory: [
      { organization: 'Aurora Futebol', role: 'Regional Scout', period: '2021 – Present' },
      { organization: 'São Paulo Development Network', role: 'Academy Scout', period: '2018 – 2021' },
    ],
    qualifications: ['CBF Scouting & Analysis Certificate', 'Sports Science Diploma'],
    expertise: ['Brazilian youth football', 'Live scouting', 'Technical evaluation'],
  },
  {
    id: 'noah-van-dijk', name: 'Noah van Dijk', role: 'Football Coach', country: 'Netherlands', experience: 12,
    organization: 'Rotterdam United Academy', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=85',
    bio: 'An academy coach helping young players develop game intelligence, confidence and a modern understanding of the game.',
    verified: true, careerHistory: [
      { organization: 'Rotterdam United Academy', role: 'U21 Head Coach', period: '2020 – Present' },
      { organization: 'Eindhoven Football School', role: 'Youth Coach', period: '2014 – 2020' },
    ],
    qualifications: ['UEFA A Licence', 'KNVB Youth Development Diploma'],
    expertise: ['Academy football', 'Tactical development', 'Individual coaching'],
  },
  {
    id: 'marie-dupont', name: 'Marie Dupont', role: 'Football Agent', country: 'France', experience: 13,
    organization: 'Élan Football Partners', image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=85',
    bio: 'A trusted advisor focused on helping players make informed career decisions and build sustainable professional futures.',
    verified: true, careerHistory: [
      { organization: 'Élan Football Partners', role: 'Licensed Football Agent', period: '2018 – Present' },
      { organization: 'Paris Sport Conseil', role: 'Player Liaison', period: '2013 – 2018' },
    ],
    qualifications: ['FIFA Football Agent Licence', 'Master’s in Sports Law'],
    expertise: ['Player representation', 'Sports law', 'Career transitions'],
  },
]

export const sampleInboundRequests = ['sofia-andersen', 'james-adebayo']

export default professionals
