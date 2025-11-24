<template>
  <q-page class="projects-page">
    <div class="container">
      <!-- Filters Bar -->
      <div class="filters-bar row items-center q-px-md q-py-md bg-white">
        <div class="page-title">All Projects</div>
        <q-space />
        
        <q-chip clickable class="filter-chip">
          <span class="filter-label">Priority</span>
          <span class="filter-separator">|</span>
          <span class="filter-value">{{ filters.priorityLevel }}</span>
          <q-menu>
            <q-list style="min-width: 150px">
              <q-item clickable v-close-popup v-for="option in priorityOptions" :key="option" @click="filters.priorityLevel = option">
                <q-item-section>{{ option }}</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-chip>

        <q-chip clickable class="filter-chip">
          <span class="filter-label">Status</span>
          <span class="filter-separator">|</span>
          <span class="filter-value">{{ filters.status }}</span>
          <q-menu>
            <q-list style="min-width: 150px">
              <q-item clickable v-close-popup v-for="option in statusOptions" :key="option" @click="filters.status = option">
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

      <!-- Projects Grid -->
      <div class="projects-section q-pa-md">
        <div class="projects-grid">
          <div
            v-for="project in projects"
            :key="project.id"
            class="project-card"
          >
            <!-- Project Header with Tags -->
            <div class="project-header q-mb-md">
              <div class="row items-center q-gutter-xs q-mb-sm">
                <q-badge
                  :color="project.priority === 'High Priority' ? 'red-1' : 'blue-1'"
                  :text-color="project.priority === 'High Priority' ? 'red-8' : 'blue-8'"
                  :label="project.priority"
                  class="priority-badge"
                />
                <q-badge
                  v-for="tag in project.tags"
                  :key="tag"
                  color="grey-3"
                  text-color="grey-8"
                  :label="tag"
                  class="tag-badge"
                />
              </div>
              <q-btn
                flat
                round
                dense
                icon="link"
                size="sm"
                color="grey-7"
                class="link-btn"
              />
            </div>

            <!-- Project Title and ID -->
            <div class="project-title q-mb-xs">{{ project.title }}</div>
            <div class="project-id q-mb-md">{{ project.id }}</div>

            <!-- Project Description -->
            <div class="project-description q-mb-md">
              {{ project.description }}
            </div>

            <!-- Project Timeline -->
            <div class="project-timeline q-mb-sm">
              {{ project.startDate }} → {{ project.endDate }}
            </div>

            <!-- Progress Bar -->
            <div class="progress-container q-mb-md">
              <q-linear-progress
                :value="project.progress / 100"
                color="primary"
                track-color="grey-3"
                size="8px"
                class="progress-bar"
              />
              <div class="progress-label">{{ project.progress }}%</div>
            </div>

            <!-- View Details Button -->
            <div class="view-details-btn" @click="openProjectDetails(project)">
              VIEW PROJECT DETAILS
              <q-icon name="chevron_right" size="16px" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Project Details Dialog -->
    <ProjectDetailsDialog 
      v-model="showDetailsDialog" 
      :project="selectedProject" 
    />
  </q-page>
</template>

<script>
import ProjectDetailsDialog from 'src/components/ProjectDetailsDialog.vue'

export default {
  name: 'ProjectsPage',
  components: {
    ProjectDetailsDialog
  },
  data() {
    return {
      showDetailsDialog: false,
      selectedProject: null,
      filters: {
        priorityLevel: 'All',
        status: 'All',
        department: 'All',
        section: 'All',
        unit: 'All',
        projectType: 'All'
      },
      priorityOptions: ['All', 'High Priority', 'Medium Priority', 'Low Priority'],
      statusOptions: ['All', 'On Track', 'At Risk', 'Behind Schedule', 'Completed'],
      departmentOptions: ['All', 'Engineering', 'Operations', 'Finance', 'HR'],
      sectionOptions: ['All', 'Mechanical', 'Electrical', 'Civil', 'Software'],
      unitOptions: ['All', 'Unit A', 'Unit B', 'Unit C'],
      projectTypeOptions: ['All', 'Development', 'Research', 'Maintenance'],
      projects: [
        {
          id: 'PROJ-001',
          title: 'Quantum Leap Initiative',
          priority: 'High Priority',
          tags: ['Engineering', 'Mechanical', 'Automotive'],
          description: 'Next-gen quantum computing research...',
          startDate: 'Jan 1, 2024',
          endDate: 'Dec 31, 2024',
          progress: 15,
          tasks: [
            { 
              name: 'Research Phase', 
              dates: 'Jan 5 - Feb 20', 
              assigned: 'Dr. Sarah Chen', 
              status: 'Complete', 
              statusColor: 'green-1',
              statusTextColor: 'green-8',
              ganttStart: 2,
              ganttWidth: 12,
              ganttDuration: '46 days',
              ganttColor: '#4ade80'
            },
            { 
              name: 'Prototype Development', 
              dates: 'Feb 21 - Apr 30', 
              assigned: 'Engineering Team', 
              status: 'In-Progress', 
              statusColor: 'blue-1',
              statusTextColor: 'blue-8',
              ganttStart: 15,
              ganttWidth: 18,
              ganttDuration: '69 days',
              ganttColor: '#3b82f6'
            }
          ],
          ganttMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
        },
        {
          id: 'PROJ-003',
          title: 'Fusion Reactor Core',
          priority: 'High Priority',
          tags: ['GRIDTel', 'MIS', 'Business Applications'],
          description: 'Develop a new stable fusion core prototy...',
          startDate: 'Mar 1, 2024',
          endDate: 'Oct 30, 2025',
          progress: 25,
          tasks: [
            { 
              name: 'Design Specifications', 
              dates: 'Mar 5 - Apr 15', 
              assigned: 'Design Team', 
              status: 'Complete', 
              statusColor: 'green-1',
              statusTextColor: 'green-8',
              ganttStart: 1,
              ganttWidth: 8,
              ganttDuration: '41 days',
              ganttColor: '#4ade80'
            },
            { 
              name: 'Core Assembly', 
              dates: 'Apr 20 - Jul 30', 
              assigned: 'Manufacturing', 
              status: 'In-Progress', 
              statusColor: 'blue-1',
              statusTextColor: 'blue-8',
              ganttStart: 10,
              ganttWidth: 20,
              ganttDuration: '101 days',
              ganttColor: '#3b82f6'
            },
            { 
              name: 'Safety Testing', 
              dates: 'Aug 1 - Oct 15', 
              assigned: 'QA Team', 
              status: 'Delayed', 
              statusColor: 'red-1',
              statusTextColor: 'red-8',
              ganttStart: 32,
              ganttWidth: 15,
              ganttDuration: '75 days',
              ganttColor: '#f87171'
            }
          ],
          ganttMonths: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']
        },
        {
          id: 'PROJ-005',
          title: 'Neural Interface Project',
          priority: 'Medium Priority',
          tags: ['Research', 'Neuroscience', 'Hardware'],
          description: 'Brain-computer interface development...',
          startDate: 'Feb 15, 2024',
          endDate: 'Aug 15, 2025',
          progress: 42,
          tasks: [
            { 
              name: 'Neural Mapping', 
              dates: 'Feb 20 - Apr 10', 
              assigned: 'Research Lab', 
              status: 'Complete', 
              statusColor: 'green-1',
              statusTextColor: 'green-8',
              ganttStart: 1,
              ganttWidth: 14,
              ganttDuration: '50 days',
              ganttColor: '#4ade80'
            },
            { 
              name: 'Interface Design', 
              dates: 'Apr 15 - Jun 30', 
              assigned: 'Hardware Team', 
              status: 'In-Progress', 
              statusColor: 'blue-1',
              statusTextColor: 'blue-8',
              ganttStart: 16,
              ganttWidth: 20,
              ganttDuration: '76 days',
              ganttColor: '#3b82f6'
            },
            { 
              name: 'Clinical Trials', 
              dates: 'Jul 1 - Aug 15', 
              assigned: 'Medical Team', 
              status: 'In-Progress', 
              statusColor: 'blue-1',
              statusTextColor: 'blue-8',
              ganttStart: 38,
              ganttWidth: 12,
              ganttDuration: '45 days',
              ganttColor: '#3b82f6'
            }
          ],
          ganttMonths: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
        },
        {
          id: 'PROJ-007',
          title: 'Smart Grid Optimization',
          priority: 'High Priority',
          tags: ['GRIDTel', 'Infrastructure', 'Energy'],
          description: 'AI-powered energy distribution system...',
          startDate: 'Apr 1, 2024',
          endDate: 'Dec 31, 2024',
          progress: 68,
          tasks: [
            { 
              name: 'Grid Analysis', 
              dates: 'Apr 5 - May 20', 
              assigned: 'Analytics Team', 
              status: 'Complete', 
              statusColor: 'green-1',
              statusTextColor: 'green-8',
              ganttStart: 2,
              ganttWidth: 15,
              ganttDuration: '45 days',
              ganttColor: '#4ade80'
            },
            { 
              name: 'AI Model Training', 
              dates: 'May 25 - Aug 15', 
              assigned: 'ML Engineers', 
              status: 'Complete', 
              statusColor: 'green-1',
              statusTextColor: 'green-8',
              ganttStart: 18,
              ganttWidth: 25,
              ganttDuration: '82 days',
              ganttColor: '#4ade80'
            },
            { 
              name: 'System Integration', 
              dates: 'Aug 20 - Oct 30', 
              assigned: 'DevOps', 
              status: 'In-Progress', 
              statusColor: 'blue-1',
              statusTextColor: 'blue-8',
              ganttStart: 45,
              ganttWidth: 23,
              ganttDuration: '71 days',
              ganttColor: '#3b82f6'
            }
          ],
          ganttMonths: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
        },
        {
          id: 'PROJ-009',
          title: 'Autonomous Vehicle Fleet',
          priority: 'Medium Priority',
          tags: ['Automotive', 'AI', 'Transportation'],
          description: 'Self-driving vehicle deployment...',
          startDate: 'Jan 10, 2024',
          endDate: 'Nov 30, 2025',
          progress: 33,
          tasks: [
            { 
              name: 'Sensor Installation', 
              dates: 'Jan 15 - Mar 10', 
              assigned: 'Hardware Team', 
              status: 'Complete', 
              statusColor: 'green-1',
              statusTextColor: 'green-8',
              ganttStart: 1,
              ganttWidth: 16,
              ganttDuration: '55 days',
              ganttColor: '#4ade80'
            },
            { 
              name: 'Navigation Software', 
              dates: 'Mar 15 - Jun 30', 
              assigned: 'Software Dev', 
              status: 'In-Progress', 
              statusColor: 'blue-1',
              statusTextColor: 'blue-8',
              ganttStart: 18,
              ganttWidth: 28,
              ganttDuration: '107 days',
              ganttColor: '#3b82f6'
            }
          ],
          ganttMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
        },
        {
          id: 'PROJ-011',
          title: 'Blockchain Security Suite',
          priority: 'High Priority',
          tags: ['Cybersecurity', 'Blockchain', 'Finance'],
          description: 'Enterprise-grade security solution...',
          startDate: 'May 1, 2024',
          endDate: 'Sep 30, 2025',
          progress: 55,
          tasks: [
            { 
              name: 'Security Audit', 
              dates: 'May 5 - Jun 15', 
              assigned: 'Security Team', 
              status: 'Complete', 
              statusColor: 'green-1',
              statusTextColor: 'green-8',
              ganttStart: 2,
              ganttWidth: 14,
              ganttDuration: '41 days',
              ganttColor: '#4ade80'
            },
            { 
              name: 'Blockchain Implementation', 
              dates: 'Jun 20 - Aug 30', 
              assigned: 'Blockchain Dev', 
              status: 'In-Progress', 
              statusColor: 'blue-1',
              statusTextColor: 'blue-8',
              ganttStart: 17,
              ganttWidth: 24,
              ganttDuration: '71 days',
              ganttColor: '#3b82f6'
            },
            { 
              name: 'Penetration Testing', 
              dates: 'Sep 1 - Sep 30', 
              assigned: 'QA Security', 
              status: 'In-Progress', 
              statusColor: 'blue-1',
              statusTextColor: 'blue-8',
              ganttStart: 43,
              ganttWidth: 10,
              ganttDuration: '29 days',
              ganttColor: '#3b82f6'
            }
          ],
          ganttMonths: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct']
        },
        {
          id: 'PROJ-013',
          title: 'Cloud Infrastructure Migration',
          priority: 'Medium Priority',
          tags: ['Cloud', 'Infrastructure', 'DevOps'],
          description: 'Migrate legacy systems to cloud platform...',
          startDate: 'Jun 1, 2024',
          endDate: 'Dec 15, 2025',
          progress: 47,
          tasks: [
            { 
              name: 'Infrastructure Audit', 
              dates: 'Jun 5 - Jul 10', 
              assigned: 'Cloud Architects', 
              status: 'Complete', 
              statusColor: 'green-1',
              statusTextColor: 'green-8',
              ganttStart: 2,
              ganttWidth: 12,
              ganttDuration: '35 days',
              ganttColor: '#4ade80'
            },
            { 
              name: 'Data Migration', 
              dates: 'Jul 15 - Sep 30', 
              assigned: 'Data Engineers', 
              status: 'In-Progress', 
              statusColor: 'blue-1',
              statusTextColor: 'blue-8',
              ganttStart: 15,
              ganttWidth: 26,
              ganttDuration: '77 days',
              ganttColor: '#3b82f6'
            },
            { 
              name: 'Testing & Validation', 
              dates: 'Oct 1 - Nov 15', 
              assigned: 'QA Team', 
              status: 'Delayed', 
              statusColor: 'red-1',
              statusTextColor: 'red-8',
              ganttStart: 43,
              ganttWidth: 15,
              ganttDuration: '45 days',
              ganttColor: '#f87171'
            }
          ],
          ganttMonths: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov']
        },
        {
          id: 'PROJ-015',
          title: 'IoT Sensor Network',
          priority: 'High Priority',
          tags: ['IoT', 'Hardware', 'Data Analytics'],
          description: 'Deploy smart sensor network across facilities...',
          startDate: 'Mar 15, 2024',
          endDate: 'Jul 30, 2025',
          progress: 61,
          tasks: [
            { 
              name: 'Sensor Procurement', 
              dates: 'Mar 20 - Apr 25', 
              assigned: 'Procurement', 
              status: 'Complete', 
              statusColor: 'green-1',
              statusTextColor: 'green-8',
              ganttStart: 2,
              ganttWidth: 12,
              ganttDuration: '36 days',
              ganttColor: '#4ade80'
            },
            { 
              name: 'Network Setup', 
              dates: 'May 1 - Jun 20', 
              assigned: 'Network Team', 
              status: 'Complete', 
              statusColor: 'green-1',
              statusTextColor: 'green-8',
              ganttStart: 15,
              ganttWidth: 17,
              ganttDuration: '50 days',
              ganttColor: '#4ade80'
            },
            { 
              name: 'Data Analytics Platform', 
              dates: 'Jun 25 - Jul 30', 
              assigned: 'Data Team', 
              status: 'In-Progress', 
              statusColor: 'blue-1',
              statusTextColor: 'blue-8',
              ganttStart: 34,
              ganttWidth: 12,
              ganttDuration: '35 days',
              ganttColor: '#3b82f6'
            }
          ],
          ganttMonths: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']
        }
      ]
    }
  },
  methods: {
    openProjectDetails(project) {
      this.selectedProject = project
      this.showDetailsDialog = true
    }
  }
}
</script>

<style scoped>
.projects-page {
  background: #f5f7fa;
  min-height: 100vh;
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

/* Projects Section */
.projects-section {
  background: transparent;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.project-card {
  background: white;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  position: relative;
  transition: box-shadow 0.2s;
}

.project-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.priority-badge {
  font-size: 9px;
  padding: 3px 8px;
  border-radius: 4px;
  font-weight: 500;
  font-family: 'Montserrat', sans-serif;
}

.tag-badge {
  font-size: 9px;
  padding: 3px 8px;
  border-radius: 4px;
  font-weight: 400;
  font-family: 'Montserrat', sans-serif;
}

.link-btn {
  position: absolute;
  top: 14px;
  right: 14px;
}

.project-title {
  font-size: 15px;
  font-weight: 600;
  color: #1f2937;
  font-family: 'Montserrat', sans-serif;
  line-height: 1.4;
}

.project-id {
  font-size: 11px;
  color: #6b7280;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
}

.project-description {
  font-size: 12px;
  color: #6b7280;
  font-family: 'Montserrat', sans-serif;
  line-height: 1.5;
}

.project-timeline {
  font-size: 11px;
  color: #6b7280;
  font-family: 'Montserrat', sans-serif;
  display: flex;
  align-items: center;
  gap: 4px;
}

.progress-container {
  position: relative;
}

.progress-bar {
  border-radius: 10px;
}

.progress-bar :deep(.q-linear-progress__track) {
  border-radius: 10px;
}

.progress-label {
  position: absolute;
  right: 0;
  top: -18px;
  font-size: 11px;
  color: #1f2937;
  font-weight: 600;
  font-family: 'Montserrat', sans-serif;
}

.view-details-btn {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 3px;
  color: #9ca3af;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: color 0.2s;
  font-family: 'Montserrat', sans-serif;
  padding: 8px 0;
}

.view-details-btn:hover {
  color: #6b7280;
}

/* Project Details Dialog */
.project-details-card {
  background: #f3f4f6;
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
  font-size: 12px;
  color: #9ca3af;
  font-family: 'Montserrat', sans-serif;
  margin-top: 4px;
}

.gantt-chart-container {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 16px;
}

.gantt-chart {
  margin-top: 16px;
}

.gantt-timeline {
  display: grid;
  grid-template-columns: 200px 1fr;
  border-bottom: 2px solid #e5e7eb;
  padding-bottom: 8px;
  margin-bottom: 12px;
}

.gantt-timeline-label {
  font-size: 12px;
  font-weight: 600;
  color: #6b7280;
  font-family: 'Montserrat', sans-serif;
  padding: 8px 0;
}

.gantt-timeline-months {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 4px;
}

.gantt-month {
  font-size: 11px;
  font-weight: 600;
  color: #6b7280;
  font-family: 'Montserrat', sans-serif;
  text-align: center;
  padding: 4px;
  background: white;
  border-radius: 4px;
}

.gantt-task-row {
  display: grid;
  grid-template-columns: 200px 1fr;
  align-items: center;
  margin-bottom: 12px;
  min-height: 50px;
}

.gantt-task-label {
  padding-right: 16px;
}

.gantt-task-name {
  font-size: 12px;
  font-weight: 500;
  color: #1f2937;
  font-family: 'Montserrat', sans-serif;
  margin-bottom: 2px;
}

.gantt-task-dates {
  font-size: 10px;
  color: #6b7280;
  font-family: 'Montserrat', sans-serif;
}

.gantt-task-timeline {
  position: relative;
  height: 100%;
  border-left: 1px solid #e5e7eb;
  padding-left: 8px;
}

.gantt-task-bar-container {
  position: relative;
  height: 32px;
  background: white;
  border-radius: 4px;
}

.gantt-task-bar {
  position: absolute;
  height: 100%;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
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
  white-space: nowrap;
}

.timeline-stats {
  display: flex;
  justify-content: space-between;
}

.stat-item {
  flex: 1;
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

.task-list,
.entry-list,
.linkage-list,
.ticket-list {
  font-size: 12px;
  font-family: 'Montserrat', sans-serif;
}

.task-header,
.entry-header,
.linkage-header,
.ticket-header {
  border-bottom: 1px solid #e5e7eb;
  font-size: 10px;
  color: #6b7280;
}

.task-row,
.entry-row,
.linkage-row,
.ticket-row {
  border-bottom: 1px solid #f3f4f6;
  font-size: 12px;
  color: #1f2937;
}

.status-badge {
  font-size: 10px;
  padding: 3px 8px;
  border-radius: 4px;
  font-family: 'Montserrat', sans-serif;
}

.financial-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.financial-item {
  text-align: left;
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

.files-grid {
  display: flex;
  gap: 16px;
}

.file-card {
  flex: 1;
  padding: 16px;
  background: #f9fafb;
  border-radius: 8px;
  text-align: center;
  border: 1px solid #e5e7eb;
}

.file-name {
  font-size: 12px;
  font-weight: 500;
  color: #1f2937;
  font-family: 'Montserrat', sans-serif;
}

.file-size {
  font-size: 11px;
  margin-top: 4px;
}

.view-all-link {
  color: #3b82f6;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  font-family: 'Montserrat', sans-serif;
}

.view-all-link:hover {
  text-decoration: underline;
}

.status-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.status-label {
  font-size: 13px;
  color: #6b7280;
  font-family: 'Montserrat', sans-serif;
}

.status-badge-large {
  font-size: 11px;
  padding: 6px 12px;
  border-radius: 6px;
  font-family: 'Montserrat', sans-serif;
}

.progress-percentage {
  font-size: 32px;
  font-weight: 700;
  color: #1f2937;
  font-family: 'Montserrat', sans-serif;
  margin-bottom: 8px;
}

.progress-bar-large {
  border-radius: 10px;
  height: 12px;
}

.description-text {
  font-size: 13px;
  color: #6b7280;
  line-height: 1.6;
  font-family: 'Montserrat', sans-serif;
}

.data-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #f3f4f6;
}

.data-label {
  font-size: 13px;
  color: #6b7280;
  font-family: 'Montserrat', sans-serif;
}

.data-value {
  font-size: 13px;
  color: #1f2937;
  font-family: 'Montserrat', sans-serif;
}

.role-item {
  padding: 12px 0;
  border-bottom: 1px solid #f3f4f6;
}

.role-title {
  font-size: 12px;
  color: #6b7280;
  font-family: 'Montserrat', sans-serif;
  margin-bottom: 4px;
}

.role-name {
  font-size: 13px;
  color: #1f2937;
  font-family: 'Montserrat', sans-serif;
}

/* Responsive */
@media (max-width: 1400px) {
  .projects-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 1000px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
  
  .filters-bar {
    flex-direction: column;
    align-items: stretch;
  }
  
  .filter-select {
    width: 100%;
  }
}
</style>
