<template>
  <q-page class="projects-page">
    <div class="container">
      <!-- Filters Bar -->
      <div class="filters-bar row items-center q-px-md q-py-md bg-white">
        <div class="page-title">All Projects</div>
        <q-space />
        
        <q-chip clickable class="filter-chip">
          <span class="filter-label">Priority Level</span>
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
          <span class="filter-label">Department</span>
          <span class="filter-separator">|</span>
          <span class="filter-value">{{ filters.department }}</span>
          <q-menu>
            <q-list style="min-width: 150px">
              <q-item clickable v-close-popup v-for="option in departmentOptions" :key="option" @click="filters.department = option">
                <q-item-section>{{ option }}</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-chip>

        <q-chip clickable class="filter-chip">
          <span class="filter-label">Section</span>
          <span class="filter-separator">|</span>
          <span class="filter-value">{{ filters.section }}</span>
          <q-menu>
            <q-list style="min-width: 150px">
              <q-item clickable v-close-popup v-for="option in sectionOptions" :key="option" @click="filters.section = option">
                <q-item-section>{{ option }}</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-chip>

        <q-chip clickable class="filter-chip">
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

        <q-chip clickable class="filter-chip">
          <span class="filter-label">Project Type</span>
          <span class="filter-separator">|</span>
          <span class="filter-value">{{ filters.projectType }}</span>
          <q-menu>
            <q-list style="min-width: 150px">
              <q-item clickable v-close-popup v-for="option in projectTypeOptions" :key="option" @click="filters.projectType = option">
                <q-item-section>{{ option }}</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-chip>

        <q-chip clickable class="filter-chip">
          <q-icon name="event" size="18px" color="grey-7" />
          <q-menu>
            <q-list style="min-width: 150px">
              <q-item clickable v-close-popup v-for="option in dateOptions" :key="option" @click="filters.dateFilter = option">
                <q-item-section>{{ option }}</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-chip>

        <a href="#" class="clear-filters-link q-ml-md" @click.prevent="clearFilters">
          <q-icon name="close" size="16px" class="q-mr-xs" />
          Clear Filters
        </a>
        
        <div class="view-toggle q-ml-md" @click="viewMode = viewMode === 'grid' ? 'list' : 'grid'">
          <q-btn
            flat
            round
            dense
            icon="menu"
            size="sm"
            :class="viewMode === 'list' ? 'view-btn active' : 'view-btn'"
          />
          <q-btn
            flat
            round
            dense
            icon="apps"
            size="sm"
            :class="viewMode === 'grid' ? 'view-btn active' : 'view-btn'"
          />
        </div>
      </div>

      <!-- Projects Grid/List -->
      <div :class="viewMode === 'grid' ? 'projects-section q-pa-md' : 'projects-section-list'">
        <!-- Grid View -->
        <div v-if="viewMode === 'grid'" class="projects-grid">
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

        <!-- List/Table View -->
        <div v-else class="projects-table-container">
          <div class="projects-table">
            <!-- Table Header -->
            <div class="table-header">
              <div class="table-cell header-cell" style="flex: 0 0 60px;">NO.</div>
              <div class="table-cell header-cell" style="flex: 0 0 250px;">PROJECT ID</div>
              <div class="table-cell header-cell" style="flex: 0 0 180px;">TIMELINE</div>
              <div class="table-cell header-cell" style="flex: 1 1 0;">DESCRIPTION</div>
              <div class="table-cell header-cell" style="flex: 0 0 120px;">PRIORITY</div>
              <div class="table-cell header-cell" style="flex: 0 0 120px;">DEPARTMENT</div>
              <div class="table-cell header-cell" style="flex: 0 0 100px;">SECTION</div>
              <div class="table-cell header-cell" style="flex: 0 0 80px;">UNIT</div>
              <div class="table-cell header-cell" style="flex: 0 0 100px;">PROGRESS</div>
              <div class="table-cell header-cell" style="flex: 0 0 60px;"></div>
            </div>

            <!-- Table Rows -->
            <div
              v-for="(project, index) in projects"
              :key="project.id"
              class="table-row"
            >
              <div class="table-cell" style="flex: 0 0 60px;">
                <div class="cell-number">{{ index + 1 }}</div>
              </div>
              <div class="table-cell" style="flex: 0 0 250px;">
                <div class="cell-project-id">
                  <div class="project-title-cell">{{ project.title }}</div>
                  <div class="project-id-cell">{{ project.id }}</div>
                </div>
              </div>
              <div class="table-cell" style="flex: 0 0 180px;">
                <div class="cell-timeline">{{ project.startDate }} → {{ project.endDate }}</div>
              </div>
              <div class="table-cell" style="flex: 1 1 0;">
                <div class="cell-description">{{ project.description }}</div>
              </div>
              <div class="table-cell" style="flex: 0 0 120px;">
                <q-badge
                  :color="project.priority === 'High Priority' ? 'red-1' : project.priority === 'Medium Priority' ? 'yellow-1' : 'blue-1'"
                  :text-color="project.priority === 'High Priority' ? 'red-8' : project.priority === 'Medium Priority' ? 'yellow-9' : 'blue-8'"
                  :label="project.priority.replace(' Priority', '')"
                  class="priority-badge-table"
                />
              </div>
              <div class="table-cell" style="flex: 0 0 120px;">
                <div class="cell-text">{{ project.tags[0] || '-' }}</div>
              </div>
              <div class="table-cell" style="flex: 0 0 100px;">
                <div class="cell-text">{{ project.tags[1] || '-' }}</div>
              </div>
              <div class="table-cell" style="flex: 0 0 80px;">
                <div class="cell-text">{{ project.tags[2] || '-' }}</div>
              </div>
              <div class="table-cell" style="flex: 0 0 100px;">
                <div class="cell-progress">
                  <div class="progress-bar-cell">
                    <div class="progress-fill" :style="{ width: project.progress + '%' }"></div>
                  </div>
                  <div class="progress-text-cell">{{ project.progress }}%</div>
                </div>
              </div>
              <div class="table-cell table-actions" style="flex: 0 0 60px;">
                <q-btn
                  flat
                  round
                  dense
                  icon="info"
                  size="sm"
                  color="grey-7"
                  @click="openProjectDetails(project)"
                />
              </div>
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
      viewMode: localStorage.getItem('projectViewMode') || 'grid',
      showDetailsDialog: false,
      selectedProject: null,
      filters: {
        priorityLevel: 'All',
        department: 'All',
        section: 'All',
        unit: 'All',
        projectType: 'All',
        dateFilter: 'All Time'
      },
      priorityOptions: ['All', 'High Priority', 'Medium Priority', 'Low Priority'],
      departmentOptions: ['All', 'Engineering', 'Operations', 'Finance', 'HR'],
      sectionOptions: ['All', 'Mechanical', 'Electrical', 'Civil', 'Software'],
      unitOptions: ['All', 'Unit A', 'Unit B', 'Unit C'],
      projectTypeOptions: ['All', 'Development', 'Research', 'Maintenance'],
      dateOptions: ['All Time', 'Today', 'This Week', 'This Month', 'This Quarter', 'This Year'],
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
  watch: {
    viewMode(newValue) {
      localStorage.setItem('projectViewMode', newValue)
    }
  },
  mounted() {
    const savedViewMode = localStorage.getItem('projectViewMode')
    if (savedViewMode) {
      this.viewMode = savedViewMode
    }
  },
  methods: {
    openProjectDetails(project) {
      this.selectedProject = project
      this.showDetailsDialog = true
    },
    clearFilters() {
      this.filters.priorityLevel = 'All'
      this.filters.department = 'All'
      this.filters.section = 'All'
      this.filters.unit = 'All'
      this.filters.projectType = 'All'
      this.filters.dateFilter = 'All Time'
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

.view-toggle {
  display: flex;
  gap: 4px;
  background: #f3f4f6;
  border-radius: 20px;
  padding: 4px;
  cursor: pointer;
}

.view-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  transition: all 0.2s;
  color: #6b7280;
}

.view-btn.active {
  background: #1f2937 !important;
  color: white !important;
}

.view-btn:not(.active):hover {
  background: #e5e7eb;
}

/* Projects Section */
.projects-section {
  background: transparent;
}

.projects-section-list {
  background: transparent;
  padding: 0;
  height: calc(100vh - 120px);
  overflow: hidden;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.projects-list {
  display: flex;
  flex-direction: column;
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

/* Table View Styles */
.projects-table-container {
  background: white;
  border-radius: 0;
  border: none;
  border-top: 1px solid #e5e7eb;
  overflow: auto;
  height: 100%;
}

.projects-table {
  width: 100%;
}

.table-header {
  display: flex;
  background: #f9fafb;
  border-bottom: 2px solid #e5e7eb;
  padding: 12px 16px;
  font-family: 'Montserrat', sans-serif;
}

.table-row {
  display: flex;
  border-bottom: 1px solid #f3f4f6;
  padding: 16px;
  transition: background 0.2s;
  align-items: center;
}

.table-row:hover {
  background: #f9fafb;
}

.table-row:last-child {
  border-bottom: none;
}

.table-cell {
  padding: 0 8px;
  display: flex;
  align-items: center;
}

.header-cell {
  font-size: 11px;
  font-weight: 700;
  color: #6b7280;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.cell-project-id {
  display: flex;
  flex-direction: column;
}

.project-title-cell {
  font-size: 13px;
  font-weight: 600;
  color: #1f2937;
  font-family: 'Montserrat', sans-serif;
  margin-bottom: 2px;
}

.project-id-cell {
  font-size: 11px;
  color: #6b7280;
  font-family: 'Montserrat', sans-serif;
}

.cell-timeline {
  font-size: 12px;
  color: #6b7280;
  font-family: 'Montserrat', sans-serif;
}

.cell-description {
  font-size: 12px;
  color: #6b7280;
  font-family: 'Montserrat', sans-serif;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}

.cell-text {
  font-size: 12px;
  color: #1f2937;
  font-family: 'Montserrat', sans-serif;
}

.cell-number {
  font-size: 12px;
  color: #6b7280;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
}

.priority-badge-table {
  font-size: 10px;
  padding: 4px 10px;
  border-radius: 6px;
  font-weight: 500;
  font-family: 'Montserrat', sans-serif;
}

.cell-progress {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
}

.progress-bar-cell {
  flex: 1;
  height: 6px;
  background: #e5e7eb;
  border-radius: 10px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #3b82f6;
  border-radius: 10px;
  transition: width 0.3s;
}

.progress-text-cell {
  font-size: 11px;
  font-weight: 600;
  color: #1f2937;
  font-family: 'Montserrat', sans-serif;
  min-width: 35px;
}

.table-actions {
  display: flex;
  gap: 4px;
  justify-content: flex-end;
}

.project-card-list {
  display: grid;
  grid-template-columns: 300px 1fr auto;
  gap: 24px;
  align-items: center;
  padding: 20px 24px;
}

.project-card-list .project-header {
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 0;
}

.project-card-list .project-header .row {
  margin-bottom: 8px;
}

.project-card-list .project-title,
.project-card-list .project-id {
  margin-bottom: 4px;
}

.project-card-list .project-description {
  margin-bottom: 0;
}

.project-card-list .project-timeline {
  margin-bottom: 0;
}

.project-card-list .progress-container {
  width: 200px;
  margin-bottom: 0;
}

.project-card-list .view-details-btn {
  margin-left: auto;
  padding: 10px 20px;
  background: #f3f4f6;
  border-radius: 8px;
  justify-content: center;
}

.project-card-list .view-details-btn:hover {
  background: #e5e7eb;
}

.project-card-list .link-btn {
  position: static;
  margin-left: 8px;
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
