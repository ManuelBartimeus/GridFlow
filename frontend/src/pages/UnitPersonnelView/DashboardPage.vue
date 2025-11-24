<template>
  <q-page class="dashboard-page">
    <div class="container">
      <!-- Filters Bar -->
      <div class="filters-bar row items-center q-px-md q-py-md bg-white">
        <div class="page-title">My Dashboard</div>
        <q-space />
        
        <q-chip clickable class="filter-chip">
          <span class="filter-label">Date</span>
          <span class="filter-separator">|</span>
          <span class="filter-value">{{ filters.timeRange }}</span>
          <q-menu>
            <q-list style="min-width: 150px">
              <q-item clickable v-close-popup v-for="option in timeRanges" :key="option" @click="filters.timeRange = option">
                <q-item-section>{{ option }}</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-chip>

        <q-chip clickable class="filter-chip">
          <span class="filter-label">Department</span>
          <span class="filter-separator">|</span>
          <span class="filter-value">{{ filters.department }}</span>
          <q-menu>
            <q-list style="min-width: 150px">
              <q-item clickable v-close-popup v-for="option in departments" :key="option" @click="onDepartmentChange(option)">
                <q-item-section>{{ option }}</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-chip>

        <q-chip clickable class="filter-chip" :disable="!filters.department || filters.department === 'All'">
          <span class="filter-label">Section</span>
          <span class="filter-separator">|</span>
          <span class="filter-value">{{ filters.section }}</span>
          <q-menu>
            <q-list style="min-width: 150px">
              <q-item clickable v-close-popup v-for="option in sectionOptions" :key="option" @click="onSectionChange(option)">
                <q-item-section>{{ option }}</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-chip>

        <q-chip clickable class="filter-chip" :disable="!filters.section || filters.section === 'All'">
          <span class="filter-label">Unit</span>
          <span class="filter-separator">|</span>
          <span class="filter-value">{{ filters.unit }}</span>
          <q-menu>
            <q-list style="min-width: 150px">
              <q-item clickable v-close-popup v-for="option in unitOptions" :key="option" @click="filters.unit = option">
                <q-item-section>{{ option }}</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-chip>

        <a href="#" class="clear-filters-link q-ml-md" @click.prevent="clearFilters">
          <q-icon name="close" size="16px" class="q-mr-xs" />
          Clear Filters
        </a>
      </div>

      <!-- KPI Cards -->
      <div class="kpi-section q-px-md q-py-md">
        <div class="kpi-grid">
          <div class="kpi-card">
            <div class="kpi-label">Total Active Projects</div>
            <div class="kpi-value">142</div>
            <div class="kpi-trend positive">▲ +2%</div>
          </div>

          <div class="kpi-card">
            <div class="kpi-label">Behind Schedule</div>
            <div class="kpi-value">18</div>
            <div class="kpi-trend negative">▼ -5%</div>
          </div>

          <div class="kpi-card">
            <div class="kpi-label">Projects At Risk</div>
            <div class="kpi-value">9</div>
            <div class="kpi-trend positive">▲ +1%</div>
          </div>

          <div class="kpi-card">
            <div class="kpi-label">Period Budget</div>
            <div class="kpi-value">¢4.2M</div>
            <div class="kpi-trend positive">▲ +8%</div>
          </div>

          <div class="kpi-card">
            <div class="kpi-label">Period Expenditure</div>
            <div class="kpi-value">¢1.8M</div>
            <div class="kpi-trend negative">▼ -3%</div>
          </div>

          <div class="kpi-card">
            <div class="kpi-label">Pending Approvals</div>
            <div class="kpi-value">5</div>
            <div class="kpi-trend positive">▲ +1</div>
          </div>
        </div>
      </div>

      <!-- Two-column top area -->
      <div class="content-grid q-px-md">
        <div class="row q-col-gutter-md">
          <div class="col-8">
            <q-card flat bordered class="full-height">
              <q-card-section>
                <div class="section-title">Portfolio Health Overview</div>
                <div class="row items-center justify-center q-mt-md" style="gap: 150px;">
                  <div class="health-legend health-legend-left" style="gap: 45px;">
                    <div class="legend-item">
                      <div class="legend-dot" style="background: #10b981;"></div>
                      <div class="legend-content">
                        <div class="legend-title">On Track</div>
                        <div class="legend-subtitle">136 Projects</div>
                      </div>
                    </div>
                    <div class="legend-item">
                      <div class="legend-dot" style="background: #f59e0b;"></div>
                      <div class="legend-content">
                        <div class="legend-title">At Risk</div>
                        <div class="legend-subtitle">42 Projects</div>
                      </div>
                    </div>
                  </div>

                  <div class="donut-container">
                    <svg viewBox="0 0 200 200" class="donut-chart">
                      <!-- Background circle -->
                      <circle cx="100" cy="100" r="80" fill="none" stroke="#f0f0f0" stroke-width="25"/>
                      <!-- Green segment (On Track - 65%) -->
                      <circle cx="100" cy="100" r="80" fill="none" stroke="#10b981" stroke-width="25"
                              stroke-dasharray="325 502" transform="rotate(-90 100 100)" stroke-linecap="round"/>
                      <!-- Orange segment (At Risk - 20%) -->
                      <circle cx="100" cy="100" r="80" fill="none" stroke="#f59e0b" stroke-width="25"
                              stroke-dasharray="100 502" stroke-dashoffset="-325" transform="rotate(-90 100 100)" stroke-linecap="round"/>
                      <!-- Red segment (Critical - 15%) -->
                      <circle cx="100" cy="100" r="80" fill="none" stroke="#ef4444" stroke-width="25"
                              stroke-dasharray="75 502" stroke-dashoffset="-425" transform="rotate(-90 100 100)" stroke-linecap="round"/>
                      <!-- Center text container -->
                      <foreignObject x="0" y="0" width="200" height="200">
                        <div class="donut-center-text">
                          <div class="donut-number-text">210</div>
                          <div class="donut-label-text">Projects</div>
                        </div>
                      </foreignObject>
                    </svg>
                  </div>

                  <div class="health-legend health-legend-right" style="gap: 45px;">
                    <div class="legend-item">
                      <div class="legend-dot" style="background: #ef4444;"></div>
                      <div class="legend-content">
                        <div class="legend-title">Critical</div>
                        <div class="legend-subtitle">32 Projects</div>
                      </div>
                    </div>
                    <div class="legend-item">
                      <div class="legend-dot" style="background: #8b5cf6;"></div>
                      <div class="legend-content">
                        <div class="legend-title">Paused</div>
                        <div class="legend-subtitle">10 Projects</div>
                      </div>
                    </div>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>

          <div class="col-4">
            <q-card flat bordered class="full-height">
              <q-card-section>
                <div class="section-title">Milestone Delivery Rate</div>
                <div class="milestone-rate q-mt-md">
                  <span class="rate-value">88%</span>
                  <span class="rate-trend">▲ +5%</span>
                </div>
                <div class="rate-subtitle">{{ timeRangeText }}</div>
                <q-separator class="q-my-md" />
                <div class="milestone-details">
                  <div class="detail-row">
                    <span class="detail-label">Overdue Milestones</span>
                    <span class="detail-value">12</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">SLA Breaches</span>
                    <span class="detail-value text-red">2</span>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>

        <!-- Budget Utilization Charts -->
        <div class="row q-col-gutter-md q-mt-md">
          <div class="col-6">
            <q-card flat bordered class="full-height">
              <q-card-section>
                <div class="section-title q-mb-md row items-center justify-between">
                  <div>
                    <div class="productivity-title">Productivity Overview</div>
                    <div class="productivity-subtitle">Track task progress and completion rates over time.</div>
                  </div>
                  <div class="row items-center q-gutter-sm">
                    <div class="legend-item-inline">
                      <span class="legend-dot-small" style="background: #1f2937;"></span>
                      <span class="legend-text-small">Task Completed Rate</span>
                    </div>
                    <q-btn flat round dense icon="calendar_month" size="sm" />
                  </div>
                </div>
                <div class="productivity-chart-container">
                  <svg viewBox="0 0 700 280" preserveAspectRatio="xMidYMid meet" class="productivity-chart">
                    <defs>
                      <pattern id="barPattern" patternUnits="userSpaceOnUse" width="4" height="4" patternTransform="rotate(45)">
                        <line x1="0" y1="0" x2="0" y2="4" stroke="#3b82f6" stroke-width="2" />
                      </pattern>
                      <pattern id="barPatternHover" patternUnits="userSpaceOnUse" width="4" height="4" patternTransform="rotate(45)">
                        <line x1="0" y1="0" x2="0" y2="4" stroke="#2563eb" stroke-width="2" />
                      </pattern>
                    </defs>
                    
                    <!-- Y-axis labels -->
                    <text x="30" y="30" class="axis-label">50</text>
                    <text x="30" y="80" class="axis-label">40</text>
                    <text x="30" y="130" class="axis-label">30</text>
                    <text x="30" y="180" class="axis-label">20</text>
                    <text x="30" y="230" class="axis-label">10</text>
                    
                    <!-- Dynamic bars based on time range -->
                    <template v-for="(bar, index) in productivityData" :key="index">
                      <rect 
                        :x="60 + (index * (580 / Math.max(productivityData.length - 1, 1)))" 
                        :y="bar.y" 
                        :width="Math.min(45, 530 / productivityData.length)" 
                        :height="230 - bar.y" 
                        fill="#e0e7ff" 
                        rx="4" 
                        class="bar-interactive" 
                      />
                      <text 
                        :x="82.5 + (index * (580 / Math.max(productivityData.length - 1, 1)))" 
                        :y="bar.y - 10" 
                        class="bar-label" 
                        style="opacity: 0;"
                      >
                        {{ bar.tasks }} Tasks
                      </text>
                      <text 
                        :x="82.5 + (index * (580 / Math.max(productivityData.length - 1, 1)))" 
                        y="255" 
                        class="month-label"
                      >
                        {{ bar.month }}
                      </text>
                    </template>
                  </svg>
                </div>
              </q-card-section>
            </q-card>
          </div>

          <div class="col-6">
            <q-card flat bordered class="full-height">
              <q-card-section>
                <div class="section-title q-mb-md">
                  <span>Budget Utilization</span>
                  <div class="chart-legend">
                    <span class="legend-item-inline"><span class="legend-marker budget-green"></span>Cumulative Expenditure</span>
                    <span class="legend-item-inline q-ml-md"><span class="legend-marker target"></span>Budget cap</span>
                  </div>
                </div>
                <div class="chart-container-budget">
                  <svg viewBox="0 0 800 240" preserveAspectRatio="xMidYMid meet" class="budget-chart">
                    <defs>
                      <linearGradient id="budgetGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style="stop-color:#10b981;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#34d399;stop-opacity:1" />
                      </linearGradient>
                    </defs>
                    
                    <!-- Y-axis labels -->
                    <text x="45" y="45" class="budget-axis-label">¢5M</text>
                    <text x="45" y="90" class="budget-axis-label">¢4M</text>
                    <text x="45" y="135" class="budget-axis-label">¢3M</text>
                    <text x="45" y="180" class="budget-axis-label">¢2M</text>
                    
                    <!-- Target line -->
                    <line x1="80" y1="40" x2="760" y2="40" stroke="#d1d5db" stroke-width="2" stroke-dasharray="5,5"/>
                    
                    <!-- Budget line -->
                    <path :d="budgetPath" 
                          fill="none" stroke="url(#budgetGradient)" stroke-width="3" stroke-linecap="round"/>
                    
                    <!-- Interactive points -->
                    <circle 
                      v-for="(point, index) in budgetData" 
                      :key="index"
                      :cx="point.cx" 
                      :cy="point.y" 
                      r="5" 
                      class="budget-point" 
                      :data-value="point.value" 
                      :data-month="point.month" 
                    />
                    
                    <!-- Tooltip (hidden by default) -->
                    <g class="budget-tooltip" style="opacity: 0;">
                      <rect x="0" y="0" width="80" height="35" fill="#1f2937" rx="6" />
                      <text x="40" y="15" class="tooltip-month" fill="white" text-anchor="middle" font-size="11px" font-weight="500"></text>
                      <text x="40" y="28" class="tooltip-value" fill="white" text-anchor="middle" font-size="12px" font-weight="600"></text>
                    </g>
                    
                    <!-- Month labels -->
                    <text 
                      v-for="(point, index) in budgetData" 
                      :key="'label-' + index"
                      :x="point.cx" 
                      y="220" 
                      class="chart-label"
                    >
                      {{ point.month }}
                    </text>
                  </svg>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>

        <!-- Top Priority Projects -->
        <q-card flat bordered class="q-mt-md">
          <q-card-section>
            <div class="section-title row items-center justify-between q-mb-md">
              <span>Top Priority Projects</span>
              <a href="#" class="view-all-link">View All</a>
            </div>

            <q-markup-table flat class="projects-table">
              <thead>
                <tr>
                  <th class="text-left">Project</th>
                  <th class="text-left">Department</th>
                  <th class="text-left">Progress</th>
                  <th class="text-left">Budget</th>
                  <th class="text-left">Risk</th>
                  <th class="text-left">Manager</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(project, i) in projects" :key="i">
                  <td><a href="#" class="project-link">{{ project.name }}</a></td>
                  <td><span class="dept-text">{{ project.department }}</span></td>
                  <td>
                    <div class="progress-container">
                      <div class="progress-bar-bg">
                        <div class="progress-bar-fill" :style="{ width: project.progress + '%' }"></div>
                      </div>
                    </div>
                  </td>
                  <td><q-badge :color="project.budgetColor" :label="project.budgetLabel" /></td>
                  <td><q-badge :color="project.riskColor" :label="project.risk" /></td>
                  <td><span class="manager-text">{{ project.manager }}</span></td>
                </tr>
              </tbody>
            </q-markup-table>
          </q-card-section>
        </q-card>

        <!-- Bottom Three Cards -->
        <div class="row q-col-gutter-md q-mt-md">
          <div class="col-4">
            <q-card flat bordered class="full-height">
              <q-card-section>
                <div class="section-title q-mb-md">Pending Approvals</div>
                <div class="approval-list">
                  <div class="approval-item">
                    <a href="#" class="approval-link">New Marketing Budget</a>
                    <div class="approval-status">5 days pending</div>
                  </div>
                  <div class="approval-item">
                    <a href="#" class="approval-link">Project Nebula Scope Change</a>
                    <div class="approval-status">2 days pending</div>
                  </div>
                  <div class="approval-item">
                    <a href="#" class="approval-link">Vendor Contract #5421</a>
                    <div class="approval-status">1 day pending</div>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>

          <div class="col-4">
            <q-card flat bordered class="full-height">
              <q-card-section>
                <div class="section-title q-mb-md">Escalated Items & Alerts</div>
                <div class="alert-list">
                  <div class="alert-item">
                    <q-icon name="error" color="red" size="20px" class="q-mr-sm" />
                    <div>
                      <div class="alert-title">Project Alpha - Budget Overrun</div>
                      <div class="alert-subtitle">Exceeded by 15%</div>
                    </div>
                  </div>
                  <div class="alert-item">
                    <q-icon name="schedule" color="orange" size="20px" class="q-mr-sm" />
                    <div>
                      <div class="alert-title">Data Migration - Delayed</div>
                      <div class="alert-subtitle">Timeline expired 3 days ago</div>
                    </div>
                  </div>
                  <div class="alert-item">
                    <q-icon name="warning" color="amber" size="20px" class="q-mr-sm" />
                    <div>
                      <div class="alert-title">SLA Breach: Support Ticket #9812</div>
                      <div class="alert-subtitle">Response time exceeded</div>
                    </div>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>

          <div class="col-4">
            <q-card flat bordered class="full-height">
              <q-card-section>
                <div class="section-title q-mb-md">Recent Organizational Activity</div>
                <div class="activity-list">
                  <div class="activity-item">
                    <div class="activity-text">M. Chen approved budget for <a href="#" class="activity-link">Q4 Platform Upgrade</a>.</div>
                    <div class="activity-time">1h ago</div>
                  </div>
                  <div class="activity-item">
                    <div class="activity-text">S. Lee assigned new tasks in <a href="#" class="activity-link">Marketing Revamp</a>.</div>
                    <div class="activity-time">3h ago</div>
                  </div>
                  <div class="activity-item">
                    <div class="activity-text">System uploaded new financials for <a href="#" class="activity-link">Project Phoenix</a>.</div>
                    <div class="activity-time">8h ago</div>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'DashboardPage',
  data () {
    return {
      search: '',
      currentDate: new Date(2025, 10, 18), // November 18, 2025
      timeRanges: ['30 Days', '90 Days', '6 Months'],
      departments: ['All', 'Finance', 'Engineering', 'Corporate Strategy', 'GRIDTEL'],
      sectionOptions: ['All'],
      unitOptions: ['All'],
      departmentSections: {
        'Finance': ['All', 'Accounting', 'Treasury', 'Budget & Planning', 'Financial Reporting'],
        'Engineering': ['All', 'Power Systems', 'Transmission', 'Distribution', 'Substations'],
        'Corporate Strategy': ['All', 'Strategic Planning', 'Business Development', 'Risk Management', 'Analytics'],
        'GRIDTEL': ['All', 'Network Operations', 'Customer Service', 'Technical Support', 'Sales & Marketing']
      },
      sectionUnits: {
        'Accounting': ['All', 'Accounts Payable', 'Accounts Receivable', 'General Ledger', 'Cost Accounting'],
        'Treasury': ['All', 'Cash Management', 'Investments', 'Debt Management', 'Banking Relations'],
        'Budget & Planning': ['All', 'Budget Analysis', 'Forecasting', 'Capital Planning', 'Performance Analysis'],
        'Financial Reporting': ['All', 'Financial Statements', 'Regulatory Reporting', 'Management Reports', 'Audit Support'],
        'Power Systems': ['All', 'Generation Planning', 'Load Forecasting', 'Grid Studies', 'Power Quality'],
        'Transmission': ['All', 'Line Maintenance', 'Tower Inspection', 'Right of Way', 'Protection Systems'],
        'Distribution': ['All', 'Network Maintenance', 'Metering', 'Service Connections', 'Fault Management'],
        'Substations': ['All', 'Substation Operations', 'Equipment Maintenance', 'Testing & Commissioning', 'SCADA'],
        'Strategic Planning': ['All', 'Corporate Planning', 'Policy Development', 'Market Analysis', 'Transformation'],
        'Business Development': ['All', 'New Ventures', 'Partnerships', 'Project Development', 'Investment Analysis'],
        'Risk Management': ['All', 'Enterprise Risk', 'Compliance', 'Internal Audit', 'Security'],
        'Analytics': ['All', 'Data Analytics', 'Business Intelligence', 'Performance Metrics', 'Reporting'],
        'Network Operations': ['All', 'NOC Operations', 'Network Planning', 'Service Provisioning', 'Performance Monitoring'],
        'Customer Service': ['All', 'Call Center', 'Customer Care', 'Billing Support', 'Complaints Management'],
        'Technical Support': ['All', 'Field Support', 'Installation', 'Troubleshooting', 'Maintenance'],
        'Sales & Marketing': ['All', 'Sales Operations', 'Marketing Campaigns', 'Channel Management', 'Customer Acquisition']
      },
      filters: {
        timeRange: '30 Days',
        department: 'All',
        section: 'All',
        unit: 'All'
      },
      projects: [
        { name: 'Project Phoenix', department: 'Engineering', progress: 76, budgetLabel: 'On Track', budgetColor: 'green', risk: 'Medium', riskColor: 'amber', manager: 'Alex Johnson' },
        { name: 'Marketing Revamp', department: 'Marketing', progress: 62, budgetLabel: 'At Risk', budgetColor: 'orange', risk: 'Low', riskColor: 'green', manager: 'Sarah Lee' },
        { name: 'Q4 Platform Upgrade', department: 'IT', progress: 88, budgetLabel: 'On Track', budgetColor: 'green', risk: 'Low', riskColor: 'green', manager: 'Mike Chen' },
        { name: 'Data Center Migration', department: 'Operations', progress: 24, budgetLabel: 'Over Budget', budgetColor: 'red', risk: 'High', riskColor: 'red', manager: 'David Rodriguez' }
      ]
    }
  },
  computed: {
    timeRangeText() {
      const rangeMap = {
        '30 Days': 'Past 30 Days',
        '90 Days': 'Past 90 Days',
        '6 Months': 'Past 6 Months'
      }
      return rangeMap[this.filters.timeRange] || 'Past 30 Days'
    },
    monthLabels() {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      const currentMonth = this.currentDate.getMonth() // 10 = November
      const labels = []
      
      if (this.filters.timeRange === '30 Days') {
        // Show current month only
        labels.push(months[currentMonth])
      } else if (this.filters.timeRange === '90 Days') {
        // Show last 3 months
        for (let i = 2; i >= 0; i--) {
          const monthIndex = (currentMonth - i + 12) % 12
          labels.push(months[monthIndex])
        }
      } else if (this.filters.timeRange === '6 Months') {
        // Show last 6 months
        for (let i = 5; i >= 0; i--) {
          const monthIndex = (currentMonth - i + 12) % 12
          labels.push(months[monthIndex])
        }
      }
      
      return labels
    },
    productivityData() {
      const currentMonth = this.currentDate.getMonth()
      
      if (this.filters.timeRange === '30 Days') {
        // Show 4 weeks (weekly data)
        return [
          { month: 'Week 1', tasks: 22, y: 110 },
          { month: 'Week 2', tasks: 28, y: 90 },
          { month: 'Week 3', tasks: 31, y: 75 },
          { month: 'Week 4', tasks: 26, y: 100 }
        ]
      } else if (this.filters.timeRange === '90 Days') {
        // Show 6 bi-weekly periods
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        const data = []
        
        // Generate 6 data points spanning 3 months
        for (let i = 5; i >= 0; i--) {
          const weeksAgo = i * 2
          const daysAgo = weeksAgo * 7
          const targetDate = new Date(this.currentDate)
          targetDate.setDate(targetDate.getDate() - daysAgo)
          
          const monthName = months[targetDate.getMonth()]
          const weekOfMonth = Math.ceil(targetDate.getDate() / 7)
          
          // Generate varied task data
          const tasks = 24 + Math.floor(Math.random() * 16) + (i % 2 === 0 ? 3 : 0)
          const y = 230 - (tasks * 4)
          
          data.push({
            month: `${monthName} W${weekOfMonth}`,
            tasks: tasks,
            y: y
          })
        }
        
        return data
      } else {
        // 6 Months - show monthly data
        const baseData = [
          { month: 'Jan', tasks: 30, y: 80 },
          { month: 'Feb', tasks: 34, y: 60 },
          { month: 'Mar', tasks: 26, y: 100 },
          { month: 'Apr', tasks: 32, y: 70 },
          { month: 'May', tasks: 28, y: 90 },
          { month: 'Jun', tasks: 24, y: 110 },
          { month: 'Jul', tasks: 42, y: 20 },
          { month: 'Aug', tasks: 29, y: 85 },
          { month: 'Sep', tasks: 27, y: 95 },
          { month: 'Oct', tasks: 31, y: 75 },
          { month: 'Nov', tasks: 38, y: 50 },
          { month: 'Dec', tasks: 33, y: 65 }
        ]
        
        return [
          baseData[(currentMonth - 5 + 12) % 12],
          baseData[(currentMonth - 4 + 12) % 12],
          baseData[(currentMonth - 3 + 12) % 12],
          baseData[(currentMonth - 2 + 12) % 12],
          baseData[(currentMonth - 1 + 12) % 12],
          baseData[currentMonth]
        ]
      }
    },
    budgetData() {
      const currentMonth = this.currentDate.getMonth()
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      let data = []
      
      if (this.filters.timeRange === '30 Days') {
        // Show 4 weekly data points
        const baseValue = 2.8
        data = [
          { month: 'Week 1', value: `¢${(baseValue + 0.1).toFixed(1)}M`, y: 135 },
          { month: 'Week 2', value: `¢${(baseValue + 0.3).toFixed(1)}M`, y: 120 },
          { month: 'Week 3', value: `¢${(baseValue + 0.5).toFixed(1)}M`, y: 105 },
          { month: 'Week 4', value: `¢${(baseValue + 0.7).toFixed(1)}M`, y: 95 }
        ]
      } else if (this.filters.timeRange === '90 Days') {
        // Show 6 bi-weekly periods
        for (let i = 5; i >= 0; i--) {
          const weeksAgo = i * 2
          const daysAgo = weeksAgo * 7
          const targetDate = new Date(this.currentDate)
          targetDate.setDate(targetDate.getDate() - daysAgo)
          
          const monthName = months[targetDate.getMonth()]
          const weekOfMonth = Math.ceil(targetDate.getDate() / 7)
          
          // Generate progressive budget values
          const baseValue = 2.5
          const increment = (5 - i) * 0.15
          const value = baseValue + increment
          const y = 140 - (increment * 30)
          
          data.push({
            month: `${monthName} W${weekOfMonth}`,
            value: `¢${value.toFixed(1)}M`,
            y: Math.max(75, Math.min(140, y))
          })
        }
      } else {
        // 6 Months - show monthly data
        const baseData = [
          { month: 'Jan', value: '¢2.1M', y: 140 },
          { month: 'Feb', value: '¢2.5M', y: 120 },
          { month: 'Mar', value: '¢2.7M', y: 115 },
          { month: 'Apr', value: '¢3.2M', y: 95 },
          { month: 'May', value: '¢2.9M', y: 110 },
          { month: 'Jun', value: '¢3.1M', y: 105 },
          { month: 'Jul', value: '¢2.7M', y: 115 },
          { month: 'Aug', value: '¢3.0M', y: 108 },
          { month: 'Sep', value: '¢3.3M', y: 92 },
          { month: 'Oct', value: '¢3.5M', y: 85 },
          { month: 'Nov', value: '¢3.8M', y: 75 },
          { month: 'Dec', value: '¢4.0M', y: 65 }
        ]
        
        data = [
          baseData[(currentMonth - 5 + 12) % 12],
          baseData[(currentMonth - 4 + 12) % 12],
          baseData[(currentMonth - 3 + 12) % 12],
          baseData[(currentMonth - 2 + 12) % 12],
          baseData[(currentMonth - 1 + 12) % 12],
          baseData[currentMonth]
        ]
      }
      
      // Recalculate cx positions based on number of points
      const spacing = 680 / Math.max(data.length - 1, 1)
      return data.map((item, index) => ({
        ...item,
        cx: 80 + (index * spacing)
      }))
    },
    budgetPath() {
      const points = this.budgetData.map(d => `${d.cx},${d.y}`).join(' L ')
      return `M ${points}`
    }
  },
  methods: {
    applyFilters () {
      // This demo UI simply simulates filter action
      this.$q.notify({ type: 'positive', message: 'Filters applied' })
    },
    clearFilters () {
      this.filters = { timeRange: '30 Days', department: 'All', section: 'All', unit: 'All' }
      this.sectionOptions = ['All']
      this.unitOptions = ['All']
    },
    onDepartmentChange (value) {
      // Reset section and unit when department changes
      this.filters.section = 'All'
      this.filters.unit = 'All'
      this.unitOptions = ['All']
      
      // Update section options based on selected department
      if (value && value !== 'All' && this.departmentSections[value]) {
        this.sectionOptions = this.departmentSections[value]
      } else {
        this.sectionOptions = ['All']
      }
    },
    onSectionChange (value) {
      // Reset unit when section changes
      this.filters.unit = 'All'
      
      // Update unit options based on selected section
      if (value && value !== 'All' && this.sectionUnits[value]) {
        this.unitOptions = this.sectionUnits[value]
      } else {
        this.unitOptions = ['All']
      }
    },
    refresh () {
      this.$q.notify({ message: 'Last Updated: 1 min ago', color: 'grey-7' })
    }
  },
  mounted () {
    // Add hover interaction for budget chart points
    const points = document.querySelectorAll('.budget-point')
    const tooltip = document.querySelector('.budget-tooltip')
    const tooltipMonth = document.querySelector('.tooltip-month')
    const tooltipValue = document.querySelector('.tooltip-value')
    const tooltipRect = tooltip?.querySelector('rect')
    
    points.forEach(point => {
      point.addEventListener('mouseenter', (e) => {
        const month = e.target.getAttribute('data-month')
        const value = e.target.getAttribute('data-value')
        const cx = parseFloat(e.target.getAttribute('cx'))
        const cy = parseFloat(e.target.getAttribute('cy'))
        
        if (tooltipMonth && tooltipValue && tooltip && tooltipRect) {
          tooltipMonth.textContent = month
          tooltipValue.textContent = value
          
          // Position tooltip above the point
          tooltipRect.setAttribute('x', cx - 40)
          tooltipRect.setAttribute('y', cy - 50)
          tooltipMonth.setAttribute('x', cx)
          tooltipMonth.setAttribute('y', cy - 35)
          tooltipValue.setAttribute('x', cx)
          tooltipValue.setAttribute('y', cy - 22)
          
          tooltip.style.opacity = '1'
        }
      })
      
      point.addEventListener('mouseleave', () => {
        if (tooltip) {
          tooltip.style.opacity = '0'
        }
      })
    })
  }
}
</script>

<style scoped>
.dashboard-page {
  background: #f5f7fa;
  min-height: 100vh;
  font-family: 'Montserrat', sans-serif;
}

.container {
  max-width: 100%;
}

/* Filters Bar */
.filters-bar {
  border-bottom: 1px solid #e5e7eb;
  gap: 8px;
}

.page-title {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  font-family: 'Montserrat', sans-serif;
  margin-left: 5px;
}

.filter-chip {
  background: #f3f4f6 !important;
  border-radius: 20px !important;
  padding: 6px 12px !important;
  font-family: 'Montserrat', sans-serif;
  cursor: pointer;
}

.filter-chip .q-icon {
  color: #9ca3af;
}

.filter-label {
  font-size: 13px;
  color: #6b7280;
  font-weight: 500;
}

.filter-separator {
  margin: 0 8px;
  color: #d1d5db;
}

.filter-value {
  font-size: 13px;
  color: #1f2937;
  font-weight: 500;
}

.clear-filters-link {
  font-size: 14px;
  color: #3b82f6;
  text-decoration: none;
  display: flex;
  align-items: center;
  font-family: 'Montserrat', sans-serif;
  transition: color 0.2s;
}

.clear-filters-link:hover {
  color: #2563eb;
}

.clear-filters-link .q-icon {
  color: #3b82f6;
}

/* KPI Section */
.kpi-section {
  background: transparent;
}

.kpi-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;
}

.kpi-card {
  background: white;
  padding: 20px;
  border-radius: 16px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.kpi-label {
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 8px;
  font-family: 'Montserrat', sans-serif;
}

.kpi-value {
  font-size: 28px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 4px;
  font-family: 'Montserrat', sans-serif;
}

.kpi-trend {
  font-size: 12px;
  font-weight: 500;
  font-family: 'Montserrat', sans-serif;
}

.kpi-trend.positive {
  color: #10b981;
}

.kpi-trend.negative {
  color: #ef4444;
}

/* Content Grid */
.content-grid {
  padding-bottom: 24px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  font-family: 'Montserrat', sans-serif;
}

.content-grid :deep(.q-card) {
  border-radius: 16px !important;
}

/* Portfolio Health */
.donut-container {
  width: 200px;
  height: 200px;
}

.donut-chart {
  width: 100%;
  height: 100%;
}

.donut-center-text {
  width: 200px;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
}

.donut-number-text {
  font-size: 48px;
  font-weight: 700;
  color: #1f2937;
  font-family: 'Montserrat', sans-serif;
  line-height: 1;
}

.donut-label-text {
  font-size: 14px;
  color: #6b7280;
  font-family: 'Montserrat', sans-serif;
  line-height: 1;
}

.donut-number {
  font-size: 48px;
  font-weight: 700;
  fill: #1f2937;
  font-family: 'Montserrat', sans-serif;
}

.donut-label {
  font-size: 14px;
  fill: #6b7280;
  font-family: 'Montserrat', sans-serif;
}

.health-legend {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.legend-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
}

.legend-content {
  display: flex;
  flex-direction: column;
}

.legend-title {
  font-size: 14px;
  color: #1f2937;
  font-weight: 500;
  font-family: 'Montserrat', sans-serif;
}

.legend-subtitle {
  font-size: 12px;
  color: #6b7280;
  font-family: 'Montserrat', sans-serif;
}

/* Milestone Rate */
.milestone-rate {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.rate-value {
  font-size: 48px;
  font-weight: 700;
  color: #1f2937;
  font-family: 'Montserrat', sans-serif;
}

.rate-trend {
  font-size: 14px;
  color: #10b981;
  font-weight: 500;
  font-family: 'Montserrat', sans-serif;
}

.rate-subtitle {
  font-size: 12px;
  color: #6b7280;
  margin-top: 4px;
  font-family: 'Montserrat', sans-serif;
}

.milestone-details {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  font-family: 'Montserrat', sans-serif;
}

.detail-label {
  color: #6b7280;
}

.detail-value {
  color: #1f2937;
  font-weight: 500;
}

/* Budget Chart */
.chart-legend {
  display: inline-flex;
  gap: 16px;
  margin-left: 24px;
  font-size: 12px;
  font-family: 'Montserrat', sans-serif;
}

.legend-item-inline {
  display: flex;
  align-items: center;
  gap: 6px;
}

.legend-marker {
  width: 20px;
  height: 3px;
  border-radius: 4px;
  display: inline-block;
}

.legend-marker.budget-green {
  background: linear-gradient(90deg, #10b981, #34d399);
}

.legend-marker.target {
  background: #d1d5db;
}

.chart-container-budget {
  width: 100%;
  height: 240px;
  margin-top: 16px;
}

.budget-chart {
  width: 100%;
  height: 350px;
}

.chart-label {
  font-size: 12px;
  fill: #9ca3af;
  text-anchor: middle;
  font-family: 'Montserrat', sans-serif;
}

.budget-axis-label {
  font-size: 11px;
  fill: #9ca3af;
  text-anchor: end;
  font-family: 'Montserrat', sans-serif;
}

.budget-point {
  fill: #10b981;
  stroke: white;
  stroke-width: 2;
  cursor: pointer;
  transition: all 0.3s ease;
}

.budget-point:hover {
  r: 7;
  fill: #059669;
}

.budget-tooltip {
  pointer-events: none;
  transition: opacity 0.3s ease;
}

/* Projects Table */
.projects-table {
  background: transparent;
  border-radius: 12px;
}

.projects-table thead th {
  font-size: 12px;
  font-weight: 500;
  color: #6b7280;
  padding: 12px 16px;
  background: #f9fafb;
  font-family: 'Montserrat', sans-serif;
}

.projects-table tbody td {
  padding: 16px;
  border-bottom: 1px solid #f3f4f6;
  font-size: 14px;
  font-family: 'Montserrat', sans-serif;
}

.project-link {
  color: #3b82f6;
  text-decoration: none;
  font-weight: 500;
  font-family: 'Montserrat', sans-serif;
}

.project-link:hover {
  text-decoration: underline;
}

.dept-text {
  color: #3b82f6;
  font-size: 13px;
  font-family: 'Montserrat', sans-serif;
}

.manager-text {
  color: #3b82f6;
  font-size: 13px;
  font-family: 'Montserrat', sans-serif;
}

/* Productivity Chart */
.productivity-title {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  font-family: 'Montserrat', sans-serif;
}

.productivity-subtitle {
  font-size: 12px;
  color: #6b7280;
  margin-top: 4px;
  font-family: 'Montserrat', sans-serif;
}

.legend-dot-small {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 6px;
}

.legend-text-small {
  font-size: 12px;
  color: #6b7280;
  font-family: 'Montserrat', sans-serif;
}

.productivity-chart-container {
  width: 100%;
  height: 280px;
  margin-top: 16px;
}

.productivity-chart {
  width: 100%;
  height: 100%;
}

.axis-label {
  font-size: 11px;
  fill: #9ca3af;
  text-anchor: end;
  font-family: 'Montserrat', sans-serif;
}

.month-label {
  font-size: 11px;
  fill: #9ca3af;
  text-anchor: middle;
  font-family: 'Montserrat', sans-serif;
}

.bar-label {
  font-size: 11px;
  fill: #1f2937d1;
  text-anchor: middle;
  font-weight: 600;
  font-family: 'Montserrat', sans-serif;
  transition: opacity 0.3s ease;
}

.bar-interactive {
  cursor: pointer;
  transition: all 0.3s ease;
}

.bar-interactive:hover {
  fill: url(#barPatternHover);
  transform: scaleY(1.05);
  transform-origin: bottom;
}

.bar-interactive:hover + .bar-label {
  opacity: 1 !important;
}

.progress-container {
  width: 100%;
  max-width: 120px;
}

.progress-bar-bg {
  width: 100%;
  height: 8px;
  background: #e5e7eb;
  border-radius: 6px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #10b981, #34d399);
  border-radius: 6px;
  transition: width 0.3s ease;
}

.view-all-link {
  color: #3b82f6;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  font-family: 'Montserrat', sans-serif;
}

.view-all-link:hover {
  text-decoration: underline;
}

/* Bottom Cards */
.approval-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.approval-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.approval-link {
  color: #3b82f6;
  text-decoration: none;
  font-size: 14px;
  font-family: 'Montserrat', sans-serif;
}

.approval-link:hover {
  text-decoration: underline;
}

.approval-status {
  font-size: 13px;
  color: #f59e0b;
  font-family: 'Montserrat', sans-serif;
}

.alert-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.alert-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.alert-title {
  font-size: 14px;
  color: #1f2937;
  font-weight: 500;
  font-family: 'Montserrat', sans-serif;
}

.alert-subtitle {
  font-size: 12px;
  color: #6b7280;
  margin-top: 2px;
  font-family: 'Montserrat', sans-serif;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.activity-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.activity-text {
  font-size: 14px;
  color: #4b5563;
  font-family: 'Montserrat', sans-serif;
}

.activity-link {
  color: #3b82f6;
  text-decoration: none;
  font-family: 'Montserrat', sans-serif;
}

.activity-link:hover {
  text-decoration: underline;
}

.activity-time {
  font-size: 12px;
  color: #9ca3af;
  font-family: 'Montserrat', sans-serif;
}

/* Badges with rounded corners */
:deep(.q-badge) {
  border-radius: 8px !important;
  font-family: 'Montserrat', sans-serif;
}

/* Buttons with rounded corners */
:deep(.q-btn) {
  border-radius: 10px !important;
  font-family: 'Montserrat', sans-serif;
}

/* Responsive */
@media (max-width: 1400px) {
  .kpi-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .kpi-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
