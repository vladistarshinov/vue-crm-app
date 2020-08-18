import _ from 'lodash'

export default {
  data () {
    return {
      currentPage: +this.$route.query.page || 1,
      pageSize: 2,
      pageCount: 0,
      allItems: [],
      items: []
    }
  },
  methods: {
    setupPagination (allItems) {
      this.allItems = _.chunk(allItems, this.pageSize)
      this.pageCount = _.size(this.allItems)
      this.items = this.allItems[this.currentPage - 1] || this.allItems[0]
    },
    handlerChangePage (currentPage) {
      this.$router.push(`${this.$route.path}?page=${currentPage}`)
      this.items = this.allItems[currentPage - 1] || this.allItems[0]
    }
  }
}
