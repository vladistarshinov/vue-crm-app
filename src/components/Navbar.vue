<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="$emit('click')">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text hide-on-small-and-down">{{date | dateFilter('datetime')}}</span>
        <span class="black-text hide-on-med-and-up">{{date | dateFilter('time')}}</span>
      </div>
      <ul class="right">
        <li>
          <a
              class="dropdown-trigger black-text"
              href="#"
              data-target="dropdown"
              ref="dropdown"
          >
            {{name}}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id='dropdown' class='dropdown-content'>
            <li>
              <router-link class="black-text" to="/profile">
                <i class="material-icons">account_circle</i>{{ 'ProfileTitle' | localizeFilter }}
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a class="black-text" @click.prevent="logout" href="#">
                <i class="material-icons">assignment_return</i>{{ 'Exit' | localizeFilter }}
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import M from 'materialize-css'

export default {
  data () {
    return {
      date: new Date(),
      interval: null,
      dropdown: null
    }
  },
  methods: {
    async logout () {
      const locale = this.$store.getters.info.locale
      await this.$store.dispatch('logout')
      this.$router.push(
        {
          name: 'login',
          query: {
            message: 'logout',
            locale: locale
          }
        }
      )
    }
  },
  computed: {
    name () {
      return (
        this.$store.getters.info.name
      )
    }
  },
  mounted () {
    this.interval = setInterval(() => {
      this.date = new Date()
    }, 1000)
    // if not import M from 'materialize-css', use window.M.Dropdown.init()
    this.dropdown = M.Dropdown.init(this.$refs.dropdown, {
      constrainWidth: false,
      autoTrigger: true
    })
  },
  beforeDestroy () {
    clearInterval(this.interval)
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy()
    }
  }
}
</script>
