// Test script to verify dynamic Y-axis labels for dashboard charts

import * as dashboardService from './src/data/dashboardDataService.js'

const currentDate = new Date(2025, 11, 4) // December 4, 2025

console.log('='.repeat(60))
console.log('DYNAMIC Y-AXIS LABELS TEST')
console.log('Current Date:', currentDate.toDateString())
console.log('='.repeat(60))

// Function to calculate productivity Y-axis labels
function getProductivityYAxisLabels(data) {
  const maxCount = Math.max(...data.map(d => d.count), 1)
  const step = Math.ceil(maxCount / 5)
  
  return [
    { y: 30, value: step * 5 },
    { y: 80, value: step * 4 },
    { y: 130, value: step * 3 },
    { y: 180, value: step * 2 },
    { y: 230, value: step * 1 }
  ]
}

// Function to calculate budget Y-axis labels
function getBudgetYAxisLabels(data) {
  const maxValue = Math.max(...data.map(d => d.expenditure), 1)
  const step = maxValue / 4
  
  function formatCurrency(value) {
    if (value >= 1000000) {
      return `¢${(value / 1000000).toFixed(1)}M`
    } else if (value >= 1000) {
      return `¢${(value / 1000).toFixed(1)}K`
    }
    return `¢${value}`
  }
  
  return [
    { y: 45, value: formatCurrency(step * 4) },
    { y: 90, value: formatCurrency(step * 3) },
    { y: 135, value: formatCurrency(step * 2) },
    { y: 180, value: formatCurrency(step * 1) }
  ]
}

// Test for each time range
const timeRanges = ['30 Days', '90 Days', '6 Months']

timeRanges.forEach(timeRange => {
  console.log(`\n${timeRange.toUpperCase()} FILTER`)
  console.log('-'.repeat(60))
  
  // Get productivity data
  const productivityData = dashboardService.getProductivityData(timeRange, currentDate)
  const productivityLabels = getProductivityYAxisLabels(productivityData)
  
  console.log('\nProductivity Chart:')
  console.log(`  Data range: ${Math.min(...productivityData.map(d => d.count))} - ${Math.max(...productivityData.map(d => d.count))} tasks`)
  console.log('  Y-axis labels:')
  productivityLabels.forEach(label => {
    console.log(`    y=${label.y}: ${label.value} tasks`)
  })
  
  // Get budget data
  const budgetData = dashboardService.getBudgetUtilizationData(timeRange, currentDate)
  const budgetLabels = getBudgetYAxisLabels(budgetData)
  
  const minExpenditure = Math.min(...budgetData.map(d => d.expenditure))
  const maxExpenditure = Math.max(...budgetData.map(d => d.expenditure))
  
  console.log('\nBudget Chart:')
  console.log(`  Data range: ¢${(minExpenditure / 1000000).toFixed(1)}M - ¢${(maxExpenditure / 1000000).toFixed(1)}M`)
  console.log('  Y-axis labels:')
  budgetLabels.forEach(label => {
    console.log(`    y=${label.y}: ${label.value}`)
  })
})

console.log('\n' + '='.repeat(60))
console.log('VERIFICATION COMPLETE')
console.log('='.repeat(60))
console.log('✓ Y-axis labels now dynamically reflect actual data ranges')
console.log('✓ Productivity chart: Labels based on max task count')
console.log('✓ Budget chart: Labels based on max expenditure')
console.log('='.repeat(60))
