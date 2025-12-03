// Organizational structure with departments, sections, and units
export const departments = [
  {
    id: 'DEPT-001',
    name: 'Southern Network',
    directorId: 'GF-104',
    sections: [
      {
        id: 'SEC-001',
        name: 'Transmission Line Maintenance',
        managerId: 'GF-205',
        units: [
          { id: 'UNIT-001', name: 'Line Patrol & Inspection', supervisorId: 'GF-306' },
          { id: 'UNIT-002', name: 'Vegetation Management', supervisorId: 'GF-307' },
          { id: 'UNIT-003', name: 'Fault Response & Emergency Repair', supervisorId: 'GF-308' }
        ]
      },
      {
        id: 'SEC-002',
        name: 'Substation Operations',
        managerId: 'GF-206',
        units: [
          { id: 'UNIT-004', name: 'Substation Operations', supervisorId: 'GF-309' },
          { id: 'UNIT-005', name: 'Equipment Protection & Switching', supervisorId: 'GF-310' },
          { id: 'UNIT-006', name: 'Control Room Coordination', supervisorId: 'GF-311' }
        ]
      },
      {
        id: 'SEC-003',
        name: 'System Protection',
        managerId: 'GF-207',
        units: [
          { id: 'UNIT-007', name: 'Relay Testing', supervisorId: 'GF-312' },
          { id: 'UNIT-008', name: 'Fault Analysis', supervisorId: 'GF-313' },
          { id: 'UNIT-009', name: 'Protection Device Configuration', supervisorId: 'GF-314' }
        ]
      },
      {
        id: 'SEC-004',
        name: 'Maintenance Planning',
        managerId: 'GF-208',
        units: [
          { id: 'UNIT-010', name: 'Asset Condition Monitoring', supervisorId: 'GF-315' },
          { id: 'UNIT-011', name: 'Maintenance Scheduling', supervisorId: 'GF-316' },
          { id: 'UNIT-012', name: 'Maintenance Records & Reporting', supervisorId: 'GF-317' }
        ]
      }
    ]
  },
  {
    id: 'DEPT-002',
    name: 'System Operations',
    directorId: 'GF-105',
    sections: [
      {
        id: 'SEC-005',
        name: 'National Control Centre (NCC)',
        managerId: 'GF-209',
        units: [
          { id: 'UNIT-013', name: 'Real-Time Grid Monitoring', supervisorId: 'GF-318' },
          { id: 'UNIT-014', name: 'Transmission Switching & Coordination', supervisorId: 'GF-319' },
          { id: 'UNIT-015', name: 'Outage Management', supervisorId: 'GF-320' }
        ]
      },
      {
        id: 'SEC-006',
        name: 'Power System Control & Dispatch',
        managerId: 'GF-210',
        units: [
          { id: 'UNIT-016', name: 'Load Forecasting', supervisorId: 'GF-321' },
          { id: 'UNIT-017', name: 'Generation Dispatch', supervisorId: 'GF-322' },
          { id: 'UNIT-018', name: 'Frequency Control', supervisorId: 'GF-323' }
        ]
      },
      {
        id: 'SEC-007',
        name: 'SCADA & EMS',
        managerId: 'GF-211',
        units: [
          { id: 'UNIT-019', name: 'SCADA Operations', supervisorId: 'GF-324' },
          { id: 'UNIT-020', name: 'EMS Modelling & Analysis', supervisorId: 'GF-325' },
          { id: 'UNIT-021', name: 'Telemetry Integration', supervisorId: 'GF-326' }
        ]
      },
      {
        id: 'SEC-008',
        name: 'Grid Planning & Studies',
        managerId: 'GF-212',
        units: [
          { id: 'UNIT-022', name: 'Power Flow Studies', supervisorId: 'GF-327' },
          { id: 'UNIT-023', name: 'Contingency Analysis', supervisorId: 'GF-328' },
          { id: 'UNIT-024', name: 'Operational Standards Development', supervisorId: 'GF-329' }
        ]
      }
    ]
  },
  {
    id: 'DEPT-003',
    name: 'Northern Network',
    directorId: 'GF-106',
    sections: [
      {
        id: 'SEC-009',
        name: 'Transmission Line Maintenance',
        managerId: 'GF-213',
        units: [
          { id: 'UNIT-025', name: 'Patrol & Inspection', supervisorId: 'GF-330' },
          { id: 'UNIT-026', name: 'Right-of-Way Management', supervisorId: 'GF-331' },
          { id: 'UNIT-027', name: 'Emergency Repairs', supervisorId: 'GF-332' }
        ]
      },
      {
        id: 'SEC-010',
        name: 'Substation Operations',
        managerId: 'GF-214',
        units: [
          { id: 'UNIT-028', name: 'Equipment Switching', supervisorId: 'GF-333' },
          { id: 'UNIT-029', name: 'Local Control & Monitoring', supervisorId: 'GF-334' },
          { id: 'UNIT-030', name: 'Safety & Compliance', supervisorId: 'GF-335' }
        ]
      },
      {
        id: 'SEC-011',
        name: 'Network Protection',
        managerId: 'GF-215',
        units: [
          { id: 'UNIT-031', name: 'Relay Settings & Testing', supervisorId: 'GF-336' },
          { id: 'UNIT-032', name: 'Disturbance Reporting', supervisorId: 'GF-337' },
          { id: 'UNIT-033', name: 'Metering & Measurement', supervisorId: 'GF-338' }
        ]
      },
      {
        id: 'SEC-012',
        name: 'Asset Management',
        managerId: 'GF-216',
        units: [
          { id: 'UNIT-034', name: 'Condition Assessment', supervisorId: 'GF-339' },
          { id: 'UNIT-035', name: 'Maintenance Planning', supervisorId: 'GF-340' },
          { id: 'UNIT-036', name: 'Asset Register & Documentation', supervisorId: 'GF-341' }
        ]
      }
    ]
  },
  {
    id: 'DEPT-004',
    name: 'Engineering',
    directorId: 'GF-101',
    sections: [
      {
        id: 'SEC-013',
        name: 'Electrical Engineering & Design',
        managerId: 'GF-201',
        units: [
          { id: 'UNIT-037', name: 'Transmission Line Design', supervisorId: 'GF-342' },
          { id: 'UNIT-038', name: 'Substation Design', supervisorId: 'GF-343' },
          { id: 'UNIT-039', name: 'Power System Studies', supervisorId: 'GF-303' }
        ]
      },
      {
        id: 'SEC-014',
        name: 'Projects & Construction',
        managerId: 'GF-217',
        units: [
          { id: 'UNIT-040', name: 'Construction Supervision', supervisorId: 'GF-344' },
          { id: 'UNIT-041', name: 'Quality Assurance & Testing', supervisorId: 'GF-345' },
          { id: 'UNIT-042', name: 'Commissioning & Handover', supervisorId: 'GF-346' }
        ]
      },
      {
        id: 'SEC-015',
        name: 'Asset Engineering',
        managerId: 'GF-218',
        units: [
          { id: 'UNIT-043', name: 'Transformer & Switchgear Engineering', supervisorId: 'GF-347' },
          { id: 'UNIT-044', name: 'Protection & Control Engineering', supervisorId: 'GF-348' },
          { id: 'UNIT-045', name: 'Reliability Engineering', supervisorId: 'GF-349' }
        ]
      },
      {
        id: 'SEC-016',
        name: 'Standards & Technical Documentation',
        managerId: 'GF-219',
        units: [
          { id: 'UNIT-046', name: 'Engineering Standards', supervisorId: 'GF-350' },
          { id: 'UNIT-047', name: 'Drawing & Documentation', supervisorId: 'GF-351' },
          { id: 'UNIT-048', name: 'Compliance Review', supervisorId: 'GF-352' }
        ]
      }
    ]
  },
  {
    id: 'DEPT-005',
    name: 'GRIDTEL',
    directorId: 'GF-102',
    sections: [
      {
        id: 'SEC-017',
        name: 'MIS (Management Information Systems)',
        managerId: 'GF-203',
        units: [
          { id: 'UNIT-049', name: 'Cybersecurity', supervisorId: 'GF-353' },
          { id: 'UNIT-050', name: 'Networking & Infrastructure', supervisorId: 'GF-354' },
          { id: 'UNIT-051', name: 'Business Applications', supervisorId: 'GF-304' },
          { id: 'UNIT-052', name: 'Compliance & Policy', supervisorId: 'GF-355' },
          { id: 'UNIT-053', name: 'Service Management & Helpdesk', supervisorId: 'GF-356' },
          { id: 'UNIT-054', name: 'Hardware', supervisorId: 'GF-357' }
        ]
      },
      {
        id: 'SEC-018',
        name: 'Telemetry Transmission',
        managerId: 'GF-220',
        units: [
          { id: 'UNIT-055', name: 'Fibre Optic Network', supervisorId: 'GF-358' },
          { id: 'UNIT-056', name: 'Microwave Radio', supervisorId: 'GF-359' },
          { id: 'UNIT-057', name: 'Infrastructure Maintenance', supervisorId: 'GF-360' }
        ]
      },
      {
        id: 'SEC-019',
        name: 'Network Operations Centre (NOC)',
        managerId: 'GF-221',
        units: [
          { id: 'UNIT-058', name: 'Network Monitoring', supervisorId: 'GF-361' },
          { id: 'UNIT-059', name: 'Incident & Escalation', supervisorId: 'GF-362' },
          { id: 'UNIT-060', name: 'Performance Analytics', supervisorId: 'GF-363' }
        ]
      },
      {
        id: 'SEC-020',
        name: 'ICT Projects',
        managerId: 'GF-222',
        units: [
          { id: 'UNIT-061', name: 'Systems Implementation', supervisorId: 'GF-364' },
          { id: 'UNIT-062', name: 'Vendor Management', supervisorId: 'GF-365' },
          { id: 'UNIT-063', name: 'Technology Research & Innovation', supervisorId: 'GF-366' }
        ]
      }
    ]
  },
  {
    id: 'DEPT-006',
    name: 'Human Resources',
    directorId: 'GF-107',
    sections: [
      {
        id: 'SEC-021',
        name: 'Recruitment & Staffing',
        managerId: 'GF-223',
        units: [
          { id: 'UNIT-064', name: 'Personnel Recruitment', supervisorId: 'GF-367' },
          { id: 'UNIT-065', name: 'Onboarding', supervisorId: 'GF-368' },
          { id: 'UNIT-066', name: 'Records & HR Database', supervisorId: 'GF-369' }
        ]
      },
      {
        id: 'SEC-022',
        name: 'Training & Development',
        managerId: 'GF-224',
        units: [
          { id: 'UNIT-067', name: 'Technical Training', supervisorId: 'GF-370' },
          { id: 'UNIT-068', name: 'Leadership Development', supervisorId: 'GF-371' },
          { id: 'UNIT-069', name: 'Capacity Building & Certification', supervisorId: 'GF-372' }
        ]
      },
      {
        id: 'SEC-023',
        name: 'Employee Relations',
        managerId: 'GF-225',
        units: [
          { id: 'UNIT-070', name: 'Disciplinary Committee', supervisorId: 'GF-373' },
          { id: 'UNIT-071', name: 'Union Liaison', supervisorId: 'GF-374' },
          { id: 'UNIT-072', name: 'Workplace Welfare', supervisorId: 'GF-375' }
        ]
      },
      {
        id: 'SEC-024',
        name: 'Performance & Compensation',
        managerId: 'GF-226',
        units: [
          { id: 'UNIT-073', name: 'Appraisal Management', supervisorId: 'GF-376' },
          { id: 'UNIT-074', name: 'Compensation & Benefits', supervisorId: 'GF-377' },
          { id: 'UNIT-075', name: 'Job Evaluation', supervisorId: 'GF-378' }
        ]
      }
    ]
  },
  {
    id: 'DEPT-007',
    name: 'Legal & Compliance',
    directorId: 'GF-108',
    sections: [
      {
        id: 'SEC-025',
        name: 'Legal Services',
        managerId: 'GF-227',
        units: [
          { id: 'UNIT-076', name: 'Contract Review', supervisorId: 'GF-379' },
          { id: 'UNIT-077', name: 'Litigation & Dispute Resolution', supervisorId: 'GF-380' },
          { id: 'UNIT-078', name: 'Legal Advisory', supervisorId: 'GF-381' }
        ]
      },
      {
        id: 'SEC-026',
        name: 'Regulatory Compliance',
        managerId: 'GF-228',
        units: [
          { id: 'UNIT-079', name: 'Energy Commission Compliance', supervisorId: 'GF-382' },
          { id: 'UNIT-080', name: 'PURC Regulatory Coordination', supervisorId: 'GF-383' },
          { id: 'UNIT-081', name: 'Policy & Legislative Monitoring', supervisorId: 'GF-384' }
        ]
      },
      {
        id: 'SEC-027',
        name: 'Corporate Governance',
        managerId: 'GF-229',
        units: [
          { id: 'UNIT-082', name: 'Board Secretariat', supervisorId: 'GF-385' },
          { id: 'UNIT-083', name: 'Ethics & Accountability', supervisorId: 'GF-386' },
          { id: 'UNIT-084', name: 'Governance Training', supervisorId: 'GF-387' }
        ]
      }
    ]
  },
  {
    id: 'DEPT-008',
    name: 'Audit & Accounts',
    directorId: 'GF-109',
    sections: [
      {
        id: 'SEC-028',
        name: 'Internal Audit',
        managerId: 'GF-230',
        units: [
          { id: 'UNIT-085', name: 'Operational Audit', supervisorId: 'GF-388' },
          { id: 'UNIT-086', name: 'IT Audit', supervisorId: 'GF-389' },
          { id: 'UNIT-087', name: 'Compliance Audit', supervisorId: 'GF-390' }
        ]
      },
      {
        id: 'SEC-029',
        name: 'Risk Management',
        managerId: 'GF-231',
        units: [
          { id: 'UNIT-088', name: 'Risk Identification', supervisorId: 'GF-391' },
          { id: 'UNIT-089', name: 'Mitigation & Controls', supervisorId: 'GF-392' },
          { id: 'UNIT-090', name: 'Risk Monitoring', supervisorId: 'GF-393' }
        ]
      },
      {
        id: 'SEC-030',
        name: 'Accounts',
        managerId: 'GF-232',
        units: [
          { id: 'UNIT-091', name: 'General Ledger', supervisorId: 'GF-394' },
          { id: 'UNIT-092', name: 'Payables & Receivables', supervisorId: 'GF-395' },
          { id: 'UNIT-093', name: 'Payroll Accounting', supervisorId: 'GF-396' }
        ]
      },
      {
        id: 'SEC-031',
        name: 'Audit Reporting',
        managerId: 'GF-233',
        units: [
          { id: 'UNIT-094', name: 'Audit Quality Assurance', supervisorId: 'GF-397' },
          { id: 'UNIT-095', name: 'Internal Control Review', supervisorId: 'GF-398' },
          { id: 'UNIT-096', name: 'Follow-Up & Verification', supervisorId: 'GF-399' }
        ]
      }
    ]
  },
  {
    id: 'DEPT-009',
    name: 'Finance',
    directorId: 'GF-110',
    sections: [
      {
        id: 'SEC-032',
        name: 'Budget & Planning',
        managerId: 'GF-234',
        units: [
          { id: 'UNIT-097', name: 'Budget Development', supervisorId: 'GF-400' },
          { id: 'UNIT-098', name: 'Expenditure Monitoring', supervisorId: 'GF-401' },
          { id: 'UNIT-099', name: 'Financial Modelling', supervisorId: 'GF-402' }
        ]
      },
      {
        id: 'SEC-033',
        name: 'Treasury & Investment',
        managerId: 'GF-235',
        units: [
          { id: 'UNIT-100', name: 'Cash Management', supervisorId: 'GF-403' },
          { id: 'UNIT-101', name: 'Investment & Banking', supervisorId: 'GF-404' },
          { id: 'UNIT-102', name: 'Loan & Debt Management', supervisorId: 'GF-405' }
        ]
      },
      {
        id: 'SEC-034',
        name: 'Revenue Management',
        managerId: 'GF-236',
        units: [
          { id: 'UNIT-103', name: 'Billing', supervisorId: 'GF-406' },
          { id: 'UNIT-104', name: 'Revenue Assurance', supervisorId: 'GF-407' },
          { id: 'UNIT-105', name: 'Customer Tariff Analysis', supervisorId: 'GF-408' }
        ]
      },
      {
        id: 'SEC-035',
        name: 'Financial Reporting',
        managerId: 'GF-237',
        units: [
          { id: 'UNIT-106', name: 'Statutory Reporting', supervisorId: 'GF-409' },
          { id: 'UNIT-107', name: 'Management Reports', supervisorId: 'GF-410' },
          { id: 'UNIT-108', name: 'Accounting Standards', supervisorId: 'GF-411' }
        ]
      }
    ]
  },
  {
    id: 'DEPT-010',
    name: 'Corporate Strategy',
    directorId: 'GF-111',
    sections: [
      {
        id: 'SEC-036',
        name: 'Corporate Planning',
        managerId: 'GF-238',
        units: [
          { id: 'UNIT-109', name: 'Strategic Planning', supervisorId: 'GF-412' },
          { id: 'UNIT-110', name: 'Annual Work Plan', supervisorId: 'GF-413' },
          { id: 'UNIT-111', name: 'Business Process Optimization', supervisorId: 'GF-414' }
        ]
      },
      {
        id: 'SEC-037',
        name: 'Monitoring & Evaluation',
        managerId: 'GF-239',
        units: [
          { id: 'UNIT-112', name: 'KPI Tracking', supervisorId: 'GF-415' },
          { id: 'UNIT-113', name: 'Project Monitoring', supervisorId: 'GF-416' },
          { id: 'UNIT-114', name: 'Performance Analysis', supervisorId: 'GF-417' }
        ]
      },
      {
        id: 'SEC-038',
        name: 'Corporate Communications',
        managerId: 'GF-240',
        units: [
          { id: 'UNIT-115', name: 'Internal Communications', supervisorId: 'GF-418' },
          { id: 'UNIT-116', name: 'External/Public Affairs', supervisorId: 'GF-419' },
          { id: 'UNIT-117', name: 'Media & Stakeholder Engagement', supervisorId: 'GF-420' }
        ]
      },
      {
        id: 'SEC-039',
        name: 'Research & Innovation',
        managerId: 'GF-241',
        units: [
          { id: 'UNIT-118', name: 'Energy Sector Research', supervisorId: 'GF-421' },
          { id: 'UNIT-119', name: 'Technology Innovation', supervisorId: 'GF-422' },
          { id: 'UNIT-120', name: 'Sustainability & Climate Strategy', supervisorId: 'GF-423' }
        ]
      }
    ]
  }
]

// Helper functions
export const getDepartmentById = (id) => {
  return departments.find(dept => dept.id === id)
}

export const getSectionById = (deptId, secId) => {
  const dept = getDepartmentById(deptId)
  return dept ? dept.sections.find(sec => sec.id === secId) : null
}

export const getUnitById = (deptId, secId, unitId) => {
  const section = getSectionById(deptId, secId)
  return section ? section.units.find(unit => unit.id === unitId) : null
}

export const getAllUnits = () => {
  const allUnits = []
  departments.forEach(dept => {
    dept.sections.forEach(section => {
      section.units.forEach(unit => {
        allUnits.push({
          ...unit,
          sectionName: section.name,
          departmentName: dept.name,
          departmentId: dept.id,
          sectionId: section.id
        })
      })
    })
  })
  return allUnits
}
