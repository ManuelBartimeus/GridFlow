<template>
  <q-page class="project-view-page">
    <div class="container">
      <!-- Filters Bar -->
      <div class="filters-bar row items-center q-px-md q-py-sm bg-grey-2">
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
          v-model="filters.status"
          :options="statusOptions"
          label="Status"
          class="filter-select q-ml-sm"
          bg-color="white"
        />
        <q-btn
          outline
          dense
          icon="event"
          label="Date Filter"
          class="filter-select q-ml-sm"
          color="grey-7"
        />

        <q-space />
        <q-btn label="Apply Filters" color="primary" unelevated class="q-mr-sm" />
        <q-btn label="Clear" outline />
      </div>

      <!-- Back Button and Project Title -->
      <div class="project-header q-px-sm q-py-md">
        <q-btn
          flat
          icon="keyboard_double_arrow_left"
          label="GO BACK"
          color="grey-7"
          class="go-back-btn"
          @click="goBack"
        />
        <div class="project-name">{{ projectName }}</div>
      </div>

      <!-- Sprint Columns -->
      <div class="sprints-section q-px-md q-pb-md">
        <div class="sprints-grid">
          <!-- Sprint 1 -->
          <div class="sprint-column">
            <div class="sprint-header">
              <div class="sprint-title">
                Sprint 1
              </div>
              <q-btn flat round dense icon="more_vert" size="sm" color="grey-7" />
            </div>

            <div class="sprint-cards">
              <div class="task-card">
                <div class="task-badges q-mb-sm">
                  <q-badge color="red-1" text-color="red-8" label="High Priority" />
                  <q-badge color="blue" text-color="white" label="In Progress" class="q-ml-xs" />
                </div>
                <div class="task-title q-mb-xs">Quantum Leap Initiative</div>
                <div class="task-description q-mb-sm">Next-gen quantum computing research...</div>
                <div class="task-dates q-mb-sm">Deadline: Dec 31, 2024</div>
                <div class="task-progress q-mb-md">
                  <q-linear-progress :value="0.15" color="blue" track-color="grey-3" size="6px" />
                  <div class="progress-text">15%</div>
                </div>
                <div class="task-footer">
                  <div class="task-actions">
                    <q-btn flat round dense icon="comment" size="xs" color="grey-7" />
                    <q-btn flat round dense icon="more_horiz" size="xs" color="grey-7" />
                  </div>
                </div>
              </div>

              <div class="task-card">
                <div class="task-badges q-mb-sm">
                  <q-badge color="yellow-2" text-color="yellow-9" label="Medium Priority" />
                  <q-badge color="red-14" text-color="white" label="Not Started" class="q-ml-xs" />
                </div>
                <div class="task-title q-mb-xs">Project Phoenix</div>
                <div class="task-description q-mb-sm">Complete redesign of the public website.</div>
                <div class="task-dates q-mb-sm">Deadline: Aug 15, 2024</div>
                <div class="task-progress q-mb-md">
                  <q-linear-progress :value="0.05" color="blue" track-color="grey-3" size="6px" />
                  <div class="progress-text">5%</div>
                </div>
                <div class="task-footer">
                  <div class="task-actions">
                    <q-btn flat round dense icon="comment" size="xs" color="grey-7" />
                    <q-btn flat round dense icon="more_horiz" size="xs" color="grey-7" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Sprint 2 -->
          <div class="sprint-column">
            <div class="sprint-header">
              <div class="sprint-title">
                Sprint 2
              </div>
              <q-btn flat round dense icon="more_vert" size="sm" color="grey-7" />
            </div>

            <div class="sprint-cards">
              <div class="task-card">
                <div class="task-badges q-mb-sm">
                  <q-badge color="red-1" text-color="red-8" label="High Priority" />
                  <q-badge color="blue" text-color="white" label="In Progress" class="q-ml-xs" />
                </div>
                <div class="task-title q-mb-xs">Fusion Reactor Core</div>
                <div class="task-description q-mb-sm">Develop a new stable fusion core prototy...</div>
                <div class="task-dates q-mb-sm">Deadline: Oct 30, 2025</div>
                <div class="task-progress q-mb-md">
                  <q-linear-progress :value="0.25" color="blue" track-color="grey-3" size="6px" />
                  <div class="progress-text">25%</div>
                </div>
                <div class="task-footer">
                  <div class="task-actions">
                    <q-btn flat round dense icon="comment" size="xs" color="grey-7" />
                    <q-btn flat round dense icon="more_horiz" size="xs" color="grey-7" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Sprint 3 -->
          <div class="sprint-column">
            <div class="sprint-header">
              <div class="sprint-title">
                Sprint 3
              </div>
              <q-btn flat round dense icon="more_vert" size="sm" color="grey-7" />
            </div>

            <div class="sprint-cards">
              <div class="task-card">
                <div class="task-badges q-mb-sm">
                  <q-badge color="yellow-2" text-color="yellow-9" label="Medium Priority" />
                  <q-badge color="light-green" text-color="white" label="Completed" class="q-ml-xs" />
                </div>
                <div class="task-title q-mb-xs">Datacenter Migration</div>
                <div class="task-description q-mb-sm">Migrate all on-premise servers to clo...</div>
                <div class="task-dates q-mb-sm">Deadline: Jun 30, 2024</div>
                <div class="task-progress q-mb-md">
                  <q-linear-progress :value="0.85" color="green" track-color="grey-3" size="6px" />
                  <div class="progress-text">85%</div>
                </div>
                <div class="task-footer">
                  <div class="task-actions">
                    <q-btn flat round dense icon="comment" size="xs" color="grey-7" />
                    <q-btn flat round dense icon="more_horiz" size="xs" color="grey-7" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'ProjectView',
  data() {
    return {
      projectId: null,
      projectName: '',
      filters: {
        priorityLevel: 'All',
        status: 'All'
      },
      priorityOptions: ['All', 'High Priority', 'Medium Priority', 'Low Priority'],
      statusOptions: ['All', 'On Track', 'At Risk', 'Behind Schedule', 'Completed']
    }
  },
  mounted() {
    this.projectId = this.$route.params.id
    this.projectName = this.$route.query.name || 'Project Name'
  },
  methods: {
    goBack() {
      this.$router.back()
    }
  }
}
</script>

<style scoped>
.project-view-page {
  background: #f5f7fa;
  min-height: 100vh;
}

.container {
  max-width: 100%;
}

/* Filters Bar - matching Dashboard */
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

/* Project Header */
.project-header {
  display: flex;
  align-items: center;
  gap: 24px;
  background: #f5f7fa;
}

.go-back-btn {
  font-family: 'Montserrat', sans-serif;
  font-size: 11px;
  text-transform: none;
}

.project-name {
  font-size: 17px;
  font-weight: 600;
  color: #1f2937;
  font-family: 'Montserrat', sans-serif;
}

/* Sprints Section */
.sprints-section {
  background: transparent;
}

.sprints-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.sprint-column {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.sprint-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 12px;
  margin-bottom: 16px;
  border-bottom: 1px solid #e5e7eb;
}

.sprint-title {
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
  font-family: 'Montserrat', sans-serif;
  display: flex;
  align-items: center;
}

.sprint-cards {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.task-card {
  background: white;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.2s;
}

.task-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.task-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.task-badges .q-badge {
  font-size: 10px;
  padding: 4px 8px;
  border-radius: 4px;
  font-family: 'Montserrat', sans-serif;
}

.task-title {
  font-size: 15px;
  font-weight: 600;
  color: #1f2937;
  font-family: 'Montserrat', sans-serif;
}

.task-description {
  font-size: 13px;
  color: #6b7280;
  font-family: 'Montserrat', sans-serif;
  line-height: 1.5;
}

.task-dates {
  font-size: 12px;
  color: #6b7280;
  font-family: 'Montserrat', sans-serif;
}

.task-progress {
  position: relative;
}

.task-progress .q-linear-progress {
  border-radius: 4px;
}

.progress-text {
  position: absolute;
  right: 0;
  top: -18px;
  font-size: 12px;
  font-weight: 600;
  color: #1f2937;
  font-family: 'Montserrat', sans-serif;
}

.task-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-top: 1px solid #f3f4f6;
  padding-top: 12px;
}

.task-actions {
  display: flex;
  gap: 4px;
}

/* Responsive */
@media (max-width: 1400px) {
  .sprints-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 900px) {
  .sprints-grid {
    grid-template-columns: 1fr;
  }
}
</style>
