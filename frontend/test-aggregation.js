// Test script to verify time-based aggregation for dashboard charts

import * as dashboardService from './src/data/dashboardDataService.js'

const currentDate = new Date(2025, 11, 4) // December 4, 2025

console.log('='.repeat(60))
console.log('DASHBOARD CHART AGGREGATION TEST')
console.log('Current Date:', currentDate.toDateString())
console.log('='.repeat(60))

// Test 30 Days filter (Weekly)
console.log('\n30 DAYS FILTER - WEEKLY AGGREGATION')
console.log('-'.repeat(60))
const productivity30 = dashboardService.getProductivityData('30 Days', currentDate)
const budget30 = dashboardService.getBudgetUtilizationData('30 Days', currentDate)

console.log('\nProductivity Data (30 Days):')
console.log(`Total periods: ${productivity30.length}`)
productivity30.forEach(item => {
  console.log(`  ${item.period}: ${item.count} tasks`)
})

console.log('\nBudget Data (30 Days):')
console.log(`Total periods: ${budget30.length}`)
budget30.forEach(item => {
  console.log(`  ${item.period}: Budget ¢${(item.budget / 1000000).toFixed(1)}M, Expenditure ¢${(item.expenditure / 1000000).toFixed(1)}M`)
})

// Test 90 Days filter (Bi-weekly)
console.log('\n\n90 DAYS FILTER - BI-WEEKLY AGGREGATION')
console.log('-'.repeat(60))
const productivity90 = dashboardService.getProductivityData('90 Days', currentDate)
const budget90 = dashboardService.getBudgetUtilizationData('90 Days', currentDate)

console.log('\nProductivity Data (90 Days):')
console.log(`Total periods: ${productivity90.length}`)
productivity90.forEach(item => {
  console.log(`  ${item.period}: ${item.count} tasks`)
})

console.log('\nBudget Data (90 Days):')
console.log(`Total periods: ${budget90.length}`)
budget90.forEach(item => {
  console.log(`  ${item.period}: Budget ¢${(item.budget / 1000000).toFixed(1)}M, Expenditure ¢${(item.expenditure / 1000000).toFixed(1)}M`)
})

// Test 6 Months filter (Monthly)
console.log('\n\n6 MONTHS FILTER - MONTHLY AGGREGATION')
console.log('-'.repeat(60))
const productivity6m = dashboardService.getProductivityData('6 Months', currentDate)
const budget6m = dashboardService.getBudgetUtilizationData('6 Months', currentDate)

console.log('\nProductivity Data (6 Months):')
console.log(`Total periods: ${productivity6m.length}`)
productivity6m.forEach(item => {
  console.log(`  ${item.period}: ${item.count} tasks`)
})

console.log('\nBudget Data (6 Months):')
console.log(`Total periods: ${budget6m.length}`)
budget6m.forEach(item => {
  console.log(`  ${item.period}: Budget ¢${(item.budget / 1000000).toFixed(1)}M, Expenditure ¢${(item.expenditure / 1000000).toFixed(1)}M`)
})

console.log('\n' + '='.repeat(60))
console.log('VERIFICATION SUMMARY')
console.log('='.repeat(60))
console.log(`30 Days: ${productivity30.length} periods (weekly format)`)
console.log(`  Example periods: ${productivity30.slice(0, 3).map(p => p.period).join(', ')}`)
console.log(`90 Days: ${productivity90.length} periods (bi-weekly format)`)
console.log(`  Example periods: ${productivity90.slice(0, 3).map(p => p.period).join(', ')}`)
console.log(`6 Months: ${productivity6m.length} periods (monthly format)`)
console.log(`  Example periods: ${productivity6m.slice(0, 3).map(p => p.period).join(', ')}`)
console.log('='.repeat(60))
