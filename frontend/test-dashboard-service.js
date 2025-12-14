// Quick test of dashboard service
import * as dashboardService from './src/data/dashboardDataService.js'

console.log('Testing Dashboard Service...\n')

console.log('1. Total Active Projects:', dashboardService.getTotalActiveProjects())
console.log('2. Behind Schedule Count:', dashboardService.getBehindScheduleCount())
console.log('3. Projects At Risk Count:', dashboardService.getProjectsAtRiskCount())
console.log('4. Period Budget (30 Days):', dashboardService.getPeriodBudget('30 Days'))
console.log('5. Period Expenditure (30 Days):', dashboardService.getPeriodExpenditure('30 Days'))
console.log('6. Pending Approvals Count:', dashboardService.getPendingApprovalsCount())
console.log('7. Portfolio Health:', dashboardService.getPortfolioHealth())
console.log('8. Milestone Delivery Rate (30 Days):', dashboardService.getMilestoneDeliveryRate('30 Days'))
console.log('9. Top Priority Projects (first 3):', dashboardService.getTopPriorityProjects(3))
console.log('10. Pending Approvals For Top Projects:', dashboardService.getPendingApprovalsForTopProjects())
console.log('11. Productivity Data (30 Days):', dashboardService.getProductivityData('30 Days'))
console.log('12. Budget Utilization Data (30 Days):', dashboardService.getBudgetUtilizationData('30 Days'))
console.log('13. Productivity Data (90 Days):', dashboardService.getProductivityData('90 Days'))
console.log('14. Budget Utilization Data (90 Days):', dashboardService.getBudgetUtilizationData('90 Days'))

console.log('\nTest Complete!')
