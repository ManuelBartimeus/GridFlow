<template>
  <q-page class="project-view-page">
    <div class="container">
      <!-- Filters Bar -->
      <div class="filters-bar row items-center q-px-md q-py-md bg-white">
        <q-btn
          flat
          icon="keyboard_double_arrow_left"
          color="grey-7"
          class="go-back-btn"
          @click="goBack"
        />
        <div class="project-name q-ml-xs">{{ projectName }}</div>
        
        <q-space />
        
        <q-chip 
          clickable
          class="filter-chip"
        >
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

        <q-chip 
          clickable
          class="filter-chip"
        >
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

        <q-chip 
          clickable
          class="filter-chip"
        >
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

        <q-btn
          flat
          rounded
          dense
          icon="confirmation_number"
          color="primary"
          class="add-ticket-btn q-ml-md"
          @click="openTicketDialog"
          title="Add Ticket"
        />
      </div>

      <!-- Sprint Columns -->
      <div class="sprints-section q-px-md q-pb-md">
        <!-- Add Sprint Button -->
        <div class="add-sprint-btn-top" @click="addSprint">
          <q-icon name="add_ad" size="18px" class="q-mr-xs" />
          <span>Add Sprint</span>
        </div>

        <div class="sprints-container">
          <!-- Static Backlog Column -->
          <div class="sprint-column backlog-column">
            <div class="sprint-header">
              <div class="sprint-title">
                Task Backlog
              </div>
              <q-btn flat round dense icon="more_vert" size="sm" color="grey-7" />
            </div>

            <div class="add-task-btn-backlog" @click="openAddTaskDialog('backlog')">
              <q-icon name="add" size="16px" class="q-mr-xs" />
              <span>Add Task</span>
            </div>

            <div class="sprint-cards backlog-cards" @dragover="dragOver($event)" @drop="dropTask($event, 'backlog')">
              <div 
                v-for="task in backlogTasks" 
                :key="task.id" 
                class="task-card"
                draggable="true"
                @dragstart="startDrag($event, task, 'backlog')"
              >
                <div class="task-badges q-mb-sm">
                  <q-badge 
                    :color="task.priority === 'High Priority' ? 'red-1' : task.priority === 'Medium Priority' ? 'yellow-2' : 'blue-1'" 
                    :text-color="task.priority === 'High Priority' ? 'red-8' : task.priority === 'Medium Priority' ? 'yellow-9' : 'blue-8'" 
                    :label="task.priority" 
                  />
                  <q-badge :color="task.statusColor" text-color="grey-8" :label="task.status" class="q-ml-xs" />
                </div>
                <div class="task-title clickable-task-title q-mb-xs" @click="openTaskDetails(task, 'backlog')">{{ task.title }}</div>
                <div class="task-description q-mb-sm">{{ task.description }}</div>
                <div class="task-dates q-mb-sm">{{ task.deadline }}</div>
                <div class="task-progress q-mb-md">
                  <q-linear-progress :value="task.progress / 100" color="grey" track-color="grey-3" size="6px" />
                  <div class="progress-text">{{ task.progress }}%</div>
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

          <!-- Scrollable Sprint Columns or Empty State -->
          <div v-if="sprints.length === 0" class="empty-sprints-message">
            <div class="empty-message-content">
              <q-icon name="edit_document" size="48px" color="grey-5" />
              <div class="empty-message-text">Add a sprint to get started</div>
            </div>
          </div>
          <div v-else class="sprints-scroll-container">
            <div class="sprints-grid">
              <div 
                v-for="sprint in sprints" 
                :key="sprint.id" 
                class="sprint-column"
              >
                <div class="sprint-header">
                  <div class="sprint-title">
                    {{ sprint.name }}
                  </div>
                  <q-btn 
                    flat 
                    round 
                    dense 
                    icon="more_vert" 
                    size="sm" 
                    color="grey-7"
                  >
                    <q-menu>
                      <q-list style="min-width: 150px">
                        <q-item clickable v-close-popup @click="openRenameSprint(sprint)">
                          <q-item-section avatar>
                            <q-icon name="edit" />
                          </q-item-section>
                          <q-item-section>Rename Sprint</q-item-section>
                        </q-item>
                        <q-separator />
                        <q-item clickable v-close-popup @click="confirmDeleteSprint(sprint)">
                          <q-item-section avatar>
                            <q-icon name="delete" color="red" />
                          </q-item-section>
                          <q-item-section>
                            <span class="text-red">Delete Sprint</span>
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </q-menu>
                  </q-btn>
                </div>

                <div class="sprint-cards" @dragover="dragOver($event)" @drop="dropTask($event, sprint.id)">
                  <div 
                    v-for="task in sprint.tasks" 
                    :key="task.id" 
                    class="task-card"
                    draggable="true"
                    @dragstart="startDrag($event, task, sprint.id)"
                  >
                    <div class="task-badges q-mb-sm">
                      <q-badge 
                        :color="task.priority === 'High Priority' ? 'red-1' : task.priority === 'Medium Priority' ? 'yellow-2' : 'blue-1'" 
                        :text-color="task.priority === 'High Priority' ? 'red-8' : task.priority === 'Medium Priority' ? 'yellow-9' : 'blue-8'" 
                        :label="task.priority" 
                      />
                      <q-badge 
                        :color="task.statusColor" 
                        text-color="grey-8" 
                        :label="task.status" 
                        class="q-ml-xs" 
                      />
                    </div>
                    <div class="task-title clickable-task-title q-mb-xs" @click="openTaskDetails(task, sprint.id)">{{ task.title }}</div>
                    <div class="task-description q-mb-sm">{{ task.description }}</div>
                    <div class="task-dates q-mb-sm">Deadline: {{ task.deadline }}</div>
                    <div class="task-progress q-mb-md">
                      <q-linear-progress 
                        :value="task.progress / 100" 
                        :color="task.progress > 75 ? 'green' : 'blue'" 
                        track-color="grey-3" 
                        size="6px" 
                      />
                      <div class="progress-text">{{ task.progress }}%</div>
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
      </div>
    </div>

    <!-- Add Ticket Dialog -->
    <AddTicketDialog
      v-model="showTicketDialog"
      :project-name="projectName"
      @ticket-created="handleTicketCreated"
    />

    <!-- Add Task Dialog -->
    <AddTaskDialog
      v-model="showAddTaskDialog"
      :sprint-id="selectedSprintForTask"
      @task-created="handleTaskCreated"
    />

    <!-- Task Details Dialog -->
    <TaskDetailsDialog
      v-model="showTaskDetailsDialog"
      :task="selectedTask"
      :project-name="projectName"
      :sprint-name="selectedSprintName"
      :current-user="currentUserName"
      @task-updated="handleTaskUpdated"
    />

    <!-- Rename Sprint Dialog -->
    <q-dialog v-model="showRenameSprint" persistent>
      <q-card style="min-width: 400px">
        <q-card-section class="row items-center">
          <span class="text-h6">Rename Sprint</span>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <q-input
            v-model="renamingSprintName"
            outlined
            dense
            label="Sprint Name"
            autofocus
            @keyup.enter="saveSprintName"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="grey-7" v-close-popup />
          <q-btn 
            label="Save" 
            unelevated 
            color="primary" 
            @click="saveSprintName"
            :disable="!renamingSprintName.trim()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Delete Sprint Confirmation Dialog -->
    <q-dialog v-model="showDeleteConfirmation" persistent>
      <q-card style="min-width: 400px">
        <q-card-section class="row items-center">
          <q-icon name="warning" color="red" size="lg" class="q-mr-md" />
          <span class="text-h6">Delete Sprint?</span>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <div class="text-subtitle2 q-mb-md">Are you sure you want to delete this sprint?</div>
          <div class="bg-red-1 q-pa-md rounded text-red-8" style="border-left: 4px solid #dc2626;">
            <div class="text-weight-600 q-mb-xs">Warning:</div>
            <div>All tasks within this sprint ({{ sprintToDelete?.tasks?.length || 0 }} tasks) will be permanently deleted.</div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="grey-7" v-close-popup />
          <q-btn 
            label="Delete Sprint" 
            unelevated 
            color="negative" 
            @click="deleteSprintConfirmed"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import AddTicketDialog from 'src/components/AddTicketDialog.vue'
import AddTaskDialog from 'src/components/AddTaskDialog.vue'
import TaskDetailsDialog from 'src/components/TaskDetailsDialog.vue'

export default {
  name: 'ProjectView',
  components: {
    AddTicketDialog,
    AddTaskDialog,
    TaskDetailsDialog
  },
  data() {
    return {
      projectId: null,
      projectName: '',
      currentUserName: 'Sarah Mensah',
      showTicketDialog: false,
      tickets: [],
      showAddTaskDialog: false,
      showTaskDetailsDialog: false,
      selectedTask: {},
      selectedSprintForTask: 'backlog',
      selectedSprintName: 'Backlog',
      showRenameSprint: false,
      showDeleteConfirmation: false,
      renamingSprintId: null,
      renamingSprintName: '',
      sprintToDelete: null,
      filters: {
        priorityLevel: 'All',
        status: 'All',
        dateFilter: 'All Time'
      },
      priorityOptions: ['All', 'High Priority', 'Medium Priority', 'Low Priority'],
      statusOptions: ['All', 'On Track', 'At Risk', 'Behind Schedule', 'Completed'],
      dateOptions: ['All Time', 'Today', 'This Week', 'This Month', 'This Quarter', 'This Year'],
      sprintCounter: 0,
      backlogTasks: [
        {
          id: 1,
          title: 'Quantum Leap Initiative',
          priority: 'High Priority',
          status: 'Not Started',
          statusColor: 'grey-3',
          description: 'Next-gen quantum computing research...',
          deadline: 'Dec 31, 2024',
          progress: 0,
          assignees: [],
          comments: [],
          attachments: []
        },
        {
          id: 2,
          title: 'Project Phoenix',
          priority: 'Medium Priority',
          status: 'Not Started',
          statusColor: 'grey-3',
          description: 'Complete redesign of the public website.',
          deadline: 'Aug 15, 2024',
          progress: 0,
          assignees: [],
          comments: [],
          attachments: []
        },
        {
          id: 3,
          title: 'Fusion Reactor Core',
          priority: 'High Priority',
          status: 'Not Started',
          statusColor: 'grey-3',
          description: 'Develop a new stable fusion core prototype...',
          deadline: 'Oct 30, 2025',
          progress: 0,
          assignees: [],
          comments: [],
          attachments: []
        },
        {
          id: 4,
          title: 'Datacenter Migration',
          priority: 'Medium Priority',
          status: 'Not Started',
          statusColor: 'grey-3',
          description: 'Migrate all on-premise servers to cloud...',
          deadline: 'Jun 30, 2024',
          progress: 0,
          assignees: [],
          comments: [],
          attachments: []
        },
        {
          id: 5,
          title: 'Security Audit Implementation',
          priority: 'High Priority',
          status: 'Not Started',
          statusColor: 'grey-3',
          description: 'Conduct comprehensive security audit and implement findings...',
          deadline: 'Nov 15, 2024',
          progress: 0,
          assignees: [],
          comments: [],
          attachments: []
        },
        {
          id: 6,
          title: 'Performance Optimization',
          priority: 'Low Priority',
          status: 'Not Started',
          statusColor: 'grey-3',
          description: 'Optimize application performance and reduce load times...',
          deadline: 'Jan 31, 2025',
          progress: 0,
          assignees: [],
          comments: [],
          attachments: []
        }
      ],
      sprints: []
    }
  },
  mounted() {
    this.projectId = this.$route.params.id
    this.projectName = this.$route.query.name || 'Project Name'
  },
  methods: {
    goBack() {
      this.$router.back()
    },
    clearFilters() {
      this.filters.priorityLevel = 'All'
      this.filters.status = 'All'
      this.filters.dateFilter = 'All Time'
    },
    openTicketDialog() {
      this.showTicketDialog = true
    },
    handleTicketCreated(newTicket) {
      this.tickets.push(newTicket)
      console.log('Ticket created:', newTicket)
    },
    openAddTaskDialog(sprintId) {
      this.selectedSprintForTask = sprintId
      this.showAddTaskDialog = true
    },
    handleTaskCreated(newTask) {
      if (this.selectedSprintForTask === 'backlog') {
        this.backlogTasks.unshift(newTask)
      } else {
        const sprint = this.sprints.find(s => s.id === this.selectedSprintForTask)
        if (sprint) {
          sprint.tasks.unshift(newTask)
        }
      }
      console.log('Task created:', newTask)
    },
    openTaskDetails(task, sprintId) {
      this.selectedTask = task
      this.selectedSprintForTask = sprintId
      if (sprintId === 'backlog') {
        this.selectedSprintName = 'Backlog'
      } else {
        const sprint = this.sprints.find(s => s.id === sprintId)
        this.selectedSprintName = sprint ? sprint.name : 'Sprint'
      }
      this.showTaskDetailsDialog = true
    },
    handleTaskUpdated(updatedTask) {
      // Update the task in either backlog or sprint
      if (this.selectedSprintForTask === 'backlog') {
        const index = this.backlogTasks.findIndex(t => t.id === updatedTask.id)
        if (index > -1) {
          this.backlogTasks[index] = updatedTask
        }
      } else {
        const sprint = this.sprints.find(s => s.id === this.selectedSprintForTask)
        if (sprint) {
          const index = sprint.tasks.findIndex(t => t.id === updatedTask.id)
          if (index > -1) {
            sprint.tasks[index] = updatedTask
          }
        }
      }
      console.log('Task updated:', updatedTask)
    },
    openRenameSprint(sprint) {
      this.renamingSprintId = sprint.id
      this.renamingSprintName = sprint.name
      this.showRenameSprint = true
    },
    saveSprintName() {
      if (this.renamingSprintName.trim()) {
        const sprint = this.sprints.find(s => s.id === this.renamingSprintId)
        if (sprint) {
          sprint.name = this.renamingSprintName
        }
        this.showRenameSprint = false
        this.renamingSprintId = null
        this.renamingSprintName = ''
      }
    },
    confirmDeleteSprint(sprint) {
      this.sprintToDelete = sprint
      this.showDeleteConfirmation = true
    },
    deleteSprintConfirmed() {
      if (this.sprintToDelete) {
        const index = this.sprints.findIndex(s => s.id === this.sprintToDelete.id)
        if (index > -1) {
          this.sprints.splice(index, 1)
        }
        this.showDeleteConfirmation = false
        this.sprintToDelete = null
      }
    },
    addSprint() {
      this.sprintCounter++
      const newSprint = {
        id: this.sprintCounter,
        name: `Sprint ${this.sprintCounter}`,
        tasks: []
      }
      this.sprints.unshift(newSprint)
    },
    startDrag(event, task, sprintId) {
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.setData('task', JSON.stringify(task))
      event.dataTransfer.setData('sourceSprintId', String(sprintId))
    },
    dragOver(event) {
      event.preventDefault()
      event.dataTransfer.dropEffect = 'move'
    },
    dropTask(event, targetSprintId) {
      event.preventDefault()
      const taskData = event.dataTransfer.getData('task')
      const sourceSprintId = event.dataTransfer.getData('sourceSprintId')
      
      if (!taskData) return
      
      const task = JSON.parse(taskData)
      
      // Convert sourceSprintId to number if it's not 'backlog'
      let parsedSourceId = sourceSprintId === 'backlog' ? 'backlog' : parseInt(sourceSprintId)
      let parsedTargetId = targetSprintId === 'backlog' ? 'backlog' : parseInt(targetSprintId)
      
      // Prevent dropping in the same location
      if (parsedSourceId === parsedTargetId) {
        return
      }
      
      // If dragging from backlog
      if (parsedSourceId === 'backlog') {
        if (parsedTargetId !== 'backlog') {
          // Remove from backlog
          const backlogIndex = this.backlogTasks.findIndex(t => t.id === task.id)
          if (backlogIndex > -1) {
            this.backlogTasks.splice(backlogIndex, 1)
            // Add to target sprint
            const targetSprint = this.sprints.find(s => s.id === parsedTargetId)
            if (targetSprint) {
              targetSprint.tasks.push(task)
            }
          }
        }
      } else if (parsedTargetId === 'backlog') {
        // Dragging to backlog from a sprint
        const sourceSprint = this.sprints.find(s => s.id === parsedSourceId)
        if (sourceSprint) {
          const taskIndex = sourceSprint.tasks.findIndex(t => t.id === task.id)
          if (taskIndex > -1) {
            sourceSprint.tasks.splice(taskIndex, 1)
            // Add to backlog
            this.backlogTasks.push(task)
          }
        }
      } else {
        // If dragging between sprints
        const sourceSprint = this.sprints.find(s => s.id === parsedSourceId)
        const targetSprint = this.sprints.find(s => s.id === parsedTargetId)
        
        if (sourceSprint && targetSprint) {
          const taskIndex = sourceSprint.tasks.findIndex(t => t.id === task.id)
          if (taskIndex > -1) {
            sourceSprint.tasks.splice(taskIndex, 1)
            targetSprint.tasks.push(task)
          }
        }
      }
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
  background: #ffffff;
  margin-bottom: 10px;
}

.filter-chip {
  background: #f3f4f6 !important;
  border-radius: 20px !important;
  padding: 6px 12px !important;
  cursor: pointer;
  transition: background-color 0.2s;
}

.filter-chip:hover {
  background: #e5e7eb !important;
}

.filter-label {
  font-size: 13px;
  color: #6b7280;
  font-weight: 500;
  font-family: 'Montserrat', sans-serif;
}

.filter-separator {
  margin: 0 8px;
  color: #d1d5db;
  font-weight: 300;
}

.filter-value {
  font-size: 13px;
  color: #1f2937;
  font-weight: 500;
  font-family: 'Montserrat', sans-serif;
}

.clear-filters-link {
  font-size: 14px;
  color: #3b82f6;
  text-decoration: none;
  display: flex;
  align-items: center;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  transition: color 0.2s;
}

.clear-filters-link:hover {
  color: #2563eb;
  text-decoration: none;
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

.add-ticket-btn {
  padding: 8px 12px;
  font-size: 16px;
  transition: background-color 0.2s;
}

.add-ticket-btn:hover {
  background-color: #eff6ff;
}

/* Sprints Section */
.sprints-section {
  background: transparent;
}

.sprints-container {
  display: flex;
  gap: 0;
  position: relative;
  margin-bottom: 16px;
}

.backlog-column {
  flex-shrink: 0;
  width: 25%;
  min-width: 280px;
  background: #f9fafb !important;
  border: 1px solid #1c6def !important;
  z-index: 2;
  margin-right: 8px;
}

.backlog-column .sprint-header {
  border-bottom: 1px solid #1c6def !important;
}

.empty-sprints-message {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
}

.empty-message-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

.empty-message-text {
  font-size: 16px;
  font-weight: 500;
  color: #9ca3af;
  font-family: 'Montserrat', sans-serif;
}

.add-sprint-btn-bottom {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 12px 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  color: #6b7280;
  font-family: 'Montserrat', sans-serif;
  transition: background-color 0.2s;
  margin-bottom: 16px;
  width: fit-content;
}

.add-sprint-btn-bottom:hover {
  background: #f3f4f6;
}

.add-sprint-btn-top {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 12px 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  color: #6b7280;
  font-family: 'Montserrat', sans-serif;
  transition: background-color 0.2s, box-shadow 0.2s;
  margin-bottom: 16px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.add-sprint-btn-top:hover {
  background: #f3f4f6;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.add-task-btn-backlog {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 10px 16px;
  margin-bottom: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 600;
  color: #6b7280;
  font-family: 'Montserrat', sans-serif;
  transition: background-color 0.2s, box-shadow 0.2s;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.add-task-btn-backlog:hover {
  background: #f9fafb;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
}

.sprints-scroll-container {
  flex: 1;
  overflow-x: auto;
  overflow-y: visible;
  padding-left: 8px;
}

.sprints-scroll-container::-webkit-scrollbar {
  height: 8px;
}

.sprints-scroll-container::-webkit-scrollbar-track {
  background: #f3f4f6;
  border-radius: 4px;
}

.sprints-scroll-container::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 4px;
}

.sprints-scroll-container::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

.sprints-grid {
  display: flex;
  gap: 20px;
  min-width: min-content;
  padding-bottom: 8px;
}

.sprint-column {
  flex-shrink: 0;
  width: calc(25vw - 20px);
  min-width: 280px;
  max-width: 350px;
  height: 600px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
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
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
}

.sprint-cards::-webkit-scrollbar {
  width: 6px;
}

.sprint-cards::-webkit-scrollbar-track {
  background: transparent;
}

.sprint-cards::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 3px;
}

.sprint-cards::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

.task-card {
  background: white;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.2s;
  cursor: move;
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
  transition: color 0.2s, text-decoration 0.2s;
}

.clickable-task-title {
  cursor: pointer;
  color: #3b82f6;
}

.clickable-task-title:hover {
  color: #2563eb;
  text-decoration: underline;
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
  .backlog-column {
    width: 33.333%;
    min-width: 250px;
  }
  
  .sprint-column {
    width: calc(33.333vw - 20px);
    min-width: 250px;
  }
}

@media (max-width: 900px) {
  .sprints-container {
    flex-direction: column;
  }
  
  .backlog-column {
    width: 100%;
    margin-bottom: 16px;
    margin-right: 0;
  }
  
  .sprints-scroll-container {
    padding-left: 0;
  }
  
  .sprint-column {
    width: calc(80vw);
    min-width: 280px;
  }
}
</style>
