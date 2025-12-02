<template>
  <q-dialog :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)">
    <q-card class="project-details-card" style="width: 90vw; max-width: 1400px; height: 90vh;">
      <q-card-section class="project-details-header row items-center q-pa-md">
        <div class="col">
          <div class="project-details-title">{{ project?.title }}</div>
          <div class="project-details-dates">{{ project?.startDate }} → {{ project?.endDate }}</div>
        </div>
        <q-btn flat round dense icon="close" @click="$emit('update:modelValue', false)" />
      </q-card-section>

      <q-separator />

      <q-card-section class="project-details-content">
        <div class="details-grid">
          <!-- Left Column -->
          <div class="details-left-column">
            <!-- Timeline & Tasks -->
            <div class="details-section">
              <div class="section-title">
                <q-icon name="timeline" color="blue-7" size="20px" class="q-mr-sm" />
                Timeline & Tasks
              </div>
              <!-- Gantt Chart -->
              <div v-if="!project?.tasks || project.tasks.length === 0" class="gantt-chart-empty">
                <div class="gantt-timeline-header">
                  <div class="gantt-project-dates">
                    <span class="gantt-start-date">{{ project?.startDate }}</span>
                    <span class="gantt-date-separator">—</span>
                    <span class="gantt-end-date">{{ project?.endDate }}</span>
                  </div>
                </div>
                <div class="gantt-empty-state">
                  <q-icon name="calendar_today" size="48px" color="grey-5" />
                  <div class="gantt-empty-text">No timeline milestones added yet</div>
                  <div class="gantt-empty-subtext">Add tasks to visualize project timeline</div>
                </div>
              </div>
              
              <!-- Timeline Stats -->
              <div class="timeline-stats row q-gutter-md q-mt-md">
                <div class="stat-item">
                  <div class="stat-label">Resolved Time</div>
                  <div class="stat-value">12 Weeks</div>
                </div>
                <div class="stat-item">
                  <div class="stat-label">Actual Logged Time</div>
                  <div class="stat-value">7 Weeks, 3 Days</div>
                </div>
                <div class="stat-item">
                  <div class="stat-label">Time Left</div>
                  <div class="stat-value">4 Weeks, 5 Days</div>
                </div>
              </div>

              <!-- Sprint List -->
              <div class="task-list q-mt-md">
                <div class="task-header row items-center q-py-sm">
                  <div class="col-5 text-weight-medium">SPRINT NAME</div>
                  <div class="col-4 text-weight-medium">DATES</div>
                  <div class="col-3 text-weight-medium">PROGRESS</div>
                </div>
                <div class="task-row row items-center q-py-sm" v-for="task in project?.tasks" :key="task.name">
                  <div class="col-5">{{ task.name }}</div>
                  <div class="col-4 text-grey-7">{{ task.dates }}</div>
                  <div class="col-3 text-grey-7">{{ task.progress || 0 }}%</div>
                </div>
              </div>
            </div>

            <!-- Financials -->
            <div class="details-section q-mt-md">
              <div class="section-title">
                <q-icon name="payments" color="green-7" size="20px" class="q-mr-sm" />
                Financials
              </div>
              <div class="financial-stats row q-gutter-md">
                <div class="financial-item">
                  <div class="financial-label">Allocated Budget</div>
                  <div class="financial-value">$250,000</div>
                </div>
                <div class="financial-item">
                  <div class="financial-label">Expenditure</div>
                  <div class="financial-value">$112,500</div>
                </div>
                <div class="financial-item">
                  <div class="financial-label">Remaining</div>
                  <div class="financial-value">$137,500</div>
                </div>
                <div class="financial-item">
                  <div class="financial-label">Burn Rate</div>
                  <div class="financial-value text-red-8">45%</div>
                </div>
              </div>

              <!-- Entry List -->
              <div class="entry-list q-mt-md">
                <div class="entry-header row items-center q-py-sm">
                  <div class="col-6 text-weight-medium">ENTRY</div>
                  <div class="col-3 text-weight-medium">AMOUNT</div>
                  <div class="col-3 text-weight-medium">DATE</div>
                </div>
                <div class="entry-row row items-center q-py-sm" v-for="entry in sampleEntries" :key="entry.name">
                  <div class="col-6">{{ entry.name }}</div>
                  <div class="col-3 text-grey-7">{{ entry.amount }}</div>
                  <div class="col-3 text-grey-7">{{ entry.date }}</div>
                </div>
              </div>
            </div>

            <!-- Project Linkages -->
            <div class="details-section q-mt-md">
              <div class="section-title">
                <q-icon name="account_tree" color="purple-7" size="20px" class="q-mr-sm" />
                Project Linkages
              </div>

              <!-- Linkage List -->
              <div class="linkage-list q-mt-md">
                <div class="linkage-header row items-center q-py-sm">
                  <div class="col-4 text-weight-medium">NAME</div>
                  <div class="col-4 text-weight-medium">RELATIONSHIP</div>
                  <div class="col-2 text-weight-medium">STATUS</div>
                  <div class="col-2 text-weight-medium">OWNER</div>
                </div>
                <div class="linkage-row row items-center q-py-sm" v-for="link in sampleLinkages" :key="link.name">
                  <div class="col-4">{{ link.name }}</div>
                  <div class="col-4 text-grey-7">{{ link.relationship }}</div>
                  <div class="col-2">
                    <q-badge :color="link.statusColor" :text-color="link.statusTextColor" :label="link.status" class="status-badge" />
                  </div>
                  <div class="col-2 text-grey-7">{{ link.owner }}</div>
                </div>
              </div>
            </div>

            <!-- Project Members -->
            <div class="details-section q-mt-md">
              <div class="section-title row items-center justify-between">
                <div class="row items-center">
                  <q-icon name="people" color="teal-7" size="20px" class="q-mr-sm" />
                  <span>Project Members</span>
                </div>
                <q-btn
                  flat
                  dense
                  round
                  icon="add"
                  color="primary"
                  size="sm"
                  @click="startAddingMember"
                  class="add-member-btn"
                />
              </div>
              <div class="members-list">
                <!-- Existing members -->
                <div class="member-item row items-center justify-between q-py-sm" v-for="member in sampleMembers" :key="member.id">
                  <div class="member-info">
                    <div class="member-name">{{ member.name }}</div>
                    <div class="member-role text-grey-7">{{ member.role }}</div>
                  </div>
                  <q-btn
                    flat
                    round
                    dense
                    icon="delete"
                    color="negative"
                    size="sm"
                    @click="deleteMember(member.id)"
                    class="delete-member-btn"
                  />
                </div>

                <!-- New member input row -->
                <div v-if="isAddingMember" class="member-item-add row items-center justify-between q-py-sm">
                  <q-select
                    v-model="newMember"
                    :options="availableEmployees"
                    option-value="id"
                    option-label="name"
                    outlined
                    dense
                    placeholder="Select employee"
                    bg-color="white"
                    class="new-member-select"
                    @update:model-value="onEmployeeSelected"
                  >
                    <template v-slot:prepend>
                      <q-icon name="person_add" />
                    </template>
                  </q-select>
                  <div class="member-actions row q-gutter-xs">
                    <q-btn
                      flat
                      round
                      dense
                      icon="check"
                      color="positive"
                      size="sm"
                      @click="confirmAddMember"
                      :disable="!newMember"
                      class="confirm-btn"
                    />
                    <q-btn
                      flat
                      round
                      dense
                      icon="close"
                      color="negative"
                      size="sm"
                      @click="cancelAddMember"
                      class="cancel-btn"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Documents & Files -->
            <div class="details-section q-mt-md">
              <div class="section-title">
                <q-icon name="folder_open" color="orange-7" size="20px" class="q-mr-sm" />
                Documents & Files
              </div>
              <div class="row items-center q-mb-md">
                <q-input 
                  outlined 
                  dense 
                  placeholder="Search files..." 
                  class="col-grow q-mr-sm"
                  bg-color="white"
                >
                  <template v-slot:prepend>
                    <q-icon name="search" size="18px" />
                  </template>
                </q-input>
                <q-btn outline dense label="Filters" icon="filter_list" color="grey-7" />
              </div>

              <div class="files-grid row q-gutter-md">
                <div class="file-card" v-for="file in sampleFiles" :key="file.name">
                  <q-icon :name="file.icon" size="32px" color="primary" />
                  <div class="file-name q-mt-sm">{{ file.name }}</div>
                  <div class="file-size text-grey-7">{{ file.size }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column -->
          <div class="details-right-column">
            <!-- Project Status -->
            <div class="details-section">
              <div class="section-title">
                <q-icon name="flag" color="red-7" size="20px" class="q-mr-sm" />
                Project Status
              </div>
              <div class="status-item q-mb-sm">
                <div class="status-label">Current Status</div>
                <q-badge color="blue-1" text-color="blue-8" label="In Progress" class="status-badge-large" />
              </div>
              <div class="status-item">
                <div class="status-label">Health</div>
                <q-badge color="orange-1" text-color="orange-8" label="At Risk" class="status-badge-large" />
              </div>
            </div>

            <!-- Progress Completion -->
            <div class="details-section q-mt-md">
              <div class="section-title">
                <q-icon name="show_chart" color="teal-7" size="20px" class="q-mr-sm" />
                Progress Completion
              </div>
              <div class="progress-percentage">{{ project?.progress }}%</div>
              <q-linear-progress
                :value="(project?.progress || 0) / 100"
                color="primary"
                track-color="grey-3"
                size="12px"
                class="progress-bar-large"
              />
            </div>

            <!-- Description & Strategic Context -->
            <div class="details-section q-mt-md">
              <div class="section-title">
                <q-icon name="description" color="indigo-7" size="20px" class="q-mr-sm" />
                Description & Strategic Context
              </div>
              <div class="description-text">
                This section contains the full project description, outlining the primary objectives, scope summary,
                and key constraints and assumptions. The content is designed to provide a comprehensive
                understanding of the project's strategic importance and its intended outcomes,
                ensuring all stakeholders are aligned. It details the business case, success criteria, and how this
                initiative ties into the broader organizational goals for the quarter.
              </div>
            </div>

            <!-- Project Data -->
            <div class="details-section q-mt-md">
              <div class="section-title">
                <q-icon name="data_usage" color="cyan-7" size="20px" class="q-mr-sm" />
                Project Data
              </div>
              <div class="data-item">
                <div class="data-label">Priority</div>
                <q-badge color="red-1" text-color="red-8" label="High Priority" class="status-badge-large" />
              </div>
              <div class="data-item">
                <div class="data-label">Department</div>
                <div class="data-value">{{ project?.tags[0] || 'Engineering' }}</div>
              </div>
              <div class="data-item">
                <div class="data-label">Section</div>
                <div class="data-value">{{ project?.tags[1] || 'Mechanical' }}</div>
              </div>
              <div class="data-item">
                <div class="data-label">Unit</div>
                <div class="data-value">{{ project?.tags[2] || 'Automotive' }}</div>
              </div>
              <div class="data-item">
                <div class="data-label">Project Type</div>
                <div class="data-value">Linked</div>
              </div>
            </div>

            <!-- Project Management -->
            <div class="details-section q-mt-md">
              <div class="section-title">
                <q-icon name="groups" color="pink-7" size="20px" class="q-mr-sm" />
                Project Management
              </div>
              <div class="role-item" v-for="role in sampleRoles" :key="role.title">
                <div class="role-title">{{ role.title }}</div>
                <div class="role-name">{{ role.name }}</div>
              </div>
            </div>

            <!-- Project Tickets -->
            <div class="details-section q-mt-md">
              <div class="section-title">
                <q-icon name="confirmation_number" color="amber-7" size="20px" class="q-mr-sm" />
                Project Tickets
              </div>
              <div class="ticket-list">
                <div class="ticket-header row items-center q-py-sm">
                  <div class="col-5 text-weight-medium">TICKET NAME</div>
                  <div class="col-4 text-weight-medium">STATUS</div>
                  <div class="col-3 text-weight-medium">FROM</div>
                </div>
                <div class="ticket-row row items-center q-py-sm" v-for="ticket in sampleTickets" :key="ticket.name">
                  <div class="col-5 text-primary">{{ ticket.name }}</div>
                  <div class="col-4">
                    <q-badge :color="ticket.statusColor" :text-color="ticket.statusTextColor" :label="ticket.status" class="status-badge" />
                  </div>
                  <div class="col-3 text-grey-7">{{ ticket.from }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'ProjectDetailsDialog',
  props: {
    modelValue: {
      type: Boolean,
      required: true
    },
    project: {
      type: Object,
      default: null
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      isAddingMember: false,
      newMember: null,
      nextMemberId: 6,
      availableEmployees: [
        { id: 101, name: 'Sarah Johnson', role: 'Project Owner' },
        { id: 102, name: 'Michael Chen', role: 'Technical Lead' },
        { id: 103, name: 'Emma Davis', role: 'Project Manager' },
        { id: 104, name: 'David Rodriguez', role: 'QA Engineer' },
        { id: 105, name: 'Lisa Anderson', role: 'Developer' },
        { id: 106, name: 'James Smith', role: 'Business Analyst' },
        { id: 107, name: 'Patricia Brown', role: 'UX Designer' },
        { id: 108, name: 'Robert Taylor', role: 'DevOps Engineer' },
        { id: 109, name: 'Jennifer Wilson', role: 'Data Analyst' },
        { id: 110, name: 'William Martinez', role: 'QA Tester' }
      ],
      sampleEntries: [
        { name: 'Hardware Components', amount: '$42,000', date: 'Sep 12, 2024' },
        { name: 'Software Licenses', amount: '$18,500', date: 'Sep 5, 2024' },
        { name: 'Consulting Services', amount: '$35,000', date: 'Aug 28, 2024' },
        { name: 'Lab Equipment', amount: '$17,000', date: 'Aug 15, 2024' }
      ],
      sampleLinkages: [
        { name: 'Infrastructure Upgrade', relationship: 'Depends On', status: 'In Progress', statusColor: 'blue-1', statusTextColor: 'blue-8', owner: 'Engineering' },
        { name: 'Security Audit', relationship: 'Related To', status: 'Complete', statusColor: 'green-1', statusTextColor: 'green-8', owner: 'IT Security' },
        { name: 'Budget Approval', relationship: 'Blocks', status: 'Pending', statusColor: 'orange-1', statusTextColor: 'orange-8', owner: 'Finance' }
      ],
      sampleMembers: [
        { id: 1, name: 'Sarah Johnson', role: 'Project Owner' },
        { id: 2, name: 'Michael Chen', role: 'Technical Lead' },
        { id: 3, name: 'Emma Davis', role: 'Project Manager' },
        { id: 4, name: 'David Rodriguez', role: 'QA Engineer' },
        { id: 5, name: 'Lisa Anderson', role: 'Developer' }
      ],
      sampleFiles: [
        { name: 'Project Charter.pdf', size: '2.4 MB', icon: 'description' },
        { name: 'Technical Specs.docx', size: '1.8 MB', icon: 'article' },
        { name: 'Budget Plan.xlsx', size: '856 KB', icon: 'table_chart' },
        { name: 'Presentation.pptx', size: '4.2 MB', icon: 'slideshow' }
      ],
      sampleRoles: [
        { title: 'Project Owner', name: 'Sarah Johnson' },
        { title: 'Project Sponsor', name: 'Michael Chen' },
        { title: 'Project Manager', name: 'Emma Davis' },
        { title: 'Team Lead', name: 'David Rodriguez' }
      ],
      sampleTickets: [
        { name: 'Budget Increase Request', status: 'Open', statusColor: 'orange-1', statusTextColor: 'orange-8', from: 'Finance' },
        { name: 'Resource Allocation', status: 'In Review', statusColor: 'blue-1', statusTextColor: 'blue-8', from: 'HR' },
        { name: 'Timeline Extension', status: 'Closed', statusColor: 'grey-3', statusTextColor: 'grey-8', from: 'PMO' }
      ]
    }
  },
  methods: {
    startAddingMember() {
      this.isAddingMember = true
      this.newMember = null
    },
    onEmployeeSelected(employee) {
      // Employee is selected, can be used for additional logic if needed
      this.newMember = employee
    },
    confirmAddMember() {
      if (this.newMember) {
        // Check if employee is already a member
        const isAlreadyMember = this.sampleMembers.some(m => m.id === this.newMember.id)
        if (!isAlreadyMember) {
          // Add new member
          this.sampleMembers.push({
            id: this.newMember.id,
            name: this.newMember.name,
            role: this.newMember.role
          })
        }
        this.cancelAddMember()
      }
    },
    cancelAddMember() {
      this.isAddingMember = false
      this.newMember = null
    },
    deleteMember(memberId) {
      const index = this.sampleMembers.findIndex(member => member.id === memberId)
      if (index > -1) {
        this.sampleMembers.splice(index, 1)
      }
    }
  }
}
</script>

<style scoped>
.project-details-card {
  background: #f3f4f6;
  font-family: 'Montserrat', sans-serif;
}

.project-details-header {
  background: white;
  border-bottom: 1px solid #e5e7eb;
}

.project-details-title {
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
  font-family: 'Montserrat', sans-serif;
}

.project-details-dates {
  font-size: 13px;
  color: #6b7280;
  font-family: 'Montserrat', sans-serif;
  margin-top: 4px;
}

.project-details-content {
  padding: 24px;
  height: calc(85vh - 80px);
  overflow-y: auto;
}

.details-grid {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 24px;
}

.details-section {
  background: white;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
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

/* Gantt Chart */
.gantt-chart-empty {
  background: #f9fafb;
  border: 1px dashed #d1d5db;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 16px;
  min-height: 200px;
}

.gantt-timeline-header {
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #e5e7eb;
}

.gantt-project-dates {
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: 'Montserrat', sans-serif;
}

.gantt-start-date,
.gantt-end-date {
  font-size: 13px;
  font-weight: 600;
  color: #1f2937;
  padding: 6px 12px;
  background: white;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
}

.gantt-date-separator {
  color: #9ca3af;
  font-size: 14px;
  font-weight: 500;
}

.gantt-empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
}

.gantt-empty-text {
  font-size: 14px;
  font-weight: 500;
  color: #6b7280;
  font-family: 'Montserrat', sans-serif;
  margin-top: 16px;
}

.gantt-empty-subtext {
  font-size: 13px;
  color: #9ca3af;
  font-family: 'Montserrat', sans-serif;
  margin-top: 8px;
}

.gantt-chart-container {
  margin-bottom: 16px;
}

.gantt-chart {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
  margin-top: 16px;
}

.gantt-timeline {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 16px;
  padding-bottom: 12px;
  border-bottom: 2px solid #e5e7eb;
  margin-bottom: 12px;
}

.gantt-timeline-label {
  font-size: 12px;
  font-weight: 600;
  color: #6b7280;
  font-family: 'Montserrat', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.gantt-timeline-months {
  display: flex;
  justify-content: space-between;
}

.gantt-month {
  font-size: 11px;
  font-weight: 600;
  color: #6b7280;
  font-family: 'Montserrat', sans-serif;
  text-align: center;
  flex: 1;
}

.gantt-task-row {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 16px;
  margin-bottom: 12px;
}

.gantt-task-label {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.gantt-task-name {
  font-size: 13px;
  font-weight: 500;
  color: #1f2937;
  font-family: 'Montserrat', sans-serif;
}

.gantt-task-dates {
  font-size: 11px;
  color: #9ca3af;
  font-family: 'Montserrat', sans-serif;
  margin-top: 2px;
}

.gantt-task-timeline {
  position: relative;
  height: 40px;
  display: flex;
  align-items: center;
}

.gantt-task-bar-container {
  position: relative;
  width: 100%;
  height: 24px;
  background: #e5e7eb;
  border-radius: 4px;
}

.gantt-task-bar {
  position: absolute;
  height: 100%;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.gantt-task-bar:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.gantt-task-duration {
  font-size: 10px;
  font-weight: 600;
  color: white;
  font-family: 'Montserrat', sans-serif;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

/* Timeline Stats */
.timeline-stats {
  display: flex;
  justify-content: space-between;
  padding: 16px;
  background: #f9fafb;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.stat-item {
  text-align: center;
}

.stat-label {
  font-size: 11px;
  color: #6b7280;
  font-family: 'Montserrat', sans-serif;
  margin-bottom: 4px;
}

.stat-value {
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
  font-family: 'Montserrat', sans-serif;
}

/* Task List */
.task-list {
  background: #f9fafb;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  padding: 8px 16px;
}

.task-header {
  font-size: 11px;
  color: #6b7280;
  font-family: 'Montserrat', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 1px solid #e5e7eb;
}

.task-row {
  font-size: 13px;
  color: #1f2937;
  font-family: 'Montserrat', sans-serif;
  border-bottom: 1px solid #f3f4f6;
}

.task-row:last-child {
  border-bottom: none;
}

/* Financial Stats */
.financial-stats {
  display: flex;
  justify-content: space-between;
  padding: 16px;
  background: #f9fafb;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.financial-item {
  text-align: center;
}

.financial-label {
  font-size: 11px;
  color: #6b7280;
  font-family: 'Montserrat', sans-serif;
  margin-bottom: 4px;
}

.financial-value {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  font-family: 'Montserrat', sans-serif;
}

/* Entry List */
.entry-list {
  background: #f9fafb;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  padding: 8px 16px;
  margin-top: 16px;
}

.entry-header {
  font-size: 11px;
  color: #6b7280;
  font-family: 'Montserrat', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 1px solid #e5e7eb;
}

.entry-row {
  font-size: 13px;
  color: #1f2937;
  font-family: 'Montserrat', sans-serif;
  border-bottom: 1px solid #f3f4f6;
}

.entry-row:last-child {
  border-bottom: none;
}

/* Linkage List */
.linkage-list {
  background: #f9fafb;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  padding: 8px 16px;
}

.linkage-header {
  font-size: 11px;
  color: #6b7280;
  font-family: 'Montserrat', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 1px solid #e5e7eb;
}

.linkage-row {
  font-size: 13px;
  color: #1f2937;
  font-family: 'Montserrat', sans-serif;
  border-bottom: 1px solid #f3f4f6;
}

.linkage-row:last-child {
  border-bottom: none;
}

/* Files Grid */
.files-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.file-card {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
}

.file-card:hover {
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.file-name {
  font-size: 12px;
  font-weight: 500;
  color: #1f2937;
  font-family: 'Montserrat', sans-serif;
}

.file-size {
  font-size: 11px;
  color: #9ca3af;
  font-family: 'Montserrat', sans-serif;
  margin-top: 4px;
}

/* Status Items */
.status-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f3f4f6;
}

.status-item:last-child {
  border-bottom: none;
}

.status-label {
  font-size: 13px;
  color: #6b7280;
  font-family: 'Montserrat', sans-serif;
}

/* Progress */
.progress-percentage {
  font-size: 32px;
  font-weight: 700;
  color: #1f2937;
  font-family: 'Montserrat', sans-serif;
  margin-bottom: 12px;
}

.progress-bar-large {
  border-radius: 10px;
}

.progress-bar-large :deep(.q-linear-progress__track) {
  border-radius: 10px;
}

/* Description */
.description-text {
  font-size: 14px;
  color: #4b5563;
  line-height: 1.6;
  font-family: 'Montserrat', sans-serif;
}

/* Data Items */
.data-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f3f4f6;
}

.data-item:last-child {
  border-bottom: none;
}

.data-label {
  font-size: 13px;
  color: #6b7280;
  font-family: 'Montserrat', sans-serif;
}

.data-value {
  font-size: 13px;
  font-weight: 500;
  color: #1f2937;
  font-family: 'Montserrat', sans-serif;
}

/* Role Items */
.role-item {
  padding: 12px 0;
  border-bottom: 1px solid #f3f4f6;
}

.role-item:last-child {
  border-bottom: none;
}

.role-title {
  font-size: 11px;
  color: #6b7280;
  font-family: 'Montserrat', sans-serif;
  margin-bottom: 4px;
}

.role-name {
  font-size: 13px;
  font-weight: 500;
  color: #1f2937;
  font-family: 'Montserrat', sans-serif;
}

/* Ticket List */
.ticket-list {
  background: #f9fafb;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  padding: 8px 16px;
  margin-top: 16px;
}

.ticket-header {
  font-size: 11px;
  color: #6b7280;
  font-family: 'Montserrat', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 1px solid #e5e7eb;
}

.ticket-row {
  font-size: 13px;
  font-family: 'Montserrat', sans-serif;
  border-bottom: 1px solid #f3f4f6;
}

.ticket-row:last-child {
  border-bottom: none;
}

/* Badges */
.status-badge {
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 500;
  font-family: 'Montserrat', sans-serif;
}

.status-badge-large {
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 500;
  font-family: 'Montserrat', sans-serif;
}

/* Members List */
.members-list {
  background: #f9fafb;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  padding: 8px 16px;
}

.member-item {
  font-size: 13px;
  color: #1f2937;
  font-family: 'Montserrat', sans-serif;
  border-bottom: 1px solid #f3f4f6;
  padding: 12px 0;
}

.member-item:last-child {
  border-bottom: none;
}

.member-info {
  flex: 1;
}

.member-name {
  font-size: 13px;
  font-weight: 500;
  color: #1f2937;
  font-family: 'Montserrat', sans-serif;
}

.member-role {
  font-size: 11px;
  color: #6b7280;
  font-family: 'Montserrat', sans-serif;
  margin-top: 2px;
}

.add-member-btn {
  transition: all 0.2s;
}

.add-member-btn:hover {
  background: #f3f4f6;
}

.delete-member-btn {
  transition: all 0.2s;
}

.delete-member-btn:hover {
  background: #fee2e2;
}

/* Member Add Row */
.member-item-add {
  font-size: 13px;
  color: #1f2937;
  font-family: 'Montserrat', sans-serif;
  border-bottom: 1px solid #f3f4f6;
  padding: 12px 0;
  background: #f0fdf4;
  border-radius: 6px;
  padding: 12px;
  margin-bottom: 8px;
}

.new-member-select {
  flex: 1;
  margin-right: 12px;
}

.member-actions {
  display: flex;
  gap: 4px;
}

.confirm-btn {
  transition: all 0.2s;
}

.confirm-btn:hover:not(.disabled) {
  background: #dcfce7;
}

.cancel-btn {
  transition: all 0.2s;
}

.cancel-btn:hover {
  background: #fee2e2;
}

/* Responsive */
@media (max-width: 1200px) {
  .details-grid {
    grid-template-columns: 1fr;
  }

  .files-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .files-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .gantt-task-row {
    grid-template-columns: 150px 1fr;
  }

  .gantt-timeline {
    grid-template-columns: 150px 1fr;
  }
}
</style>
