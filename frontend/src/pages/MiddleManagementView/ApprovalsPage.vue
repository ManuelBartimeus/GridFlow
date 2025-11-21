<template>
  <q-page class="approvals-page">
    <div class="page-container">
      <!-- Filters Section -->
      <div class="filters-bar row items-center justify-between q-mb-lg">
        <div class="row items-center q-gutter-sm">
          <q-select
            outlined
            dense
            v-model="priorityLevel"
            label="Priority Level"
            :options="priorityOptions"
            class="filter-select"
            bg-color="white"
          >
            <template v-slot:append>
              <q-icon name="keyboard_arrow_down" />
            </template>
          </q-select>

          <q-select
            outlined
            dense
            v-model="role"
            label="Role"
            :options="roleOptions"
            class="filter-select"
            bg-color="white"
          >
            <template v-slot:append>
              <q-icon name="keyboard_arrow_down" />
            </template>
          </q-select>

          <q-select
            outlined
            dense
            v-model="projectType"
            label="Project Type"
            :options="projectTypeOptions"
            class="filter-select"
            bg-color="white"
          >
            <template v-slot:append>
              <q-icon name="keyboard_arrow_down" />
            </template>
          </q-select>

          <q-btn
            outline
            dense
            label="Date Filter"
            icon="calendar_today"
            class="date-filter-btn"
          />
        </div>

        <div class="row items-center q-gutter-sm">
          <q-btn
            unelevated
            color="primary"
            label="Apply Filters"
            class="apply-btn"
            no-caps
          />
          <q-btn
            flat
            label="Clear"
            class="clear-btn"
            no-caps
          />
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="stats-row row q-gutter-md q-mb-lg">
        <div class="stat-card">
          <div class="stat-icon-container blue-icon">
            <q-icon name="description" size="20px" color="primary" />
          </div>
          <div class="stat-content">
            <div class="stat-value">128</div>
            <div class="stat-label">New</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon-container yellow-icon">
            <q-icon name="account_balance_wallet" size="20px" color="warning" />
          </div>
          <div class="stat-content">
            <div class="stat-value">12</div>
            <div class="stat-label">Budget Request</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon-container orange-icon">
            <q-icon name="event" size="20px" color="orange" />
          </div>
          <div class="stat-content">
            <div class="stat-value">21</div>
            <div class="stat-label">Timeline Request</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon-container green-icon">
            <q-icon name="check_circle" size="20px" color="positive" />
          </div>
          <div class="stat-content">
            <div class="stat-value">345</div>
            <div class="stat-label">Completed (Month)</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon-container red-icon">
            <q-icon name="cancel" size="20px" color="negative" />
          </div>
          <div class="stat-content">
            <div class="stat-value">8</div>
            <div class="stat-label">Rejected (Month)</div>
          </div>
        </div>
      </div>

      <!-- Approval Workload Distribution Chart -->
      <div class="chart-section q-mb-lg">
        <div class="section-title">Approval Workload Distribution</div>
        <div class="chart-container">
          <div class="chart-bars">
            <div v-for="week in weeklyData" :key="week.week" class="bar-group">
              <div class="bars-container">
                <div 
                  class="bar-segment approved"
                  :style="{ height: ((week.approved / maxValue) * 100) + '%' }"
                >
                  <div class="bar-value-label">{{ week.approved }}</div>
                </div>
                <div 
                  class="bar-segment pending"
                  :style="{ height: ((week.pending / maxValue) * 100) + '%' }"
                >
                  <div class="bar-value-label">{{ week.pending }}</div>
                </div>
                <div 
                  class="bar-segment rejected"
                  :style="{ height: ((week.rejected / maxValue) * 100) + '%' }"
                >
                  <div class="bar-value-label">{{ week.rejected }}</div>
                </div>
              </div>
              <div class="bar-label">{{ week.week }}</div>
            </div>
          </div>
          <div class="chart-legend">
            <div class="legend-item">
              <div class="legend-color approved"></div>
              <span>Approved</span>
            </div>
            <div class="legend-item">
              <div class="legend-color pending"></div>
              <span>Pending</span>
            </div>
            <div class="legend-item">
              <div class="legend-color rejected"></div>
              <span>Rejected</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Approval Queue Table -->
      <div class="queue-section q-mb-lg">
        <div class="section-title q-mb-md">Approval Queue</div>
        <q-table
          flat
          :rows="approvalRows"
          :columns="approvalColumns"
          row-key="id"
          :pagination="pagination"
          hide-pagination
          class="approval-table"
        >
          <template v-slot:body-cell-department="props">
            <q-td :props="props">
              <span class="department-link">{{ props.value }}</span>
            </q-td>
          </template>

          <template v-slot:body-cell-requestedBy="props">
            <q-td :props="props">
              <span class="text-grey-8">{{ props.value }}</span>
            </q-td>
          </template>

          <template v-slot:body-cell-assignedTo="props">
            <q-td :props="props">
              <span class="assigned-link">{{ props.value }}</span>
            </q-td>
          </template>

          <template v-slot:body-cell-submitted="props">
            <q-td :props="props">
              <span class="text-grey-7">{{ props.value }}</span>
            </q-td>
          </template>

          <template v-slot:body-cell-status="props">
            <q-td :props="props">
              <q-badge
                :color="getStatusColor(props.value)"
                :label="props.value"
                class="status-badge"
              />
            </q-td>
          </template>

          <template v-slot:body-cell-aging="props">
            <q-td :props="props">
              <span class="text-grey-7">{{ props.value }}</span>
            </q-td>
          </template>
        </q-table>

        <div class="table-footer row items-center justify-between q-mt-sm">
          <div class="text-caption text-grey-7">Showing 1 to 3 of 128 results</div>
          <div class="row items-center q-gutter-xs">
            <q-btn flat dense icon="chevron_left" size="sm" />
            <span class="text-caption text-grey-7">1 / 43</span>
            <q-btn flat dense icon="chevron_right" size="sm" />
          </div>
        </div>
      </div>

      <!-- Bottom Section with Escalations and Recent Activity -->
      <div class="row q-gutter-md">
        <!-- Escalations & Breaches -->
        <div class="col escalations-section">
          <div class="section-title q-mb-md">Escalations & Breaches</div>
          <q-table
            flat
            :rows="escalationRows"
            :columns="escalationColumns"
            row-key="id"
            hide-pagination
            class="escalation-table"
          >
            <template v-slot:body-cell-type="props">
              <q-td :props="props">
                <span class="type-link">{{ props.value }}</span>
              </q-td>
            </template>

            <template v-slot:body-cell-severity="props">
              <q-td :props="props">
                <q-badge
                  :color="getSeverityColor(props.value)"
                  :label="props.value"
                  class="severity-badge"
                />
              </q-td>
            </template>
          </q-table>
        </div>

        <!-- Recent Activity -->
        <div class="col-4 activity-section">
          <div class="section-title q-mb-md">Recent Activity</div>
          <div class="activity-list">
            <div v-for="activity in recentActivities" :key="activity.id" class="activity-item">
              <q-icon
                :name="activity.icon"
                :color="activity.iconColor"
                size="18px"
                class="activity-icon"
              />
              <div class="activity-content">
                <div class="activity-text">{{ activity.text }}</div>
                <div class="activity-time">{{ activity.time }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'ApprovalsPage',
  setup() {
    const priorityLevel = ref(null)
    const role = ref(null)
    const projectType = ref(null)

    const priorityOptions = ['High', 'Medium', 'Low']
    const roleOptions = ['Manager', 'Director', 'Supervisor']
    const projectTypeOptions = ['Infrastructure', 'Software', 'Research']

    const pagination = ref({
      rowsPerPage: 0
    })

    const weeklyData = ref([
      { week: 'Week 1', approved: 45, pending: 12, rejected: 8 },
      { week: 'Week 2', approved: 52, pending: 15, rejected: 6 },
      { week: 'Week 3', approved: 38, pending: 18, rejected: 10 },
      { week: 'Week 4', approved: 60, pending: 10, rejected: 5 },
      { week: 'Week 5', approved: 48, pending: 14, rejected: 7 },
      { week: 'Week 6', approved: 55, pending: 11, rejected: 9 }
    ])

    const maxValue = ref(75)

    const approvalColumns = [
      { name: 'approvalType', label: 'Approval Type', field: 'approvalType', align: 'left' },
      { name: 'projectName', label: 'Project Name', field: 'projectName', align: 'left' },
      { name: 'department', label: 'Department', field: 'department', align: 'left' },
      { name: 'requestedBy', label: 'Requested By', field: 'requestedBy', align: 'left' },
      { name: 'assignedTo', label: 'Assigned To', field: 'assignedTo', align: 'left' },
      { name: 'submitted', label: 'Submitted', field: 'submitted', align: 'left' },
      { name: 'status', label: 'Status', field: 'status', align: 'left' },
      { name: 'aging', label: 'Aging', field: 'aging', align: 'left' }
    ]

    const approvalRows = [
      {
        id: 1,
        approvalType: 'Budget Adjustment',
        projectName: 'Project Phoenix',
        department: 'Engineering',
        requestedBy: 'Samantha Lee',
        assignedTo: 'David Chen',
        submitted: '3 days ago',
        status: 'Approved',
        aging: '3 days'
      },
      {
        id: 2,
        approvalType: 'Timeline Change',
        projectName: 'Project Titan',
        department: 'Marketing',
        requestedBy: 'Alex Johnson',
        assignedTo: 'Maria Garcia',
        submitted: '6 days ago',
        status: 'Pending',
        aging: '6 days'
      },
      {
        id: 3,
        approvalType: 'Project Initiation',
        projectName: 'Project Nova',
        department: 'Finance',
        requestedBy: 'Emily White',
        assignedTo: 'James Brown',
        submitted: '11 days ago',
        status: 'Expired',
        aging: '11 days'
      }
    ]

    const escalationColumns = [
      { name: 'projectName', label: 'Project Name', field: 'projectName', align: 'left' },
      { name: 'type', label: 'Type', field: 'type', align: 'left' },
      { name: 'daysOverdue', label: 'Days Overdue', field: 'daysOverdue', align: 'left' },
      { name: 'severity', label: 'Severity', field: 'severity', align: 'left' }
    ]

    const escalationRows = [
      {
        id: 1,
        projectName: 'Project Nova',
        type: 'Project Initiation',
        daysOverdue: 1,
        severity: 'High'
      },
      {
        id: 2,
        projectName: 'Project Apollo',
        type: 'Document Upload',
        daysOverdue: 4,
        severity: 'Medium'
      }
    ]

    const recentActivities = [
      {
        id: 1,
        icon: 'check_circle',
        iconColor: 'positive',
        text: 'James Miller approved Budget for Project Orion.',
        time: '2 hours ago'
      },
      {
        id: 2,
        icon: 'cancel',
        iconColor: 'negative',
        text: 'Laura Wilson rejected Milestone for Project Gemini.',
        time: '1 day ago'
      },
      {
        id: 3,
        icon: 'chat_bubble',
        iconColor: 'primary',
        text: 'David Chen requested changes on Timeline for Project Phoenix.',
        time: '3 days ago'
      }
    ]

    const getStatusColor = (status) => {
      const statusMap = {
        'Approved': 'positive',
        'Pending': 'warning',
        'Expired': 'negative'
      }
      return statusMap[status] || 'grey'
    }

    const getSeverityColor = (severity) => {
      const severityMap = {
        'High': 'negative',
        'Medium': 'warning',
        'Low': 'info'
      }
      return severityMap[severity] || 'grey'
    }

    return {
      priorityLevel,
      role,
      projectType,
      priorityOptions,
      roleOptions,
      projectTypeOptions,
      pagination,
      weeklyData,
      maxValue,
      approvalColumns,
      approvalRows,
      escalationColumns,
      escalationRows,
      recentActivities,
      getStatusColor,
      getSeverityColor
    }
  }
}
</script>

<style scoped>
.approvals-page {
  background: #f3f4f6;
  min-height: 100vh;
  font-family: 'Montserrat', sans-serif;
}

.page-container {
  max-width: 100%;
  padding: 0;
}

/* Filters Bar */
.filters-bar {
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
  padding: 12px 16px;
  gap: 8px;
}

.filter-select {
  min-width: 160px;
}

.filter-select :deep(.q-field__control) {
  border-radius: 10px !important;
}

.date-filter-btn {
  border-radius: 10px;
  font-size: 13px;
  text-transform: none;
  padding: 8px 16px;
}

.apply-btn {
  border-radius: 10px !important;
  font-family: 'Montserrat', sans-serif;
  padding: 8px 24px;
}

.clear-btn {
  font-size: 13px;
  color: #6b7280;
}

/* Stats Cards */
.stats-row {
  display: flex;
  flex-wrap: wrap;
  padding: 0 24px;
  margin-top: 24px;
  margin-bottom: 24px;
}

.stat-card {
  background: white;
  border-radius: 16px;
  border: 1px solid #e5e7eb;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
  min-width: 180px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.2s;
}

.stat-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.stat-icon-container {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.blue-icon {
  background: #dbeafe;
}

.yellow-icon {
  background: #fef3c7;
}

.orange-icon {
  background: #fed7aa;
}

.red-icon {
  background: #fee2e2;
}

.green-icon {
  background: #d1fae5;
}

.stat-content {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
  color: #1f2937;
  line-height: 1;
  margin-bottom: 4px;
  font-family: 'Montserrat', sans-serif;
}

.stat-label {
  font-size: 12px;
  color: #6b7280;
  font-weight: 500;
  font-family: 'Montserrat', sans-serif;
}

/* Chart Section */
.chart-section {
  background: white;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  margin: 0 24px 24px 24px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  font-family: 'Montserrat', sans-serif;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
}

.chart-container {
  padding: 16px 0;
}

.chart-bars {
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  height: 350px;
  padding: 30px 20px 40px;
  border-bottom: 2px solid #e5e7eb;
  gap: 20px;
  position: relative;
}

.bar-group {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  min-width: 120px;
}

.bars-container {
  width: 100%;
  height: 320px;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
  gap: 6px;
}

.bar-segment {
  width: 32px;
  border-radius: 6px 6px 0 0;
  transition: all 0.3s ease;
  position: relative;
}

.bar-segment:hover {
  opacity: 0.85;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.bar-segment.approved {
  background: #93c5fd;
}

.bar-segment.pending {
  background: #a7f3d0;
}

.bar-segment.rejected {
  background: #ddd6fe;
}

.bar-value-label {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 11px;
  font-weight: 600;
  color: #374151;
  font-family: 'Montserrat', sans-serif;
  white-space: nowrap;
}

.bar-label {
  font-size: 12px;
  color: #6b7280;
  font-weight: 500;
  font-family: 'Montserrat', sans-serif;
  text-align: center;
  margin-top: 8px;
}

.chart-legend {
  display: flex;
  justify-content: center;
  gap: 32px;
  margin-top: 20px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.legend-color {
  width: 16px;
  height: 16px;
  border-radius: 4px;
}

.legend-color.approved {
  background: #93c5fd;
}

.legend-color.pending {
  background: #a7f3d0;
}

.legend-color.rejected {
  background: #ddd6fe;
}

.legend-item span {
  font-size: 13px;
  color: #374151;
  font-weight: 500;
  font-family: 'Montserrat', sans-serif;
}

/* Queue Section */
.queue-section {
  background: white;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  margin: 0 24px 24px 24px;
}

.approval-table {
  box-shadow: none;
}

.approval-table :deep(thead) {
  background: #f9fafb;
}

.approval-table :deep(th) {
  font-size: 12px;
  font-weight: 600;
  color: #6b7280;
  font-family: 'Montserrat', sans-serif;
  text-transform: none;
  padding: 12px 16px;
}

.approval-table :deep(td) {
  font-size: 13px;
  padding: 14px 16px;
  color: #374151;
  font-family: 'Montserrat', sans-serif;
}

.department-link {
  color: #3b82f6;
  cursor: pointer;
  font-weight: 500;
  font-family: 'Montserrat', sans-serif;
}

.assigned-link {
  color: #3b82f6;
  cursor: pointer;
  font-family: 'Montserrat', sans-serif;
}

.status-badge {
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 500;
  font-family: 'Montserrat', sans-serif;
}

.table-footer {
  padding: 12px 0;
  font-family: 'Montserrat', sans-serif;
}

/* Escalations Section */
.escalations-section {
  background: white;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  margin-left: 24px;
}

.escalation-table {
  box-shadow: none;
}

.escalation-table :deep(thead) {
  background: #f9fafb;
}

.escalation-table :deep(th) {
  font-size: 12px;
  font-weight: 600;
  color: #6b7280;
  font-family: 'Montserrat', sans-serif;
  text-transform: none;
  padding: 12px 16px;
}

.escalation-table :deep(td) {
  font-size: 13px;
  padding: 14px 16px;
  color: #374151;
  font-family: 'Montserrat', sans-serif;
}

.type-link {
  color: #3b82f6;
  cursor: pointer;
  font-family: 'Montserrat', sans-serif;
}

.severity-badge {
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 500;
  font-family: 'Montserrat', sans-serif;
}

/* Activity Section */
.activity-section {
  background: white;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  margin-right: 24px;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.activity-item {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.activity-icon {
  margin-top: 2px;
}

.activity-content {
  flex: 1;
}

.activity-text {
  font-size: 13px;
  color: #374151;
  font-family: 'Montserrat', sans-serif;
  line-height: 1.5;
  margin-bottom: 4px;
}

.activity-time {
  font-size: 11px;
  color: #9ca3af;
  font-family: 'Montserrat', sans-serif;
}
</style>
