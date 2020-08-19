<template>
  <div>
    <div class="page-title page-title__planning">
      <h3>{{ 'Menu_Planning' | localizeFilter }}</h3>
      <h4>{{info.bill | currencyFilter('RUB')}}</h4>
    </div>
    <Loader v-if="loading" />
    <p class="center" v-else-if="!categories.length">{{ 'NoCategories' | localizeFilter }}. <router-link to="/categories">{{ 'AddFirst' | localizeFilter }}</router-link></p>
    <section v-else>
      <div v-for="category of categories" :key="category.id">
        <p>
          <strong>{{category.title}}</strong>
          {{category.spend | currencyFilter('RUB') }} {{ 'Of' | localizeFilter }} {{ category.limit | currencyFilter('RUB') }}
        </p>
        <div class="progress">
          <div
              class="determinate"
              :class="[category.progressColor]"
              :style="{width: category.progressPercent + '%'}"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import currencyFilter from '@/filters/currency'
import localizeFilter from '@/filters/localize'
export default {
  name: 'planning',
  metaInfo () {
    return {
      title: this.$title('Menu_Planning')
    }
  },
  data () {
    return {
      loading: true,
      categories: []
    }
  },
  computed: {
    ...mapGetters(['info'])
  },
  async mounted () {
    const records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')
    this.categories = categories.map(сategory => {
      const spend = records
        .filter(record => record.categoryId === сategory.id)
        .filter(record => record.type === 'outcome')
        .reduce((total, record) => {
          // eslint-disable-next-line no-return-assign
          return total += +record.amount
        }, 0)
      const percent = 100 * spend / сategory.limit
      const progressPercent = percent > 100 ? 100 : percent
      const progressColor = percent < 60
        ? 'green'
        : percent < 100
          ? 'yellow'
          : 'red'
      const tooltipValue = сategory.limit - spend
      const tooltip = `${tooltipValue < 0 ? localizeFilter('MoreThan') : localizeFilter('Stayed')} ${currencyFilter(Math.abs(tooltipValue))}`

      return {
        ...сategory,
        progressPercent,
        progressColor,
        spend,
        tooltip
      }
    })
    this.loading = false
  }
}
</script>
