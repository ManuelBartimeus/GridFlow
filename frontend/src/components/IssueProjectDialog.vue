<template>
  <q-dialog 
    v-model="dialogOpen" 
    persistent
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card class="issue-project-dialog">
      <!-- Header -->
      <q-card-section class="dialog-header">
        <div class="header-content">
          <div class="header-title">Issue New Project</div>
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
          <!-- Project Name -->
          <div class="form-section">
            <div class="form-group">
              <label class="form-label">Project Name *</label>
              <q-input
                v-model="formData.projectName"
                outlined
                dense
                placeholder="Enter project name"
                class="form-input"
              />
            </div>
          </div>

          <!-- Project Owner -->
          <div class="form-section">
            <div class="form-group">
              <label class="form-label">Project Owner *</label>
              <div class="owner-chips">
                <q-chip
                  v-for="owner in formData.projectOwners"
                  :key="owner"
                  removable
                  @remove="removeOwner(owner)"
                  color="blue-1"
                  text-color="blue-8"
                  class="owner-chip"
                >
                  {{ owner }}
                </q-chip>
              </div>
              <q-select
                v-model="selectedOwner"
                :options="availableManagers"
                outlined
                dense
                emit-value
                map-options
                placeholder="Add project owner"
                @update:model-value="addOwner"
                class="form-input"
              />
            </div>
          </div>

          <!-- Project Manager -->
          <div class="form-section">
            <div class="form-group">
              <label class="form-label">Project Manager(s) *</label>
              <div class="manager-chips">
                <q-chip
                  v-for="manager in formData.projectManagers"
                  :key="manager"
                  removable
                  @remove="removeManager(manager)"
                  color="green-1"
                  text-color="green-8"
                  class="manager-chip"
                >
                  {{ manager }}
                </q-chip>
              </div>
              <q-select
                v-model="selectedManagers"
                :options="availableManagers"
                outlined
                dense
                multiple
                emit-value
                map-options
                placeholder="Select project manager(s)"
                @update:model-value="updateManagers"
                class="form-input"
              />
            </div>
          </div>

          <!-- Project Description -->
          <div class="form-section full-width">
            <div class="form-group">
              <label class="form-label">Project Description *</label>
              <q-input
                v-model="formData.projectDescription"
                outlined
                dense
                type="textarea"
                placeholder="Enter project description"
                rows="4"
                class="form-input"
              />
            </div>
          </div>

          <!-- Project Type -->
          <div class="form-section">
            <div class="form-group">
              <label class="form-label">Project Type *</label>
              <q-radio
                v-model="formData.projectType"
                val="standalone"
                label="Standalone"
                @update:model-value="formData.linkedProjects = []"
              />
              <q-radio
                v-model="formData.projectType"
                val="linked"
                label="Linked"
              />
            </div>
          </div>

          <!-- Linked Projects -->
          <div v-if="formData.projectType === 'linked'" class="form-section full-width">
            <div class="form-group">
              <label class="form-label">Link to Other Projects</label>
              <div class="linked-chips">
                <q-chip
                  v-for="project in formData.linkedProjects"
                  :key="project"
                  removable
                  @remove="removeLinkedProject(project)"
                  color="purple-1"
                  text-color="purple-8"
                  class="linked-chip"
                >
                  {{ project }}
                </q-chip>
              </div>
              <q-select
                v-model="selectedLinkedProject"
                :options="availableProjects"
                outlined
                dense
                emit-value
                map-options
                placeholder="Select project to link"
                @update:model-value="addLinkedProject"
                class="form-input"
              />
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
            label="Done"
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
  name: 'IssueProjectDialog',
  props: {
    modelValue: {
      type: Boolean,
      required: true
    },
    currentUser: {
      type: String,
      default: 'Sarah Mensah'
    },
    existingProjects: {
      type: Array,
      default: () => []
    }
  },
  emits: ['update:modelValue', 'project-created'],
  data() {
    return {
      formData: {
        projectName: '',
        projectOwners: [],
        projectManagers: [],
        projectDescription: '',
        projectType: 'standalone',
        linkedProjects: []
      },
      selectedOwner: null,
      selectedManagers: [],
      selectedLinkedProject: null
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
    availableManagers() {
      // Filter users who are managers or supervisors
      return users
        .filter(u => u.view === 'middle-management' && (u.jobTitle === 'Manager' || u.jobTitle === 'Director' || u.jobTitle === 'Supervisor'))
        .map(u => ({
          label: u.name,
          value: u.name
        }))
    },
    availableProjects() {
      return this.existingProjects
        .filter(p => p.id !== this.formData.projectName)
        .map(p => ({
          label: `${p.title} (${p.id})`,
          value: `${p.title} (${p.id})`
        }))
    },
    isFormValid() {
      return (
        this.formData.projectName.trim() !== '' &&
        this.formData.projectOwners.length > 0 &&
        this.formData.projectManagers.length > 0 &&
        this.formData.projectDescription.trim() !== '' &&
        (this.formData.projectType === 'standalone' || this.formData.linkedProjects.length > 0)
      )
    }
  },
  watch: {
    modelValue(newVal) {
      if (newVal) {
        this.initializeForm()
      }
    }
  },
  methods: {
    initializeForm() {
      this.formData = {
        projectName: '',
        projectOwners: [this.currentUser],
        projectManagers: [],
        projectDescription: '',
        projectType: 'standalone',
        linkedProjects: []
      }
      this.selectedOwner = null
      this.selectedManagers = []
      this.selectedLinkedProject = null
    },
    addOwner() {
      if (this.selectedOwner && !this.formData.projectOwners.includes(this.selectedOwner)) {
        this.formData.projectOwners.push(this.selectedOwner)
        this.selectedOwner = null
      }
    },
    removeOwner(owner) {
      const index = this.formData.projectOwners.indexOf(owner)
      if (index > -1) {
        this.formData.projectOwners.splice(index, 1)
      }
    },
    updateManagers(managers) {
      this.formData.projectManagers = managers
    },
    removeManager(manager) {
      const index = this.formData.projectManagers.indexOf(manager)
      if (index > -1) {
        this.formData.projectManagers.splice(index, 1)
      }
    },
    addLinkedProject() {
      if (this.selectedLinkedProject && !this.formData.linkedProjects.includes(this.selectedLinkedProject)) {
        this.formData.linkedProjects.push(this.selectedLinkedProject)
        this.selectedLinkedProject = null
      }
    },
    removeLinkedProject(project) {
      const index = this.formData.linkedProjects.indexOf(project)
      if (index > -1) {
        this.formData.linkedProjects.splice(index, 1)
      }
    },
    submitForm() {
      if (this.isFormValid) {
        const newProject = {
          id: `PROJ-${String(this.existingProjects.length + 1).padStart(3, '0')}`,
          title: this.formData.projectName,
          priority: 'High Priority',
          tags: ['New Project', 'Engineering', 'Mechanical'],
          description: this.formData.projectDescription,
          startDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          endDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          progress: 0,
          projectOwners: this.formData.projectOwners,
          projectManagers: this.formData.projectManagers,
          projectType: this.formData.projectType,
          linkedProjects: this.formData.linkedProjects,
          tasks: []
        }

        this.$emit('project-created', newProject)
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
.issue-project-dialog {
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  width: 700px;
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
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  max-width: 1000px;
}

.form-section {
  background: white;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
}

.form-section.full-width {
  grid-column: 1 / -1;
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

.owner-chips,
.manager-chips,
.linked-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
  min-height: 32px;
  align-items: center;
}

.owner-chip,
.manager-chip,
.linked-chip {
  font-size: 12px;
  font-weight: 500;
  font-family: 'Montserrat', sans-serif;
}

.form-group > q-radio {
  font-size: 13px;
  color: #1f2937;
  margin-bottom: 8px;
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
