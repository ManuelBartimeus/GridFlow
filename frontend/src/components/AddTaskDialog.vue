<template>
  <q-dialog 
    v-model="dialogOpen" 
    persistent
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card class="add-task-dialog">
      <!-- Header -->
      <q-card-section class="dialog-header">
        <div class="header-content">
          <div class="header-title">Add Task</div>
          <q-btn 
            icon="close" 
            flat 
            round 
            dense 
            @click="closeDialog"
            color="grey-7"
          />
        </div>
      </q-card-section>

      <!-- Form Content -->
      <q-card-section class="dialog-content">
        <div class="form-grid">
          <!-- Task Name -->
          <div class="form-section full-width">
            <div class="form-group">
              <label class="form-label">Task Name *</label>
              <q-input
                v-model="formData.taskName"
                outlined
                dense
                placeholder="Enter task name"
                class="form-input"
              />
            </div>
          </div>

          <!-- Task Description -->
          <div class="form-section full-width">
            <div class="form-group">
              <label class="form-label">Task Description *</label>
              <q-input
                v-model="formData.taskDescription"
                outlined
                dense
                type="textarea"
                placeholder="Enter task description"
                rows="4"
                class="form-input"
              />
            </div>
          </div>

          <!-- Assignees -->
          <div class="form-section">
            <div class="form-group">
              <label class="form-label">Assignees</label>
              <div class="assignee-chips">
                <q-chip
                  v-for="assignee in formData.assignees"
                  :key="assignee"
                  removable
                  @remove="removeAssignee(assignee)"
                  color="blue-1"
                  text-color="blue-8"
                  class="assignee-chip"
                >
                  {{ assignee }}
                </q-chip>
              </div>
              <q-select
                v-model="selectedAssignees"
                :options="availableUsers"
                outlined
                dense
                multiple
                emit-value
                map-options
                placeholder="Select assignees"
                @update:model-value="updateAssignees"
                class="form-input"
              />
            </div>
          </div>

          <!-- Priority -->
          <div class="form-section">
            <div class="form-group">
              <label class="form-label">Priority *</label>
              <q-select
                v-model="formData.priority"
                :options="priorityOptions"
                outlined
                dense
                emit-value
                map-options
                placeholder="Select priority"
                class="form-input"
              />
            </div>
          </div>

          <!-- Due Date -->
          <div class="form-section">
            <div class="form-group">
              <label class="form-label">Due Date *</label>
              <q-input
                v-model="formData.dueDate"
                outlined
                dense
                type="date"
                class="form-input"
              />
            </div>
          </div>

          <!-- Attachments -->
          <div class="form-section full-width">
            <div class="form-group">
              <label class="form-label">Attachments</label>
              <div class="attachment-area">
                <q-file
                  v-model="formData.attachments"
                  @update:model-value="onAttachmentsSelected"
                  multiple
                  outlined
                  dense
                  label="Drag files here or click to select"
                  class="form-input"
                  counter
                  max-file-size="5242880"
                />
              </div>
              <div v-if="formData.attachments.length > 0" class="attachment-list">
                <div v-for="(file, index) in formData.attachments" :key="index" class="attachment-item">
                  <q-icon name="attach_file" size="sm" />
                  <span class="attachment-name">{{ file.name }}</span>
                  <q-btn
                    flat
                    round
                    dense
                    icon="close"
                    size="xs"
                    color="grey-7"
                    @click="removeAttachment(index)"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>

      <!-- Footer -->
      <q-card-section class="dialog-footer">
        <div class="footer-actions">
          <q-btn
            label="Cancel"
            flat
            color="grey-7"
            @click="closeDialog"
            class="footer-btn"
          />
          <q-btn
            label="Create Task"
            unelevated
            color="primary"
            @click="submitForm"
            class="footer-btn submit-btn"
            :disable="!isFormValid"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { users } from 'src/data/users.js'

export default {
  name: 'AddTaskDialog',
  props: {
    modelValue: {
      type: Boolean,
      required: true
    },
    sprintId: {
      type: [String, Number],
      default: 'backlog'
    }
  },
  emits: ['update:modelValue', 'task-created'],
  data() {
    return {
      formData: {
        taskName: '',
        taskDescription: '',
        assignees: [],
        priority: null,
        dueDate: null,
        attachments: []
      },
      selectedAssignees: [],
      priorityOptions: [
        { label: 'Low Priority', value: 'Low Priority' },
        { label: 'Medium Priority', value: 'Medium Priority' },
        { label: 'High Priority', value: 'High Priority' }
      ]
    }
  },
  computed: {
    dialogOpen: {
      get() {
        return this.modelValue
      },
      set(val) {
        this.$emit('update:modelValue', val)
      }
    },
    availableUsers() {
      return users
        .filter(u => u.view !== 'executive')
        .map(u => ({
          label: u.name,
          value: u.name
        }))
    },
    isFormValid() {
      return (
        this.formData.taskName.trim() !== '' &&
        this.formData.taskDescription.trim() !== '' &&
        this.formData.priority !== null &&
        this.formData.dueDate !== null
      )
    }
  },
  watch: {
    modelValue(newVal) {
      if (newVal) {
        this.resetForm()
      }
    }
  },
  methods: {
    updateAssignees(assignees) {
      this.formData.assignees = assignees
    },
    removeAssignee(assignee) {
      const index = this.formData.assignees.indexOf(assignee)
      if (index > -1) {
        this.formData.assignees.splice(index, 1)
      }
    },
    onAttachmentsSelected(files) {
      if (files && files.length > 0) {
        this.formData.attachments = Array.from(files)
      }
    },
    removeAttachment(index) {
      this.formData.attachments.splice(index, 1)
    },
    resetForm() {
      this.formData = {
        taskName: '',
        taskDescription: '',
        assignees: [],
        priority: null,
        dueDate: null,
        attachments: []
      }
      this.selectedAssignees = []
    },
    submitForm() {
      if (this.isFormValid) {
        const newTask = {
          id: Date.now(),
          title: this.formData.taskName,
          description: this.formData.taskDescription,
          priority: this.formData.priority,
          status: 'Not Started',
          statusColor: 'grey-3',
          deadline: this.formData.dueDate,
          progress: 0,
          assignees: this.formData.assignees,
          attachments: this.formData.attachments.map(f => ({
            name: f.name,
            size: f.size,
            uploadedAt: new Date().toLocaleString()
          })),
          comments: [],
          createdDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        }

        this.$emit('task-created', newTask)
        this.closeDialog()
      }
    },
    closeDialog() {
      this.dialogOpen = false
    }
  }
}
</script>

<style scoped>
.add-task-dialog {
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  width: 650px;
  max-width: 90vw;
  max-height: 85vh;
}

.dialog-header {
  background: white;
  border-bottom: 1px solid #e5e7eb;
  padding: 24px;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-title {
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
  font-family: 'Montserrat', sans-serif;
}

.dialog-content {
  flex: 1;
  overflow-y: auto;
  padding: 32px;
  background: #f9fafb;
}

.form-grid {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-section {
  background: white;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
}

.form-section.full-width {
  width: 100%;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  font-size: 13px;
  font-weight: 600;
  color: #1f2937;
  font-family: 'Montserrat', sans-serif;
}

.form-input {
  width: 100%;
}

.assignee-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
  min-height: 32px;
  align-items: center;
}

.assignee-chip {
  font-size: 12px;
  font-weight: 500;
  font-family: 'Montserrat', sans-serif;
}

.attachment-area {
  margin-bottom: 12px;
}

.attachment-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 12px;
}

.attachment-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: #f3f4f6;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
  font-size: 12px;
  color: #1f2937;
}

.attachment-name {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: 'Montserrat', sans-serif;
}

.dialog-footer {
  background: white;
  border-top: 1px solid #e5e7eb;
  padding: 20px 24px;
}

.footer-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.footer-btn {
  padding: 10px 24px;
  font-size: 13px;
  font-weight: 600;
  font-family: 'Montserrat', sans-serif;
  border-radius: 8px;
}

.submit-btn {
  background: #3b82f6;
  color: white;
}

.submit-btn:hover:not(.disabled) {
  background: #2563eb;
}

.submit-btn.disabled {
  background: #d1d5db;
  color: #9ca3af;
  cursor: not-allowed;
}
</style>
