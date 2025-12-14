// Test script to verify 6-month data coverage
import { projects } from './src/data/projects.js'
import { tasks } from './src/data/tasks.js'
import * as dashboardService from './src/data/dashboardDataService.js'

console.log('=== 6-MONTH DATA COVERAGE TEST ===\n')

const currentDate = new Date(2025, 11, 4) // Dec 4, 2025
const sixMonthsAgo = new Date(2025, 5, 4) // Jun 4, 2025

// Check projects issued in last 6 months
const recentProjects = projects.filter(p => {
  const issueDate = new Date(p.issueDate)
  return issueDate >= sixMonthsAgo && issueDate <= currentDate
})

console.log(`Projects issued in last 6 months: ${recentProjects.length}`)
recentProjects.forEach(p => {
  console.log(`  - ${p.projectId}: ${p.projectName} (${p.issueDate}) - Budget: ¢${(p.allocatedBudget/1000000).toFixed(1)}M, Spent: ¢${(p.expenditure/1000000).toFixed(1)}M`)
})

// Check completed tasks in last 6 months
const completedTasks = tasks.filter(t => {
  if (t.status?.toLowerCase() !== 'completed' || !t.dueDate) return false
  const dueDate = new Date(t.dueDate)
  return dueDate >= sixMonthsAgo && dueDate <= currentDate
})

console.log(`\nCompleted tasks in last 6 months: ${completedTasks.length}`)

// Group by month
const tasksByMonth = {}
completedTasks.forEach(t => {
  const date = new Date(t.dueDate)
  const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
  tasksByMonth[monthKey] = (tasksByMonth[monthKey] || 0) + 1
})

console.log('\nTasks by month:')
Object.keys(tasksByMonth).sort().forEach(month => {
  console.log(`  ${month}: ${tasksByMonth[month]} tasks`)
})

// Test productivity data for 6 months
console.log('\n=== PRODUCTIVITY DATA (6 Months) ===')
const productivityData = dashboardService.getProductivityData('6 Months', currentDate)
console.log(`Productivity data points: ${productivityData.length}`)
productivityData.forEach(d => {
  console.log(`  ${d.period}: ${d.count} tasks`)
})

// Test budget data for 6 months
console.log('\n=== BUDGET UTILIZATION DATA (6 Months) ===')
const budgetData = dashboardService.getBudgetUtilizationData('6 Months', currentDate)
console.log(`Budget data points: ${budgetData.length}`)
budgetData.forEach(d => {
  console.log(`  ${d.period}: Budget ¢${(d.budget/1000000).toFixed(1)}M, Expenditure ¢${(d.expenditure/1000000).toFixed(1)}M`)
})

console.log('\n=== TEST COMPLETE ===')
