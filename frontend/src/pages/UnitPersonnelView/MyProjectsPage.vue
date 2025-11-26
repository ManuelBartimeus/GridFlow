<template>
  <q-page class="projects-page">
    <div class="container">
      <!-- Filters Bar -->
      <div class="filters-bar row items-center q-px-md q-py-md bg-white">
        <div class="page-title">My Projects</div>
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
          <span class="filter-label">Role</span>
          <span class="filter-separator">|</span>
          <span class="filter-value">{{ filters.role }}</span>
          <q-menu>
            <q-list style="min-width: 150px">
              <q-item clickable v-close-popup v-for="option in roleOptions" :key="option" @click="filters.role = option">
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
                icon="info"
                size="sm"
                color="grey-7"
                class="info-btn"
                @click="openProjectDetails(project)"
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

            <!-- Separator -->
            <q-separator class="q-my-md" />

            <!-- Open Project Button -->
            <div class="open-project-btn" @click="openProject(project)">
              <q-icon name="open_in_new" size="16px" />
              OPEN PROJECT
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
              <div class="table-cell header-cell" style="flex: 0 0 80px;"></div>
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
              <div class="table-cell table-actions" style="flex: 0 0 80px;">
                <q-btn
                  flat
                  round
                  dense
                  icon="info"
                  size="sm"
                  color="grey-7"
                  @click="openProjectDetails(project)"
                />
                <q-btn
                  flat
                  round
                  dense
                  icon="open_in_new"
                  size="sm"
                  color="grey-7"
                  @click="openProject(project)"
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
  name: 'MyProjectsPage',
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
        role: 'All',
        projectType: 'All',
        dateFilter: 'All Time'
      },
      priorityOptions: ['All', 'High Priority', 'Medium Priority', 'Low Priority'],
      roleOptions: ['All', 'Project Manager', 'Team Lead', 'Developer', 'Designer'],
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
          tasks: [],
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
    clearFilters() {
      this.filters.priorityLevel = 'All'
      this.filters.role = 'All'
      this.filters.projectType = 'All'
      this.filters.dateFilter = 'All Time'
    },
    openProjectDetails(project) {
      this.selectedProject = project
      this.showDetailsDialog = true
    },
    openProject(project) {
      // Navigate to project view
      this.$router.push({
        path: `/unit/project/${project.id}`,
        query: { name: project.title }
      })
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

.project-card-list .q-separator {
  display: none;
}

.project-card-list .open-project-btn {
  margin-left: auto;
  padding: 10px 20px;
  background: #f3f4f6;
  border-radius: 8px;
}

.project-card-list .open-project-btn:hover {
  background: #e5e7eb;
}

.project-card-list .info-btn {
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

.info-btn {
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

.open-project-btn {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 6px;
  color: #9ca3af;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: color 0.2s;
  font-family: 'Montserrat', sans-serif;
  padding: 8px 0;
}

.open-project-btn:hover {
  color: #6b7280;
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
