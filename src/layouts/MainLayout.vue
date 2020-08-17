<template>
  <div>
    <Loader v-if="loading" />
    <div class="app-main-layout" v-else>
      <Navbar @click="isNavOpen = !isNavOpen" />
      <Sidebar v-model="isNavOpen" />
      <main class="app-content" :class="{full: !isNavOpen}">
        <div class="app-page">
          <router-view />
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link class="btn-floating btn-large blue" to="/record" v-tooltip="'Создать новую запись'">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'
import messages from '@/utils/messages'
export default {
  name: 'main-layout',
  data () {
    return {
      isNavOpen: true,
      loading: true
    }
  },
  async mounted () {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
    }
    this.loading = false
  },
  components: {
    Navbar, Sidebar
  },
  computed: {
    error () {
      return this.$store.getters.error
    }
  },
  watch: {
    error (firebaseError) {
      this.$error(messages[firebaseError.code] || 'Что-то пошло не так')
    }
  }
}
</script>
