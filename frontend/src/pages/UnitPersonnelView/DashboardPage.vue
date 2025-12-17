<template>
  <q-page class="dashboard-page">
    <div class="container">
      <!-- Filters Bar -->
      <div class="filters-bar row items-center q-px-md q-py-md bg-white">
        <div class="page-title">My Dashboard - {{ currentUser ? currentUser.name : 'Loading...' }}</div>
        <q-space />
        
        <q-chip clickable class="filter-chip">
          <span class="filter-label">Date</span>
          <span class="filter-separator">|</span>
          <span class="filter-value">{{ filters.timeRange }}</span>
          <q-menu>
            <q-list style="min-width: 150px">
              <q-item clickable v-close-popup v-for="option in timeRanges" :key="option" @click="onTimeRangeChange(option)">
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
            <div class="kpi-label">My Active Projects</div>
            <div class="kpi-value">{{ activeProjectsCount }}</div>
            <div class="kpi-trend positive">▲ +2%</div>
          </div>

          <div class="kpi-card">
            <div class="kpi-label">Behind Schedule</div>
            <div class="kpi-value">{{ behindScheduleCount }}</div>
            <div class="kpi-trend negative">▼ -5%</div>
          </div>

          <div class="kpi-card">
            <div class="kpi-label">Projects Over Budget</div>
            <div class="kpi-value">{{ atRiskCount }}</div>
            <div class="kpi-trend positive">▲ +1%</div>
          </div>

          <div class="kpi-card">
            <div class="kpi-label">Period Budget</div>
            <div class="kpi-value">{{ formatCurrency(periodBudget) }}</div>
            <div class="kpi-trend positive">▲ +8%</div>
          </div>

          <div class="kpi-card">
            <div class="kpi-label">Period Expenditure</div>
            <div class="kpi-value">{{ formatCurrency(periodExpenditure) }}</div>
            <div class="kpi-trend negative">▼ -3%</div>
          </div>

          <div class="kpi-card">
            <div class="kpi-label">Pending Approvals</div>
            <div class="kpi-value">{{ pendingApprovalsCount }}</div>
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
                <div class="section-title">My Projects Health Overview</div>
                <div class="row items-center justify-center q-mt-md" style="gap: 150px;">
                  <div class="health-legend health-legend-left" style="gap: 45px;">
                    <div class="legend-item">
                      <div class="legend-dot" style="background: #ef4444;"></div>
                      <div class="legend-content">
                        <div class="legend-title">Not Started</div>
                        <div class="legend-subtitle">{{ portfolioHealth.notStarted }} Projects</div>
                      </div>
                    </div>
                    <div class="legend-item">
                      <div class="legend-dot" style="background: #f59e0b;"></div>
                      <div class="legend-content">
                        <div class="legend-title">In Progress</div>
                        <div class="legend-subtitle">{{ portfolioHealth.inProgress }} Projects</div>
                      </div>
                    </div>
                  </div>

                  <div class="donut-container">
                    <svg viewBox="0 0 200 200" class="donut-chart">
                      <!-- Background circle -->
                      <circle cx="100" cy="100" r="80" fill="none" stroke="#f0f0f0" stroke-width="25"/>
                      <!-- Red segment (Not Started) -->
                      <circle cx="100" cy="100" r="80" fill="none" stroke="#ef4444" stroke-width="23"
                              :stroke-dasharray="`${donutSegments.notStarted.length} 502`" 
                              :stroke-dashoffset="donutSegments.notStarted.offset"
                              transform="rotate(-90 100 100)"/>
                      <!-- Gold segment (In Progress) -->
                      <circle cx="100" cy="100" r="80" fill="none" stroke="#f59e0b" stroke-width="23"
                              :stroke-dasharray="`${donutSegments.inProgress.length} 502`" 
                              :stroke-dashoffset="donutSegments.inProgress.offset"
                              transform="rotate(-90 100 100)"/>
                      <!-- Green segment (Completed) -->
                      <circle cx="100" cy="100" r="80" fill="none" stroke="#10b981" stroke-width="23"
                              :stroke-dasharray="`${donutSegments.completed.length} 502`" 
                              :stroke-dashoffset="donutSegments.completed.offset"
                              transform="rotate(-90 100 100)"/>
                      <!-- Purple segment (Paused) -->
                      <circle cx="100" cy="100" r="80" fill="none" stroke="#8b5cf6" stroke-width="23"
                              :stroke-dasharray="`${donutSegments.paused.length} 502`" 
                              :stroke-dashoffset="donutSegments.paused.offset"
                              transform="rotate(-90 100 100)"/>
                      <!-- Center text container -->
                      <foreignObject x="0" y="0" width="200" height="200">
                        <div class="donut-center-text">
                          <div class="donut-number-text">{{ portfolioHealth.total }}</div>
                          <div class="donut-label-text">Projects</div>
                        </div>
                      </foreignObject>
                    </svg>
                  </div>

                  <div class="health-legend health-legend-right" style="gap: 45px;">
                    <div class="legend-item">
                      <div class="legend-dot" style="background: #10b981;"></div>
                      <div class="legend-content">
                        <div class="legend-title">Completed</div>
                        <div class="legend-subtitle">{{ portfolioHealth.completed }} Projects</div>
                      </div>
                    </div>
                    <div class="legend-item">
                      <div class="legend-dot" style="background: #8b5cf6;"></div>
                      <div class="legend-content">
                        <div class="legend-title">Paused</div>
                        <div class="legend-subtitle">{{ portfolioHealth.paused }} Projects</div>
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
                  <span class="rate-value">{{ milestoneRate.percentage }}%</span>
                  <span class="rate-trend">▲ +5%</span>
                </div>
                <div class="rate-subtitle">{{ timeRangeText }}</div>
                <q-separator class="q-my-md" />
                <div class="milestone-details">
                  <div class="detail-row">
                    <span class="detail-label">Overdue Milestones</span>
                    <span class="detail-value">{{ milestoneRate.overdueMilestones }}</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">Completed Milestones</span>
                    <span class="detail-value text-green">{{ milestoneRate.completedMilestones }}</span>
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
                    <div class="productivity-title">My Productivity Overview</div>
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
                    
                    <!-- Y-axis labels (dynamic) -->
                    <text 
                      v-for="label in productivityYAxisLabels.labels" 
                      :key="label.y"
                      x="30" 
                      :y="label.y" 
                      class="axis-label"
                    >
                      {{ label.value }}
                    </text>
                    
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
                  <span>My Budget Utilization</span>
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
                    
                    <!-- Y-axis labels (dynamic) -->
                    <text 
                      v-for="label in budgetYAxisLabels.labels" 
                      :key="label.y"
                      x="45" 
                      :y="label.y" 
                      class="budget-axis-label"
                    >
                      {{ label.value }}
                    </text>
                    
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
              <span>My Top Priority Projects</span>
              <a href="#" class="view-all-link">View All</a>
            </div>

            <q-markup-table flat class="projects-table">
              <thead>
                <tr>
                  <th class="text-left">Project</th>
                  <th class="text-left">Department</th>
                  <th class="text-left">Progress</th>
                  <th class="text-left">Budget</th>
                  <th class="text-left">Timeline</th>
                  <th class="text-left">Manager</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(project, i) in projects" :key="i">
                  <td><a href="#" class="project-link">{{ project.name }}</a></td>
                  <td><span class="dept-text">{{ project.department }}</span></td>
                  <td>
                    <div class="progress-container">
                      <q-tooltip anchor="top middle" self="bottom middle" :offset="[0, 8]">
                        {{ project.progress }}% Complete
                      </q-tooltip>
                      <div class="progress-bar-bg">
                        <div class="progress-bar-fill" :style="{ width: project.progress + '%' }"></div>
                      </div>
                    </div>
                  </td>
                  <td><q-badge :color="project.budgetColor" :label="project.budgetLabel" /></td>
                  <td><q-badge :color="project.timelineColor" :label="project.timelineLabel" /></td>
                  <td><span class="manager-text">{{ project.manager }}</span></td>
                </tr>
              </tbody>
            </q-markup-table>
          </q-card-section>
        </q-card>

        <!-- Bottom Two Cards -->
        <div class="row q-col-gutter-md q-mt-md">
          <div class="col-8">
            <q-card flat bordered class="full-height">
              <q-card-section>
                <div class="section-title q-mb-md">My Project Pending Approvals</div>
                <q-markup-table flat class="approvals-table">
                  <thead>
                    <tr>
                      <th class="text-left">Ticket</th>
                      <th class="text-left">Project</th>
                      <th class="text-left">Category</th>
                      <th class="text-left">Manager</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(approval, idx) in pendingApprovals.slice(0, 5)" :key="idx">
                      <td><a href="#" class="approval-link">{{ approval.ticketName }}</a></td>
                      <td><span class="project-text">{{ approval.projectName }}</span></td>
                      <td><q-badge :label="approval.category" color="blue-grey-6" /></td>
                      <td><span class="manager-text">{{ approval.manager }}</span></td>
                    </tr>
                    <tr v-if="pendingApprovals.length === 0">
                      <td colspan="4" class="text-center">
                        <div class="approval-status">No pending approvals</div>
                      </td>
                    </tr>
                  </tbody>
                </q-markup-table>
              </q-card-section>
            </q-card>
          </div>

          <div class="col-4">
            <q-card flat bordered class="full-height">
              <q-card-section>
                <div class="section-title q-mb-md">Recent Activity</div>
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
import * as dashboardService from 'src/data/dashboardDataService.js'

export default {
  name: 'DashboardPage',
  data () {
    return {
      search: '',
      currentDate: new Date(2025, 11, 3), // December 3, 2025
      currentUser: null,
      timeRanges: ['30 Days', '90 Days', '6 Months'],
      
      // Real data from service
      activeProjectsCount: 0,
      behindScheduleCount: 0,
      atRiskCount: 0,
      periodBudget: 0,
      periodExpenditure: 0,
      pendingApprovalsCount: 0,
      portfolioHealth: { notStarted: 0, inProgress: 0, completed: 0, paused: 0, total: 0 },
      milestoneRate: { percentage: 0, overdueMilestones: 0, completedMilestones: 0 },
      topProjects: [],
      pendingApprovals: [],
      
      filters: {
        timeRange: '30 Days'
      }
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
    userStaffNumber() {
      return this.currentUser ? this.currentUser.staffNumber : null
    },
    donutSegments() {
      const total = this.portfolioHealth.total || 1
      const circumference = 502
      
      const notStartedLength = (this.portfolioHealth.notStarted / total) * circumference
      const inProgressLength = (this.portfolioHealth.inProgress / total) * circumference
      const completedLength = (this.portfolioHealth.completed / total) * circumference
      const pausedLength = (this.portfolioHealth.paused / total) * circumference
      
      return {
        notStarted: { length: notStartedLength, offset: 0 },
        inProgress: { length: inProgressLength, offset: -notStartedLength },
        completed: { length: completedLength, offset: -(notStartedLength + inProgressLength) },
        paused: { length: pausedLength, offset: -(notStartedLength + inProgressLength + completedLength) }
      }
    },
    projects() {
      return this.topProjects.map(p => ({
        name: p.name,
        department: p.department,
        progress: p.progress,
        budgetLabel: p.budgetLabel,
        budgetColor: p.budgetColor,
        timelineLabel: p.timelineLabel,
        timelineColor: p.timelineColor,
        manager: p.manager
      }))
    },
    productivityYAxisLabels() {
      const serviceData = dashboardService.getProductivityDataByUser(
        this.filters.timeRange, 
        this.userStaffNumber, 
        this.currentDate
      )
      const maxCount = Math.max(...serviceData.map(d => d.tasks || 0), 1)
      const step = Math.ceil(maxCount / 5)
      const maxValue = step * 5
      
      return {
        labels: [
          { y: 30, value: step * 5 },
          { y: 80, value: step * 4 },
          { y: 130, value: step * 3 },
          { y: 180, value: step * 2 },
          { y: 230, value: step * 1 }
        ],
        maxValue
      }
    },
    productivityData() {
      const serviceData = dashboardService.getProductivityDataByUser(
        this.filters.timeRange, 
        this.userStaffNumber, 
        this.currentDate
      )
      const maxValue = this.productivityYAxisLabels.maxValue
      
      return serviceData.map((item) => {
        const maxY = 230
        const minY = 30
        const y = maxY - ((item.tasks / maxValue) * (maxY - minY))
        
        return {
          month: item.period,
          tasks: item.tasks,
          y
        }
      })
    },
    budgetYAxisLabels() {
      const serviceData = dashboardService.getBudgetUtilizationDataByUser(
        this.filters.timeRange, 
        this.userStaffNumber, 
        this.currentDate
      )
      const maxValue = Math.max(...serviceData.map(d => Math.max(d.budget, d.expenditure)), 1)
      const step = maxValue / 4
      const maxAxisValue = step * 4
      
      return {
        labels: [
          { y: 45, value: this.formatCurrency(step * 4) },
          { y: 90, value: this.formatCurrency(step * 3) },
          { y: 135, value: this.formatCurrency(step * 2) },
          { y: 180, value: this.formatCurrency(step * 1) }
        ],
        maxValue: maxAxisValue
      }
    },
    budgetData() {
      const serviceData = dashboardService.getBudgetUtilizationDataByUser(
        this.filters.timeRange, 
        this.userStaffNumber, 
        this.currentDate
      )
      const maxValue = this.budgetYAxisLabels.maxValue
      
      const maxY = 180
      const minY = 45
      const spacing = 680 / Math.max(serviceData.length - 1, 1)
      
      return serviceData.map((item, index) => {
        const y = maxY - ((item.expenditure / maxValue) * (maxY - minY))
        const budgetFormatted = this.formatCurrency(item.expenditure)
        
        return {
          month: item.period,
          value: budgetFormatted,
          y,
          cx: 80 + (index * spacing),
          budget: item.budget,
          expenditure: item.expenditure
        }
      })
    },
    budgetPath() {
      const points = this.budgetData.map(d => `${d.cx},${d.y}`).join(' L ')
      return `M ${points}`
    }
  },
  methods: {
    loadCurrentUser() {
      const userJson = sessionStorage.getItem('currentUser')
      if (userJson) {
        this.currentUser = JSON.parse(userJson)
      }
    },
    loadDashboardData() {
      if (!this.userStaffNumber) {
        console.warn('No user staff number available')
        return
      }

      const timeRange = this.filters.timeRange
      
      // Load all dashboard metrics filtered by user's project membership
      this.activeProjectsCount = dashboardService.getTotalActiveProjectsByUser(this.userStaffNumber)
      this.behindScheduleCount = dashboardService.getBehindScheduleCountByUser(this.userStaffNumber)
      this.atRiskCount = dashboardService.getProjectsOverBudgetCountByUser(this.userStaffNumber)
      this.periodBudget = dashboardService.getPeriodBudgetByUser(timeRange, this.userStaffNumber, this.currentDate)
      this.periodExpenditure = dashboardService.getPeriodExpenditureByUser(timeRange, this.userStaffNumber, this.currentDate)
      this.pendingApprovalsCount = dashboardService.getPendingApprovalsCountByUser(this.userStaffNumber)
      
      // Load portfolio health breakdown
      const healthData = dashboardService.getPortfolioHealthByUser(this.userStaffNumber)
      this.portfolioHealth = {
        notStarted: healthData['not started'] || 0,
        inProgress: healthData['in progress'] || 0,
        completed: healthData.completed || 0,
        paused: healthData.paused || 0,
        total: (healthData['not started'] || 0) + (healthData['in progress'] || 0) + (healthData.completed || 0) + (healthData.paused || 0)
      }
      
      // Load milestone delivery rate
      const milestoneData = dashboardService.getMilestoneDeliveryRateByUser(timeRange, this.userStaffNumber, this.currentDate)
      this.milestoneRate = {
        percentage: milestoneData.rate || 0,
        overdueMilestones: milestoneData.overdue || 0,
        completedMilestones: milestoneData.completed || 0
      }
      
      // Load top priority projects
      this.topProjects = dashboardService.getTopPriorityProjectsByUser(this.userStaffNumber)
      
      // Load pending approvals for user's projects
      const approvals = dashboardService.getPendingApprovalsForTopProjectsByUser(this.userStaffNumber)
      this.pendingApprovals = approvals
    },
    formatCurrency(value) {
      if (value >= 1000000) {
        return `¢${(value / 1000000).toFixed(1)}M`
      } else if (value >= 1000) {
        return `¢${(value / 1000).toFixed(1)}K`
      }
      return `¢${value}`
    },
    clearFilters () {
      this.filters = { timeRange: '30 Days' }
      this.loadDashboardData()
    },
    onTimeRangeChange(value) {
      this.filters.timeRange = value
      this.loadDashboardData()
    }
  },
  mounted () {
    // Load current user
    this.loadCurrentUser()
    
    // Load dashboard data
    this.loadDashboardData()
    
    // Add hover and click interaction for budget chart points
    this.$nextTick(() => {
      const points = document.querySelectorAll('.budget-point')
      const tooltip = document.querySelector('.budget-tooltip')
      const tooltipMonth = document.querySelector('.tooltip-month')
      const tooltipValue = document.querySelector('.tooltip-value')
      const tooltipRect = tooltip?.querySelector('rect')
      let tooltipPinned = false
      
      const showTooltip = (e) => {
        const month = e.target.getAttribute('data-month')
        const value = e.target.getAttribute('data-value')
        const cx = parseFloat(e.target.getAttribute('cx'))
        const cy = parseFloat(e.target.getAttribute('cy'))
        
        if (tooltipMonth && tooltipValue && tooltip && tooltipRect) {
          tooltipMonth.textContent = month
          tooltipValue.textContent = value
          
          tooltipRect.setAttribute('x', cx - 40)
          tooltipRect.setAttribute('y', cy - 50)
          tooltipMonth.setAttribute('x', cx)
          tooltipMonth.setAttribute('y', cy - 35)
          tooltipValue.setAttribute('x', cx)
          tooltipValue.setAttribute('y', cy - 22)
          
          tooltip.style.opacity = '1'
          tooltip.setAttribute('data-visible', 'true')
        }
      }
      
      const hideTooltip = () => {
        if (tooltip && !tooltipPinned) {
          tooltip.style.opacity = '0'
          tooltip.setAttribute('data-visible', 'false')
        }
      }
      
      points.forEach(point => {
        point.addEventListener('mouseenter', showTooltip)
        point.addEventListener('mouseleave', hideTooltip)
        
        point.addEventListener('click', (e) => {
          e.stopPropagation()
          tooltipPinned = !tooltipPinned
          
          if (tooltipPinned) {
            showTooltip(e)
            point.style.cursor = 'pointer'
          } else {
            hideTooltip()
            point.style.cursor = 'pointer'
          }
        })
        
        point.style.cursor = 'pointer'
      })
      
      document.addEventListener('click', () => {
        if (tooltipPinned && tooltip) {
          tooltipPinned = false
          tooltip.style.opacity = '0'
          tooltip.setAttribute('data-visible', 'false')
        }
      })
    })
  },
  watch: {
    'filters.timeRange'() {
      this.loadDashboardData()
    }
  }
}
</script>

<style scoped>
/* Copy all styles from Executive Dashboard */
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

.text-green {
  color: #10b981 !important;
}

/* Charts */
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

.legend-item-inline {
  display: flex;
  align-items: center;
  gap: 6px;
}

.legend-dot-small {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
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
  fill: #1f2937;
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

.chart-legend {
  display: inline-flex;
  gap: 16px;
  margin-left: 24px;
  font-size: 12px;
  font-family: 'Montserrat', sans-serif;
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
  height: 100%;
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
  transition: all 0.2s ease;
}

.budget-point:hover {
  fill: #059669;
  stroke-width: 3;
  filter: drop-shadow(0 0 4px rgba(16, 185, 129, 0.6));
}

.budget-tooltip {
  pointer-events: none;
  transition: opacity 0.3s ease;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.15));
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

/* Approvals Table */
.approvals-table {
  background: transparent;
  border-radius: 12px;
}

.approvals-table thead th {
  font-size: 12px;
  font-weight: 500;
  color: #6b7280;
  padding: 12px 16px;
  background: #f9fafb;
  font-family: 'Montserrat', sans-serif;
}

.approvals-table tbody td {
  padding: 16px;
  border-bottom: 1px solid #f3f4f6;
  font-size: 14px;
  font-family: 'Montserrat', sans-serif;
}

.approval-link {
  color: #3b82f6;
  text-decoration: none;
  font-weight: 500;
  font-family: 'Montserrat', sans-serif;
}

.approval-link:hover {
  text-decoration: underline;
}

.project-text {
  color: #3b82f6;
  font-size: 13px;
  font-family: 'Montserrat', sans-serif;
}

.approval-status {
  padding: 20px;
  text-align: center;
  color: #6b7280;
  font-family: 'Montserrat', sans-serif;
}

/* Activity */
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

/* Badges */
:deep(.q-badge) {
  border-radius: 8px !important;
  font-family: 'Montserrat', sans-serif;
}

/* Buttons */
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
