<template>
  <q-page class="projects-page">
    <div class="container">
      <!-- Filters Bar -->
      <div class="filters-bar row items-center justify-between q-px-md q-py-sm bg-grey-2">
        <div class="row items-center q-gutter-sm">
          <q-select
            outlined
            dense
            v-model="filters.priorityLevel"
            :options="priorityOptions"
            label="Priority Level"
            class="filter-select"
            bg-color="white"
          />
          <q-select
            outlined
            dense
            v-model="filters.department"
            :options="departmentOptions"
            label="Department"
            class="filter-select"
            bg-color="white"
          />
          <q-select
            outlined
            dense
            v-model="filters.section"
            :options="sectionOptions"
            label="Section"
            class="filter-select"
            bg-color="white"
          />
          <q-select
            outlined
            dense
            v-model="filters.unit"
            :options="unitOptions"
            label="Unit"
            class="filter-select"
            bg-color="white"
          />
          <q-select
            outlined
            dense
            v-model="filters.projectType"
            :options="projectTypeOptions"
            label="Project Type"
            class="filter-select"
            bg-color="white"
          />
          <q-btn
            outline
            dense
            icon="event"
            label="Date Filter"
            class="filter-select"
            color="grey-7"
          />
        </div>
        <div class="row items-center q-gutter-sm">
          <q-btn
            unelevated
            color="primary"
            label="Apply Filters"
            class="apply-btn"
          />
          <q-btn
            flat
            label="Clear"
            color="grey-7"
          />
        </div>
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
      showDetailsDialog: false,
      selectedProject: null,
      filters: {
        priorityLevel: 'All',
        department: 'All',
        section: 'All',
        unit: 'All',
        projectType: 'All'
      },
      priorityOptions: ['All', 'High Priority', 'Medium Priority', 'Low Priority'],
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
          tasks: [],
          ganttMonths: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']
        }
      ]
    }
  },
  methods: {
    openProjectDetails(project) {
      this.selectedProject = project
      this.showDetailsDialog = true
    },
    openProject(project) {
      // Navigate to project or open in new context
      console.log('Opening project:', project.id)
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

.filter-select {
  min-width: 160px;
}

.filter-select :deep(.q-field__control) {
  border-radius: 10px !important;
}

.apply-btn {
  border-radius: 10px !important;
  font-family: 'Montserrat', sans-serif;
  padding: 8px 24px;
}

/* Projects Section */
.projects-section {
  background: transparent;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.project-card {
  background: white;
  padding: 24px;
  border-radius: 16px;
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
  font-size: 11px;
  padding: 4px 10px;
  border-radius: 6px;
  font-weight: 500;
  font-family: 'Montserrat', sans-serif;
}

.tag-badge {
  font-size: 11px;
  padding: 4px 10px;
  border-radius: 6px;
  font-weight: 400;
  font-family: 'Montserrat', sans-serif;
}

.info-btn {
  position: absolute;
  top: 20px;
  right: 20px;
}

.project-title {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  font-family: 'Montserrat', sans-serif;
  line-height: 1.4;
}

.project-id {
  font-size: 13px;
  color: #6b7280;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
}

.project-description {
  font-size: 14px;
  color: #6b7280;
  font-family: 'Montserrat', sans-serif;
  line-height: 1.6;
}

.project-timeline {
  font-size: 13px;
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
  top: -20px;
  font-size: 13px;
  color: #1f2937;
  font-weight: 600;
  font-family: 'Montserrat', sans-serif;
}

.open-project-btn {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  color: #9ca3af;
  font-size: 11px;
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
