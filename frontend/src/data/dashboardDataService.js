// Dashboard Data Service
// Provides aggregated data for the Executive Dashboard

import { projects } from './projects.js'
import { sprints } from './sprints.js'
import { tasks } from './tasks.js'
import { tickets } from './tickets.js'
import { users } from './users.js'

/**
 * Get the date range based on filter selection
 * @param {string} timeRange - '30 Days', '90 Days', or '6 Months'
 * @param {Date} currentDate - Reference date (default: current date)
 * @returns {Date} Start date for the filter
 */
function getFilterStartDate(timeRange, currentDate = new Date()) {
  const startDate = new Date(currentDate)
  
  switch (timeRange) {
    case '30 Days':
      startDate.setDate(startDate.getDate() - 30)
      break
    case '90 Days':
      startDate.setDate(startDate.getDate() - 90)
      break
    case '6 Months':
      startDate.setMonth(startDate.getMonth() - 6)
      break
    default:
      startDate.setDate(startDate.getDate() - 30)
  }
  
  return startDate
}

/**
 * Parse date string in format 'YYYY-MM-DD'
 */
function parseDate(dateStr) {
  if (!dateStr) return null
  const [year, month, day] = dateStr.split('-').map(Number)
  return new Date(year, month - 1, day)
}

/**
 * Check if a date is within the filter range
 */
function isDateInRange(dateStr, startDate, endDate) {
  const date = parseDate(dateStr)
  if (!date) return false
  return date >= startDate && date <= endDate
}

// ============================================
// KPI CALCULATIONS
// ============================================

/**
 * Get count of active projects (not paused)
 */
export function getTotalActiveProjects() {
  return projects.filter(p => p.currentStatus !== 'paused').length
}

/**
 * Get count of projects behind schedule
 */
export function getBehindScheduleCount() {
  return projects.filter(p => p.timelineHealth === 'behind schedule').length
}

/**
 * Get count of projects at risk (timeline or budget)
 */
export function getProjectsAtRiskCount() {
  return projects.filter(p => 
    p.budgetHealth === 'over budget'
  ).length
}

/**
 * Get period budget for projects issued within date range
 */
export function getPeriodBudget(timeRange, currentDate = new Date()) {
  const startDate = getFilterStartDate(timeRange, currentDate)
  
  return projects
    .filter(p => isDateInRange(p.issueDate, startDate, currentDate))
    .reduce((sum, p) => sum + (p.allocatedBudget || 0), 0)
}

/**
 * Get period expenditure for projects issued within date range
 */
export function getPeriodExpenditure(timeRange, currentDate = new Date()) {
  const startDate = getFilterStartDate(timeRange, currentDate)
  
  return projects
    .filter(p => isDateInRange(p.issueDate, startDate, currentDate))
    .reduce((sum, p) => sum + (p.expenditure || 0), 0)
}

/**
 * Get count of pending approvals (unattended tickets)
 */
export function getPendingApprovalsCount() {
  return tickets.filter(t => t.status === 'Under Review').length
}

// ============================================
// PORTFOLIO HEALTH
// ============================================

/**
 * Get portfolio health breakdown by status
 */
export function getPortfolioHealth() {
  const statusCounts = {
    'not started': 0,
    'in progress': 0,
    'completed': 0,
    'paused': 0
  }
  
  projects.forEach(p => {
    const status = p.currentStatus.toLowerCase()
    if (Object.prototype.hasOwnProperty.call(statusCounts, status)) {
      statusCounts[status]++
    }
  })
  
  return statusCounts
}

// ============================================
// MILESTONE DELIVERY RATE
// ============================================

/**
 * Get all sprints due within the date range
 */
function getSprintsDueInRange(timeRange, currentDate = new Date()) {
  const startDate = getFilterStartDate(timeRange, currentDate)
  
  return sprints.filter(sprint => {
    const endDate = parseDate(sprint.endDate)
    return endDate && endDate >= startDate && endDate <= currentDate
  })
}

/**
 * Check if a sprint has all tasks completed
 */
function isSprintCompleted(sprint) {
  if (!sprint.tasks || sprint.tasks.length === 0) {
    // If no tasks, consider it based on progress completion
    return sprint.progressCompletion === 100
  }
  
  const sprintTasks = tasks.filter(t => sprint.tasks.includes(t.taskId))
  if (sprintTasks.length === 0) return sprint.progressCompletion === 100
  
  return sprintTasks.every(t => t.status === 'completed')
}

/**
 * Get milestone delivery rate data
 */
export function getMilestoneDeliveryRate(timeRange, currentDate = new Date()) {
  const dueSprintsList = getSprintsDueInRange(timeRange, currentDate)
  
  if (dueSprintsList.length === 0) {
    return {
      rate: 0,
      completed: 0,
      overdue: 0,
      total: 0
    }
  }
  
  const completedSprintsList = dueSprintsList.filter(sprint => isSprintCompleted(sprint))
  const completed = completedSprintsList.length
  const total = dueSprintsList.length
  const overdue = total - completed
  const rate = Math.round((completed / total) * 100)
  
  return {
    rate,
    completed,
    overdue,
    total
  }
}

// ============================================
// PRODUCTIVITY OVERVIEW
// ============================================

/**
 * Get tasks completed in each time period
 * - 30 Days: Weekly (e.g., "DEC WK1")
 * - 90 Days: Bi-weekly (e.g., "NOV WK1-2", "NOV WK3-4")
 * - 6 Months: Monthly (e.g., "JUL", "AUG")
 * Returns array of {period, count} for chart display
 */
export function getProductivityData(timeRange, currentDate = new Date()) {
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
  const startDate = getFilterStartDate(timeRange, currentDate)
  
  // Get all completed tasks in the date range
  const completedTasks = tasks.filter(t => {
    if (t.status?.toLowerCase() !== 'completed' || !t.dueDate) return false
    const completedDate = parseDate(t.dueDate)
    return completedDate >= startDate && completedDate <= currentDate
  })
  
  // For 6 Months: Group by month
  if (timeRange === '6 Months') {
    const monthlyData = new Map()
    
    completedTasks.forEach(task => {
      const taskDate = parseDate(task.dueDate)
      const month = taskDate.getMonth()
      const periodKey = months[month]
      monthlyData.set(periodKey, (monthlyData.get(periodKey) || 0) + 1)
    })
    
    // Generate all months in the range
    const data = []
    const current = new Date(startDate)
    const seenMonths = new Set()
    
    while (current <= currentDate) {
      const month = current.getMonth()
      const periodKey = months[month]
      
      if (!seenMonths.has(periodKey)) {
        seenMonths.add(periodKey)
        data.push({
          period: periodKey,
          count: monthlyData.get(periodKey) || 0
        })
      }
      
      // Move to next month
      current.setMonth(current.getMonth() + 1)
      current.setDate(1)
    }
    
    return data
  }
  
  // For 90 Days: Group by 2-week periods
  if (timeRange === '90 Days') {
    const biweeklyData = new Map()
    
    completedTasks.forEach(task => {
      const taskDate = parseDate(task.dueDate)
      const month = taskDate.getMonth()
      const day = taskDate.getDate()
      const week = Math.ceil(day / 7)
      
      // Group weeks 1-2 and 3-4
      const weekGroup = week <= 2 ? '1-2' : '3-4'
      const periodKey = `${months[month]} WK${weekGroup}`
      biweeklyData.set(periodKey, (biweeklyData.get(periodKey) || 0) + 1)
    })
    
    // Generate all 2-week periods in the range
    const data = []
    const current = new Date(startDate)
    const seenPeriods = new Set()
    
    while (current <= currentDate) {
      const month = current.getMonth()
      const day = current.getDate()
      const week = Math.ceil(day / 7)
      const weekGroup = week <= 2 ? '1-2' : '3-4'
      const periodKey = `${months[month]} WK${weekGroup}`
      
      if (!seenPeriods.has(periodKey)) {
        seenPeriods.add(periodKey)
        data.push({
          period: periodKey,
          count: biweeklyData.get(periodKey) || 0
        })
      }
      
      // Move to next 2-week period
      current.setDate(current.getDate() + 14)
    }
    
    return data
  }
  
  // For 30 Days: Group by week (default)
  const weeklyData = new Map()
  
  completedTasks.forEach(task => {
    const taskDate = parseDate(task.dueDate)
    const month = taskDate.getMonth()
    const day = taskDate.getDate()
    const week = Math.ceil(day / 7)
    
    const periodKey = `${months[month]} WK${week}`
    weeklyData.set(periodKey, (weeklyData.get(periodKey) || 0) + 1)
  })
  
  // Generate all weeks in the range
  const data = []
  const current = new Date(startDate)
  
  while (current <= currentDate) {
    const month = current.getMonth()
    const week = Math.ceil(current.getDate() / 7)
    const periodKey = `${months[month]} WK${week}`
    
    if (!data.some(d => d.period === periodKey)) {
      data.push({
        period: periodKey,
        count: weeklyData.get(periodKey) || 0
      })
    }
    
    // Move to next week
    current.setDate(current.getDate() + 7)
  }
  
  return data
}

// ============================================
// BUDGET UTILIZATION
// ============================================

/**
 * Get cumulative budget and expenditure data for chart
 * - 30 Days: Weekly (e.g., "DEC WK1")
 * - 90 Days: Bi-weekly (e.g., "NOV WK1-2", "NOV WK3-4")
 * - 6 Months: Monthly (e.g., "JUL", "AUG")
 * Returns array of {period, budget, expenditure}
 */
export function getBudgetUtilizationData(timeRange, currentDate = new Date()) {
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
  const startDate = getFilterStartDate(timeRange, currentDate)
  
  // For 6 Months: Monthly aggregation
  if (timeRange === '6 Months') {
    const data = []
    const current = new Date(startDate)
    const seenMonths = new Set()
    
    while (current <= currentDate) {
      const month = current.getMonth()
      const periodKey = months[month]
      
      if (!seenMonths.has(periodKey)) {
        seenMonths.add(periodKey)
        
        // Get end of month or currentDate, whichever is earlier
        const monthEnd = new Date(current.getFullYear(), current.getMonth() + 1, 0)
        const endPoint = monthEnd < currentDate ? monthEnd : currentDate
        
        // Calculate cumulative budget and expenditure up to end of this month
        const projectsUpToMonth = projects.filter(p => {
          const issueDate = parseDate(p.issueDate)
          return issueDate && issueDate <= endPoint
        })
        
        const cumulativeBudget = projectsUpToMonth.reduce((sum, p) => sum + (p.allocatedBudget || 0), 0)
        const cumulativeExpenditure = projectsUpToMonth.reduce((sum, p) => sum + (p.expenditure || 0), 0)
        
        data.push({
          period: periodKey,
          budget: cumulativeBudget,
          expenditure: cumulativeExpenditure
        })
      }
      
      // Move to next month
      current.setMonth(current.getMonth() + 1)
      current.setDate(1)
    }
    
    return data
  }
  
  // For 90 Days: Bi-weekly aggregation
  if (timeRange === '90 Days') {
    const data = []
    const current = new Date(startDate)
    const seenPeriods = new Set()
    
    while (current <= currentDate) {
      const month = current.getMonth()
      const day = current.getDate()
      const week = Math.ceil(day / 7)
      const weekGroup = week <= 2 ? '1-2' : '3-4'
      const periodKey = `${months[month]} WK${weekGroup}`
      
      if (!seenPeriods.has(periodKey)) {
        seenPeriods.add(periodKey)
        
        // Calculate cumulative budget and expenditure up to this 2-week period
        const periodEnd = new Date(current)
        const projectsUpToPeriod = projects.filter(p => {
          const issueDate = parseDate(p.issueDate)
          return issueDate && issueDate <= periodEnd
        })
        
        const cumulativeBudget = projectsUpToPeriod.reduce((sum, p) => sum + (p.allocatedBudget || 0), 0)
        const cumulativeExpenditure = projectsUpToPeriod.reduce((sum, p) => sum + (p.expenditure || 0), 0)
        
        data.push({
          period: periodKey,
          budget: cumulativeBudget,
          expenditure: cumulativeExpenditure
        })
      }
      
      // Move to next 2-week period
      current.setDate(current.getDate() + 14)
    }
    
    return data
  }
  
  // For 30 Days: Weekly aggregation (default)
  const data = []
  const current = new Date(startDate)
  
  while (current <= currentDate) {
    const month = current.getMonth()
    const week = Math.ceil(current.getDate() / 7)
    const periodKey = `${months[month]} WK${week}`
    
    // Calculate cumulative budget and expenditure up to this week
    const weekEnd = new Date(current)
    const projectsUpToWeek = projects.filter(p => {
      const issueDate = parseDate(p.issueDate)
      return issueDate && issueDate <= weekEnd
    })
    
    const cumulativeBudget = projectsUpToWeek.reduce((sum, p) => sum + (p.allocatedBudget || 0), 0)
    const cumulativeExpenditure = projectsUpToWeek.reduce((sum, p) => sum + (p.expenditure || 0), 0)
    
    // Only add if not duplicate
    if (!data.some(d => d.period === periodKey)) {
      data.push({
        period: periodKey,
        budget: cumulativeBudget,
        expenditure: cumulativeExpenditure
      })
    }
    
    // Move to next week
    current.setDate(current.getDate() + 7)
  }
  
  return data
}

// ============================================
// TOP PRIORITY PROJECTS
// ============================================

/**
 * Get top priority (high priority) projects with details
 */
export function getTopPriorityProjects(limit = 10) {
  return projects
    .filter(p => p.priority === 'high priority')
    .slice(0, limit)
    .map(p => {
      // Get manager name from staff number
      let managerName = 'Unknown'
      if (p.projectManager && Array.isArray(p.projectManager) && p.projectManager.length > 0) {
        const staffNumber = p.projectManager[0]
        const user = users.find(u => u.staffNumber === staffNumber)
        managerName = user ? user.name : staffNumber
      }
      
      return {
        projectId: p.projectId,
        projectName: p.projectName,
        department: p.department,
        progress: p.progressCompletion,
        budgetHealth: p.budgetHealth,
        timelineHealth: p.timelineHealth,
        projectManager: managerName,
        tickets: p.projectTickets || []
      }
    })
}

// ============================================
// PENDING APPROVALS FOR TOP PROJECTS
// ============================================

/**
 * Get pending tickets for top priority projects
 */
export function getPendingApprovalsForTopProjects(currentDate = new Date()) {
  const topProjects = getTopPriorityProjects()
  
  // Get all project IDs from top priority projects
  const topProjectIds = new Set(topProjects.map(p => p.projectId))
  
  // Filter tickets that are pending and belong to top priority projects
  return tickets
    .filter(t => 
      t.status === 'Under Review' &&
      topProjectIds.has(t.projectId)
    )
    .map(t => {
      const ticketDate = parseDate(t.dateCreated)
      const daysSince = ticketDate 
        ? Math.floor((currentDate - ticketDate) / (1000 * 60 * 60 * 24))
        : 0
      
      // Find the project name and manager
      const project = topProjects.find(p => p.projectId === t.projectId)
      const projectName = project ? project.projectName : 'Unknown Project'
      const projectManager = project ? project.projectManager : 'Unknown Manager'
      
      return {
        ticketId: t.ticketId,
        ticketName: t.ticketName,
        projectId: t.projectId,
        projectName: projectName,
        category: t.category,
        manager: projectManager,
        status: t.status,
        daysSince,
        dateCreated: t.dateCreated
      }
    })
    .sort((a, b) => b.daysSince - a.daysSince) // Sort by oldest first
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Format large numbers with K/M suffix
 */
export function formatLargeNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

/**
 * Format currency (GHS)
 */
export function formatCurrency(amount) {
  return 'GH₵ ' + formatLargeNumber(amount)
}

/**
 * Get user name by ID
 */
export function getUserNameById(userId) {
  // This would import from users.js if needed
  // For now, return the userId
  return userId
}

export default {
  getTotalActiveProjects,
  getBehindScheduleCount,
  getProjectsAtRiskCount,
  getPeriodBudget,
  getPeriodExpenditure,
  getPendingApprovalsCount,
  getPortfolioHealth,
  getMilestoneDeliveryRate,
  getProductivityData,
  getBudgetUtilizationData,
  getTopPriorityProjects,
  getPendingApprovalsForTopProjects,
  formatLargeNumber,
  formatCurrency,
  getUserNameById
}
