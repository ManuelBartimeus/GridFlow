// Ticket data linked to projects
export const tickets = [
  {
    ticketId: 'TICK-001',
    ticketName: 'Budget increase request for materials',
    category: 'Budget Change',
    additionalInformation: 'Material costs increased by 15% due to supply chain disruptions. Requesting GH¢850,000 budget increase to cover procurement shortfall.',
    projectId: 'PROJ-001',
    dateCreated: '2024-06-15',
    status: 'Approved',
    requestedBy: 'GF-412',
    approvedBy: 'GF-205'
  },
  {
    ticketId: 'TICK-002',
    ticketName: 'Timeline extension due to permit delays',
    category: 'Timeline Change',
    additionalInformation: 'Local authority permit approval delayed by 6 weeks. Requesting project timeline extension to accommodate regulatory delays.',
    projectId: 'PROJ-001',
    dateCreated: '2024-03-20',
    status: 'Approved',
    requestedBy: 'GF-411',
    approvedBy: 'GF-205'
  },
  {
    ticketId: 'TICK-003',
    ticketName: 'Additional security requirements',
    category: 'Other',
    additionalInformation: 'Site security assessment recommends 24/7 security personnel during construction phase. Additional security measures required.',
    projectId: 'PROJ-001',
    dateCreated: '2024-05-10',
    status: 'Approved',
    requestedBy: 'GF-306',
    approvedBy: 'GF-205'
  },
  {
    ticketId: 'TICK-004',
    ticketName: 'Hardware upgrade budget adjustment',
    category: 'Budget Change',
    additionalInformation: 'Selected SCADA hardware requires GH¢320,000 additional budget for enhanced redundancy features. Critical for system reliability.',
    projectId: 'PROJ-002',
    dateCreated: '2024-05-20',
    status: 'Approved',
    requestedBy: 'GF-430',
    approvedBy: 'GF-211'
  },
  {
    ticketId: 'TICK-005',
    ticketName: 'Data migration timeline adjustment',
    category: 'Timeline Change',
    additionalInformation: 'Historical data migration more complex than anticipated. Requesting 8-week extension for data validation and quality assurance.',
    projectId: 'PROJ-002',
    dateCreated: '2024-09-25',
    status: 'Under Review',
    requestedBy: 'GF-431',
    approvedBy: null
  },
  {
    ticketId: 'TICK-006',
    ticketName: 'Additional cybersecurity tools',
    category: 'Budget Change',
    additionalInformation: 'Enhanced threat detection systems required. Requesting GH¢180,000 for advanced monitoring and intrusion prevention tools.',
    projectId: 'PROJ-002',
    dateCreated: '2024-10-15',
    status: 'Approved',
    requestedBy: 'GF-324',
    approvedBy: 'GF-211'
  },
  {
    ticketId: 'TICK-007',
    ticketName: 'Equipment delivery delay adjustment',
    category: 'Timeline Change',
    additionalInformation: 'Transformer delivery delayed by manufacturer. Requesting 4-week timeline adjustment to accommodate revised delivery schedule.',
    projectId: 'PROJ-003',
    dateCreated: '2024-08-05',
    status: 'Approved',
    requestedBy: 'GF-334',
    approvedBy: 'GF-214'
  },
  {
    ticketId: 'TICK-008',
    ticketName: 'Foundation reinforcement costs',
    category: 'Budget Change',
    additionalInformation: 'Soil testing revealed need for enhanced foundation. Additional GH¢245,000 required for reinforcement materials and labor.',
    projectId: 'PROJ-003',
    dateCreated: '2024-07-20',
    status: 'Approved',
    requestedBy: 'GF-439',
    approvedBy: 'GF-214'
  },
  {
    ticketId: 'TICK-009',
    ticketName: 'Additional training requirements',
    category: 'Other',
    additionalInformation: 'Operations team requires extended training on new control systems. Additional training sessions and materials needed.',
    projectId: 'PROJ-003',
    dateCreated: '2024-11-10',
    status: 'Approved',
    requestedBy: 'GF-214',
    approvedBy: 'GF-214'
  },
  {
    ticketId: 'TICK-010',
    ticketName: 'Penetration testing budget increase',
    category: 'Budget Change',
    additionalInformation: 'Comprehensive penetration testing requires specialized consultants. Additional GH¢95,000 needed for security validation.',
    projectId: 'PROJ-004',
    dateCreated: '2024-08-15',
    status: 'Approved',
    requestedBy: 'GF-353',
    approvedBy: 'GF-203'
  },
  {
    ticketId: 'TICK-011',
    ticketName: 'Compliance documentation extension',
    category: 'Timeline Change',
    additionalInformation: 'Security compliance documentation requires additional review cycles. Requesting 3-week extension for thorough compliance validation.',
    projectId: 'PROJ-004',
    dateCreated: '2024-10-20',
    status: 'Approved',
    requestedBy: 'GF-354',
    approvedBy: 'GF-203'
  },
  {
    ticketId: 'TICK-012',
    ticketName: 'Advanced drone equipment upgrade',
    category: 'Budget Change',
    additionalInformation: 'Enhanced thermal imaging drones recommended for better vegetation analysis. Additional GH¢125,000 for upgraded equipment.',
    projectId: 'PROJ-005',
    dateCreated: '2024-07-10',
    status: 'Approved',
    requestedBy: 'GF-307',
    approvedBy: 'GF-205'
  },
  {
    ticketId: 'TICK-013',
    ticketName: 'AI platform integration delay',
    category: 'Timeline Change',
    additionalInformation: 'AI platform integration taking longer than planned. Requesting 5-week extension for proper testing and optimization.',
    projectId: 'PROJ-005',
    dateCreated: '2024-10-25',
    status: 'Under Review',
    requestedBy: 'GF-411',
    approvedBy: null
  },
  {
    ticketId: 'TICK-014',
    ticketName: 'Weather station installation',
    category: 'Other',
    additionalInformation: 'Recommendation to install weather monitoring stations along transmission route for better operational data.',
    projectId: 'PROJ-006',
    dateCreated: '2024-08-20',
    status: 'Approved',
    requestedBy: 'GF-318',
    approvedBy: 'GF-208'
  },
  {
    ticketId: 'TICK-015',
    ticketName: 'Right-of-way acquisition costs',
    category: 'Budget Change',
    additionalInformation: 'Land acquisition costs higher than estimated. Additional GH¢420,000 needed for right-of-way compensation.',
    projectId: 'PROJ-006',
    dateCreated: '2024-09-15',
    status: 'Approved',
    requestedBy: 'GF-419',
    approvedBy: 'GF-208'
  },
  {
    ticketId: 'TICK-016',
    ticketName: 'Environmental mitigation measures',
    category: 'Budget Change',
    additionalInformation: 'Additional environmental protection measures required. Requesting GH¢85,000 for enhanced wildlife protection systems.',
    projectId: 'PROJ-007',
    dateCreated: '2024-06-10',
    status: 'Approved',
    requestedBy: 'GF-328',
    approvedBy: 'GF-217'
  },
  {
    ticketId: 'TICK-017',
    ticketName: 'Relay coordination study extension',
    category: 'Timeline Change',
    additionalInformation: 'Protection coordination analysis requires additional iterations. Requesting 4-week extension for comprehensive study.',
    projectId: 'PROJ-007',
    dateCreated: '2024-07-25',
    status: 'Approved',
    requestedBy: 'GF-217',
    approvedBy: 'GF-217'
  },
  {
    ticketId: 'TICK-018',
    ticketName: 'Backup generator installation',
    category: 'Other',
    additionalInformation: 'Recommendation to add backup generator at critical substation for enhanced reliability during maintenance.',
    projectId: 'PROJ-008',
    dateCreated: '2024-10-05',
    status: 'Under Review',
    requestedBy: 'GF-337',
    approvedBy: null
  },
  {
    ticketId: 'TICK-019',
    ticketName: 'Cable procurement cost increase',
    category: 'Budget Change',
    additionalInformation: 'Copper prices increased significantly. Additional GH¢310,000 needed for underground cable procurement.',
    projectId: 'PROJ-008',
    dateCreated: '2024-09-20',
    status: 'Approved',
    requestedBy: 'GF-336',
    approvedBy: 'GF-219'
  },
  {
    ticketId: 'TICK-020',
    ticketName: 'Meter installation timeline adjustment',
    category: 'Timeline Change',
    additionalInformation: 'Smart meter deployment behind schedule due to supply issues. Requesting 6-week extension for complete installation.',
    projectId: 'PROJ-009',
    dateCreated: '2024-11-10',
    status: 'Approved',
    requestedBy: 'GF-341',
    approvedBy: 'GF-220'
  },
  {
    ticketId: 'TICK-021',
    ticketName: 'Communication infrastructure upgrade',
    category: 'Budget Change',
    additionalInformation: 'Enhanced communication network needed for meter data transmission. Additional GH¢150,000 for infrastructure upgrade.',
    projectId: 'PROJ-009',
    dateCreated: '2024-10-15',
    status: 'Approved',
    requestedBy: 'GF-342',
    approvedBy: 'GF-220'
  },
  {
    ticketId: 'TICK-022',
    ticketName: 'Thermal imaging equipment',
    category: 'Other',
    additionalInformation: 'Request for thermal imaging cameras for regular equipment inspections. Enhancement to preventive maintenance program.',
    projectId: 'PROJ-010',
    dateCreated: '2024-08-25',
    status: 'Approved',
    requestedBy: 'GF-318',
    approvedBy: 'GF-208'
  },
  {
    ticketId: 'TICK-023',
    ticketName: 'Contractor mobilization delay',
    category: 'Timeline Change',
    additionalInformation: 'Contractor experiencing mobilization delays. Requesting 3-week timeline adjustment for equipment and personnel deployment.',
    projectId: 'PROJ-011',
    dateCreated: '2024-09-15',
    status: 'Approved',
    requestedBy: 'GF-227',
    approvedBy: 'GF-209'
  },
  {
    ticketId: 'TICK-024',
    ticketName: 'Solar panel procurement cost change',
    category: 'Budget Change',
    additionalInformation: 'Solar panel technology upgrade recommended. Additional GH¢275,000 for higher efficiency panels with better performance.',
    projectId: 'PROJ-011',
    dateCreated: '2024-10-05',
    status: 'Approved',
    requestedBy: 'GF-228',
    approvedBy: 'GF-209'
  },
  {
    ticketId: 'TICK-025',
    ticketName: 'Grid interconnection study costs',
    category: 'Budget Change',
    additionalInformation: 'Comprehensive grid impact study required by regulations. Additional GH¢65,000 for third-party analysis.',
    projectId: 'PROJ-011',
    dateCreated: '2024-07-20',
    status: 'Approved',
    requestedBy: 'GF-226',
    approvedBy: 'GF-209'
  },
  {
    ticketId: 'TICK-026',
    ticketName: 'Battery storage system upgrade',
    category: 'Budget Change',
    additionalInformation: 'Enhanced battery capacity recommended for better energy management. Additional GH¢390,000 for upgraded storage system.',
    projectId: 'PROJ-012',
    dateCreated: '2024-09-10',
    status: 'Under Review',
    requestedBy: 'GF-228',
    approvedBy: null
  },
  {
    ticketId: 'TICK-027',
    ticketName: 'Testing protocol extension',
    category: 'Timeline Change',
    additionalInformation: 'Comprehensive testing protocols require additional time. Requesting 5-week extension for thorough performance validation.',
    projectId: 'PROJ-012',
    dateCreated: '2024-10-20',
    status: 'Approved',
    requestedBy: 'GF-227',
    approvedBy: 'GF-209'
  },
  {
    ticketId: 'TICK-028',
    ticketName: 'Voltage regulator replacement',
    category: 'Other',
    additionalInformation: 'Existing voltage regulators showing degradation. Recommendation to replace units during scheduled maintenance.',
    projectId: 'PROJ-013',
    dateCreated: '2024-08-15',
    status: 'Approved',
    requestedBy: 'GF-235',
    approvedBy: 'GF-213'
  },
  {
    ticketId: 'TICK-029',
    ticketName: 'Capacitor bank installation costs',
    category: 'Budget Change',
    additionalInformation: 'Additional capacitor banks needed for reactive power compensation. GH¢185,000 required for equipment and installation.',
    projectId: 'PROJ-013',
    dateCreated: '2024-09-05',
    status: 'Approved',
    requestedBy: 'GF-236',
    approvedBy: 'GF-213'
  },
  {
    ticketId: 'TICK-030',
    ticketName: 'Conductor replacement scope change',
    category: 'Other',
    additionalInformation: 'Inspection reveals more conductor sections need replacement than originally assessed. Scope expansion required.',
    projectId: 'PROJ-014',
    dateCreated: '2024-07-25',
    status: 'Approved',
    requestedBy: 'GF-318',
    approvedBy: 'GF-208'
  },
  {
    ticketId: 'TICK-031',
    ticketName: 'Weather-related timeline adjustment',
    category: 'Timeline Change',
    additionalInformation: 'Adverse weather conditions impacted construction schedule. Requesting 4-week extension to compensate for weather delays.',
    projectId: 'PROJ-014',
    dateCreated: '2024-09-20',
    status: 'Approved',
    requestedBy: 'GF-319',
    approvedBy: 'GF-208'
  },
  {
    ticketId: 'TICK-032',
    ticketName: 'Advanced monitoring system',
    category: 'Budget Change',
    additionalInformation: 'Real-time line monitoring system recommended for enhanced reliability. Additional GH¢220,000 for monitoring equipment.',
    projectId: 'PROJ-015',
    dateCreated: '2024-10-10',
    status: 'Under Review',
    requestedBy: 'GF-318',
    approvedBy: null
  },
  {
    ticketId: 'TICK-033',
    ticketName: 'Substation expansion land acquisition',
    category: 'Budget Change',
    additionalInformation: 'Additional land needed for substation expansion. GH¢155,000 required for property acquisition and site preparation.',
    projectId: 'PROJ-016',
    dateCreated: '2024-08-30',
    status: 'Approved',
    requestedBy: 'GF-237',
    approvedBy: 'GF-213'
  },
  {
    ticketId: 'TICK-034',
    ticketName: 'Equipment testing delay',
    category: 'Timeline Change',
    additionalInformation: 'Factory acceptance testing taking longer than planned. Requesting 3-week timeline adjustment for equipment delivery.',
    projectId: 'PROJ-016',
    dateCreated: '2024-09-25',
    status: 'Approved',
    requestedBy: 'GF-236',
    approvedBy: 'GF-213'
  },
  {
    ticketId: 'TICK-035',
    ticketName: 'Fiber optic network extension',
    category: 'Other',
    additionalInformation: 'Recommendation to extend fiber optic network to new substations for improved communication reliability.',
    projectId: 'PROJ-017',
    dateCreated: '2024-11-05',
    status: 'Approved',
    requestedBy: 'GF-342',
    approvedBy: 'GF-220'
  },
  {
    ticketId: 'TICK-036',
    ticketName: 'Server infrastructure upgrade',
    category: 'Budget Change',
    additionalInformation: 'Enhanced server capacity needed for data processing. Additional GH¢195,000 for server and storage upgrades.',
    projectId: 'PROJ-017',
    dateCreated: '2024-10-20',
    status: 'Approved',
    requestedBy: 'GF-341',
    approvedBy: 'GF-220'
  },
  {
    ticketId: 'TICK-037',
    ticketName: 'Tower foundation stabilization',
    category: 'Budget Change',
    additionalInformation: 'Soil erosion concerns require foundation stabilization. Additional GH¢135,000 for remedial engineering works.',
    projectId: 'PROJ-018',
    dateCreated: '2024-08-05',
    status: 'Approved',
    requestedBy: 'GF-319',
    approvedBy: 'GF-208'
  },
  {
    ticketId: 'TICK-038',
    ticketName: 'Access road construction',
    category: 'Other',
    additionalInformation: 'Access roads needed for remote tower locations. Request for temporary road construction to facilitate maintenance.',
    projectId: 'PROJ-018',
    dateCreated: '2024-09-15',
    status: 'Approved',
    requestedBy: 'GF-318',
    approvedBy: 'GF-208'
  },
  {
    ticketId: 'TICK-039',
    ticketName: 'Training facility equipment',
    category: 'Budget Change',
    additionalInformation: 'Training center requires additional simulation equipment. GH¢145,000 needed for realistic training scenarios.',
    projectId: 'PROJ-019',
    dateCreated: '2024-10-15',
    status: 'Approved',
    requestedBy: 'GF-221',
    approvedBy: 'GF-221'
  },
  {
    ticketId: 'TICK-040',
    ticketName: 'Curriculum development extension',
    category: 'Timeline Change',
    additionalInformation: 'Comprehensive curriculum development requires more time. Requesting 6-week extension for quality training materials.',
    projectId: 'PROJ-019',
    dateCreated: '2024-09-20',
    status: 'Approved',
    requestedBy: 'GF-221',
    approvedBy: 'GF-221'
  },
  {
    ticketId: 'TICK-041',
    ticketName: 'Emergency response equipment',
    category: 'Budget Change',
    additionalInformation: 'Enhanced emergency response capabilities needed. Additional GH¢110,000 for specialized equipment and vehicles.',
    projectId: 'PROJ-020',
    dateCreated: '2024-11-01',
    status: 'Under Review',
    requestedBy: 'GF-244',
    approvedBy: null
  },
  {
    ticketId: 'TICK-042',
    ticketName: 'Communication system upgrade',
    category: 'Other',
    additionalInformation: 'Emergency communication systems require modernization for better coordination during incidents.',
    projectId: 'PROJ-020',
    dateCreated: '2024-10-10',
    status: 'Approved',
    requestedBy: 'GF-245',
    approvedBy: 'GF-222'
  },
  {
    ticketId: 'TICK-043',
    ticketName: 'Geotechnical investigation costs',
    category: 'Budget Change',
    additionalInformation: 'Additional soil testing required for foundation design. GH¢75,000 needed for comprehensive geotechnical study.',
    projectId: 'PROJ-021',
    dateCreated: '2024-07-15',
    status: 'Approved',
    requestedBy: 'GF-237',
    approvedBy: 'GF-213'
  },
  {
    ticketId: 'TICK-044',
    ticketName: 'Environmental compliance delay',
    category: 'Timeline Change',
    additionalInformation: 'Environmental compliance review taking longer than expected. Requesting 5-week extension for regulatory approvals.',
    projectId: 'PROJ-021',
    dateCreated: '2024-08-20',
    status: 'Approved',
    requestedBy: 'GF-236',
    approvedBy: 'GF-213'
  },
  {
    ticketId: 'TICK-045',
    ticketName: 'Switchgear capacity upgrade',
    category: 'Budget Change',
    additionalInformation: 'Higher capacity switchgear recommended for future load growth. Additional GH¢280,000 for upgraded equipment.',
    projectId: 'PROJ-022',
    dateCreated: '2024-09-10',
    status: 'Approved',
    requestedBy: 'GF-237',
    approvedBy: 'GF-213'
  },
  {
    ticketId: 'TICK-046',
    ticketName: 'Control building expansion',
    category: 'Other',
    additionalInformation: 'Control building size insufficient for planned equipment. Recommendation to expand building footprint.',
    projectId: 'PROJ-022',
    dateCreated: '2024-08-25',
    status: 'Approved',
    requestedBy: 'GF-236',
    approvedBy: 'GF-213'
  },
  {
    ticketId: 'TICK-047',
    ticketName: 'Data analytics platform costs',
    category: 'Budget Change',
    additionalInformation: 'Advanced analytics platform needed for better insights. Additional GH¢165,000 for software and implementation.',
    projectId: 'PROJ-023',
    dateCreated: '2024-10-25',
    status: 'Under Review',
    requestedBy: 'GF-341',
    approvedBy: null
  },
  {
    ticketId: 'TICK-048',
    ticketName: 'Integration testing extension',
    category: 'Timeline Change',
    additionalInformation: 'System integration more complex than anticipated. Requesting 4-week extension for thorough testing.',
    projectId: 'PROJ-023',
    dateCreated: '2024-11-05',
    status: 'Approved',
    requestedBy: 'GF-342',
    approvedBy: 'GF-220'
  },
  {
    ticketId: 'TICK-049',
    ticketName: 'Drone fleet expansion',
    category: 'Budget Change',
    additionalInformation: 'Additional drones needed for comprehensive coverage. GH¢185,000 for fleet expansion and spare parts.',
    projectId: 'PROJ-024',
    dateCreated: '2024-09-20',
    status: 'Approved',
    requestedBy: 'GF-318',
    approvedBy: 'GF-208'
  },
  {
    ticketId: 'TICK-050',
    ticketName: 'Pilot certification requirements',
    category: 'Other',
    additionalInformation: 'New aviation regulations require additional pilot certifications. Extended training program needed.',
    projectId: 'PROJ-024',
    dateCreated: '2024-10-05',
    status: 'Approved',
    requestedBy: 'GF-319',
    approvedBy: 'GF-208'
  },
  {
    ticketId: 'TICK-051',
    ticketName: 'Load balancing equipment costs',
    category: 'Budget Change',
    additionalInformation: 'Dynamic load balancing systems recommended. Additional GH¢205,000 for equipment and software.',
    projectId: 'PROJ-025',
    dateCreated: '2024-11-10',
    status: 'Under Review',
    requestedBy: 'GF-235',
    approvedBy: null
  },
  {
    ticketId: 'TICK-052',
    ticketName: 'System commissioning delay',
    category: 'Timeline Change',
    additionalInformation: 'Commissioning procedures require additional validation cycles. Requesting 3-week timeline extension.',
    projectId: 'PROJ-025',
    dateCreated: '2024-11-15',
    status: 'Under Review',
    requestedBy: 'GF-236',
    approvedBy: null
  },
  {
    ticketId: 'TICK-053',
    ticketName: 'Security fencing upgrade',
    category: 'Budget Change',
    additionalInformation: 'Enhanced perimeter security required. Additional GH¢95,000 for upgraded fencing and access control.',
    projectId: 'PROJ-026',
    dateCreated: '2024-08-15',
    status: 'Approved',
    requestedBy: 'GF-244',
    approvedBy: 'GF-222'
  },
  {
    ticketId: 'TICK-054',
    ticketName: 'CCTV system expansion',
    category: 'Other',
    additionalInformation: 'Additional surveillance cameras recommended for complete site coverage. Enhanced security monitoring.',
    projectId: 'PROJ-026',
    dateCreated: '2024-09-05',
    status: 'Approved',
    requestedBy: 'GF-245',
    approvedBy: 'GF-222'
  },
  {
    ticketId: 'TICK-055',
    ticketName: 'Warehouse facility costs',
    category: 'Budget Change',
    additionalInformation: 'Dedicated spare parts warehouse needed. GH¢175,000 for warehouse construction and inventory systems.',
    projectId: 'PROJ-027',
    dateCreated: '2024-10-20',
    status: 'Approved',
    requestedBy: 'GF-350',
    approvedBy: 'GF-215'
  },
  {
    ticketId: 'TICK-056',
    ticketName: 'Inventory management system',
    category: 'Other',
    additionalInformation: 'Automated inventory tracking system recommended for efficient spare parts management.',
    projectId: 'PROJ-027',
    dateCreated: '2024-11-01',
    status: 'Approved',
    requestedBy: 'GF-351',
    approvedBy: 'GF-215'
  },
  {
    ticketId: 'TICK-057',
    ticketName: 'Testing equipment procurement',
    category: 'Budget Change',
    additionalInformation: 'Specialized testing equipment needed for quality control. Additional GH¢125,000 for testing apparatus.',
    projectId: 'PROJ-028',
    dateCreated: '2024-09-15',
    status: 'Approved',
    requestedBy: 'GF-237',
    approvedBy: 'GF-213'
  },
  {
    ticketId: 'TICK-058',
    ticketName: 'Factory testing timeline',
    category: 'Timeline Change',
    additionalInformation: 'Extended factory acceptance testing required. Requesting 4-week timeline adjustment for comprehensive validation.',
    projectId: 'PROJ-028',
    dateCreated: '2024-10-10',
    status: 'Approved',
    requestedBy: 'GF-236',
    approvedBy: 'GF-213'
  },
  {
    ticketId: 'TICK-059',
    ticketName: 'Mobile substation procurement',
    category: 'Budget Change',
    additionalInformation: 'Mobile substation recommended for emergency response. GH¢850,000 for equipment and transport system.',
    projectId: 'PROJ-029',
    dateCreated: '2024-11-15',
    status: 'Under Review',
    requestedBy: 'GF-244',
    approvedBy: null
  },
  {
    ticketId: 'TICK-060',
    ticketName: 'Emergency power supplies',
    category: 'Other',
    additionalInformation: 'Portable generators needed for emergency operations. Essential equipment for disaster response.',
    projectId: 'PROJ-029',
    dateCreated: '2024-11-20',
    status: 'Under Review',
    requestedBy: 'GF-245',
    approvedBy: null
  },
  {
    ticketId: 'TICK-061',
    ticketName: 'Network simulation software',
    category: 'Budget Change',
    additionalInformation: 'Advanced simulation tools needed for planning. Additional GH¢115,000 for software licenses and training.',
    projectId: 'PROJ-030',
    dateCreated: '2024-10-15',
    status: 'Approved',
    requestedBy: 'GF-235',
    approvedBy: 'GF-213'
  },
  {
    ticketId: 'TICK-062',
    ticketName: 'Consultant expertise costs',
    category: 'Budget Change',
    additionalInformation: 'Specialized consultants needed for complex analysis. Additional GH¢85,000 for expert consulting services.',
    projectId: 'PROJ-030',
    dateCreated: '2024-10-25',
    status: 'Approved',
    requestedBy: 'GF-236',
    approvedBy: 'GF-213'
  },
  {
    ticketId: 'TICK-063',
    ticketName: 'Training simulator upgrade',
    category: 'Budget Change',
    additionalInformation: 'Enhanced training simulator for operator education. GH¢195,000 for advanced simulation capabilities.',
    projectId: 'PROJ-031',
    dateCreated: '2024-09-10',
    status: 'Approved',
    requestedBy: 'GF-221',
    approvedBy: 'GF-221'
  },
  {
    ticketId: 'TICK-064',
    ticketName: 'Certification program development',
    category: 'Timeline Change',
    additionalInformation: 'Comprehensive certification program requires extended development. Requesting 8-week timeline extension.',
    projectId: 'PROJ-031',
    dateCreated: '2024-10-05',
    status: 'Approved',
    requestedBy: 'GF-221',
    approvedBy: 'GF-221'
  },
  {
    ticketId: 'TICK-065',
    ticketName: 'Underground cable route change',
    category: 'Other',
    additionalInformation: 'Utility conflicts require cable route modification. Engineering redesign needed for alternative routing.',
    projectId: 'PROJ-032',
    dateCreated: '2024-08-20',
    status: 'Approved',
    requestedBy: 'GF-237',
    approvedBy: 'GF-213'
  },
  {
    ticketId: 'TICK-066',
    ticketName: 'Directional boring costs',
    category: 'Budget Change',
    additionalInformation: 'Directional boring required for river crossing. Additional GH¢225,000 for specialized drilling operations.',
    projectId: 'PROJ-032',
    dateCreated: '2024-09-10',
    status: 'Approved',
    requestedBy: 'GF-236',
    approvedBy: 'GF-213'
  },
  {
    ticketId: 'TICK-067',
    ticketName: 'Lightning protection system',
    category: 'Budget Change',
    additionalInformation: 'Enhanced lightning protection for critical equipment. Additional GH¢135,000 for comprehensive protection systems.',
    projectId: 'PROJ-033',
    dateCreated: '2024-10-20',
    status: 'Approved',
    requestedBy: 'GF-318',
    approvedBy: 'GF-208'
  },
  {
    ticketId: 'TICK-068',
    ticketName: 'Grounding system enhancement',
    category: 'Other',
    additionalInformation: 'Improved grounding grid recommended for better fault protection. Engineering review completed.',
    projectId: 'PROJ-033',
    dateCreated: '2024-11-05',
    status: 'Approved',
    requestedBy: 'GF-319',
    approvedBy: 'GF-208'
  },
  {
    ticketId: 'TICK-069',
    ticketName: 'Renewable forecasting tools',
    category: 'Budget Change',
    additionalInformation: 'Solar/wind forecasting software needed. GH¢105,000 for predictive analytics platform.',
    projectId: 'PROJ-034',
    dateCreated: '2024-09-25',
    status: 'Approved',
    requestedBy: 'GF-228',
    approvedBy: 'GF-209'
  },
  {
    ticketId: 'TICK-070',
    ticketName: 'Grid stability analysis delay',
    category: 'Timeline Change',
    additionalInformation: 'Complex stability studies require additional time. Requesting 5-week extension for thorough analysis.',
    projectId: 'PROJ-034',
    dateCreated: '2024-10-15',
    status: 'Approved',
    requestedBy: 'GF-227',
    approvedBy: 'GF-209'
  },
  {
    ticketId: 'TICK-071',
    ticketName: 'Substation automation hardware',
    category: 'Budget Change',
    additionalInformation: 'Advanced automation controllers recommended. Additional GH¢165,000 for intelligent electronic devices.',
    projectId: 'PROJ-035',
    dateCreated: '2024-11-01',
    status: 'Under Review',
    requestedBy: 'GF-237',
    approvedBy: null
  },
  {
    ticketId: 'TICK-072',
    ticketName: 'Protocol testing extension',
    category: 'Timeline Change',
    additionalInformation: 'Communication protocol testing more extensive than planned. Requesting 4-week timeline extension.',
    projectId: 'PROJ-035',
    dateCreated: '2024-11-10',
    status: 'Under Review',
    requestedBy: 'GF-236',
    approvedBy: null
  },
  {
    ticketId: 'TICK-073',
    ticketName: 'Asset tagging system costs',
    category: 'Budget Change',
    additionalInformation: 'RFID asset tracking system recommended. GH¢95,000 for tags, readers, and software platform.',
    projectId: 'PROJ-036',
    dateCreated: '2024-10-05',
    status: 'Approved',
    requestedBy: 'GF-350',
    approvedBy: 'GF-215'
  },
  {
    ticketId: 'TICK-074',
    ticketName: 'Mobile asset management tools',
    category: 'Other',
    additionalInformation: 'Field technicians need mobile devices for asset management. Tablets and software licenses required.',
    projectId: 'PROJ-036',
    dateCreated: '2024-10-20',
    status: 'Approved',
    requestedBy: 'GF-351',
    approvedBy: 'GF-215'
  },
  {
    ticketId: 'TICK-075',
    ticketName: 'Quality control lab equipment',
    category: 'Budget Change',
    additionalInformation: 'Dedicated QC laboratory needed. Additional GH¢145,000 for testing equipment and facility setup.',
    projectId: 'PROJ-037',
    dateCreated: '2024-09-15',
    status: 'Approved',
    requestedBy: 'GF-237',
    approvedBy: 'GF-213'
  },
  {
    ticketId: 'TICK-076',
    ticketName: 'Inspection protocol development',
    category: 'Timeline Change',
    additionalInformation: 'Comprehensive inspection procedures require extended development. Requesting 3-week timeline extension.',
    projectId: 'PROJ-037',
    dateCreated: '2024-10-10',
    status: 'Approved',
    requestedBy: 'GF-236',
    approvedBy: 'GF-213'
  },
  {
    ticketId: 'TICK-077',
    ticketName: 'Redundant communication paths',
    category: 'Budget Change',
    additionalInformation: 'Backup communication systems for reliability. Additional GH¢125,000 for redundant network infrastructure.',
    projectId: 'PROJ-038',
    dateCreated: '2024-11-05',
    status: 'Approved',
    requestedBy: 'GF-342',
    approvedBy: 'GF-220'
  },
  {
    ticketId: 'TICK-078',
    ticketName: 'Satellite communication backup',
    category: 'Other',
    additionalInformation: 'Satellite terminals recommended for remote locations. Ensures communication during emergencies.',
    projectId: 'PROJ-038',
    dateCreated: '2024-11-15',
    status: 'Under Review',
    requestedBy: 'GF-341',
    approvedBy: null
  },
  {
    ticketId: 'TICK-079',
    ticketName: 'Environmental monitoring system',
    category: 'Budget Change',
    additionalInformation: 'Continuous environmental monitoring needed. GH¢85,000 for sensors and data logging systems.',
    projectId: 'PROJ-039',
    dateCreated: '2024-10-15',
    status: 'Approved',
    requestedBy: 'GF-328',
    approvedBy: 'GF-217'
  },
  {
    ticketId: 'TICK-080',
    ticketName: 'Wildlife impact mitigation',
    category: 'Other',
    additionalInformation: 'Additional measures required to protect local wildlife. Enhanced environmental protection protocols.',
    projectId: 'PROJ-039',
    dateCreated: '2024-11-01',
    status: 'Approved',
    requestedBy: 'GF-327',
    approvedBy: 'GF-217'
  },
  {
    ticketId: 'TICK-081',
    ticketName: 'Transformer cooling system upgrade',
    category: 'Budget Change',
    additionalInformation: 'Enhanced cooling systems for better performance. Additional GH¢155,000 for cooling equipment upgrade.',
    projectId: 'PROJ-040',
    dateCreated: '2024-09-20',
    status: 'Approved',
    requestedBy: 'GF-237',
    approvedBy: 'GF-213'
  },
  {
    ticketId: 'TICK-082',
    ticketName: 'Oil filtration system costs',
    category: 'Budget Change',
    additionalInformation: 'Online oil filtration systems recommended. GH¢75,000 for continuous oil conditioning equipment.',
    projectId: 'PROJ-040',
    dateCreated: '2024-10-10',
    status: 'Approved',
    requestedBy: 'GF-236',
    approvedBy: 'GF-213'
  },
  {
    ticketId: 'TICK-083',
    ticketName: 'GIS system integration costs',
    category: 'Budget Change',
    additionalInformation: 'Integration with corporate GIS platform. Additional GH¢95,000 for data migration and system integration.',
    projectId: 'PROJ-041',
    dateCreated: '2024-11-10',
    status: 'Under Review',
    requestedBy: 'GF-350',
    approvedBy: null
  },
  {
    ticketId: 'TICK-084',
    ticketName: 'Aerial imagery procurement',
    category: 'Other',
    additionalInformation: 'High-resolution aerial imagery needed for network mapping. LiDAR data acquisition recommended.',
    projectId: 'PROJ-041',
    dateCreated: '2024-11-20',
    status: 'Under Review',
    requestedBy: 'GF-351',
    approvedBy: null
  },
  {
    ticketId: 'TICK-085',
    ticketName: 'Crew safety equipment upgrade',
    category: 'Budget Change',
    additionalInformation: 'Enhanced PPE and safety equipment needed. GH¢65,000 for upgraded personal protective equipment.',
    projectId: 'PROJ-042',
    dateCreated: '2024-10-25',
    status: 'Approved',
    requestedBy: 'GF-244',
    approvedBy: 'GF-222'
  },
  {
    ticketId: 'TICK-086',
    ticketName: 'Safety training program expansion',
    category: 'Timeline Change',
    additionalInformation: 'Comprehensive safety training requires extended timeline. Requesting 4-week extension for thorough training.',
    projectId: 'PROJ-042',
    dateCreated: '2024-11-05',
    status: 'Approved',
    requestedBy: 'GF-245',
    approvedBy: 'GF-222'
  },
  {
    ticketId: 'TICK-087',
    ticketName: 'Advanced metering analytics',
    category: 'Budget Change',
    additionalInformation: 'Enhanced data analytics platform for meter data. Additional GH¢125,000 for analytics software and training.',
    projectId: 'PROJ-043',
    dateCreated: '2024-09-30',
    status: 'Approved',
    requestedBy: 'GF-341',
    approvedBy: 'GF-220'
  },
  {
    ticketId: 'TICK-088',
    ticketName: 'Customer portal development',
    category: 'Other',
    additionalInformation: 'Customer-facing web portal for usage data. Additional development effort required.',
    projectId: 'PROJ-043',
    dateCreated: '2024-10-15',
    status: 'Approved',
    requestedBy: 'GF-342',
    approvedBy: 'GF-220'
  },
  {
    ticketId: 'TICK-089',
    ticketName: 'Harmonic filter installation',
    category: 'Budget Change',
    additionalInformation: 'Power quality filters needed for non-linear loads. GH¢115,000 for harmonic filtering equipment.',
    projectId: 'PROJ-044',
    dateCreated: '2024-11-01',
    status: 'Under Review',
    requestedBy: 'GF-235',
    approvedBy: null
  },
  {
    ticketId: 'TICK-090',
    ticketName: 'Power quality monitoring equipment',
    category: 'Other',
    additionalInformation: 'Continuous power quality monitoring recommended. Real-time monitoring of voltage and current parameters.',
    projectId: 'PROJ-044',
    dateCreated: '2024-11-10',
    status: 'Under Review',
    requestedBy: 'GF-236',
    approvedBy: null
  },
  {
    ticketId: 'TICK-091',
    ticketName: 'Cybersecurity training costs',
    category: 'Budget Change',
    additionalInformation: 'Comprehensive cybersecurity training program. Additional GH¢55,000 for training and certification.',
    projectId: 'PROJ-045',
    dateCreated: '2024-10-20',
    status: 'Approved',
    requestedBy: 'GF-244',
    approvedBy: 'GF-222'
  },
  {
    ticketId: 'TICK-092',
    ticketName: 'Penetration testing schedule',
    category: 'Timeline Change',
    additionalInformation: 'Regular penetration testing requires extended timeline. Requesting 3-week adjustment for comprehensive testing.',
    projectId: 'PROJ-045',
    dateCreated: '2024-11-05',
    status: 'Approved',
    requestedBy: 'GF-245',
    approvedBy: 'GF-222'
  },
  {
    ticketId: 'TICK-093',
    ticketName: 'Network analysis software upgrade',
    category: 'Budget Change',
    additionalInformation: 'Latest version of analysis software recommended. GH¢85,000 for software upgrade and training.',
    projectId: 'PROJ-046',
    dateCreated: '2024-09-25',
    status: 'Approved',
    requestedBy: 'GF-235',
    approvedBy: 'GF-213'
  },
  {
    ticketId: 'TICK-094',
    ticketName: 'Modeling consultant services',
    category: 'Budget Change',
    additionalInformation: 'Expert modeling support needed for complex scenarios. Additional GH¢65,000 for consulting services.',
    projectId: 'PROJ-046',
    dateCreated: '2024-10-10',
    status: 'Approved',
    requestedBy: 'GF-236',
    approvedBy: 'GF-213'
  },
  {
    ticketId: 'TICK-095',
    ticketName: 'Remote terminal unit upgrade',
    category: 'Budget Change',
    additionalInformation: 'Next generation RTUs for improved functionality. Additional GH¢145,000 for equipment upgrade.',
    projectId: 'PROJ-047',
    dateCreated: '2024-11-15',
    status: 'Under Review',
    requestedBy: 'GF-342',
    approvedBy: null
  },
  {
    ticketId: 'TICK-096',
    ticketName: 'Protocol conversion gateway',
    category: 'Other',
    additionalInformation: 'Gateway devices needed for protocol compatibility. Integration with legacy systems.',
    projectId: 'PROJ-047',
    dateCreated: '2024-11-20',
    status: 'Under Review',
    requestedBy: 'GF-341',
    approvedBy: null
  },
  {
    ticketId: 'TICK-097',
    ticketName: 'Arc flash study costs',
    category: 'Budget Change',
    additionalInformation: 'Comprehensive arc flash analysis required. GH¢75,000 for engineering study and labeling.',
    projectId: 'PROJ-048',
    dateCreated: '2024-10-15',
    status: 'Approved',
    requestedBy: 'GF-244',
    approvedBy: 'GF-222'
  },
  {
    ticketId: 'TICK-098',
    ticketName: 'Arc-rated PPE procurement',
    category: 'Other',
    additionalInformation: 'Arc-rated personal protective equipment for electrical workers. Enhanced safety compliance.',
    projectId: 'PROJ-048',
    dateCreated: '2024-11-01',
    status: 'Approved',
    requestedBy: 'GF-245',
    approvedBy: 'GF-222'
  },
  {
    ticketId: 'TICK-099',
    ticketName: 'Vegetation management software',
    category: 'Budget Change',
    additionalInformation: 'Specialized software for vegetation tracking. GH¢55,000 for software and mobile applications.',
    projectId: 'PROJ-049',
    dateCreated: '2024-09-20',
    status: 'Approved',
    requestedBy: 'GF-318',
    approvedBy: 'GF-208'
  },
  {
    ticketId: 'TICK-100',
    ticketName: 'Herbicide treatment costs',
    category: 'Budget Change',
    additionalInformation: 'Additional herbicide treatments needed. GH¢45,000 for extended vegetation control program.',
    projectId: 'PROJ-049',
    dateCreated: '2024-10-10',
    status: 'Approved',
    requestedBy: 'GF-319',
    approvedBy: 'GF-208'
  },
  {
    ticketId: 'TICK-101',
    ticketName: 'Weather monitoring system',
    category: 'Budget Change',
    additionalInformation: 'Real-time weather monitoring for operations. GH¢95,000 for weather station network.',
    projectId: 'PROJ-050',
    dateCreated: '2024-11-10',
    status: 'Under Review',
    requestedBy: 'GF-318',
    approvedBy: null
  },
  {
    ticketId: 'TICK-102',
    ticketName: 'Load forecasting model enhancement',
    category: 'Other',
    additionalInformation: 'Enhanced forecasting algorithms recommended. Integration with weather data for improved accuracy.',
    projectId: 'PROJ-050',
    dateCreated: '2024-11-20',
    status: 'Under Review',
    requestedBy: 'GF-235',
    approvedBy: null
  }
]

// Helper functions
export const getTicketById = (ticketId) => {
  return tickets.find(ticket => ticket.ticketId === ticketId)
}

export const getTicketsByProject = (projectId) => {
  return tickets.filter(ticket => ticket.projectId === projectId)
}

export const getTicketsByCategory = (category) => {
  return tickets.filter(ticket => ticket.category === category)
}

export const getTicketsByStatus = (status) => {
  return tickets.filter(ticket => ticket.status === status)
}

export const getPendingTickets = () => {
  return tickets.filter(ticket => ticket.status === 'Under Review')
}
