<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle page-subtitle__edit">
        <h4>{{ 'Edit' | localizeFilter }}</h4>
      </div>
      <!-- prevent - without restart page -->
      <form @submit.prevent="submitHandler">
        <div class="input-field" >
          <select ref="select" v-model="current">
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
            >{{category.title}}</option>
          </select>
          <label>{{ 'SelectCategory' | localizeFilter }}</label>
        </div>

        <div class="input-field">
          <input
              id="name"
              type="text"
              v-model="title"
              :class="{ invalid: $v.title.$dirty && !$v.title.required }"
          >
          <label for="name">{{ 'Description' | localizeFilter }}</label>
          <span
            v-if="$v.title.$dirty && !$v.title.required"
            class="helper-text invalid"
          >{{ 'Message_CategoryTitle' | localizeFilter }}</span>
        </div>

        <div class="input-field">
          <input
              id="limit"
              type="number"
              v-model.number="limit"
              :class="{ invalid: $v.limit.$dirty && !$v.limit.minValue }"
          >
          <label for="limit">{{ 'Limit' | localizeFilter }}</label>
          <span
            class="helper-text invalid"
            v-if="$v.limit.$dirty && !$v.limit.minValue"
          >{{ 'Message_MinLength' | localizeFilter }} {{ $v.limit.$params.minValue.min }}</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{ 'Update' | localizeFilter }}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { minValue, required } from 'vuelidate/lib/validators'
import M from 'materialize-css'
export default {
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      select: null,
      title: '',
      limit: 100,
      current: null
    }
  },
  mounted () {
    this.select = M.FormSelect.init(this.$refs.select)
    M.updateTextFields()
  },
  validations: {
    title: { required },
    limit: { minValue: minValue(100) }
  },
  created () {
    const { id, title, limit } = this.categories[0]
    this.current = id
    this.title = title
    this.limit = limit
  },
  methods: {
    async submitHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        const categoryData = {
          id: this.current,
          title: this.title,
          limit: this.limit
        }
        await this.$store.dispatch('updateCategory', categoryData)
        this.$message('Категория успешно обновлена')
        // for update at frontend
        this.$emit('updated', categoryData)
      } catch (e) {}
    }
  },
  watch: {
    current (categoryId) {
      const { title, limit } = this.categories.find(c => c.id === categoryId)
      this.title = title
      this.limit = limit
    }
  },
  destroyed () {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  }
}
</script>
