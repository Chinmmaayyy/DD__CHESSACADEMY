import type { Coach } from '@/types'

export const coach: Coach = {
  name: 'Dipak Dhuri',
  designation: ['National Arbiter', 'FIDE Trainer'],
  fideId: '25061305',
  ratings: [
    { label: 'Standard', value: 1716, icon: '🏆' },
    { label: 'Rapid', value: 1703, icon: '⏱️' },
    { label: 'Blitz', value: 1701, icon: '⚡' },
  ],
  experienceYears: 20,
  bio: 'With a legacy dating back to 1978, Coach Dipak Dhuri brings decades of strategic expertise to the chessboard. As an officially licensed National Arbiter, he combines competitive prowess with a deep understanding of international chess regulations.',
  philosophy:
    'At DD Chess Academy, we believe chess is more than a game — it is a tool for developing critical life skills. Our mission is to nurture strategic minds, build character through competition, and foster a lifelong love for the royal game.',
  federation: 'India',
  federationCode: 'IN',
  birthYear: 1978,
  gender: 'Male',
  licenseType: 'National Arbiter',
  licenseActive: true,
  licensedSince: '2018-03-13',
  languages: ['Hindi', 'Marathi', 'English'],
}
