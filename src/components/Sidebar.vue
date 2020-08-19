<template>
  <ul class="sidenav app-sidenav" :class="{open: value}">
    <router-link
      v-for="link in links"
      :key="link.url"
      :to="link.url"
      :exact="link.exact"
      tag="li"
      active-class="active"
    >
      <a href="#" class="waves-effect waves-orange pointer">{{link.title}}</a>
    </router-link>
  </ul>
</template>

<script>
import localizeFilter from '@/filters/localize'
export default {
  props: ['value'],
  data () {
    return {
      links: [
        {
          title: localizeFilter('Menu_Bill'),
          url: '/',
          exact: true
        },
        {
          title: localizeFilter('Menu_History'),
          url: '/history'
        },
        {
          title: localizeFilter('Menu_Planning'),
          url: '/planning'
        },
        {
          title: localizeFilter('Menu_NewRecord'),
          url: '/record'
        },
        {
          title: localizeFilter('Menu_Categories'),
          url: '/categories'
        }
      ]
    }
  }
}
</script>
