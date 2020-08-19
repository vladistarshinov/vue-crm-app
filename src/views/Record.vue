<template>
  <div>
    <div class="page-title">
      <h3>{{ 'Menu_NewRecord' | localizeFilter }}</h3>
    </div>

    <Loader v-if="loading" />
    <p class="center" v-else-if="!categories.length">{{ 'NoCategories' | localizeFilter }} <router-link to="/categories">Добавить новую категорию</router-link></p>
    <form class="form" v-else @submit.prevent="submitHandler">
      <div class="input-field" >
        <select ref="select" v-model="category">
          <option
            v-for="category of categories"
            :key="category.id"
            :value="category.id"
          >{{category.title}}</option>
        </select>
        <label>{{ 'SelectCategory' | localizeFilter }}</label>
      </div>
      <br>
      <p>
        <label>
          <input
              class="with-gap"
              name="type"
              type="radio"
              value="income"
              v-model="type"
          />
          <span> {{ 'Income' | localizeFilter }} </span>
        </label>
      </p>

      <p>
        <label>
          <input
              class="with-gap"
              name="type"
              type="radio"
              value="outcome"
              v-model="type"
          />
          <span> {{ 'Outcome' | localizeFilter }} </span>
        </label>
      </p>

      <div class="input-field">
        <input
            id="amount"
            type="number"
            v-model.number="amount"
            :class="{ invalid: $v.amount.$dirty && !$v.amount.minValue }"
        >
        <label for="amount">{{ 'Amount' | localizeFilter }}</label>
         <span
            class="helper-text invalid"
            v-if="$v.amount.$dirty && !$v.amount.minValue"
          >{{ 'Message_MinLength' | localizeFilter }} - {{ $v.amount.$params.minValue.min }}</span>
      </div>

      <div class="input-field">
        <input
            id="description"
            type="text"
            v-model="description"
            :class="{ invalid: $v.description.$dirty && !$v.description.required }"
        >
        <label for="description">{{ 'Description' | localizeFilter }}</label>
         <span
            v-if="$v.description.$dirty && !$v.description.required"
            class="helper-text invalid"
          >{{ 'Message_EnterDescription' | localizeFilter }}</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{ 'Create' | localizeFilter }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { minValue, required } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'
import M from 'materialize-css'
export default {
  name: 'record',
  data () {
    return {
      loading: true,
      categories: [],
      select: null,
      category: null,
      type: 'outcome',
      amount: 10,
      description: ''
    }
  },
  validations: {
    description: { required },
    amount: { minValue: minValue(10) }
  },
  computed: {
    ...mapGetters(['info']),
    availabilityMoney () {
      if (this.type === 'income') {
        return true
      }
      return this.info.bill >= this.amount
    }
  },
  methods: {
    async submitHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      if (this.availabilityMoney) {
        try {
          await this.$store.dispatch('createRecord', {
            categoryId: this.category,
            amount: this.amount,
            description: this.description,
            type: this.type,
            date: new Date().toJSON()
          })

          const bill = this.type === 'income'
            ? this.info.bill + this.amount
            : this.info.bill - this.amount
          console.log(bill)
          await this.$store.dispatch('updateInfo', { bill })
          this.$message('Запись успешно создана')
          this.$v.$reset()
          this.amount = 10
          this.description = ''
        } catch (e) {}
      } else {
        this.$message(`Недостаточно средств на счете (не хватает ${this.amount - this.info.bill} руб.)`)
      }
    }
  },
  async mounted () {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
    if (this.categories.length) {
      this.category = this.categories[0].id
    }
    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select)
      M.updateTextFields()
    }, 0)
  },
  destroyed () {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  }
}
</script>
