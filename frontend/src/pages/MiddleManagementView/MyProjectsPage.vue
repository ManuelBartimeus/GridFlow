<template>
  <q-page class="my-projects-page">
    <div class="page-header q-mb-lg">
      <h4 class="page-title">My Projects</h4>
      <p class="page-subtitle">Projects assigned to you</p>
    </div>
    
    <div class="container">
      <p class="text-center text-grey-7 q-pa-xl">
        This page will display projects specifically assigned to you based on your role and responsibilities.
      </p>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'MyProjectsPage'
}
</script>

<style scoped>
.my-projects-page {
  background: #f5f7fa;
  min-height: 100vh;
  padding: 24px;
  font-family: 'Montserrat', sans-serif;
}

.page-header {
  margin-bottom: 24px;
}

.page-title {
  font-size: 24px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 8px 0;
  font-family: 'Montserrat', sans-serif;
}

.page-subtitle {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
  font-family: 'Montserrat', sans-serif;
}

.container {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
</style>
