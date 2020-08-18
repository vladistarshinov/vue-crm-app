<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>
    <Loader v-if="loading" />
    <p class="center" v-else-if="!records.length">Записей пока нет. <router-link to="/record">Добавить новую запись</router-link></p>
    <section v-else>
      <HistoryTable :records="records" />
    </section>
  </div>
</template>

<script>
import HistoryTable from '@/components/HistoryTable'
export default {
  name: 'history',
  data () {
    return {
      loading: true,
      records: [],
      categories: []
    }
  },
  async mounted () {
    /* this.records = await this.$store.dispatch('fetchRecords') */
    const records = await this.$store.dispatch('fetchRecords')
    this.categories = await this.$store.dispatch('fetchCategories')
    this.records = records.map(record => {
      return {
        ...record,
        categoryTitle: this.categories.find(category => category.id === record.categoryId).title,
        typeText: record.type === 'income' ? 'Доход' : 'Расход',
        typeClass: record.type === 'income' ? 'green' : 'red'
      }
    })
    this.loading = false
  },
  components: {
    HistoryTable
  }
}
</script>
