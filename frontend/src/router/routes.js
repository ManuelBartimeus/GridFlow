const routes = [
  // Login Route (Public)
  {
    path: '/login',
    component: () => import('pages/LoginPage.vue'),
  },

  // Protected Routes
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { 
        path: '', 
        component: () => import('pages/ExecutiveView/DashboardPage.vue'),
        meta: { requiresAuth: true, view: 'executive' }
      },
      { 
        path: 'projects', 
        component: () => import('pages/ExecutiveView/ProjectsPage.vue'),
        meta: { requiresAuth: true, view: 'executive' }
      },
      { 
        path: 'middle-management/dashboard', 
        component: () => import('pages/MiddleManagementView/DashboardPage.vue'),
        meta: { requiresAuth: true, view: 'middle-management' }
      },
      { 
        path: 'middle-management/projects', 
        component: () => import('pages/MiddleManagementView/ProjectsPage.vue'),
        meta: { requiresAuth: true, view: 'middle-management' }
      },
      { 
        path: 'middle-management/my-projects', 
        component: () => import('pages/MiddleManagementView/MyProjectsPage.vue'),
        meta: { requiresAuth: true, view: 'middle-management' }
      },
      { 
        path: 'middle-management/approvals', 
        component: () => import('pages/MiddleManagementView/ApprovalsPage.vue'),
        meta: { requiresAuth: true, view: 'middle-management' }
      },
      { 
        path: 'unit-personnel/dashboard', 
        component: () => import('pages/UnitPersonnelView/DashboardPage.vue'),
        meta: { requiresAuth: true, view: 'unit-personnel' }
      },
      { 
        path: 'unit-personnel/projects', 
        component: () => import('pages/UnitPersonnelView/ProjectsPage.vue'),
        meta: { requiresAuth: true, view: 'unit-personnel' }
      }
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
