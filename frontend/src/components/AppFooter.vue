<template>
  <div class="footer q-pa-md text-center">
    <span class="footer-text">© 2025 GRIDFlow Project Management System | v1.2.0 | API Status </span>
    <q-badge color="positive" label="Online" />
  </div>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>

<style scoped>
.footer {
  background: white;
  border-top: 1px solid #e5e7eb;
  border-radius: 0;
}

.footer-text {
  font-size: 12px;
  color: #6b7280;
  font-family: 'Montserrat', sans-serif;
}
</style>
