<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">{{ 'CRM_Title' | localizeFilter }}</span>
      <div class="input-field">
        <input
            id="name"
            type="text"
            v-model.trim="name"
            :class="{invalid: $v.name.$dirty && !$v.name.required}"
        >
        <label for="name">{{ 'Name' | localizeFilter }}</label>
        <small
          class="helper-text invalid"
          v-if="$v.name.$dirty && !$v.name.required"
        >
          {{ 'Message_EnterName' | localizeFilter }}
        </small>
      </div>
      <div class="input-field">
        <input
            id="email"
            type="text"
            v-model.trim="email"
            :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
        >
        <label for="email">Email</label>
        <small
          class="helper-text invalid"
          v-if="$v.email.$dirty && !$v.email.required"
        >
          {{ 'Message_EmailRequired' | localizeFilter }}
        </small>
        <small
          class="helper-text invalid"
          v-else-if="$v.email.$dirty && !$v.email.email"
        >
          {{ 'Message_EmailValid' | localizeFilter }}
        </small>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model.trim="password"
          :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
        >
        <label for="password">{{ 'Password' | localizeFilter }}</label>
        <small
          class="helper-text invalid"
          v-if="$v.password.$dirty && !$v.password.required"
        >
          {{ 'Message_EnterPassword' | localizeFilter }} ({{ 'notLess' | localizeFilter }} {{$v.password.$params.minLength.min}} {{ 'symbol' | localizeFilter }})
        </small>
         <small
          class="helper-text invalid"
          v-else-if="$v.password.$dirty && !$v.password.minLength"
        >
          {{ 'Message_EnterPassword' | localizeFilter }} ({{ 'leftToEnter' | localizeFilter }} {{$v.password.$params.minLength.min - password.length}})
        </small>
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="agreement" />
          <span>{{ 'AcceptRules' | localizeFilter }}</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          {{ 'Register' | localizeFilter }}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{ 'HasAccount' | localizeFilter }}
        <router-link to="/login">{{ 'Login' | localizeFilter }}</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators'
import messages from '@/utils/messages'
import localizeFilter from '@/filters/localize'

export default {
  name: 'register',
  metaInfo () {
    return {
      title: this.$title('Register')
    }
  },
  data () {
    return {
      name: '',
      email: '',
      password: '',
      agreement: false
    }
  },
  validations: {
    name: { required },
    email: { email, required },
    password: { required, minLength: minLength(6) },
    agreement: { checked: v => v }
  },
  mounted () {
    if (messages[this.$route.query.message]) {
      this.$message(localizeFilter(messages[this.$route.query.message]))
    }
  },
  methods: {
    async submitHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formData = {
        name: this.name,
        email: this.email,
        password: this.password
      }

      try {
        await this.$store.dispatch('register', formData)
        this.$router.push('/')
      } catch (e) { }
    }
  }
}
</script>
