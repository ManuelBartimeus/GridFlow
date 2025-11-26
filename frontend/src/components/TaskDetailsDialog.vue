<template>
  <q-dialog 
    v-model="dialogOpen" 
    persistent
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card class="task-details-dialog">
      <!-- Header -->
      <q-card-section class="dialog-header">
        <div class="header-content">
          <div class="header-info">
            <div class="header-breadcrumb">{{ breadcrumb }}</div>
            <div class="header-title">{{ task.title }}</div>
          </div>
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

      <!-- Main Content -->
      <q-card-section class="dialog-content">
        <div class="content-grid">
          <!-- Left Panel -->
          <div class="left-panel">
            <!-- Status -->
            <div class="detail-section">
              <label class="detail-label">Status</label>
              <q-select
                v-model="editingTask.status"
                :options="statusOptions"
                outlined
                dense
                emit-value
                map-options
                class="detail-input"
              />
            </div>

            <!-- Due Date -->
            <div class="detail-section">
              <label class="detail-label">Due Date</label>
              <q-input
                v-model="editingTask.deadline"
                outlined
                dense
                type="date"
                class="detail-input"
              />
            </div>

            <!-- Priority -->
            <div class="detail-section">
              <label class="detail-label">Priority</label>
              <q-select
                v-model="editingTask.priority"
                :options="priorityOptions"
                outlined
                dense
                emit-value
                map-options
                class="detail-input"
              />
            </div>

            <!-- Assignees -->
            <div class="detail-section">
              <label class="detail-label">Assignees</label>
              <div class="assignee-chips">
                <q-chip
                  v-for="assignee in editingTask.assignees"
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
                placeholder="Add assignee"
                @update:model-value="updateAssignees"
                class="detail-input"
              />
            </div>
          </div>

          <!-- Right Panel - Comments -->
          <div class="right-panel">
            <div class="comments-section">
              <div class="comments-header">Comments</div>
              <div class="comments-list">
                <div v-for="comment in (editingTask.comments || [])" :key="comment.id" class="comment-item">
                  <div class="comment-author">{{ comment.author }}</div>
                  <div class="comment-date">{{ comment.date }}</div>
                  <div class="comment-text">{{ comment.text }}</div>
                </div>
                <div v-if="!(editingTask.comments && editingTask.comments.length > 0)" class="no-comments">
                  No comments yet
                </div>
              </div>

              <!-- Add Comment -->
              <div class="add-comment">
                <q-input
                  v-model="newComment"
                  outlined
                  dense
                  type="textarea"
                  placeholder="Add a comment..."
                  rows="3"
                  class="comment-input"
                />
                <q-btn
                  label="Post Comment"
                  unelevated
                  color="primary"
                  size="sm"
                  @click="addComment"
                  class="comment-btn"
                />
              </div>

              <!-- Attachments -->
              <div class="attachments-section">
                <div class="attachments-header">Attachments</div>
                <div v-if="(editingTask.attachments && editingTask.attachments.length > 0)" class="attachments-list">
                  <div v-for="(file, index) in editingTask.attachments" :key="index" class="attachment-item">
                    <q-icon name="attach_file" size="sm" />
                    <div class="attachment-info">
                      <div class="attachment-name">{{ file.name }}</div>
                      <div class="attachment-meta">{{ formatFileSize(file.size) }}</div>
                    </div>
                  </div>
                </div>
                <div v-else class="no-attachments">
                  No attachments yet
                </div>

                <!-- Add Attachments -->
                <q-file
                  v-model="newAttachments"
                  @update:model-value="onNewAttachments"
                  multiple
                  outlined
                  dense
                  label="Add attachments"
                  class="detail-input"
                  counter
                  max-file-size="5242880"
                />
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
            label="Update"
            unelevated
            color="primary"
            @click="updateTask"
            class="footer-btn submit-btn"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { users } from 'src/data/users.js'

export default {
  name: 'TaskDetailsDialog',
  props: {
    modelValue: {
      type: Boolean,
      required: true
    },
    task: {
      type: Object,
      default: () => ({})
    },
    projectName: {
      type: String,
      default: 'Project'
    },
    sprintName: {
      type: String,
      default: 'Backlog'
    },
    currentUser: {
      type: String,
      default: 'Current User'
    }
  },
  emits: ['update:modelValue', 'task-updated'],
  data() {
    return {
      editingTask: {},
      newComment: '',
      newAttachments: [],
      selectedAssignees: [],
      statusOptions: [
        { label: 'Not Started', value: 'Not Started' },
        { label: 'In Progress', value: 'In Progress' },
        { label: 'On Track', value: 'On Track' },
        { label: 'At Risk', value: 'At Risk' },
        { label: 'Behind Schedule', value: 'Behind Schedule' },
        { label: 'Completed', value: 'Completed' }
      ],
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
    breadcrumb() {
      return `${this.projectName} / ${this.sprintName}`
    },
    availableUsers() {
      return users
        .filter(u => u.view !== 'executive')
        .map(u => ({
          label: u.name,
          value: u.name
        }))
    }
  },
  watch: {
    task: {
      handler(newVal) {
        if (newVal && newVal.id) {
          this.editingTask = JSON.parse(JSON.stringify(newVal))
          this.selectedAssignees = this.editingTask.assignees || []
          this.newComment = ''
          this.newAttachments = []
        }
      },
      deep: true
    }
  },
  methods: {
    removeAssignee(assignee) {
      const index = this.editingTask.assignees.indexOf(assignee)
      if (index > -1) {
        this.editingTask.assignees.splice(index, 1)
      }
    },
    updateAssignees(assignees) {
      this.editingTask.assignees = assignees
    },
    addComment() {
      if (this.newComment.trim()) {
        if (!this.editingTask.comments) {
          this.editingTask.comments = []
        }
        this.editingTask.comments.push({
          id: Date.now(),
          author: this.currentUser,
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
          text: this.newComment
        })
        this.newComment = ''
      }
    },
    onNewAttachments(files) {
      if (files && files.length > 0) {
        const newFiles = Array.from(files).map(f => ({
          name: f.name,
          size: f.size,
          uploadedAt: new Date().toLocaleString()
        }))
        this.editingTask.attachments = [...(this.editingTask.attachments || []), ...newFiles]
        this.newAttachments = []
      }
    },
    formatFileSize(bytes) {
      if (!bytes) return '0 B'
      const k = 1024
      const sizes = ['B', 'KB', 'MB', 'GB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
    },
    updateTask() {
      this.$emit('task-updated', this.editingTask)
      this.closeDialog()
    },
    closeDialog() {
      this.dialogOpen = false
    }
  }
}
</script>

<style scoped>
.task-details-dialog {
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  width: 900px;
  max-width: 95vw;
  max-height: 90vh;
}

.dialog-header {
  background: white;
  border-bottom: 1px solid #e5e7eb;
  padding: 24px;
}

.header-content {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.header-info {
  flex: 1;
}

.header-breadcrumb {
  font-size: 12px;
  color: #6b7280;
  font-family: 'Montserrat', sans-serif;
  margin-bottom: 4px;
}

.header-title {
  font-size: 22px;
  font-weight: 600;
  color: #1f2937;
  font-family: 'Montserrat', sans-serif;
}

.dialog-content {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  background: #f9fafb;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.left-panel {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.right-panel {
  border-left: 1px solid #e5e7eb;
  padding-left: 24px;
}

.detail-section {
  background: white;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.detail-label {
  font-size: 12px;
  font-weight: 600;
  color: #1f2937;
  font-family: 'Montserrat', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.detail-input {
  width: 100%;
}

.assignee-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
}

.assignee-chip {
  font-size: 12px;
  font-weight: 500;
  font-family: 'Montserrat', sans-serif;
}

.comments-section {
  background: white;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
}

.comments-header,
.attachments-header {
  font-size: 13px;
  font-weight: 600;
  color: #1f2937;
  font-family: 'Montserrat', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.comments-list {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 120px;
  max-height: 200px;
  padding-right: 8px;
}

.comments-list::-webkit-scrollbar {
  width: 4px;
}

.comments-list::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 2px;
}

.comment-item {
  padding: 12px;
  background: #f9fafb;
  border-radius: 6px;
  border-left: 3px solid #3b82f6;
}

.comment-author {
  font-size: 12px;
  font-weight: 600;
  color: #1f2937;
  font-family: 'Montserrat', sans-serif;
}

.comment-date {
  font-size: 10px;
  color: #6b7280;
  font-family: 'Montserrat', sans-serif;
  margin-top: 2px;
}

.comment-text {
  font-size: 12px;
  color: #6b7280;
  font-family: 'Montserrat', sans-serif;
  margin-top: 6px;
  line-height: 1.4;
}

.no-comments {
  text-align: center;
  font-size: 12px;
  color: #9ca3af;
  font-family: 'Montserrat', sans-serif;
  padding: 20px 0;
}

.add-comment {
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-top: 1px solid #e5e7eb;
  padding-top: 12px;
}

.comment-input {
  width: 100%;
}

.comment-btn {
  padding: 8px 16px;
  font-size: 12px;
  font-weight: 600;
  font-family: 'Montserrat', sans-serif;
  align-self: flex-end;
}

.attachments-section {
  border-top: 1px solid #e5e7eb;
  padding-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.attachments-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 150px;
  overflow-y: auto;
}

.attachments-list::-webkit-scrollbar {
  width: 4px;
}

.attachments-list::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 2px;
}

.attachment-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  background: #f3f4f6;
  border-radius: 4px;
  border: 1px solid #e5e7eb;
}

.attachment-info {
  flex: 1;
  overflow: hidden;
}

.attachment-name {
  font-size: 12px;
  color: #1f2937;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.attachment-meta {
  font-size: 10px;
  color: #6b7280;
  font-family: 'Montserrat', sans-serif;
  margin-top: 2px;
}

.no-attachments {
  text-align: center;
  font-size: 12px;
  color: #9ca3af;
  font-family: 'Montserrat', sans-serif;
  padding: 8px 0;
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

.submit-btn:hover {
  background: #2563eb;
}

@media (max-width: 1024px) {
  .task-details-dialog {
    width: 90vw;
  }

  .content-grid {
    grid-template-columns: 1fr;
  }

  .right-panel {
    border-left: none;
    border-top: 1px solid #e5e7eb;
    padding-left: 0;
    padding-top: 24px;
  }
}
</style>
