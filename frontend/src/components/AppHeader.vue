<template>
  <div class="header row items-center justify-between q-px-md q-py-sm">
    <div class="logo-section row items-center no-wrap">
      <q-icon name="apps" size="28px" color="primary" class="q-mr-sm" />
      <div class="brand-text">
        <div class="brand-title">GRIDFlow</div>
      </div>
      <div class="nav-links row items-center q-ml-lg">
        <router-link :to="dashboardRoute" class="nav-link" active-class="active" exact-active-class="active" exact>Dashboard</router-link>
        
        <!-- Projects Link with Dropdown for Middle Management -->
        <div v-if="showProjectsDropdown" class="projects-dropdown">
          <a class="nav-link" :class="{ active: isProjectsActive }">
            Projects
            <q-icon name="keyboard_arrow_down" size="16px" class="q-ml-xs" />
          </a>
          <q-menu>
            <q-list style="min-width: 180px">
              <q-item clickable v-close-popup @click="router.push(projectsRoute)">
                <q-item-section>
                  <q-item-label>{{ projectsDropdownLabel }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="router.push(myProjectsRoute)">
                <q-item-section>
                  <q-item-label>My Projects</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </div>
        
        <!-- Regular Projects Link for Executive and Unit Personnel -->
        <router-link v-else :to="projectsRoute" class="nav-link" active-class="active" exact-active-class="active">{{ projectsLinkLabel }}</router-link>
        
        <router-link v-if="showApprovals" :to="approvalsRoute" class="nav-link" active-class="active" exact-active-class="active">Approvals</router-link>
      </div>
    </div>

    <div class="header-actions row items-center q-gutter-sm">
      <q-input 
        dense 
        outlined 
        debounce="300" 
        v-model="search" 
        placeholder="Global Search..." 
        class="search-input"
        bg-color="white"
      >
        <template v-slot:prepend>
          <q-icon name="search" size="18px" />
        </template>
      </q-input>
      <q-btn flat round dense icon="wb_sunny" size="sm" />
      <q-btn flat round dense icon="dark_mode" size="sm" />
      
      <!-- User Info & Logout -->
      <q-btn flat round dense icon="person" size="sm">
        <q-menu>
          <q-list style="min-width: 200px">
            <q-item-label header class="text-grey-8">
              <div class="text-body2 text-weight-medium">{{ currentUser?.name }}</div>
              <div class="text-caption text-grey-6">{{ currentUser?.jobTitle }}</div>
              <div class="text-caption text-grey-6">{{ currentUser?.staffNumber }}</div>
            </q-item-label>
            <q-separator />
            <q-item clickable v-close-popup @click="handleLogout">
              <q-item-section avatar>
                <q-icon name="logout" color="negative" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Logout</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'AppHeader',
  setup() {
    const router = useRouter()
    const search = ref('')
    const currentUser = ref(null)
    const dashboardRoute = ref('/')
    const projectsRoute = ref('/projects')
    const myProjectsRoute = ref('/my-projects')
    const approvalsRoute = ref('/middle-management/approvals')
    const showApprovals = ref(false)
    const showProjectsDropdown = ref(false)
    const projectsDropdownLabel = ref('')
    const projectsLinkLabel = ref('Projects')
    const isProjectsActive = ref(false)

    onMounted(() => {
      const user = JSON.parse(sessionStorage.getItem('currentUser') || 'null')
      currentUser.value = user

      // Set routes based on user view
      if (user) {
        if (user.view === 'middle-management') {
          dashboardRoute.value = '/middle-management/dashboard'
          projectsRoute.value = '/middle-management/projects'
          myProjectsRoute.value = '/middle-management/my-projects'
          approvalsRoute.value = '/middle-management/approvals'
          showApprovals.value = true
          showProjectsDropdown.value = true
          
          // Set dropdown label based on job title
          const jobTitle = user.jobTitle?.toLowerCase() || ''
          if (jobTitle.includes('director')) {
            projectsDropdownLabel.value = 'Department Projects'
          } else if (jobTitle.includes('manager')) {
            projectsDropdownLabel.value = 'Sectional Projects'
          } else if (jobTitle.includes('supervisor')) {
            projectsDropdownLabel.value = 'Unit Projects'
          } else {
            projectsDropdownLabel.value = 'Department Projects'
          }
          
        } else if (user.view === 'unit-personnel') {
          dashboardRoute.value = '/unit-personnel/dashboard'
          projectsRoute.value = '/unit-personnel/my-projects'
          projectsLinkLabel.value = 'My Projects'
          showApprovals.value = false
          showProjectsDropdown.value = false
        } else {
          // Executive view (default)
          dashboardRoute.value = '/'
          projectsRoute.value = '/projects'
          showApprovals.value = false
          showProjectsDropdown.value = false
        }
      }
      
      // Check if current route is projects-related
      isProjectsActive.value = router.currentRoute.value.path.includes('projects')
    })

    const handleLogout = () => {
      sessionStorage.removeItem('currentUser')
      router.push('/login')
    }

    return {
      search,
      currentUser,
      dashboardRoute,
      projectsRoute,
      myProjectsRoute,
      approvalsRoute,
      showApprovals,
      showProjectsDropdown,
      projectsDropdownLabel,
      projectsLinkLabel,
      isProjectsActive,
      router,
      handleLogout
    }
  }
}
</script>

<style scoped>
.header {
  background: white;
  border-bottom: 1px solid #e5e7eb;
  border-radius: 0;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.logo-section {
  gap: 8px;
}

.brand-title {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  font-family: 'Montserrat', sans-serif;
}

.nav-links {
  gap: 24px;
}

.nav-link {
  color: #6b7280;
  text-decoration: none;
  font-size: 14px;
  padding: 4px 8px;
  transition: color 0.2s;
  font-family: 'Montserrat', sans-serif;
}

.nav-link.active {
  color: #3b82f6;
  font-weight: 500;
}

.nav-link:hover {
  color: #3b82f6;
}

.projects-dropdown {
  position: relative;
  cursor: pointer;
}

.projects-dropdown .nav-link {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.header-actions {
  gap: 12px;
}

.search-input {
  width: 240px;
}

.search-input :deep(.q-field__control) {
  border-radius: 10px !important;
}

@media (max-width: 768px) {
  .search-input {
    width: 160px;
  }
}
</style>
