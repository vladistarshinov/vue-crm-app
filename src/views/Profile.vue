<template>
  <div>
    <div class="page-title">
      <h3>{{ 'ProfileTitle' | localizeFilter }}</h3>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input
            id="description"
            type="text"
            v-model="name"
            :class="{invalid: $v.name.$dirty && !$v.name.required}"
        >
        <label for="description">{{ 'Name' | localizeFilter }}</label>
        <small
          class="helper-text invalid"
          v-if="$v.name.$dirty && !$v.name.required"
        >
          {{ 'Message_EnterName' | localizeFilter }}
        </small>
      </div>
      <div class="switch">
        <label>
          <country-flag country='us' size='normal'/>
          <input type="checkbox" v-model="isLocaleRu">
          <span class="lever"></span>
          <country-flag country='ru' size='normal'/>
        </label>
      </div>
      <button class="btn waves-effect waves-light" type="submit">
        {{ 'Update' | localizeFilter }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import CountryFlag from 'vue-country-flag'
import M from 'materialize-css'
export default {
  metaInfo () {
    return {
      title: this.$title('ProfileTitle')
    }
  },
  data () {
    return {
      name: '',
      isLocaleRu: true
    }
  },
  validations: {
    name: { required }
  },
  mounted () {
    this.name = this.info.name
    this.isLocaleRu = this.info.locale === 'ru-RU'
    setTimeout(() => {
      M.updateTextFields()
    })
  },
  computed: {
    ...mapGetters(['info'])
  },
  methods: {
    ...mapActions(['updateInfo']),
    async submitHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try {
        await this.updateInfo({
          name: this.name,
          locale: this.isLocaleRu ? 'ru-RU' : 'en-US'
        })
      } catch (e) { }
    }
  },
  components: {
    CountryFlag
  }
}
</script>
