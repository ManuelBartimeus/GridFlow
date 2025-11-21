// Sample user data with organizational hierarchy
export const users = [
  // Executive View - CEO
  {
    username: 'james.osei',
    password: 'passw0rd',
    name: 'James Osei',
    staffNumber: 'GF-001',
    contact: '+233 244 123 456',
    plc: 'HQ',
    jobTitle: 'Chief Executive Officer',
    department: 'Executive Office',
    section: null,
    unit: null,
    supervisor: null,
    view: 'executive'
  },

  // Middle Management View - Directors
  {
    username: 'sarah.mensah',
    password: 'passw0rd',
    name: 'Sarah Mensah',
    staffNumber: 'GF-101',
    contact: '+233 244 234 567',
    plc: 'HQ',
    jobTitle: 'Director',
    department: 'Engineering',
    section: null,
    unit: null,
    supervisor: 'James Osei',
    view: 'middle-management'
  },
  {
    username: 'kwame.asante',
    password: 'passw0rd',
    name: 'Kwame Asante',
    staffNumber: 'GF-102',
    contact: '+233 244 345 678',
    plc: 'HQ',
    jobTitle: 'Director',
    department: 'GRIDTel',
    section: null,
    unit: null,
    supervisor: 'James Osei',
    view: 'middle-management'
  },
  {
    username: 'akosua.boateng',
    password: 'passw0rd',
    name: 'Akosua Boateng',
    staffNumber: 'GF-103',
    contact: '+233 244 456 789',
    plc: 'HQ',
    jobTitle: 'Director',
    department: 'Operations',
    section: null,
    unit: null,
    supervisor: 'James Osei',
    view: 'middle-management'
  },

  // Middle Management View - Managers
  {
    username: 'kofi.owusu',
    password: 'passw0rd',
    name: 'Kofi Owusu',
    staffNumber: 'GF-201',
    contact: '+233 244 567 890',
    plc: 'HQ',
    jobTitle: 'Manager',
    department: 'Engineering',
    section: 'Mechanical',
    unit: null,
    supervisor: 'Sarah Mensah',
    view: 'middle-management'
  },
  {
    username: 'ama.darko',
    password: 'passw0rd',
    name: 'Ama Darko',
    staffNumber: 'GF-202',
    contact: '+233 244 678 901',
    plc: 'HQ',
    jobTitle: 'Manager',
    department: 'Engineering',
    section: 'Electrical',
    unit: null,
    supervisor: 'Sarah Mensah',
    view: 'middle-management'
  },
  {
    username: 'yaw.agyemang',
    password: 'passw0rd',
    name: 'Yaw Agyemang',
    staffNumber: 'GF-203',
    contact: '+233 244 789 012',
    plc: 'HQ',
    jobTitle: 'Manager',
    department: 'GRIDTel',
    section: 'MIS',
    unit: null,
    supervisor: 'Kwame Asante',
    view: 'middle-management'
  },
  {
    username: 'efua.adjei',
    password: 'passw0rd',
    name: 'Efua Adjei',
    staffNumber: 'GF-204',
    contact: '+233 244 890 123',
    plc: 'HQ',
    jobTitle: 'Manager',
    department: 'Operations',
    section: 'Infrastructure',
    unit: null,
    supervisor: 'Akosua Boateng',
    view: 'middle-management'
  },

  // Middle Management View - Supervisors
  {
    username: 'kwabena.sarpong',
    password: 'passw0rd',
    name: 'Kwabena Sarpong',
    staffNumber: 'GF-301',
    contact: '+233 244 901 234',
    plc: 'Kumasi',
    jobTitle: 'Supervisor',
    department: 'Engineering',
    section: 'Mechanical',
    unit: 'Automotive',
    supervisor: 'Kofi Owusu',
    view: 'middle-management'
  },
  {
    username: 'abena.frimpong',
    password: 'passw0rd',
    name: 'Abena Frimpong',
    staffNumber: 'GF-302',
    contact: '+233 244 012 345',
    plc: 'Accra',
    jobTitle: 'Supervisor',
    department: 'Engineering',
    section: 'Mechanical',
    unit: 'HVAC',
    supervisor: 'Kofi Owusu',
    view: 'middle-management'
  },
  {
    username: 'kojo.afriyie',
    password: 'passw0rd',
    name: 'Kojo Afriyie',
    staffNumber: 'GF-303',
    contact: '+233 244 123 456',
    plc: 'Takoradi',
    jobTitle: 'Supervisor',
    department: 'Engineering',
    section: 'Electrical',
    unit: 'Power Systems',
    supervisor: 'Ama Darko',
    view: 'middle-management'
  },
  {
    username: 'adjoa.mensah',
    password: 'passw0rd',
    name: 'Adjoa Mensah',
    staffNumber: 'GF-304',
    contact: '+233 244 234 567',
    plc: 'Accra',
    jobTitle: 'Supervisor',
    department: 'GRIDTel',
    section: 'MIS',
    unit: 'Business Applications',
    supervisor: 'Yaw Agyemang',
    view: 'middle-management'
  },
  {
    username: 'kwasi.appiah',
    password: 'passw0rd',
    name: 'Kwasi Appiah',
    staffNumber: 'GF-305',
    contact: '+233 244 345 678',
    plc: 'Kumasi',
    jobTitle: 'Supervisor',
    department: 'Operations',
    section: 'Infrastructure',
    unit: 'Energy',
    supervisor: 'Efua Adjei',
    view: 'middle-management'
  },

  // Unit Personnel View
  {
    username: 'akua.ofori',
    password: 'passw0rd',
    name: 'Akua Ofori',
    staffNumber: 'GF-401',
    contact: '+233 244 456 789',
    plc: 'Kumasi',
    jobTitle: 'Unit Personnel',
    department: 'Engineering',
    section: 'Mechanical',
    unit: 'Automotive',
    supervisor: 'Kwabena Sarpong',
    view: 'unit-personnel'
  },
  {
    username: 'kwame.manu',
    password: 'passw0rd',
    name: 'Kwame Manu',
    staffNumber: 'GF-402',
    contact: '+233 244 567 890',
    plc: 'Kumasi',
    jobTitle: 'Unit Personnel',
    department: 'Engineering',
    section: 'Mechanical',
    unit: 'Automotive',
    supervisor: 'Kwabena Sarpong',
    view: 'unit-personnel'
  },
  {
    username: 'esi.tetteh',
    password: 'passw0rd',
    name: 'Esi Tetteh',
    staffNumber: 'GF-403',
    contact: '+233 244 678 901',
    plc: 'Accra',
    jobTitle: 'Unit Personnel',
    department: 'Engineering',
    section: 'Mechanical',
    unit: 'HVAC',
    supervisor: 'Abena Frimpong',
    view: 'unit-personnel'
  },
  {
    username: 'kofi.quarshie',
    password: 'passw0rd',
    name: 'Kofi Quarshie',
    staffNumber: 'GF-404',
    contact: '+233 244 789 012',
    plc: 'Takoradi',
    jobTitle: 'Unit Personnel',
    department: 'Engineering',
    section: 'Electrical',
    unit: 'Power Systems',
    supervisor: 'Kojo Afriyie',
    view: 'unit-personnel'
  },
  {
    username: 'ama.asare',
    password: 'passw0rd',
    name: 'Ama Asare',
    staffNumber: 'GF-405',
    contact: '+233 244 890 123',
    plc: 'Takoradi',
    jobTitle: 'Unit Personnel',
    department: 'Engineering',
    section: 'Electrical',
    unit: 'Power Systems',
    supervisor: 'Kojo Afriyie',
    view: 'unit-personnel'
  },
  {
    username: 'yaw.coleman',
    password: 'passw0rd',
    name: 'Yaw Coleman',
    staffNumber: 'GF-406',
    contact: '+233 244 901 234',
    plc: 'Accra',
    jobTitle: 'Unit Personnel',
    department: 'GRIDTel',
    section: 'MIS',
    unit: 'Business Applications',
    supervisor: 'Adjoa Mensah',
    view: 'unit-personnel'
  },
  {
    username: 'abena.nkrumah',
    password: 'passw0rd',
    name: 'Abena Nkrumah',
    staffNumber: 'GF-407',
    contact: '+233 244 012 345',
    plc: 'Kumasi',
    jobTitle: 'Unit Personnel',
    department: 'Operations',
    section: 'Infrastructure',
    unit: 'Energy',
    supervisor: 'Kwasi Appiah',
    view: 'unit-personnel'
  },
  {
    username: 'kojo.hammond',
    password: 'passw0rd',
    name: 'Kojo Hammond',
    staffNumber: 'GF-408',
    contact: '+233 244 123 456',
    plc: 'Kumasi',
    jobTitle: 'Unit Personnel',
    department: 'Operations',
    section: 'Infrastructure',
    unit: 'Energy',
    supervisor: 'Kwasi Appiah',
    view: 'unit-personnel'
  }
]

export const authenticateUser = (username, password) => {
  const user = users.find(u => u.username === username && u.password === password)
  return user || null
}

export const getUserByUsername = (username) => {
  return users.find(u => u.username === username) || null
}
