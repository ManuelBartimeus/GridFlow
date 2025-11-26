<template>
  <q-dialog 
    v-model="dialogOpen" 
    persistent
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card class="add-ticket-dialog">
      <!-- Header -->
      <q-card-section class="dialog-header">
        <div class="header-content">
          <div class="header-title">Add Ticket</div>
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
          <!-- Ticket Name -->
          <div class="form-section full-width">
            <div class="form-group">
              <label class="form-label">Ticket Name *</label>
              <q-input
                v-model="formData.ticketName"
                outlined
                dense
                placeholder="Enter ticket name"
                class="form-input"
              />
            </div>
          </div>

          <!-- Category -->
          <div class="form-section full-width">
            <div class="form-group">
              <label class="form-label">Category *</label>
              <q-select
                v-model="formData.category"
                :options="categoryOptions"
                outlined
                dense
                emit-value
                map-options
                placeholder="Select category"
                class="form-input"
                @update:model-value="onCategoryChange"
              />
            </div>
          </div>

          <!-- Budget Change Section -->
          <div v-if="formData.category === 'budget-change'" class="form-section full-width">
            <div class="form-group">
              <label class="form-label">New Budget Amount *</label>
              <q-input
                v-model.number="formData.budgetAmount"
                outlined
                dense
                type="number"
                placeholder="Enter new budget amount"
                class="form-input"
                prefix="$"
              />
            </div>
          </div>

          <!-- Timeline Change Section -->
          <div v-if="formData.category === 'timeline-change'" class="form-section full-width">
            <div class="form-group">
              <label class="form-label">New End Date *</label>
              <q-input
                v-model="formData.newEndDate"
                outlined
                dense
                type="date"
                class="form-input"
              />
            </div>
          </div>

          <!-- Additional Info -->
          <div class="form-section full-width">
            <div class="form-group">
              <label class="form-label">Additional Information</label>
              <q-input
                v-model="formData.additionalInfo"
                outlined
                dense
                type="textarea"
                placeholder="Enter any additional information"
                rows="4"
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
            label="Submit"
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
export default {
  name: 'AddTicketDialog',
  props: {
    modelValue: {
      type: Boolean,
      required: true
    },
    projectName: {
      type: String,
      default: 'Project Name'
    }
  },
  emits: ['update:modelValue', 'ticket-created'],
  data() {
    return {
      formData: {
        ticketName: '',
        category: null,
        budgetAmount: null,
        newEndDate: null,
        additionalInfo: ''
      },
      categoryOptions: [
        { label: 'Budget Change', value: 'budget-change' },
        { label: 'Timeline Change', value: 'timeline-change' },
        { label: 'Other', value: 'other' }
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
    isFormValid() {
      const hasBasicFields = this.formData.ticketName.trim() !== '' && this.formData.category !== null

      if (this.formData.category === 'budget-change') {
        return hasBasicFields && this.formData.budgetAmount !== null && this.formData.budgetAmount > 0
      } else if (this.formData.category === 'timeline-change') {
        return hasBasicFields && this.formData.newEndDate !== null
      }

      return hasBasicFields
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
    onCategoryChange() {
      // Clear specific fields when category changes
      this.formData.budgetAmount = null
      this.formData.newEndDate = null
    },
    resetForm() {
      this.formData = {
        ticketName: '',
        category: null,
        budgetAmount: null,
        newEndDate: null,
        additionalInfo: ''
      }
    },
    submitForm() {
      if (this.isFormValid) {
        const newTicket = {
          id: `TKT-${Date.now()}`,
          ticketName: this.formData.ticketName,
          category: this.formData.category,
          budgetAmount: this.formData.budgetAmount,
          newEndDate: this.formData.newEndDate,
          additionalInfo: this.formData.additionalInfo,
          createdDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          status: 'Open',
          projectName: this.projectName
        }

        this.$emit('ticket-created', newTicket)
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
.add-ticket-dialog {
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  width: 600px;
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
