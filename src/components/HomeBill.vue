<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">{{ 'BillInCurrency' | localizeFilter }}</span>

        <div v-for="(currency, idx) of currencies" :key="idx" class="currency-line">
          <span>{{ getCurrency(currency) | currencyFilter(currency) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['rates'],
  data () {
    return {
      currencies: ['RUB', 'USD', 'EUR', 'GBP', 'CNY']
    }
  },
  computed: {
    base () {
      return (
        this.$store.getters.info.bill / (this.rates.RUB / this.rates.USD)
      )
    }
  },
  methods: {
    getCurrency (currency) {
      return (
        Math.floor(this.base * this.rates[currency])
      )
    }
  }
}
</script>
