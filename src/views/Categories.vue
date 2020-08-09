<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <div class="row">
        <CategoryCreate @created="addCategory" />
        <CategoryEdit />
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from '@/components/CategoryCreate'
import CategoryEdit from '@/components/CategoryEdit'
export default {
  name: 'categories',
  data () {
    return {
      categories: []
    }
  },
  methods: {
    addCategory (category) {
      this.categories.push(category)
    }
  },
  components: {
    CategoryCreate,
    CategoryEdit
  }
}
</script>
