<template>
  <table>
    <thead>
    <tr>
      <th>#</th>
      <th>{{ 'Amount' | localizeFilter }}</th>
      <th>{{ 'Date' | localizeFilter }}</th>
      <th>{{ 'Category' | localizeFilter }}</th>
      <th>{{ 'Type' | localizeFilter }}</th>
      <th>{{ 'Open' | localizeFilter }}</th>
    </tr>
    </thead>

    <tbody>
    <tr v-for="(record, index) of records" :key="record.id">
      <td>{{ index + 1 }}</td>
      <td>{{ record.amount | currencyFilter('RUB') }}</td>
      <td>{{ record.date | dateFilter('datetime') }}</td>
      <td>{{ record.categoryTitle }}</td>
      <td>
        <span class="white-text badge" :class="[record.typeClass]">{{ record.typeText }}</span>
      </td>
      <td>
        <button
          class="btn-small btn"
          v-tooltip="'OpenRecord'"
          @click="$router.push('/detail/' + record.id)"
        >
          <i class="material-icons">open_in_new</i>
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    records: {
      type: Array,
      required: true
    }
  }
}
</script>
