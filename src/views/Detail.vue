<template>
  <div>
    <Loader v-if="loading" />
    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">{{ 'Menu_History' | localizeFilter }}</router-link>
       <!-- <a> need for settings of materialize (for cancel reloading of page - @click.prevent) -->
        <a class="breadcrumb" @click.prevent>
          {{ record.type === 'income' ? 'Income' : 'Outcome' | localizeFilter }}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card" :class="{'green': record.type === 'income', 'red': record.type === 'outcome'}">
            <div class="card-content white-text">
              <p>{{ 'Description' | localizeFilter }}: {{ record.description }}</p>
              <p>{{ 'Amount' | localizeFilter }}: {{ record.amount | currencyFilter('RUB') }}</p>
              <p>{{ 'Category' | localizeFilter }}: {{ record.categoryTitle }}</p>

              <small>{{ record.date | dateFilter('datetime') }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="center" v-else>Записи с id=<strong>{{ $route.params.id }}</strong> не обнаружено</p>
  </div>
</template>

<script>
export default {
  name: 'detail',
  metaInfo () {
    return {
      title: this.$title('Detail_Title')
    }
  },
  data () {
    return {
      record: null,
      loading: true
    }
  },
  async mounted () {
    const id = this.$route.params.id
    const record = await this.$store.dispatch('fetchRecordById', id)
    // eslint-disable-next-line no-unused-vars
    const category = await this.$store.dispatch('fetchCategoryById', record.categoryId)

    this.record = {
      ...record,
      categoryTitle: category.title
    }
    this.loading = false
  }
}
</script>
