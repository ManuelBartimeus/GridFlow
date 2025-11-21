<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-white text-dark">
      <app-header />
    </q-header>
    
    <q-page-container>
      <router-view />
      <app-footer />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'
import AppHeader from 'components/AppHeader.vue'
import AppFooter from 'components/AppFooter.vue'

export default defineComponent({
  name: 'MainLayout',
  components: {
    AppHeader,
    AppFooter
  }
})
</script>
