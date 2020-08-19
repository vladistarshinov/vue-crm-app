import M from 'materialize-css'
import localizeFilter from '@/filters/localize'

export default {
  install (Vue, options) {
    Vue.prototype.$message = html => {
      M.toast({ html })
    }

    Vue.prototype.$error = html => {
      M.toast({ html: `[${localizeFilter('Error')}] ${html}` })
    }
  }
}
