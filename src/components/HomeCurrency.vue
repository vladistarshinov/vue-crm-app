<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">{{ 'CurrencyAmountTitle' | localizeFilter }}</span>
        </div>
        <table class="table cards table-striped">
          <thead>
          <tr>
            <th>{{ 'Currency' | localizeFilter }}</th>
            <th>{{ 'CurrencyType' | localizeFilter }}</th>
            <th>{{ 'Date' | localizeFilter }}</th>
          </tr>
          </thead>

          <tbody class="cards__currency">
          <tr v-for="currency in currencies" :key="currency" class="cards__currency-list">
            <td>{{currency}}</td>
            <td>{{rates[currency].toFixed(5)}}</td>
            <td>{{date | dateFilter('dateShort')}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['rates', 'date'],
  data () {
    return {
      currencies: ['RUB', 'USD', 'EUR', 'GBP', 'CNY']
    }
  }
}
</script>
