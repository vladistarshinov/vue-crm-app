import Vue from 'vue'
import Vuelidate from 'vuelidate'
import VueMeta from 'vue-meta'
import App from './App.vue'
import router from './router'
import store from './store'

import { firebase } from '@firebase/app'
import '@firebase/auth'
import '@firebase/database'
import firebaseConfig from './firebase/firebase'

/* import 'materialize-css/dist/js/materialize.min' */
import M from 'materialize-css'
import Paginate from 'vuejs-paginate'
import dateFilter from '@/filters/date'
import currencyFilter from '@/filters/currency'
import localizeFilter from '@/filters/localize'
import titlePlugin from '@/utils/title.plugin'
import messagePlugin from '@/utils/message.plugin'
import tooltipDirective from '@/directives/tooltip'
import Loader from '@/components/Loader'
import CountryFlag from 'vue-country-flag'

Vue.config.productionTip = false

Vue.use(Vuelidate)
Vue.use(VueMeta)
Vue.use(M)
Vue.component('Pagination', Paginate)
Vue.filter('dateFilter', dateFilter)
Vue.filter('currencyFilter', currencyFilter)
Vue.filter('localizeFilter', localizeFilter)
Vue.directive('tooltip', tooltipDirective)
Vue.use(titlePlugin)
Vue.use(messagePlugin)

Vue.component('Loader', Loader)
Vue.component('vue-country-flag', CountryFlag)

firebase.initializeApp(firebaseConfig)

let app

// auth().onAuthStateChanged() - find local data of users for auto auth or not find
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})

/* <!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="/__/firebase/7.17.1/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
    https://firebase.google.com/docs/web/setup#available-libraries -->
<script src="/__/firebase/7.17.1/firebase-analytics.js"></script>

<!-- Initialize Firebase -->
<script src="/__/firebase/init.js"></script>  */
