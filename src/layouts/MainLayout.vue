<template>
  <div class="app-main-layout">
    <Navbar @click="isNavOpen = !isNavOpen" />
    <Sidebar v-model="isNavOpen" />
    <main class="app-content" :class="{full: !isNavOpen}">
      <div class="app-page">
        <router-view />
      </div>
    </main>

    <div class="fixed-action-btn">
      <router-link class="btn-floating btn-large blue" to="/record">
        <i class="large material-icons">add</i>
      </router-link>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
  name: 'main-layout',
  data () {
    return {
      isNavOpen: true
    }
  },
  components: {
    Navbar, Sidebar
  }
}
</script>
